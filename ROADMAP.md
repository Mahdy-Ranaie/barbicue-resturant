# Project roadmap

The website in `develop` is the v0.0.4 reconstruction merged through PR #1. The v0.0.5 development setup is on `feature/v0.0.5-codex-setup`. The changelog records both milestones as unreleased. [Reconstruction PR](https://github.com/Mahdy-Ranaie/barbicue-resturant/pull/1)

| Milestone | Progress and scope | Acceptance criteria |
| --- | --- | --- |
| v0.0.4 reconstructed showcase | Integrated on `develop`. Persian RTL and English LTR share a responsive, single-page layout with local media paths and placeholder copy. | All required homepage sections render and the reconstruction is documented. Owner review establishes the design baseline for release. |
| v0.0.5 development infrastructure | Local feature work covers contributor standards, editor settings, locked installs, production browser tests, CI, the sixth master prompt, and the requirements register. | Clean install, lint, type checking, production build, and Playwright pass locally. Audit findings and limitations are recorded. The register, specification, master prompt updates, and report are verified locally. Feature PR publication and GitHub CI remain pending. |
| v0.0.6 website quality | Planned. Add mobile section navigation, align image sizes with breakpoints, improve localized accessible labels, and refine RTL/LTR typography, focus, and reduced motion. | Keyboard and touch users can reach all sections. Both layouts fit narrow, tablet, and desktop widths. Image requests match their rendered sizes, and media labels and visual refinements pass review in both languages. |
| Publication | Awaiting verified bilingual restaurant details, licensed media, hosting decision, and owner approval. | The final menu and contact details are accurate, real assets and playback are checked, preview indexing settings are reviewed, and release proceeds through an approved PR and tag. |

## Known issues and follow-up

- The desktop navigation is hidden below its tablet breakpoint. Direct section navigation on mobile is scheduled for v0.0.6.
- Responsive image hints, gallery descriptions, video labels, and visual polish in both language directions are scheduled for v0.0.6.
- Real restaurant photos, logo, video, poster, and verified restaurant details are pending. Playwright covers layout and fallback behavior with fixtures. Playback of the final video remains a release check.
- `next-env.d.ts` is generated and covered by the ignore rule, but Git still tracks its legacy copy. Type checking can generate it on a clean checkout. Remove the tracked copy in a reviewed Git change while keeping local generated files.
- Track unresolved dependency advisories in the v0.0.5 implementation report.

[Requirements register](REQUIREMENTS.md) · [Requirements management specification](docs/requirements/BBQ-REQ-001.md) · [Initial inspection](docs/reports/INITIAL-PROJECT-INSPECTION.md) · [Implementation report](docs/reports/V0.0.5-IMPLEMENTATION-REPORT.md)
