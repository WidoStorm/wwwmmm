import { IMAGES, type ImageId } from '@/content/fixtures'

/** Matches `[[image-id|visible text]]` citations inside Refs paragraphs. */
const CITATION = /\[\[([\w-]+)\|([^\]]+)\]\]/g

export type Segment = { kind: 'text'; text: string } | { kind: 'cite'; text: string; image: ImageId; index: number }

/** Split each paragraph into text and citation segments, numbering citations across the whole post. */
export function parseBody(paragraphs: string[]): Segment[][] {
  let index = 0
  return paragraphs.map((p) => {
    const out: Segment[] = []
    let last = 0
    for (const m of p.matchAll(CITATION)) {
      if (m.index > last) out.push({ kind: 'text', text: p.slice(last, m.index) })
      const image = m[1] as ImageId
      if (image in IMAGES) {
        index += 1
        out.push({ kind: 'cite', text: m[2], image, index })
      } else {
        out.push({ kind: 'text', text: m[2] })
      }
      last = m.index + m[0].length
    }
    if (last < p.length) out.push({ kind: 'text', text: p.slice(last) })
    return out
  })
}

export function countCitations(paragraphs: string[]) {
  return paragraphs.reduce((n, p) => n + [...p.matchAll(CITATION)].length, 0)
}
