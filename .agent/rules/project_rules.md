---
description: App rules and conventions for the antigravity React Native Expo SDK 54 app
---

# Project Guidelines

## Overview
This is a cross-platform mobile application built with React Native and Expo SDK 54.
The core domain is scanning objects using device camera/AI and suggesting missing items contextually.

## Technical Stack
- **Framework**: React Native with Expo (Managed Workflow, SDK 54)
- **Language**: TypeScript
- **Machine Learning**: `expo-camera` integrated with backend AI or local ML models for Object Detection.
- **UI/UX**: Premium, modern, dynamic design. Smooth micro-animations. Glassmorphism where applicable. High aesthetic standards.

## Coding Conventions
- **TypeScript**: Use strict typing. Define interfaces/types in `src/types/`. Avoid `any`.
- **ESLint**: ALWAYS fix all ESLint warnings and errors. Proactively run linters and ensure code is clean.
- **Components**: Functional components only. Use hooks. Place shared components in `src/components/`.
- **Styling**: Use `StyleSheet` from `react-native`, or a designated styling solution like `NativeWind` (Tailwind) if explicitly added. Currently, standard React Native styling is preferred unless otherwise specified.
- **State Management**: React Context or Zustand for global state. Local state via `useState`/`useReducer`.
- **File Structure**:
  - `src/components`: Reusable UI elements
  - `src/screens`: Top-level navigational screens
  - `src/hooks`: Custom React hooks
  - `src/services`: API calls, ML processing, side-effects
  - `src/navigation`: React Navigation setup
  - `src/utils`: Helper functions
  - `src/types`: TypeScript definitions

## AI Object Detection & Camera Handling
- Always prompt users for camera permissions gracefully.
- Handle different camera states (loading, error, permission denied).
- Keep the main UI thread unblocked when processing frames for object detection.
- Provide immediate visual feedback when an object is detected.

## UI/UX Standards
- Create stunning, premium interfaces. Go beyond basic MVPs.
- Utilize curated color palettes and modern typography.
- Implement responsive layouts that adapt cleanly across different mobile device sizes.

## Security & Git Rules
- **NEVER** commit or push secrets (API keys, passwords, `.env` file contents, certificates).
- Always ensure `.gitignore` covers environment files.
- Run ESLint on pre-commit to ensure project standards are maintained.
