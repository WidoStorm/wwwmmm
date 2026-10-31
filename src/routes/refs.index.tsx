import { createFileRoute, Link } from '@tanstack/react-router'

import { PageHeader } from '@/components/site/ui'
import { IMAGES, REFS } from '@/content/fixtures'
import { cdn } from '@/lib/image'
import { useI18n } from '@/lib/i18n'
import { countCitations } from '@/lib/citations'

export const Route = createFileRoute('/refs/')({
  head: () => ({ meta: [{ title: 'Refs — UNTITLED' }] }),
  component: RefsPage,
})

function RefsPage() {
  const { t, pick } = useI18n()

  return (
    <>
      <PageHeader num="004" title={t('nav.refs')} desc={t('refs.desc')} meta={`${REFS.length} ${t('home.entries')}`} />

      <section className="mx-auto max-w-[1440px] px-4 md:px-6">
        {REFS.map((r) => (
          <Link
            key={r.slug}
            to="/refs/$slug"
            params={{ slug: r.slug }}
            className="group grid gap-4 border-b border-black/10 py-8 md:grid-cols-12 md:gap-8"
          >
            <div className="label md:col-span-2">
              {r.code}
              <br />
              {r.date.replaceAll('-', '.')}
            </div>
            <div className="md:col-span-6">
              <h2 className="text-2xl font-medium tracking-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[5px] md:text-3xl">
                {pick(r.title)}
              </h2>
              <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-black/60">{pick(r.excerpt)}</p>
              <p className="label mt-4">
                {r.tags.map((tag) => `#${tag}`).join('  ')} · {countCitations(r.body.es)} {t('refs.figures')} · {t('refs.read')} →
              </p>
            </div>
            <div className="md:col-span-4">
              <img
                src={cdn(IMAGES[r.cover].src, 700)}
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full bg-[#f3f3f3] object-cover transition-opacity group-hover:opacity-90"
              />
            </div>
          </Link>
        ))}
      </section>
    </>
  )
}
