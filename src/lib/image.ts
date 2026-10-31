/** Build a Netlify Image CDN URL so pages never ship full-resolution originals. */
export function cdn(src: string, width: number, opts: { height?: number; fit?: 'cover' | 'contain' } = {}) {
  const params = new URLSearchParams({ url: src, w: String(width), fm: 'webp' })
  if (opts.height) params.set('h', String(opts.height))
  if (opts.fit) params.set('fit', opts.fit)
  return `/.netlify/images?${params.toString()}`
}
