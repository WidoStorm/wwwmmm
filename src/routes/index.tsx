import { createFileRoute, Link } from '@tanstack/react-router'

import { NAV } from '@/components/site/chrome'
import { Thumb } from '@/components/site/ui'
import { ARCHIVE, GALLERY, REFS, SITE, WORKS, type ImageId } from '@/content/fixtures'
import { useI18n, type DictKey } from '@/lib/i18n'

export const Route = createFileRoute('/')({
  component: Home,
})

const SECTION_DATA: Record<(typeof NAV)[number]['to'], { desc: DictKey; count: number; images: ImageId[] }> = {
  '/gallery': { desc: 'home.gallery', count: GALLERY.length, images: GALLERY.slice(0, 4).map((g) => g.image) },
  '/works': { desc: 'home.works', count: WORKS.length, images: WORKS.slice(0, 4).map((w) => w.image) },
  '/archive': { desc: 'home.archive', count: ARCHIVE.length, images: ARCHIVE.slice(0, 4).map((a) => a.images[0]) },
  '/refs': { desc: 'home.refs', count: REFS.length, images: REFS.map((r) => r.cover) },
}

function Home() {
  const { t, pick } = useI18n()

  const latest = [
    ...GALLERY.slice(0, 2).map((g) => ({ code: g.code, title: pick(g.title), section: t('nav.gallery'), to: '/gallery' as const, year: String(g.year) })),
    ...WORKS.slice(0, 2).map((w) => ({ code: w.code, title: pick(w.title), section: t('nav.works'), to: '/works' as const, year: String(w.year) })),
    ...ARCHIVE.slice(0, 1).map((a) => ({ code: a.code, title: pick(a.title), section: t('nav.archive'), to: '/archive' as const, year: a.date })),
    ...REFS.slice(0, 1).map((r) => ({ code: r.code, title: pick(r.title), section: t('nav.refs'), to: '/refs' as const, year: r.date })),
  ]

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-6">
      {/* Hero */}
      <section className="grid gap-8 border-b border-black/10 pt-14 pb-12 md:grid-cols-12 md:pt-24">
        <div className="label md:col-span-2">
          000
          <br />
          {SITE.handle}
        </div>
        <div className="md:col-span-7">
          <h1 className="text-[clamp(3rem,9vw,8.5rem)] leading-[0.88] font-medium tracking-[-0.04em]">
            {SITE.name}
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-black/70">{t('home.statement')}</p>
        </div>
        <div className="flex flex-col justify-end gap-1 md:col-span-3 md:items-end">
          <dl className="label grid grid-cols-[auto_auto] gap-x-4 gap-y-1 md:text-right">
            <dt>Est.</dt>
            <dd className="text-black">{SITE.since}</dd>
            <dt>Entries</dt>
            <dd className="text-black">{GALLERY.length + WORKS.length + ARCHIVE.length + REFS.length}</dd>
            <dt>Lang</dt>
            <dd className="text-black">ES EN JA KO ZH</dd>
          </dl>
        </div>
      </section>

      {/* Section index */}
      <section>
        {NAV.map((n) => {
          const data = SECTION_DATA[n.to]
          return (
            <div key={n.to} className="grid gap-4 border-b border-black/10 py-6 md:grid-cols-12 md:items-center">
              <div className="label md:col-span-2">{n.num}</div>
              <div className="md:col-span-4">
                <Link to={n.to} className="group inline-flex items-baseline gap-3">
                  <h2 className="text-3xl font-medium tracking-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[6px] md:text-4xl">
                    {t(n.key)}
                  </h2>
                  <span className="label">
                    ({String(data.count).padStart(2, '0')})
                  </span>
                </Link>
                <p className="mt-2 text-[13px] text-black/55">{t(data.desc)}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 md:col-span-5">
                {data.images.slice(0, 4).map((img, i) => (
                  <Thumb key={`${img}-${i}`} image={img} width={240} aspect="1 / 1" />
                ))}
              </div>
              <div className="md:col-span-1 md:text-right">
                <Link to={n.to} className="label hover:text-black">
                  {t('common.viewAll')} →
                </Link>
              </div>
            </div>
          )
        })}
      </section>

      {/* Latest */}
      <section className="pt-14">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="label">{t('home.latest')}</h2>
          <span className="label">{latest.length} {t('home.entries')}</span>
        </div>
        <ul className="border-t border-black/10">
          {latest.map((l) => (
            <li key={l.code}>
              <Link
                to={l.to}
                className="grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-4 border-b border-black/[0.06] py-2.5 text-[13px] transition-colors hover:bg-black/[0.02] md:grid-cols-[6rem_1fr_10rem_8rem]"
              >
                <span className="label">{l.code}</span>
                <span className="truncate">{l.title}</span>
                <span className="hidden text-black/45 md:block">{l.section}</span>
                <span className="label text-right">{l.year}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
