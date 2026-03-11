# Mobile Frontend Checklist

## Before Coding

- Confirm target devices and minimum OS versions.
- Confirm design tokens and component usage from the existing app.
- Confirm API contract and offline/error behavior.

## UX States

- Loading state is visible and non-blocking when possible.
- Empty state includes a clear user action.
- Error state includes retry and actionable message.
- Skeletons/spinners do not cause layout jumps.

## Accessibility

- Touch targets are at least 44x44 points where practical.
- Interactive elements expose role/label/state.
- Text contrast is readable in normal and reduced brightness.
- Screen reader flow is logical for the primary task.

## Performance

- Long lists use virtualization (`FlatList`/`SectionList`).
- Avoid expensive recalculation in render paths.
- Images are sized/cached to avoid overdraw and memory spikes.
- Animations use native driver-friendly patterns when possible.

## Platform Behavior

- Safe area handling is correct on notched devices.
- Keyboard interactions do not hide focused inputs.
- Back handling is correct on Android.
- Deep links and notification opens route correctly.

## Release Readiness

- ESLint passes for the changed scope with no remaining violations.
- Lint/typecheck/tests pass.
- Crash-prone edge cases are covered (null data, slow network, auth expiry).
- Feature flags and analytics events are wired as expected.
