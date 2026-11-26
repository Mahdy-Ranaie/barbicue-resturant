# Prompt07 Gallery implementation and validation

- **Milestone** v0.0.6
- **Branch** `feature/v0.0.6-gallery-page`
- **Base** `d3bb4f3` on `origin/develop`, following the approved v0.0.5 integration in [PR #2](https://github.com/Mahdy-Ranaie/barbicue-resturant/pull/2)
- **Requirement** [REQ-007](../requirements/REQ-007-Gallery-page.md)

## Implementation and architecture

The original static homepage now links to a dedicated `/gallery` route through the desktop and mobile menus, the Gallery preview title, and **View Full Gallery**. The preview shows featured thumbnails from the centralized registry. The Gallery grid uses the same visible, ordered items and displays captions where available. Homepage anchors and a localized home link provide navigation back.

The App Router root layout now renders the shared header and footer around the page, with a client-side locale provider. Persian RTL remains the initial document language. Client-side navigation and the browser Back action retain the selected locale. The preview indexing restrictions are inherited by the Gallery. The site remains a static public showcase.

The Gallery viewer uses the native modal dialog. It requests only the selected standard-resolution file, preserves image aspect ratio, and offers fit and actual-size modes. Captions, image count, loading and error text, visible controls, and direction-aware arrow navigation are localized. The dialog handles Escape, focus restoration, and scroll locking. The thumbnail placeholder has a terminal state if its own file fails. Standard-image failure leaves a localized message and the navigation controls.

## Changed files

| Area | Files |
| --- | --- |
| Shared layout | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/components/LocaleProvider.tsx`, `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx` |
| Gallery and media | `src/app/gallery/page.tsx`, `GalleryContent.tsx`, `GalleryLightbox.tsx`, `gallery.module.css`, `src/components/MediaImage.tsx`, `src/config/media.ts`, `src/content/site.ts`, paired media directory markers |
| Tests | `tests/e2e/gallery.spec.ts`, `tests/e2e/homepage.spec.ts`, `tests/e2e/site-fixtures.ts` |
| Milestone and scope | `package.json`, `package-lock.json`, `config/repository.yml`, `AGENTS.md`, `README.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `CHANGELOG.md`, `docs/MEDIA-FILES.md`, `docs/requirements/REQ-007-Gallery-page.md` |
| Prompt archive | Appended versioned updates to Prompts 01, 03, and 04, and added `docs/master-prompts/Prompt07-Gallery-page.docx` |
| Evidence | This report |

The package manifest and lockfile have the v0.0.6 version with the existing dependency versions. No additional UI library was required.

## Gallery media and configuration

```text
public/images/gallery/
  thumbnails/gallery-01.webp
  standard/gallery-01.webp
```

The initial registry uses matching names for `gallery-01` through `gallery-03`. Add an item in `src/config/media.ts` with its stable ID, thumbnail and standard paths, localized titles and descriptive alt text, optional descriptions, order, visibility, and featured flag. Include actual width and height when available. The Gallery route and homepage preview read the registry directly. The standard path can point to either WebP or JPEG. [Full asset instructions](../MEDIA-FILES.md#gallery-image-pairs)

Use approximately 480 × 360 WebP thumbnails and a standard long edge of approximately 1920 px for new derivatives. Preserve the original aspect ratio, correct orientation, and avoid upscaling. Existing approved standard images may retain larger dimensions.

## Validation

| Check | Result |
| --- | --- |
| `npm ci --no-audit --no-fund --fetch-retries=0` | Passed on the v0.0.6 lockfile. Installed 363 packages. |
| `npm run lint` | Passed after fixing the initial lint warnings. |
| `npm run typecheck` | Passed with Next.js generated route declarations. |
| `npm run build` | Passed. Both `/` and `/gallery` were prerendered. |
| Playwright | All 15 tests passed against the production build in 18.5 seconds, including eight Gallery tests and seven homepage regressions. |
| DOCX archive | All seven files opened with `python-docx`. ZIP integrity passed. The historical document XML and other ZIP parts were preserved in Prompts 01, 03, and 04. Prompts 02, 05, and 06 stayed byte-identical. |

**Desktop and mobile results.** Playwright verified 1, 2, 3, and 4 Gallery columns at 320, 768, 1024, and 1440 px. Both languages fit a narrow mobile viewport without horizontal page overflow. The mobile menu returned focus on Escape, and the viewer remained operable in portrait and landscape. Network assertions verified that neither grid requested standard images and that opening a thumbnail requested its matching standard image. The tests verified aspect ratio, actual-size dimensions, both arrow directions, restored focus and scroll, and recovery from missing files.

Local checks ran with Node.js 22.15.0, npm 10.9.2, and headless Chrome on Windows with controlled image fixtures. The first browser run exposed two assertions that expected relative image URLs. Comparing URL pathnames fixed both assertions. Next.js reports both lockfiles because the feature worktree is nested under the existing checkout. The worktree warning does not affect production prerendering. GitHub CI verification of the feature branch is separate.

## Remaining media and limitations

- The four JPEG originals and the restaurant video remain in the existing checkout. They were excluded from this feature worktree. Publication still needs approved photo pairs and meaningful Persian and English descriptions. The viewer and browsing paths use local fallback UI until the assets arrive.
- Existing tests verify the browser behavior with controlled assets. Final media quality, final video playback, and Safari and Firefox behavior still need publication review.
- The first page load starts in Persian RTL. The locale persists during in-app navigation and browser Back. A full reload starts a new visit in Persian.
