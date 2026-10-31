import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Minus, Plus } from 'lucide-react'

import { IMAGES, type ImageId } from '@/content/fixtures'
import { cdn } from '@/lib/image'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * Floating image windows inspired by macOS Preview. Any component can call
 * `openImage(id, event)`; several windows can be open, dragged and stacked.
 */

type ViewerWindow = {
  key: number
  image: ImageId
  caption?: string
  x: number
  y: number
  z: number
  zoom: number
}

type ViewerContextValue = {
  openImage: (image: ImageId, origin?: { clientX: number; clientY: number }, caption?: string) => void
}

const ViewerContext = createContext<ViewerContextValue | null>(null)

const BASE_WIDTH = 460
const TITLE_BAR = 30
const FOOTER = 26

function windowSize(image: ImageId, zoom: number) {
  const asset = IMAGES[image]
  const vw = typeof window === 'undefined' ? 1200 : window.innerWidth
  const vh = typeof window === 'undefined' ? 800 : window.innerHeight
  const ratio = asset.height / asset.width
  let w = BASE_WIDTH * zoom
  // Portrait images get a narrower window so they fit on screen.
  if (ratio > 1) w = (BASE_WIDTH * zoom) / ratio * 1.15
  w = Math.min(w, vw - 24)
  let h = w * ratio
  const maxH = vh - TITLE_BAR - FOOTER - 32
  if (h > maxH) {
    h = maxH
    w = h / ratio
  }
  return { w: Math.round(w), h: Math.round(h) }
}

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<ViewerWindow[]>([])
  const counter = useRef(0)
  const topZ = useRef(100)

  const openImage = useCallback<ViewerContextValue['openImage']>((image, origin, caption) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.image === image)
      topZ.current += 1
      if (existing) {
        return prev.map((w) => (w.key === existing.key ? { ...w, z: topZ.current } : w))
      }
      const { w, h } = windowSize(image, 1)
      const vw = window.innerWidth
      const vh = window.innerHeight
      const offset = (prev.length % 5) * 22
      const ox = origin?.clientX ?? vw / 2
      const oy = origin?.clientY ?? vh / 3
      const x = Math.max(12, Math.min(vw - w - 12, ox - w / 2 + offset))
      const y = Math.max(12, Math.min(vh - h - TITLE_BAR - FOOTER - 12, oy + 18 + offset))
      counter.current += 1
      return [...prev, { key: counter.current, image, caption, x, y, z: topZ.current, zoom: 1 }]
    })
  }, [])

  const close = (key: number) => setWindows((prev) => prev.filter((w) => w.key !== key))
  const focus = (key: number) => {
    topZ.current += 1
    setWindows((prev) => prev.map((w) => (w.key === key ? { ...w, z: topZ.current } : w)))
  }
  const update = (key: number, patch: Partial<ViewerWindow>) =>
    setWindows((prev) => prev.map((w) => (w.key === key ? { ...w, ...patch } : w)))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setWindows((prev) => {
        if (!prev.length) return prev
        const top = prev.reduce((a, b) => (a.z > b.z ? a : b))
        return prev.filter((w) => w.key !== top.key)
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <ViewerContext.Provider value={{ openImage }}>
      {children}
      {windows.map((w) => (
        <PreviewWindow
          key={w.key}
          win={w}
          onClose={() => close(w.key)}
          onFocus={() => focus(w.key)}
          onChange={(patch) => update(w.key, patch)}
        />
      ))}
    </ViewerContext.Provider>
  )
}

export function useViewer() {
  const ctx = useContext(ViewerContext)
  if (!ctx) throw new Error('useViewer must be used inside ViewerProvider')
  return ctx
}

