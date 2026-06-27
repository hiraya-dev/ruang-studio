---
name: git-workflow
description: Git conventions for this project — how to commit, what authorship to use, and the rule against pushing. Use whenever committing, staging, or asked to save or version changes.
---

# Git Workflow

Solo project. Commit cleanly and locally; never reach for the remote on your own.

## Rules

1. **Never push.** Commit locally only. Push to a remote, or open a PR, *only* when the user explicitly says to push. No auto-push after a commit, ever.
2. **The author is the user, not an AI tool.** No `Co-authored-by: Cursor`, no `Co-Authored-By: Claude`, no "Generated with" footer, no AI attribution anywhere in the message or body.
3. **No branch rules.** Commit on the current branch. Don't create, switch, or enforce a branching scheme unless asked.
4. **Commit sensible units of work** — a finished section, a fix, a token change. Don't commit broken or half-built states unless asked to checkpoint.

## Commit messages

- Imperative, specific subject: "Build services section", "Fix nav focus state", "Retune spacing tokens"
- Add a body only when the *why* isn't obvious from the diff. Plain text, no attribution footer.
- Design-system changes (tokens, schema, breaking visual): make sure the change is also logged in CHANGELOG.md.

## Before committing

- Stage intentionally — only the files for this unit of work. Avoid a blanket `git add -A` when unrelated changes are present
- Glance at `git status` and `git diff --staged` so the commit is exactly what you think it is
- Never commit secrets, `.env`, or build output (`dist/`) — they belong in `.gitignore`

## Anti-patterns

- Pushing or opening a PR without being asked
- Any "Generated with" / `Co-authored-by: Cursor` / `Co-Authored-By: Claude` line
- `git add -A` sweeping in unrelated edits
- Committing a half-built section as if it were done
