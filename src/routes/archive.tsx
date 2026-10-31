import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { FilterBar, PageHeader, Thumb } from '@/components/site/ui'
import { ARCHIVE, ARCHIVE_STATUSES, type ArchiveStatus } from '@/content/fixtures'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/archive')({
  head: () => ({ meta: [{ title: 'Archivo — UNTITLED' }] }),
  component: ArchivePage,
})

type Filter = ArchiveStatus | 'all'

const STATUS_DOT: Record<ArchiveStatus, string> = {
  published: 'bg-black',
  unpublished: 'border border-black bg-white',
  archived: 'bg-black/20',
}

function ArchivePage() {
  const { t, pick } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<string | null>(ARCHIVE[0]?.id ?? null)

  const items = filter === 'all' ? ARCHIVE : ARCHIVE.filter((a) => a.status === filter)
  const counts = Object.fromEntries([
    ['all', ARCHIVE.length],
    ...ARCHIVE_STATUSES.map((s) => [s, ARCHIVE.filter((a) => a.status === s).length]),
  ]) as Record<Filter, number>

  return (
    <>
      <PageHeader num="003" title={t('nav.archive')} desc={t('archive.desc')} meta={`${items.length} / ${ARCHIVE.length}`}>
        <div className="py-4">
          <FilterBar<Filter>
            value={filter}
            onChange={setFilter}
            counts={counts}
            options={[{ value: 'all', label: t('common.all') }, ...ARCHIVE_STATUSES.map((s) => ({ value: s, label: t(`status.${s}`) }))]}
          />
        </div>
      </PageHeader>

      <section className="mx-auto max-w-[1440px] px-4 md:px-6">
        <div className="label hidden grid-cols-[6rem_7rem_1fr_10rem_6rem] gap-4 border-b border-black/10 py-2 md:grid">
          <span>No.</span>
          <span>Date</span>
          <span>{t('common.title')}</span>
          <span>{t('common.status')}</span>
          <span className="text-right">{t('archive.files')}</span>
        </div>

        {items.length === 0 && <p className="py-20 text-center text-[13px] text-black/40">{t('common.empty')}</p>}

        {items.map((a) => {
          const isOpen = open === a.id
          return (
            <div key={a.id} className="border-b border-black/10">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : a.id)}
                className="grid w-full grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-3 text-left text-[13px] transition-colors hover:bg-black/[0.02] md:grid-cols-[6rem_7rem_1fr_10rem_6rem]"
              >
                <span className="label">{a.code}</span>
                <span className="label text-right md:text-left">{a.date.replaceAll('-', '.')}</span>
                <span className="col-span-2 md:col-span-1">
                  <span className="mr-2 inline-block w-3 text-black/40">{isOpen ? '−' : '+'}</span>
                  {pick(a.title)}
                </span>
                <span className="flex items-center gap-2 text-black/60">
                  <span className={cn('size-2 rounded-full', STATUS_DOT[a.status])} />
                  {t(`status.${a.status}`)}
                </span>
                <span className="label text-right">{String(a.images.length).padStart(2, '0')}</span>
              </button>

              {isOpen && (
                <div className="grid gap-6 pt-2 pb-8 md:grid-cols-[13rem_1fr_16rem] md:gap-4">
                  <div className="label hidden md:block">
                    {a.tags.map((tag) => (
                      <div key={tag}>#{tag}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {a.images.map((img, i) => (
                      <figure key={img}>
                        <Thumb image={img} caption={`${a.code} — ${String(i + 1).padStart(2, '0')}`} width={500} aspect="4 / 3" />
                        <figcaption className="label mt-1">
                          {a.code}.{String(i + 1).padStart(2, '0')}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                  <p className="text-[13px] leading-relaxed text-black/60">{pick(a.note)}</p>
                </div>
              )}
            </div>
          )
        })}

        <div className="label mt-6 flex flex-wrap gap-6">
          {ARCHIVE_STATUSES.map((s) => (
            <span key={s} className="flex items-center gap-2">
              <span className={cn('size-2 rounded-full', STATUS_DOT[s])} />
              {t(`status.${s}`)}
            </span>
          ))}
        </div>
      </section>
    </>
  )
}
