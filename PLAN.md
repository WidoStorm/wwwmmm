# Roadmap

## ✅ Milestone 1 — Product surface
White, archive-style site with Index, Galería (type filter, grid/list), Works (spec cards), Archivo (status filter, expandable process rows), Refs (list + post with clickable citations), floating macOS-style image viewer, five-language UI. All content stubbed in `src/content/fixtures.ts`.

## Milestone 2 — Identity & copy
- Confirm the artist's name, handle, email and social links; replace the `UNTITLED` placeholder.
- Final list of gallery types (portadas, headers, …) and archive statuses.
- Favicon / OG image.

## Milestone 3 — Data model & storage
- Netlify Database (Drizzle) tables: `images`, `gallery_items`, `works`, `archive_entries` (+ images join), `refs_posts`, with per-locale text columns or a translations table.
- Netlify Blobs for uploaded image files, served through Image CDN.
- Replace fixture imports with route loaders / server functions; keep the same shapes.

## Milestone 4 — Admin (artist only)
- Netlify Identity login restricted to the owner.
- `/admin`: upload images (drag & drop, auto width/height), create/edit gallery items, works, archive entries.
- Refs editor with a citation picker that inserts `[[image|text]]` and live preview.

## Milestone 5 — Translations
- Per-field translation inputs in the admin for en / ja / ko / zh.
- Optional "suggest translation" with Netlify AI Gateway, always editable before saving.
- Locale in URL (`/en/gallery`) for shareable links and SEO, `hreflang` tags.

## Milestone 6 — Polish
- Detail pages / deep links for gallery pieces (`/gallery/:code`) that open the viewer.
- Keyboard navigation between viewer windows, mobile viewer as a sheet.
- Performance pass, sitemap, analytics.
