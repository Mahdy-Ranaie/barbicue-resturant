# REQ-007 Gallery page and dual-size image management

- **Requirement ID** REQ-007
- **Target version** v0.0.6
- **Approval status** Implementation approved after the Prompt07 plan. v0.0.5 was integrated through PR #2 before work started.
- **Implementation status** Implemented on the Gallery feature branch. See the implementation report for verified checks, pending assets, and limitations.

## Objective

Extend the static restaurant showcase with a dedicated Gallery and retain the homepage preview. Use small thumbnail files for browsing and fetch standard-resolution assets only when requested.

## Functional requirements

- Provide `/gallery` with the shared header and footer, localized title, responsive grid, captions where available, image viewer, and a link home.
- Link from both device navigation modes, the homepage Gallery heading, and the localized **View Full Gallery** action. Homepage section links must work from the Gallery page.
- Show only visible items in configured order and only featured thumbnails in the homepage preview. Each item includes an ID, two image paths, bilingual title and alt text, optional bilingual descriptions, order, visibility, featured status, and dimensions where available.
- Show the selected standard-resolution image with a localized title or caption and count. Provide Previous, Next, Close, Escape, direction-aware arrow keys, and actual-size and fit modes.
- Display localized loading and error states and retain usability with unavailable media. Keep focus in the modal while open, restore the triggering button on close, and suspend background scroll.

## Technical requirements

- Use Next.js App Router, the shared layout, and the centralized registry in `src/config/media.ts`. Keep the scope static, without an application backend, database, or administration panel.
- Pair matching basenames in `public/images/gallery/thumbnails/` and `public/images/gallery/standard/`. Prepare WebP thumbnails up to approximately 480 × 360 and WebP or JPEG standard files with a typical long edge up to 1920 px. Respect source orientation and aspect ratio for the standard file. Retain owner-approved larger standard dimensions where applicable and avoid upscaling.
- Use reserved aspect ratios and lazy loading for thumbnails. Keep standard-resolution images outside the initial page requests. Handle missing files without broken images, repeated fallback failures, or unauthorized external media.
- Preserve the existing noindex preview behavior. Apply the requirements register and master-prompt synchronization workflow.

## UI/UX requirements

- Preserve the existing premium barbecue visual system and homepage preview. Use 4, 3, 2, or 1 columns as screen width narrows. Keep controls touch-friendly and keyboard accessible in portrait and landscape. Provide visible focus and respect reduced motion.
- Default to Persian RTL for a new visit. Preserve the selected language across in-app navigation, including the browser Back action. Translate the controls, status text, captions, and accessible names.
- Keep the viewer image proportional in fit and actual-size modes. Confine zoomed-image scrolling to the viewer.

## Affected components and files

- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/app/gallery/`.
- `src/components/LocaleProvider.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`, and `MediaImage.tsx`.
- `src/config/media.ts`, `src/content/site.ts`, and the paired directories under `public/images/gallery/`.
- `tests/e2e/`, the requirements and repository standards, media inventory, README, roadmap, changelog, and master prompt archive.

## Acceptance criteria

| Criterion | Verification |
| --- | --- |
| Gallery route and all entry points, plus homepage links from Gallery | Production Playwright route and navigation checks |
| Correct thumbnail pairing, selection, visibility, ordering, and no initial standard downloads | Central registry review and Playwright request monitoring |
| Viewer caption, count, fit and actual-size modes, and navigation | Playwright fixture tests for both directions |
| Dialog keyboard controls, focus, scroll locking, and error states | Playwright interaction tests |
| Persian and English, mobile menu, overflow, portrait and landscape | Playwright viewport coverage |
| Clean install, lint, type checks, build, and browser regression suite | [Implementation and validation report](../reports/PROMPT07-GALLERY-IMPLEMENTATION-REPORT.md) |
| Approved restaurant media, dimensions and localized descriptions | Pending approved production assets |

## Related master prompt documents

- [Prompt01-Project-initialization.docx](../master-prompts/Prompt01-Project-initialization.docx)
- [Prompt03-Homepage.docx](../master-prompts/Prompt03-Homepage.docx)
- [Prompt04-Media-management.docx](../master-prompts/Prompt04-Media-management.docx)
- [Prompt07-Gallery-page.docx](../master-prompts/Prompt07-Gallery-page.docx)
