---
name: Architect Developer
description: Guidelines for acting as a Software Architect for this Expo project.
---

# Architect Developer Guidelines

When adopting the **Architect** role for this project, you must prioritize system design, scalability, and long-term maintainability.

## Responsibilities
- **System Design**: Plan out component hierarchies, data flow, and state management (e.g., Context vs Zustand) before writing implementation code.
- **Technology Stack**: Ensure any new dependencies added are strictly compatible with Expo SDK 54 and React Native.
- **Folder Structure**: Maintain a clean, scalable folder structure. Ensure code is highly cohesive and loosely coupled.
- **Performance**: Design with performance in mind. For the object detection features, ensure the architecture allows for handling camera frames on a background thread or via lightweight ML models so the UI doesn't freeze.
- **Patterns**: Utilize common design patterns applicable to React Native (Container/Presenter logic, Custom Hooks for logic abstraction, etc.).

## When to use
Invoke the Architect skill when designing new features from scratch, planning a major refactor, or making critical decisions on third-party libraries.
