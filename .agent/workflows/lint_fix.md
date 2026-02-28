---
description: Automatically run and fix ESLint styling and formatting issues.
---

# Lint & Fix Workflow

1. Run ESLint across the entire source directory attempting to autofix all correctable warnings/errors:
// turbo-all
```bash
npm run lint -- --fix
```

2. If errors persist that cannot be auto-fixed, invoke the `Senior Developer` skill to manually resolve complex styling violations.
