import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { FilterBar, PageHeader, Thumb } from '@/components/site/ui'
import { useViewer } from '@/components/site/viewer'
import { ART_TYPES, GALLERY, IMAGES, type ArtType } from '@/content/fixtures'
import { cdn } from '@/lib/image'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/gallery')({
  head: () => ({ meta: [{ title: 'Galería — UNTITLED' }] }),
  component: GalleryPage,
})

type Filter = ArtType | 'all'

function GalleryPage() {
  const { t, pick } = useI18n()
  const { openImage } = useViewer()
  const [filter, setFilter] = useState<Filter>('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const items = filter === 'all' ? GALLERY : GALLERY.filter((g) => g.type === filter)
  const counts = Object.fromEntries([
    ['all', GALLERY.length],
    ...ART_TYPES.map((type) => [type, GALLERY.filter((g) => g.type === type).length]),
  ]) as Record<Filter, number>

  return (
    <>
      <PageHeader num="001" title={t('nav.gallery')} desc={t('gallery.desc')} meta={`${items.length} / ${GALLERY.length}`}>
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <FilterBar<Filter>
            value={filter}
            onChange={setFilter}
            counts={counts}
            options={[{ value: 'all', label: t('common.all') }, ...ART_TYPES.map((type) => ({ value: type, label: t(`type.${type}`) }))]}
          />
          <FilterBar
            value={view}
            onChange={setView}
            options={[
              { value: 'grid', label: t('common.grid') },
              { value: 'list', label: t('common.list') },
            ]}
          />
        </div>
      </PageHeader>

      <section className="mx-auto max-w-[1440px] px-4 pt-4 md:px-6">
        {items.length === 0 && <p className="py-20 text-center text-[13px] text-black/40">{t('common.empty')}</p>}

        {view === 'grid' ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {items.map((g) => (
              <figure key={g.id} className={cn(g.type === 'header' || g.type === 'visual' ? 'col-span-2' : '')}>
                <Thumb image={g.image} caption={`${g.code} — ${pick(g.title)}`} width={g.type === 'header' || g.type === 'visual' ? 1000 : 600} />
                <figcaption className="mt-2 grid grid-cols-[1fr_auto] gap-x-2 text-[12px]">
                  <span className="truncate">{pick(g.title)}</span>
                  <span className="label">{g.year}</span>
                  <span className="label truncate">
                    {g.code} · {t(`type.${g.type}`)}
                  </span>
                  <span className="label">
                    {IMAGES[g.image].width}×{IMAGES[g.image].height}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="border-t border-black/10">
            <div className="label hidden grid-cols-[3.5rem_6rem_1fr_10rem_12rem_6rem] gap-4 border-b border-black/10 py-2 md:grid">
              <span />
              <span>No.</span>
              <span>{t('common.title')}</span>
              <span>{t('common.type')}</span>
              <span>Medium</span>
              <span className="text-right">{t('common.year')}</span>
            </div>
            {items.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={(e) => openImage(g.image, e, `${g.code} — ${pick(g.title)}`)}
                className="grid w-full grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-b border-black/[0.06] py-2 text-left text-[13px] transition-colors hover:bg-black/[0.02] md:grid-cols-[3.5rem_6rem_1fr_10rem_12rem_6rem]"
              >
                <img src={cdn(IMAGES[g.image].src, 120, { height: 120, fit: 'cover' })} alt="" className="size-14 object-cover" loading="lazy" />
                <span className="label hidden md:block">{g.code}</span>
                <span className="truncate">{pick(g.title)}</span>
                <span className="hidden text-black/55 md:block">{t(`type.${g.type}`)}</span>
                <span className="hidden truncate text-black/55 md:block">{pick(g.medium)}</span>
                <span className="label text-right">{g.year}</span>
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
