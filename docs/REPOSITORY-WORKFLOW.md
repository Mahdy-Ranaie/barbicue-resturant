# GitHub development workflow

Repository: https://github.com/Mahdy-Ranaie/barbicue-resturant

- `develop`: integration branch.
- `main`: approved release branch.
- `feature/*`: reviewable changes based on `develop`.
- `vX.Y.Z`: approved release tags, never force-moved.

Each feature PR must include code, affected master prompts, and `CHANGELOG.md` changes.
Run lint, typecheck, and production build in CI. Review the PR before merging into `develop`.
Release to `main` and tag only after separate approval.
Keep credentials out of Git and avoid force pushes.
