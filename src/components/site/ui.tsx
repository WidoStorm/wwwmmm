import { IMAGES, type ImageId } from '@/content/fixtures'
import { cdn } from '@/lib/image'
import { cn } from '@/lib/utils'
import { useViewer } from './viewer'

export function PageHeader({
  num,
  title,
  desc,
  meta,
  children,
}: {
  num: string
  title: string
  desc: string
  meta?: string
  children?: React.ReactNode
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 pt-12 md:px-6 md:pt-16">
      <div className="grid gap-6 border-b border-black/10 pb-6 md:grid-cols-12">
        <div className="label md:col-span-2">{num}</div>
        <div className="md:col-span-6">
          <h1 className="text-4xl font-medium tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-black/60">{desc}</p>
        </div>
        <div className="label flex items-end md:col-span-4 md:justify-end">{meta}</div>
      </div>
      {children}
    </section>
  )
}

/** Image thumbnail that opens the floating viewer on click. */
export function Thumb({
  image,
  caption,
  width = 600,
  className,
  imgClassName,
  aspect,
}: {
  image: ImageId
  caption?: string
  width?: number
  className?: string
  imgClassName?: string
  aspect?: string
}) {
  const { openImage } = useViewer()
  const asset = IMAGES[image]
  return (
    <button
      type="button"
      onClick={(e) => openImage(image, e, caption)}
      className={cn('group block w-full cursor-zoom-in overflow-hidden bg-[#f3f3f3] text-left', className)}
      style={{ aspectRatio: aspect ?? `${asset.width} / ${asset.height}` }}
    >
      <img
        src={cdn(asset.src, width)}
        alt={caption ?? asset.filename}
        loading="lazy"
        width={asset.width}
        height={asset.height}
        className={cn(
          'size-full object-cover transition duration-500 group-hover:scale-[1.02] group-hover:opacity-90',
          imgClassName,
        )}
      />
    </button>
  )
}

export function FilterBar<T extends string>({
  options,
  value,
  onChange,
  counts,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  counts?: Partial<Record<T, number>>
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            'flex items-baseline gap-1 transition-colors',
            value === o.value ? 'text-black' : 'text-black/40 hover:text-black',
          )}
        >
          <span className={cn(value === o.value && 'underline decoration-1 underline-offset-4')}>{o.label}</span>
          {counts?.[o.value] !== undefined && <sup className="label">{String(counts[o.value]).padStart(2, '0')}</sup>}
        </button>
      ))}
    </div>
  )
}
