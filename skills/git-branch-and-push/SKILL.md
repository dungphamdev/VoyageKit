---
name: git-branch-and-push
description: Enforce a safe Git delivery workflow for commit and push tasks. Use when Codex needs to commit code, push code, open a branch for development, or prepare changes for PR. Always sync with the latest `master` first, then create a new `feature/` or `bugfix/` branch before committing and pushing.
---

# Git Branch And Push

## Overview

Follow a strict branch workflow: update from `master`, create a task branch, commit there, and push that branch to origin.

## Required Workflow

1. Check repository state
- Run `git status --short --branch`.
- If there are unrelated uncommitted changes, stop and ask how to proceed.

2. Update local `master` from remote
- Run `git fetch origin`.
- Run `git checkout master`.
- Run `git pull --ff-only origin master`.

3. Create a new working branch from updated `master`
- Use `feature/<short-slug>` for new functionality.
- Use `bugfix/<short-slug>` for fixes.
- Run `git checkout -b <branch-name>`.

4. Make and verify changes
- Implement requested changes.
- Run required checks/tests for the project before commit.

5. Commit on the new branch
- Stage only intended files.
- Run `git commit -m "<type>: <summary>"`.

6. Push branch to remote
- Run `git push -u origin <branch-name>`.

## Branch Naming Rules

- Prefix must be exactly `feature/` or `bugfix/`.
- Use lowercase letters, digits, and hyphens in the slug.
- Keep names short and descriptive, for example:
  - `feature/login-screen`
  - `bugfix/crash-on-startup`

## Guardrails

- Never commit directly to `master`.
- Never push directly to `master`.
- If `master` has merge conflicts during pull, resolve or escalate before creating the new branch.
- If no branch type is specified by the user, choose:
  - `bugfix/` for defect/incident work.
  - `feature/` for all other changes.
