# GitHub development workflow

Repository: https://github.com/Mahdy-Ranaie/barbicue-resturant

- `develop`: integration branch.
- `main`: approved release branch.
- `feature/*`: reviewable changes based on `develop`.
- `vX.Y.Z`: approved release tags, never force-moved.

GitHub is the source of truth for code, approved requirements, master prompts, and implementation history. Each feature PR includes the implementation, updated requirements and master prompts, roadmap, changelog, and implementation report. Review `REQUIREMENTS.md` and the affected specifications in `docs/requirements/` before implementing an approved change.
Run `npm ci`, lint, type checking, the production build, and Playwright in CI. Review the PR and its checks before merging into `develop`.
Push feature branches only. Promote an approved `develop` revision to `main` through a release PR. Create an annotated release tag only after separate approval.
Keep credentials out of Git and avoid force pushes.

## Append a master prompt update

Read the affected DOCX before editing. Write the approved change in a UTF-8 text file with one paragraph per line, then append it using the version and date for the implementation.

```sh
python scripts/append_master_prompt.py Prompt06-Codex-development-workflow.docx vX.Y.Z YYYY-MM-DD "implementation update" update.txt
```

The command preserves the existing document XML and copies the other ZIP parts unchanged. Open the result with Word or an independent DOCX reader such as `python-docx`. Verify the new text and historical content, then record the result in the implementation report.

[Requirements register](../REQUIREMENTS.md) · [Requirements management specification](requirements/BBQ-REQ-001.md)
