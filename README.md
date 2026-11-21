# Barbecue Restaurant

Premium, bilingual (Persian RTL / English LTR) public restaurant showcase built with Next.js App Router, TypeScript and Tailwind CSS.

> **Source integrity:** The earlier v0.0.3 source ZIP was unavailable for direct recovery. This branch contains a **reconstruction** from the project specifications, not a byte-for-byte restoration. Please review the design before approving the PR.

## Development

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

Open http://localhost:3000.

## Structure

- `src/app/`: homepage and global styling
- `src/content/site.ts`: bilingual text content
- `src/config/media.ts`: single source of truth for media paths
- `src/components/`: image, logo and video components
- `public/images/`, `public/videos/`: your own media
- `docs/master-prompts/`: exact master prompt filenames
- `docs/MEDIA-FILES.md`: required asset inventory

Images use local fallback visuals until you supply the named files. Contact information and menu descriptions are placeholders, not verified restaurant facts.

## Branches and releases

Feature branches target `develop`. Merge to `main` and create `vX.Y.Z` tags only after approval. See `docs/REPOSITORY-WORKFLOW.md`.

## Publication checklist

- Supply licensed restaurant images and video.
- Confirm brand name, contact details, hours and menu.
- Update SEO metadata and remove `noindex` when ready to launch.
- Verify language switch, accessibility, mobile layout, video playback and production build.
