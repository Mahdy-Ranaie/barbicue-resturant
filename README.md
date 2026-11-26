# Barbecue Restaurant

Premium, bilingual (Persian RTL / English LTR) public restaurant showcase built with Next.js App Router, TypeScript and Tailwind CSS.

> **Source integrity:** The earlier v0.0.3 source ZIP was unavailable for direct recovery. This branch contains a **reconstruction** from the project specifications, not a byte-for-byte restoration. Please review the design before approving the PR.

## Development

Use Node.js 22.13 or later in the Node.js 22 release line used by CI.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. VS Code offers to use the workspace TypeScript SDK. The shared extension recommendations cover ESLint, Tailwind CSS IntelliSense, and Prettier. Consult [AGENTS.md](AGENTS.md) for project conventions and contribution approvals.

## Validation

Run the following from the repository root. Playwright starts the production build on port 3100.

```bash
npx playwright install chromium
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm audit
npm audit --omit=dev
```

GitHub Actions installs Chromium and its Linux dependencies with `npx playwright install --with-deps chromium`. When the browser download is unavailable locally, set `PLAYWRIGHT_CHROMIUM_CHANNEL` to `chrome` or `msedge` to use an installed browser. Browser fixtures cover the placeholder and fallback scenarios while the owner supplies the final media.

`npm run typecheck` runs Next.js route type generation before TypeScript. Treat changes to `next-env.d.ts` as generated output.

## Structure

- `src/app/`: homepage and global styling
- `src/content/site.ts`: bilingual text content
- `src/config/media.ts`: single source of truth for media paths
- `src/components/`: image, logo and video components
- `public/images/`, `public/videos/`: your own media
- `docs/master-prompts/`: exact master prompt filenames
- `REQUIREMENTS.md` and `docs/requirements/`: consolidated requirements and individual approved specifications
- `docs/MEDIA-FILES.md`: required asset inventory
- `tests/e2e/`: Playwright homepage coverage

Images use local fallback visuals until you supply the named files. Contact information and menu descriptions are placeholders, not verified restaurant facts.

## Branches and releases

Feature PRs target `develop`. Promote to `main` through an approved release PR and create `vX.Y.Z` tags only after separate approval. v0.0.4 was integrated through [PR #1](https://github.com/Mahdy-Ranaie/barbicue-resturant/pull/1). v0.0.5 is the unreleased development-infrastructure milestone. See the [roadmap](ROADMAP.md) and [repository workflow](docs/REPOSITORY-WORKFLOW.md).

Use the [requirements register](REQUIREMENTS.md) and the [requirements management specification](docs/requirements/BBQ-REQ-001.md) to review scope, approvals, and documentation updates.

## Publication checklist

- Supply licensed restaurant images and video.
- Confirm brand name, contact details, hours and menu.
- Update SEO metadata and remove `noindex` when ready to launch.
- Verify language switch, accessibility, mobile layout, video playback and production build.
