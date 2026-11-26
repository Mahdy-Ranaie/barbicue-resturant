# BBQ-REQ-001 Requirements management and master prompt synchronization

- **Requirement ID** BBQ-REQ-001
- **Target version** v0.0.5
- **Approval status** Approved for local implementation by the supplementary Prompt06 request on 2026-11-26. The owner subsequently approved committing and pushing the feature branch. PR publication, merge, and release tagging remain subject to owner approval.
- **Implementation status** Implemented and verified locally. Application checks are recorded in the parent milestone report. PR review and GitHub CI verification of the v0.0.5 changes remain pending.

## Objective

Use GitHub as the single source of truth for application source, approved requirements, master prompts, and implementation history.

## Functional requirements

- Provide a root `REQUIREMENTS.md` that consolidates all six master prompts with links, explicit conflicts or ambiguities, and the distinction between current scope and historical requirements.
- Store individual specifications in `docs/requirements/` and keep approval status separate from implementation and validation status.
- For every approved implementation, read and append to affected master prompts, record approved new or modified requirements, synchronize the register, roadmap, changelog, and implementation report, and include the related documentation and source in the same PR.

## Technical requirements

- Preserve canonical DOCX paths, filenames, historical text, and formatting wherever possible. Use a repeatable append process and verify that the resulting documents open with an independent DOCX reader.
- Keep the register and individual specifications in Markdown and retain the Word archive. Record validation failures and unverified criteria as open. Require owner approval before implementing unapproved scope, merging, or creating a release tag.

## UI/UX requirements

The website UI has no changes for this specification. The register, roadmap, and specification use consistent headings, status labels, and links so contributors can find scope, source documents, and validation evidence.

## Affected components and files

- Root `REQUIREMENTS.md`, `AGENTS.md`, `README.md`, `ROADMAP.md`, and `CHANGELOG.md`.
- This specification, `docs/REPOSITORY-WORKFLOW.md`, `.github/pull_request_template.md`, and the v0.0.5 implementation report.
- `Prompt05-GitHub-workflow.docx`, `Prompt06-Codex-development-workflow.docx`, and `scripts/append_master_prompt.py`.

## Acceptance criteria

| Criterion | Evidence and status |
| --- | --- |
| Consolidate all six master prompts and flag ambiguity. | Verified locally by comparing the register to the source documents. The register lists both superseded commands and unresolved decisions. |
| Record an individual specification with all required fields. | Verified locally in this file. |
| Preserve master prompt history and open the updated DOCX files. | Verified locally through historical OOXML comparison and loading the updated documents with a DOCX reader. See the implementation report. |
| Make the synchronization, validation, and approval rules permanent. | Verified locally in `AGENTS.md` and the dated Prompt05 and Prompt06 updates. |
| Update the roadmap, changelog, and implementation report. | Verified locally. The documents link to the register and this specification. |
| Include implementation and documentation in the same feature PR. | Pending approval to open the feature PR. |

## Related master prompt documents

- [Prompt05-GitHub-workflow.docx](../master-prompts/Prompt05-GitHub-workflow.docx)
- [Prompt06-Codex-development-workflow.docx](../master-prompts/Prompt06-Codex-development-workflow.docx)

[Requirements register](../../REQUIREMENTS.md) · [Roadmap](../../ROADMAP.md) · [Changelog](../../CHANGELOG.md) · [Implementation and validation report](../reports/V0.0.5-IMPLEMENTATION-REPORT.md)
