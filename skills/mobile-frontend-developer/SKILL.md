---
name: mobile-frontend-developer
description: Build and improve mobile frontend applications using React Native and Expo. Use when implementing or refactoring screens, navigation flows, design-system components, responsive layouts, gestures, animations, form UX, client-side state, offline/slow-network behavior, accessibility, or mobile performance issues in iOS/Android app codebases.
---

# Mobile Frontend Developer

## Overview

Execute mobile frontend work with production-oriented patterns for React Native and Expo projects. Prioritize correctness on real devices, accessibility, and maintainable component architecture.

## Workflow

1. Confirm stack and scope
- Identify framework/runtime (`expo` managed vs bare React Native), navigation library, state approach, and target feature scope.
- Locate affected screens, shared components, and style tokens before editing.

2. Implement with mobile-first constraints
- Prefer reusable primitives in `components/` over screen-local duplication.
- Keep layout responsive across small and large devices; respect safe areas and keyboard behavior.
- Use platform-aware behavior only where necessary (`Platform.select`, OS-specific files).
- Keep interaction latency low; avoid unnecessary rerenders and oversized list rendering.

3. Preserve UX consistency
- Match existing typography, spacing, color tokens, and motion patterns.
- Make loading, empty, error, and retry states explicit.
- Ensure touch targets and contrast are accessible; support dynamic text where feasible.

4. Validate before handoff
- Run ESLint first and fix all reported violations in changed files before handoff.
- Run remaining lint/typecheck and project tests when available.
- Verify changed flows on both iOS and Android paths.
- Summarize risk areas and follow-up fixes if native/device verification is blocked.

## Implementation Guidelines

- Navigation
  - Keep route params typed and minimal.
  - Avoid deep prop drilling for navigation actions; isolate flow logic in route-level hooks.

- State and data
  - Keep server state and UI state separate.
  - Derive view state from data status (`loading`, `success`, `error`) instead of ad hoc booleans.

- Lists and rendering
  - Use `FlatList`/`SectionList` for long content.
  - Stabilize `keyExtractor`, `renderItem`, and memoized row components for performance.

- Forms
  - Validate at field and submit boundaries.
  - Support keyboard-safe scrolling and clear inline error messaging.

- Accessibility
  - Add meaningful `accessibilityLabel`/`accessibilityRole` for interactive elements.
  - Ensure icon-only controls have text alternatives.

## References

- Load [references/mobile-frontend-checklist.md](references/mobile-frontend-checklist.md) when validating release readiness, accessibility, and performance for changed screens.
