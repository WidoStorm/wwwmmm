import { createFileRoute } from '@tanstack/react-router'

import { PageHeader, Thumb } from '@/components/site/ui'
import { WORKS } from '@/content/fixtures'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/works')({
  head: () => ({ meta: [{ title: 'Works — UNTITLED' }] }),
  component: WorksPage,
})

function WorksPage() {
  const { t, pick } = useI18n()

  return (
    <>
      <PageHeader num="002" title={t('nav.works')} desc={t('works.desc')} meta={`${WORKS.length} ${t('home.entries')}`} />

      <section className="mx-auto max-w-[1440px] px-4 md:px-6">
        {WORKS.map((w, i) => {
          const wide = w.image.startsWith('live') || w.image.startsWith('header')
          return (
            <article key={w.id} className="grid gap-6 border-b border-black/10 py-10 md:grid-cols-12 md:gap-8">
              <div className="label md:col-span-2">
                {w.code}
                <br />
                {String(i + 1).padStart(2, '0')} / {String(WORKS.length).padStart(2, '0')}
              </div>

              <div className={cn(wide ? 'md:col-span-6' : 'md:col-span-4')}>
                <Thumb image={w.image} caption={`${w.code} — ${pick(w.title)}`} width={wide ? 1100 : 800} />
              </div>

              <div className={cn('flex flex-col', wide ? 'md:col-span-4' : 'md:col-span-6')}>
                <h2 className="text-2xl font-medium tracking-tight md:text-3xl">{pick(w.title)}</h2>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-black/60">{pick(w.note)}</p>

                <dl className="mt-6 grid max-w-md grid-cols-[8rem_1fr] border-t border-black/10 text-[12px]">
                  <Spec label={t('works.client')} value={w.client} />
                  <Spec label={t('works.role')} value={pick(w.role)} />
                  <Spec label={t('works.usedOn')} value={w.usedOn} />
                  <Spec label={t('common.year')} value={String(w.year)} />
                </dl>

                {w.link && (
                  <a href={w.link} target="_blank" rel="noreferrer" className="label mt-4 inline-block hover:text-black">
                    ↗ {w.usedOn.split(' / ')[0]}
                  </a>
                )}
              </div>
            </article>
          )
        })}
      </section>
    </>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="label border-b border-black/[0.06] py-2">{label}</dt>
      <dd className="border-b border-black/[0.06] py-2">{value}</dd>
    </>
  )
}
