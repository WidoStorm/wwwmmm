import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { useViewer } from '@/components/site/viewer'
import { IMAGES, REFS } from '@/content/fixtures'
import { parseBody } from '@/lib/citations'
import { cdn } from '@/lib/image'
import { useI18n } from '@/lib/i18n'

export const Route = createFileRoute('/refs/$slug')({
  loader: ({ params }) => {
    const post = REFS.find((r) => r.slug === params.slug)
    if (!post) throw notFound()
    return { slug: post.slug }
  },
  head: ({ loaderData }) => {
    const post = REFS.find((r) => r.slug === loaderData?.slug)
    return { meta: [{ title: post ? `${post.title.es} — Refs — UNTITLED` : 'Refs — UNTITLED' }] }
  },
  component: RefPostPage,
})

const pad = (n: number) => String(n).padStart(2, '0')

function RefPostPage() {
  const { slug } = Route.useLoaderData()
  const post = REFS.find((r) => r.slug === slug)!
  const { t, pick, locale } = useI18n()
  const { openImage } = useViewer()

  const translated = locale !== 'es' ? post.body[locale] : undefined
  const paragraphs = parseBody(translated ?? post.body.es)
  const total = paragraphs.flat().filter((s) => s.kind === 'cite').length
  const idx = REFS.indexOf(post)
  const next = REFS[(idx + 1) % REFS.length]

  return (
    <article className="mx-auto max-w-[1440px] px-4 md:px-6">
      {/* Title block */}
      <header className="grid gap-6 border-b border-black/10 pt-12 pb-8 md:grid-cols-12 md:pt-16">
        <div className="label md:col-span-2">
          <Link to="/refs" className="hover:text-black">
            ← {t('nav.refs')}
          </Link>
        </div>
        <div className="md:col-span-7">
          <p className="label mb-4">
            {post.code} — {post.date.replaceAll('-', '.')}
          </p>
          <h1 className="text-4xl leading-[1.05] font-medium tracking-tight md:text-6xl">{pick(post.title)}</h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-black/60">{pick(post.excerpt)}</p>
        </div>
        <dl className="label grid h-fit grid-cols-[auto_1fr] gap-x-4 gap-y-1 md:col-span-3">
          <dt>title:</dt>
          <dd className="text-black">{post.slug}</dd>
          <dt>tags:</dt>
          <dd className="text-black">{post.tags.join(', ')}</dd>
          <dt>fig:</dt>
          <dd className="text-black">{pad(total)}</dd>
          <dt>lang:</dt>
          <dd className="text-black">{translated ? locale : 'es'}</dd>
        </dl>
      </header>

      {!translated && locale !== 'es' && (
        <p className="label border-b border-black/[0.06] py-2 md:pl-[16.66%]">{t('refs.translationNote')}</p>
      )}

      {/* Body: paragraph number · text · the figures cited in that paragraph */}
      <div className="py-6">
        {paragraphs.map((segments, pi) => {
          const cites = segments.filter((s) => s.kind === 'cite')
          return (
            <section key={pi} className="grid gap-4 py-6 md:grid-cols-12 md:gap-8">
              <div className="label pt-1 md:col-span-2">¶ {pad(pi + 1)}</div>
              <p className="text-[17px] leading-[1.75] md:col-span-6 md:text-[18px]">
                {segments.map((s, si) =>
                  s.kind === 'text' ? (
                    <span key={si}>{s.text}</span>
                  ) : (
                    <button
                      key={si}
                      type="button"
                      className="cite inline text-left"
                      onClick={(e) => openImage(s.image, e, `fig. ${pad(s.index)} — ${s.text}`)}
                    >
                      {s.text}
                      <sup className="ml-0.5 font-mono text-[10px] text-black/50">{pad(s.index)}</sup>
                    </button>
                  ),
                )}
              </p>
              <div className="flex flex-wrap items-start gap-3 md:col-span-4">
                {cites.map((c) => {
                  if (c.kind !== 'cite') return null
                  const asset = IMAGES[c.image]
                  const portrait = asset.height > asset.width
                  return (
                    <button
                      key={c.index}
                      type="button"
                      onClick={(e) => openImage(c.image, e, `fig. ${pad(c.index)} — ${c.text}`)}
                      className="group cursor-zoom-in text-left"
                      style={{ width: portrait ? '38%' : '58%' }}
                    >
                      <img
                        src={cdn(asset.src, 500)}
                        alt={c.text}
                        loading="lazy"
                        className="w-full bg-[#f3f3f3] transition-opacity group-hover:opacity-85"
                        style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
                      />
                      <span className="label mt-1 block truncate">
                        {pad(c.index)} · {asset.filename}
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {/* Spec card */}
      <footer className="grid gap-6 border-t border-black/10 pt-8 md:grid-cols-12">
        <div className="label md:col-span-2">end</div>
        <dl className="label grid grid-cols-[8rem_1fr] gap-y-1 md:col-span-6">
          <dt>archive id</dt>
          <dd className="text-black">{post.code}</dd>
          <dt>{t('refs.figures')}</dt>
          <dd className="text-black">{pad(total)}</dd>
          <dt>date</dt>
          <dd className="text-black">{post.date}</dd>
        </dl>
        {next && next.slug !== post.slug && (
          <div className="md:col-span-4 md:text-right">
            <Link to="/refs/$slug" params={{ slug: next.slug }} className="group">
              <span className="label">{next.code} →</span>
              <span className="mt-1 block text-[15px] group-hover:underline">{pick(next.title)}</span>
            </Link>
          </div>
        )}
      </footer>
    </article>
  )
}
