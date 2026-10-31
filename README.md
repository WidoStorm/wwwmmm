# UNTITLED — art archive

A minimal, white, archive-style portfolio for an illustrator / cover artist. It has four sections and a five-language interface (Español, English, 日本語, 한국어, 中文):

- **Galería** — all artwork, filterable by type (covers, headers, illustration, visuals, posters), in grid or list view.
- **Works** — pieces used in the real world (Spotify covers, concert visuals, vinyl…), each with a spec card.
- **Archivo** — design processes marked as published, unpublished or archive-only.
- **Refs** — short posts about things that caught the artist's eye. Cited words open the image in a floating, draggable macOS Preview-style window.

## Tech

TanStack Start (React 19, TanStack Router) · Tailwind CSS 4 · Netlify Image CDN · deployed on Netlify.

Content currently lives in `src/content/fixtures.ts` (sample data and AI-generated placeholder artwork in `public/img/`).

## Run locally

```bash
pnpm install
netlify dev   # or: pnpm dev
```

## Roadmap

See [PLAN.md](PLAN.md). Next up: storing content in Netlify Database + Netlify Blobs, a private admin area to upload art and write Refs posts, and per-language translations of content.