function PreviewWindow({
  win,
  onClose,
  onFocus,
  onChange,
}: {
  win: ViewerWindow
  onClose: () => void
  onFocus: () => void
  onChange: (patch: Partial<ViewerWindow>) => void
}) {
  const { t } = useI18n()
  const asset = IMAGES[win.image]
  const { w, h } = windowSize(win.image, win.zoom)
  const [loaded, setLoaded] = useState(false)
  const drag = useRef<{ dx: number; dy: number } | null>(null)

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    onFocus()
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return
    const x = Math.max(-w + 80, Math.min(window.innerWidth - 80, e.clientX - drag.current.dx))
    const y = Math.max(0, Math.min(window.innerHeight - TITLE_BAR, e.clientY - drag.current.dy))
    onChange({ x, y })
  }
  const onPointerUp = () => {
    drag.current = null
  }

  const setZoom = (zoom: number) => onChange({ zoom: Math.max(0.6, Math.min(2.2, zoom)) })

  return (
    <div
      role="dialog"
      aria-label={asset.filename}
      onPointerDown={onFocus}
      className="viewer-window fixed overflow-hidden rounded-[10px] bg-white"
      style={{ left: win.x, top: win.y, zIndex: win.z, width: w }}
    >
      <div
        className="relative flex h-[30px] cursor-grab touch-none select-none items-center border-b border-black/10 bg-gradient-to-b from-[#f6f6f6] to-[#e9e9e9] px-3 active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={() => setZoom(win.zoom === 1 ? 1.6 : 1)}
      >
        <div className="group flex items-center gap-[7px]">
          <button
            type="button"
            aria-label={t('common.close')}
            onClick={onClose}
            className="flex size-3 items-center justify-center rounded-full border border-[#e0443e] bg-[#ff5f57] text-[8px] leading-none text-[#8c1a10]"
          >
            <span className="opacity-0 group-hover:opacity-100">×</span>
          </button>
          <button
            type="button"
            aria-label="−"
            onClick={() => setZoom(win.zoom - 0.3)}
            className="flex size-3 items-center justify-center rounded-full border border-[#dea123] bg-[#febc2e] text-[8px] leading-none text-[#985712]"
          >
            <span className="opacity-0 group-hover:opacity-100">−</span>
          </button>
          <button
            type="button"
            aria-label="+"
            onClick={() => setZoom(win.zoom + 0.3)}
            className="flex size-3 items-center justify-center rounded-full border border-[#1aab29] bg-[#28c840] text-[8px] leading-none text-[#0b650d]"
          >
            <span className="opacity-0 group-hover:opacity-100">+</span>
          </button>
        </div>
        <div className="pointer-events-none absolute inset-x-20 truncate text-center text-[12px] font-medium text-black/70">
          {asset.filename}
        </div>
        <div className="ml-auto flex items-center gap-1 text-black/50">
          <button type="button" aria-label="Zoom out" onClick={() => setZoom(win.zoom - 0.2)} className="rounded p-0.5 hover:bg-black/5">
            <Minus className="size-3" />
          </button>
          <button type="button" aria-label="Zoom in" onClick={() => setZoom(win.zoom + 0.2)} className="rounded p-0.5 hover:bg-black/5">
            <Plus className="size-3" />
          </button>
        </div>
      </div>
      <div className="relative bg-[#f2f2f2]" style={{ height: h }}>
        {!loaded && <div className="absolute inset-0 animate-pulse bg-[#ececec]" />}
        <img
          src={cdn(asset.src, Math.min(1600, Math.round(w * 2)))}
          alt={win.caption ?? asset.filename}
          width={w}
          height={h}
          draggable={false}
          onLoad={() => setLoaded(true)}
          className={cn('block size-full object-contain transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0')}
        />
      </div>
      <div className="flex h-[26px] items-center justify-between gap-3 border-t border-black/10 bg-[#fafafa] px-3 font-mono text-[10px] uppercase tracking-wide text-black/45">
        <span className="truncate">{win.caption ?? '—'}</span>
        <span className="shrink-0">
          {asset.width}×{asset.height} · {Math.round(win.zoom * 100)}%
        </span>
      </div>
    </div>
  )
}
