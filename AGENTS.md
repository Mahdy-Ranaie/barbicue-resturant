# Barbecue Restaurant repository instructions

## Architecture and scope

- Keep the website a public, static restaurant showcase built with Next.js App Router, React, strict TypeScript, and Tailwind CSS. Keep the homepage in `src/app/page.tsx`, the Gallery in `src/app/gallery/`, shared styles in `src/app/globals.css`, and shared site UI in `src/components/`.
- Preserve the existing design and section structure unless the task explicitly changes them. Backend services, databases, accounts, administration, online ordering, reservations, and payments are outside the current project scope.
- Reuse existing components and typed content. Prefer semantic HTML, native controls, visible keyboard focus, and reduced-motion support. Follow the existing code style and keep changes focused. Avoid mechanical formatting changes.

## Languages and media

- Persian is the default and uses RTL. English is secondary and uses LTR. Keep both locales in sync in `src/content/site.ts` and update both the document language and direction when switching. Verify alignment, wrapping, keyboard navigation, and accessible names in both languages.
- Keep asset URLs in `src/config/media.ts` and files under `public/images/` and `public/videos/`. Preserve the paths in `docs/MEDIA-FILES.md`. If an approved change requires renaming an asset, update the registry, inventory, and affected master prompt together.
- Use approved or licensed media, responsive images, and meaningful localized alternative text. Preserve the image and video fallbacks. Use owner-approved contact details, menu, and prices. Keep preview indexing disabled until publication is approved.
- Use matching gallery image basenames under `public/images/gallery/thumbnails/` and `public/images/gallery/standard/`. Keep the selection, order, and bilingual metadata in the shared media registry. Browse with lazy thumbnails and request standard files only for the open viewer.

## Dependencies and validation

- Use the Node.js 22 line at 22.13 or later. Install from the committed lockfile with `npm ci`. Review dependency and lockfile diffs together. Audit production and development dependencies and report unresolved findings. Apply targeted compatible fixes and review major upgrades separately.
- Run `npm run lint`, `npm run typecheck`, and `npm run build`. Install Chromium with `npx playwright install chromium` and run `npm run test:e2e` against the production build. Cover Persian RTL, English LTR, navigation, mobile layout, missing media, and browser errors when changing those behaviors.
- Keep browser test fixtures independent of private or uncommitted media. Report actual results and any checks that could not run. Keep generated files, credentials, and machine-specific settings out of commits. Next.js regenerates `next-env.d.ts` during type generation or build.

## Requirements and documentation

- Use GitHub as the single source of truth for application code, development requirements, master prompts, and implementation history. Use `REQUIREMENTS.md` as the consolidated register. Keep individual specifications in `docs/requirements/` with a requirement ID, target version, objective, functional requirements, technical requirements, UI/UX requirements, affected files, acceptance criteria, approval status, implementation status, and links to the related master prompts.
- Record ambiguities, conflicts, and newly approved or modified requirements explicitly. Implement approved scope only. Keep acceptance criteria open when the evidence is missing or a check fails. Record actual results, limitations, and any remaining work.
- After each approved implementation, identify and read the affected master prompts. Preserve their exact filenames, historical content, and formatting wherever possible. Append a dated, versioned update using a reproducible DOCX editing method and verify that each updated file opens. Keep the Word archive alongside the Markdown register and specifications. The repository includes `scripts/append_master_prompt.py` for append-only edits.
- Update `REQUIREMENTS.md`, `ROADMAP.md`, `CHANGELOG.md`, and affected documentation. Generate an implementation and validation report in `docs/reports/`. Include source and documentation changes in the same pull request.

## Git workflow

- Start changes on a feature branch from `develop`. Review the full diff against `develop` and open a pull request into it when authorized. Keep generated artifacts and unrelated work out of the diff.
- Follow any approval requirements stated for the task. Never push directly to `develop` or `main`. Merge only after owner review and approval. Promote to `main` through an approved release PR, and create an annotated version tag only with separate owner approval. Preserve existing release tags for rollback.
