# Project roadmap

The v0.0.4 reconstruction and v0.0.5 development setup are integrated into `develop`. v0.0.6 Gallery work uses `feature/v0.0.6-gallery-page`. The changelog records these milestones as unreleased. [Reconstruction PR](https://github.com/Mahdy-Ranaie/barbicue-resturant/pull/1) · [Development setup PR](https://github.com/Mahdy-Ranaie/barbicue-resturant/pull/2)

| Milestone | Progress and scope | Acceptance criteria |
| --- | --- | --- |
| v0.0.4 reconstructed showcase | Integrated on `develop`. Persian RTL and English LTR share a responsive, single-page layout with local media paths and placeholder copy. | All required homepage sections render and the reconstruction is documented. Owner review establishes the design baseline for release. |
| v0.0.5 development infrastructure | Integrated through PR #2. Includes contributor standards, editor settings, locked installs, Playwright, CI, and the requirements register. | Local checks and GitHub CI passed. Audit findings and limitations are recorded. |
| v0.0.6 dedicated Gallery | Adds the Gallery route, mobile navigation, dual-size media, and the viewer. The media follow-up provides the first four photo pairs and bilingual captions. See [REQ-007](docs/requirements/REQ-007-Gallery-page.md). | The route, homepage entry links, locales, responsive layouts, viewer controls, request behavior, and fallbacks pass validation. |
| Publication | Awaiting verified bilingual restaurant details, licensed media, hosting decision, and owner approval. | The final menu and contact details are accurate, real assets and playback are checked, preview indexing settings are reviewed, and release proceeds through an approved PR and tag. |

## Known issues and follow-up

- Review responsive image hints and visual polish beyond Gallery scope separately.
- The Gallery photos and intro video are available. The logo, hero and story photos, menu photos, video poster, and verified restaurant details are pending. Playback and visual review on target devices remain release checks.
- `next-env.d.ts` is generated and covered by the ignore rule, but Git still tracks its legacy copy. Type checking can generate it on a clean checkout. Remove the tracked copy in a reviewed Git change while keeping local generated files.
- Track unresolved dependency advisories in the v0.0.5 implementation report.

[Requirements register](REQUIREMENTS.md) · [Gallery implementation report](docs/reports/PROMPT07-GALLERY-IMPLEMENTATION-REPORT.md) · [v0.0.5 implementation report](docs/reports/V0.0.5-IMPLEMENTATION-REPORT.md)
