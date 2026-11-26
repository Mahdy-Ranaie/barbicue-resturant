# Barbecue Restaurant initial project inspection

This report preserves the original read-only v0.0.4 inspection and adds a branch snapshot from the v0.0.5 planning review. The original review covered the source, package manifest and lockfile, README, changelog, GitHub workflow, media registry, public assets, and all five master prompt documents. The project was reconstructed from its specifications because the earlier v0.0.3 source ZIP was unavailable. Visual fidelity to v0.0.3 is therefore unverified. [Reconstruction PR #1](https://github.com/Mahdy-Ranaie/barbicue-resturant/pull/1)

**Evidence labels.** A verified finding was observed in source, Git, GitHub, or a completed check. A potential issue follows from source inspection and still needs runtime confirmation. An open decision requires input such as the hosting target or approved business information.

## Repository and branch status

| Ref | Verified state |
| --- | --- |
| `develop` | `1907f24`. PR #1 merged the reconstructed v0.0.4 website and workflow into the integration branch. |
| `main` | `01261b0`. The release branch still pointed to the initial commit, which contains only `.gitignore`. |
| `feature/v0.0.4-website-and-workflow` | `0d1ae13`. Source branch for the merged reconstruction PR. |
| `feature/update-deprecated-dependencies` | `7822033`. Pushed to GitHub and one commit ahead of `develop` at the original inspection. |
| `feature/v0.0.5-codex-setup` | Current local branch at the time this report was saved, based on `7822033`. The branch was absent from the GitHub branch listing during the v0.0.5 planning review. |

The manifest still identifies the project as v0.0.4, and the inspected local repository had no tags. The changelog records v0.0.4 as proposed and contains a stale statement that no merge has occurred. GitHub confirms the integration merge through PR #1. The documented workflow uses feature PRs into `develop` and a reviewed release PR to `main`. Branch protection enforcement was not verified. The working tree already had a local modification to the generated, tracked `next-env.d.ts` before this report was created. [Repository workflow](../REPOSITORY-WORKFLOW.md) · [Changelog](../../CHANGELOG.md) · [Dependency branch comparison](https://github.com/Mahdy-Ranaie/barbicue-resturant/compare/develop...feature/update-deprecated-dependencies)

## Architecture and implemented requirements

- **Application.** Next.js 15 App Router and React 19 serve one prerendered homepage. Strict TypeScript checks the code, and Tailwind CSS 3 is configured through PostCSS. Most visual styling is custom CSS in `src/app/globals.css`. The root layout supplies metadata and document defaults. The homepage is a client component that manages the language switch. [Homepage](../../src/app/page.tsx) · [Root layout](../../src/app/layout.tsx) · [Styles](../../src/app/globals.css)
- **Public showcase.** The header and navigation, hero, about and story, menu, services, gallery, video, contact, and footer cover all nine required areas. The repository contains no application API, database, authentication, admin area, online ordering, reservations, or payments. [Homepage](../../src/app/page.tsx) · [Project initialization prompt](../master-prompts/Prompt01-Project-initialization.docx)
- **Localization.** The initial document uses Persian and RTL. The client switch selects English copy and updates the document language and direction to English LTR. The shared page components read typed content from `src/content/site.ts`. Some accessible labels and image descriptions are still defined in the components. [Bilingual content](../../src/content/site.ts) · [Homepage prompt](../master-prompts/Prompt03-Homepage.docx)
- **Media.** One registry defines all public media paths. Reusable components handle the brand mark, responsive photos through `next/image`, and native MP4 video with controls, inline playback, metadata preload, and a poster path. The image and video components have fallback UI. The registry and media inventory agree on all 11 required paths. [Media registry](../../src/config/media.ts) · [Media inventory](../MEDIA-FILES.md) · [Media management prompt](../master-prompts/Prompt04-Media-management.docx)
- **Documentation.** All five canonical Word documents were present and reviewed. They cover project initialization, reference design, homepage, media management, and the GitHub workflow. The design brief calls for using the reference site's hierarchy as inspiration and using original or licensed branding and assets. [Reference design prompt](../master-prompts/Prompt02-Reference-design.docx) · [GitHub workflow prompt](../master-prompts/Prompt05-GitHub-workflow.docx)

## Missing requirements and release inputs

| Evidence | Finding |
| --- | --- |
| Verified | The 11 named restaurant media files were absent. The repository contains the generic SVG placeholder and directory markers. The logo, hero and editorial photography, menu and gallery photos, MP4, and poster need approved assets. |
| Verified | The address, phone, and hours are pending confirmation. The menu is illustrative and contains no invented prices. Final brand and bilingual copy also require owner review. |
| Verified | Metadata includes `noindex` and `nofollow` for the preview. Review the metadata and indexing settings once the owner has approved the publication inputs. |
| Verified | The original project had lint, type checking, and build scripts but no automated browser suite. Shared VS Code configuration, root `AGENTS.md`, a project roadmap, and Prompt06 are proposed v0.0.5 deliverables. |
| Open decision | The production hosting target is unspecified. The homepage is prerendered, while the project currently uses the default Next.js image optimizer. A files-only host would require an explicit static export and an image strategy compatible with it. [Next.js static export guide](https://nextjs.org/docs/15/app/guides/static-exports) |

## Identified bugs and UI/UX assessment

| Evidence | Finding and impact |
| --- | --- |
| Verified from CSS and markup | The header hides its section navigation at widths of 850 px and below. There is no mobile replacement, so direct header links to services, gallery, and contact disappear. |
| Potential runtime bug | The video listens for errors on `<video>` while the MP4 is declared through a nested `<source>`. An unavailable MP4 can report failure on the source element. The localized fallback may fail to replace the empty player. Confirm with a browser test that fails the exact MP4 request. [HTML media loading standard](https://html.spec.whatwg.org/multipage/media.html#loading-the-media-resource) |
| Verified mismatch, impact inferred | Menu and gallery image `sizes` use a 760 px breakpoint while the CSS uses 600 px and, for the menu, 850 px. Menu cards can request undersized images on some tablets, and the gallery can request unnecessarily large files. Confirm actual image selection after real assets are available. |
| Verified from source | The video has an English accessible name in both languages. The gallery alt text gives only the image number. Review the language switch's accessible name and supply descriptive localized alt text when the photos are chosen. |
| Verified from CSS | Reduced-motion mode turns off smooth scrolling and button transitions, while the button hover transform still applies. A global visible focus outline is defined. Keyboard navigation and focus contrast remain unverified in browsers. |
| Verified from source | Locale selection lives in React state and resets to Persian on reload. The initial Persian default meets the requirement. Persistence and a directly shareable English URL are product decisions for a later milestone. |

The source implements the requested charcoal and warm-gold palette, full-bleed hero, editorial story layout, menu and service grids, and asymmetric gallery. Responsive styles cover wide, tablet, and narrow layouts. The hero overlay changes direction with RTL, and some spacing uses logical properties. A few physical offsets and shared typography rules still merit visual review in both locales. Premium appearance, Persian line wrapping, small-screen overflow, focus visibility, and contrast over final photographs were not verified in a browser. [Styles](../../src/app/globals.css) · [Homepage](../../src/app/page.tsx)

## Code quality assessment

- **Strengths.** The small dependency footprint, typed bilingual content, centralized media registry, and reusable media components fit the single-page scope. Semantic sections, headings, native buttons and links, and native video provide a good foundation for accessibility.
- **Maintainability.** The homepage handles most sections, locale state, and several translated labels in one client component. Keep shared copy and accessible labels together, and extract sections when a concrete change benefits from it. Avoid a broad component or styling rewrite for the infrastructure milestone.
- **Reliability.** The photo and logo fallbacks rely on browser error events after an asset request. Reproduce failures deterministically in tests so the suite continues to exercise them after real media is added. The generated `next-env.d.ts` is tracked despite an ignore rule, so builds can create incidental Git diffs.
- **Documentation drift.** The dependency branch README and CI use `npm ci`. Prompts 03 and 05 still record the earlier `npm install` workflow, and the changelog predates the integration merge and lint migration. Append dated updates to affected prompts so the history remains intelligible. [README](../../README.md) · [Changelog](../../CHANGELOG.md) · [CI workflow](../../.github/workflows/ci.yml)

## Dependency and security concerns

- **Verified.** The original `develop` dependency tree used deprecated ESLint 8 and lacked a committed lockfile. The dependency feature branch migrated to ESLint 10.15.0, a flat config, and compatible lint plugins. Its npm v3 lockfile had no entries marked deprecated. The local installed Next.js version was 15.5.29. GitHub CI targets Node.js 22, and the clean local install passed on Node.js 22.15.0. [Package manifest](../../package.json) · [Lockfile](../../package-lock.json) · [ESLint configuration](../../eslint.config.mjs)
- **Unverified security status.** The original inspection did not run a registry security audit. Deprecation metadata establishes package support status and does not establish vulnerability status. Audit production and development dependencies for v0.0.5. Apply compatible fixes where appropriate, review any remaining findings, and avoid forced major upgrades. [npm dependency auditing](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/)
- **Release controls.** The CI workflow declares read-only repository permissions. Keep credentials, machine-specific paths, and generated test output out of Git. Use the lockfile for clean installs. Review the full PR diff against `develop`, since the v0.0.5 feature branch inherits the dependency cleanup.

## Build and testing status

| Check | Verified result or limitation |
| --- | --- |
| GitHub Actions on reconstruction PR #1 | Passed. The recorded run covers dependency installation, ESLint, TypeScript, and the production build. [Actions run](https://github.com/Mahdy-Ranaie/barbicue-resturant/actions/runs/44949049335) |
| Dependency update validation | A clean `npm ci`, `npm run lint`, `npm run typecheck`, and `npm run build` passed locally on the dependency update. The build reported the homepage as prerendered. |
| Original inspection | Rechecked lint and TypeScript locally in read-only mode, with TypeScript incremental output disabled. Both passed. The inspection did not rerun the build because it writes generated files. |
| Dependency branch GitHub CI | The original inspection found no PR-triggered workflow run for commit `7822033`. The local validation above covers that branch's dependency update. |
| Browser and media coverage | No automated browser suite was present. The language switch, responsive layout, focus order, image fallback, video failure, normal playback, and console behavior were not verified in a browser during the original inspection. |

These results are historical. Saving this report did not rerun the checks.

## Recommended improvements and v0.0.5 priorities

1. **Establish reproducible development.** Review the inherited dependency changes, retain the npm lockfile, audit the dependency graph, and document the Node.js and npm workflow. Add root `AGENTS.md` and portable VS Code recommendations covering TypeScript, ESLint, Tailwind, and formatting. Keep `npm ci` in the existing workflow.
2. **Add production browser coverage.** Configure Playwright and run it in CI after lint, type checking, and the production build. Cover homepage loading, Persian RTL by default, English LTR after switching, navigation destinations, narrow-screen overflow, image and video fallbacks, and unexpected browser errors. Use controlled media failure cases and validate that the fallback appears. Limit website code changes to defects required for this milestone, such as the video fallback if reproduced.
3. **Synchronize project records.** Add `ROADMAP.md` and `docs/master-prompts/Prompt06-Codex-development-workflow.docx`. Update README, changelog, and affected prompts while retaining existing document text, filenames, and folder structure. Record validation results and limitations and keep the milestone unreleased pending approval.
4. **Schedule the website quality and publication work.** Track accessible mobile section navigation, accurate image sizing, localized media labels, reduced-motion behavior, and visual review across desktop, tablet, and phone. Obtain approved bilingual content and licensed assets, verify playback, and confirm the hosting target before publication.

The v0.0.5 implementation plan is pending approval. The planned feature PR targets `develop`. Promotion to `main` and release tagging require separate approval.
