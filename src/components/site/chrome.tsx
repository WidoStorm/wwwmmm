import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'

import { SITE } from '@/content/fixtures'
import { LOCALES, LOCALE_META, useI18n, type DictKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export const NAV: { to: '/gallery' | '/works' | '/archive' | '/refs'; key: DictKey; num: string }[] = [
  { to: '/gallery', key: 'nav.gallery', num: '001' },
  { to: '/works', key: 'nav.works', num: '002' },
  { to: '/archive', key: 'nav.archive', num: '003' },
  { to: '/refs', key: 'nav.refs', num: '004' },
]

function Clock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <span className="tabular-nums">
      {now
        ? `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} — ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
        : '----.--.-- — --:--:--'}
    </span>
  )
}

export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n()
  return (
    <div className={cn('flex items-center', className)} role="group" aria-label="Language">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="px-1 text-black/20">/</span>}
          <button
            type="button"
            title={LOCALE_META[l].native}
            aria-pressed={locale === l}
            onClick={() => setLocale(l)}
            className={cn(
              'px-0.5 transition-colors',
              locale === l ? 'text-black' : 'text-black/35 hover:text-black',
            )}
          >
            {LOCALE_META[l].short}
          </button>
        </span>
      ))}
    </div>
  )
}

export function SiteHeader() {
  const { t } = useI18n()
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-sm">
      <div className="label mx-auto flex h-8 max-w-[1440px] items-center justify-between gap-4 border-b border-black/[0.06] px-4 md:px-6">
        <span>[ {SITE.name}_ARCHIVE ]</span>
        <span className="hidden sm:block">
          <Clock />
        </span>
        <LanguageSwitch />
      </div>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-4 py-3 md:px-6">
        <Link to="/" className="text-[15px] font-semibold tracking-tight">
          {SITE.name}
          <sup className="label ml-1 align-super">©{SITE.since}</sup>
        </Link>
        <nav className="-mr-2 flex items-center gap-1 overflow-x-auto sm:gap-4">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="group flex shrink-0 items-baseline gap-1.5 px-2 py-1 text-[13px] text-black/55 transition-colors hover:text-black"
              activeProps={{ className: '!text-black' }}
            >
              {({ isActive }) => (
                <>
                  <span className={cn('label hidden md:inline', isActive && '!text-black')}>{n.num}</span>
                  <span className={cn(isActive && 'underline decoration-1 underline-offset-4')}>{t(n.key)}</span>
                </>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  const { t } = useI18n()
  return (
    <footer className="mt-24 border-t border-black/10">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <div>
          <p className="label mb-2">{t('footer.contact')}</p>
          <a href={`mailto:${SITE.email}`} className="text-[13px] hover:underline">
            {SITE.email} →
          </a>
        </div>
        <div>
          <p className="label mb-2">Index</p>
          <ul className="space-y-1 text-[13px]">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-black/60 hover:text-black">
                  <span className="label mr-2">{n.num}</span>
                  {t(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-2">Elsewhere</p>
          <ul className="space-y-1 text-[13px] text-black/60">
            <li>Instagram ↗</li>
            <li>X / Twitter ↗</li>
            <li>Behance ↗</li>
          </ul>
        </div>
        <div className="md:text-right">
          <p className="text-[13px] tracking-[0.2em] text-black/60">{t('footer.note')}</p>
          <p className="label mt-6">© {new Date().getFullYear()} {SITE.name} — {SITE.handle}</p>
        </div>
      </div>
    </footer>
  )
}
