# Barbecue Restaurant requirements

The [GitHub repository](https://github.com/Mahdy-Ranaie/barbicue-resturant) is the single source of truth for application code, approved development requirements, master prompts, and implementation history. This register consolidates the approved baseline from the six master prompts. The Word documents preserve the full requirements and dated updates. [Individual specifications](docs/requirements/) record version-specific scope and approvals. [ROADMAP.md](ROADMAP.md), [CHANGELOG.md](CHANGELOG.md), [implementation reports](docs/reports/), and pull requests record delivery and verification.

## Product scope and architecture

- The application is a public-facing, single-page restaurant showcase for the restaurant, food, story, activities, services, gallery, video, and contact information. Public visitors can browse without an account. Login, authentication, authorization, administration, backend services, databases, online ordering, online reservations, and payments are outside scope.
- Use Next.js App Router, React, TypeScript, Tailwind CSS, and ESLint. Keep the homepage in `src/app/page.tsx`, root layout in `src/app/layout.tsx`, shared styles in `src/app/globals.css`, bilingual content in `src/content/site.ts`, and media URLs in `src/config/media.ts`.
- Support Persian as the primary and default language with RTL direction. English is secondary and uses LTR. Use the same components for both languages. Switching languages updates document `lang` and `dir`.
- Preserve the nine homepage areas: header and navigation, hero, about and story, menu showcase, services and activities, gallery, video showcase, contact and location, and footer.
- Use illustrative menu items and clearly identified contact placeholders until the owner approves the final menu, address, phone, and hours. Never invent verified contact information or prices. Retain preview `noindex` until verified business data is available and publication is approved.

[Prompt01](docs/master-prompts/Prompt01-Project-initialization.docx) · [Prompt03](docs/master-prompts/Prompt03-Homepage.docx)

## Design, accessibility, and media

- Use the Red Hot & Blue reference for section hierarchy and restaurant-site UX inspiration only. Do not copy its branding, imagery, logos, text, copyrighted assets, or complete page design.
- Follow the premium barbecue design direction: deep charcoal, warm gold accents, refined spacing, dramatic media, confident typography, and restrained motion. Use a header over a full-bleed hero, editorial story layout, three-column menu cards, three service panels, and an asymmetric gallery at appropriate widths. Support desktop, tablet, and mobile layouts.
- Use semantic section IDs and headings, accessible interactions and contrast, visible keyboard focus, reduced-motion support, meaningful localized alt text, responsive image sizes, and metadata. Verify at common widths, including Persian wrapping, English typography, focus, image loading, performance, and SEO.
- Keep local WebP or SVG images under `public/images/` and H.264 MP4 video and poster under `public/videos/`. Use root-relative public URLs. Prefer optimized media and use owner-supplied or licensed assets.
- `BrandMark.tsx` provides the logo and brand text fallback. `MediaImage.tsx` uses Next Image, responsive `sizes`, and `public/images/placeholders/media-placeholder.svg` for missing photos. `RestaurantVideo.tsx` provides a native MP4 player with controls, inline playback, metadata preload, a poster, and an informative missing-video fallback. Verify rendering and playback with final assets.
- Preserve the exact paths below. Approved changes to filenames require coordinated updates to the registry, media inventory, and Prompt04.

| Use | Canonical path |
| --- | --- |
| Logo | `public/images/branding/logo.svg` |
| Hero | `public/images/hero/hero-main.webp` |
| Story | `public/images/about/restaurant-story.webp` |
| Menu | `public/images/menu/brisket.webp`, `public/images/menu/chicken.webp`, `public/images/menu/burger.webp` |
| Gallery | `public/images/gallery/gallery-01.webp`, `public/images/gallery/gallery-02.webp`, `public/images/gallery/gallery-03.webp` |
| Video and poster | `public/videos/restaurant-intro.mp4`, `public/videos/restaurant-poster.webp` |

[Prompt02](docs/master-prompts/Prompt02-Reference-design.docx) · [Prompt03](docs/master-prompts/Prompt03-Homepage.docx) · [Prompt04](docs/master-prompts/Prompt04-Media-management.docx) · [Media inventory](docs/MEDIA-FILES.md)

## Development and verification

- Maintain root `AGENTS.md` and portable VS Code settings and recommendations for TypeScript, ESLint, Tailwind CSS, and formatting. Keep credentials, personal settings, and machine-specific paths out of Git.
- Use Node.js 22, retain the ESLint migration and lockfile, and install with `npm ci`. Review compatibility and audit production and development dependencies. Apply targeted compatible fixes, avoid unnecessary major upgrades, and report unresolved findings.
- Generate Next.js route declarations before TypeScript checks. Treat `next-env.d.ts` as generated. Preserve existing local changes and review removal of its tracked copy separately.
- Run `npm ci`, lint, TypeScript checks, the production build, and Playwright. In GitHub Actions, install Chromium and its system dependencies, run tests against the production build, and retain failure diagnostics. Inspect CI and resolve or disclose failures before merge. A failed or unverified acceptance criterion cannot be marked complete.
- Cover homepage loading, default Persian RTL, switching to English LTR, section navigation, narrow mobile overflow in both languages, missing-image and localized missing-video fallbacks, and unexpected browser errors. Keep test fixtures independent of owner-supplied media. Reproduce the suspected video fallback defect and fix it if confirmed.
- Preserve the homepage design and the public, static scope in v0.0.5. Mobile navigation, responsive image sizing, localization improvements, and visual refinements are scheduled for v0.0.6 and require approved scope before implementation.

[Prompt03](docs/master-prompts/Prompt03-Homepage.docx) · [Prompt05](docs/master-prompts/Prompt05-GitHub-workflow.docx) · [Prompt06](docs/master-prompts/Prompt06-Codex-development-workflow.docx)

## Requirements management, Git, and release

- Record new development specifications in `docs/requirements/` with a stable requirement ID, target version, objective, functional, technical, and UI/UX requirements, affected components and files, acceptance criteria, separate approval and implementation statuses, and related master prompts. Obtain owner approval before implementing new or modified requirements.
- After each approved implementation, identify and read the affected master prompts, preserve historical content and formatting, and append a dated, versioned update for the approved changes. Validate the resulting DOCX files. Keep the exact filenames and both document formats. The DOCX files retain the full prompt history and the Markdown register and specifications document active scope and traceability.
- Update this register, `ROADMAP.md`, `CHANGELOG.md`, and any affected documentation. Generate an implementation and validation report with changed files, evidence, failures, limitations, and open work. Include documentation and source changes in the same pull request and check the diff, CI results, and risks.
- Start from `develop` on a `feature/<description>` branch. Do not push directly to `develop` or `main`. Target `develop` with the feature PR and merge only after owner approval. Promote an approved revision to `main` through an approved release PR. Create an annotated `vX.Y.Z` tag only with owner approval. Preserve older tags for rollback, avoid force pushes to release branches, and keep credentials out of Git.
- v0.0.4 is a reconstruction from specifications because the previously documented v0.0.3 ZIP was unavailable. Its integration merge is recorded in PR #1. A feature PR does not constitute a release, a tag, or acceptance of visual fidelity. v0.0.5 is the unreleased development milestone on `feature/v0.0.5-codex-setup`. Local implementation approval and permission to commit, push, merge, or tag are separate decisions.

[Prompt01](docs/master-prompts/Prompt01-Project-initialization.docx) · [Prompt05](docs/master-prompts/Prompt05-GitHub-workflow.docx) · [Prompt06](docs/master-prompts/Prompt06-Codex-development-workflow.docx) · [GitHub workflow](docs/REPOSITORY-WORKFLOW.md) · [Reconstruction PR](https://github.com/Mahdy-Ranaie/barbicue-resturant/pull/1)

## Conflicts and open interpretation

| Topic | Recorded requirement or open decision |
| --- | --- |
| Install command | The original Prompts 03 and 05 say `npm install`. Their dated v0.0.5 updates explicitly require `npm ci` for the current workflow. Preserve the earlier wording in the archive. |
| Release history and rollback | Prompt05 calls v0.0.3 the last documented release. The original source archive was unavailable, and the initial inspection found no local tags. Establish the exact rollback ref before a release. |
| Meaning of static | The project excludes backend application features. The prompts leave files-only hosting versus a Next.js-compatible host undecided. Keep the hosting and image-optimization strategy open until the owner selects the target. |
| Visual approval | The brief defines a design direction and requires visual review. The integration merge does not resolve the missing v0.0.3 reference or establish owner acceptance of the reconstruction. |
| Menu and business context | Prompt01 describes kebabs, burgers, chicken, sides, and other business ambitions. Prompt03 calls for illustrative menu content pending approval. Confirm the final public menu without turning the business context into a mandated menu. |
| Indexing and publication | Prompt03 ties preview `noindex` to verified business data. Publication also requires owner approval. The final metadata and indexing change belong to the release decision. |

## Canonical master prompt archive

1. [Prompt01-Project-initialization.docx](docs/master-prompts/Prompt01-Project-initialization.docx)
2. [Prompt02-Reference-design.docx](docs/master-prompts/Prompt02-Reference-design.docx)
3. [Prompt03-Homepage.docx](docs/master-prompts/Prompt03-Homepage.docx)
4. [Prompt04-Media-management.docx](docs/master-prompts/Prompt04-Media-management.docx)
5. [Prompt05-GitHub-workflow.docx](docs/master-prompts/Prompt05-GitHub-workflow.docx)
6. [Prompt06-Codex-development-workflow.docx](docs/master-prompts/Prompt06-Codex-development-workflow.docx)
