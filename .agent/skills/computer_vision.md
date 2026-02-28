---
name: Computer Vision Implementation
description: Guidelines for implementing camera and object detection features using expo-camera
---

# Computer Vision & Camera Integration

This skill provides guidelines on working with `expo-camera` to handle object scanning and ML integration.

## React Native Expo Camera Usage (SDK 54)

1. **Permissions**: Always request and check camera permissions using `useCameraPermissions()`.
2. **Camera View**: Use the `CameraView` component from `expo-camera`.
3. **Taking Pictures**: Use a reference to the `CameraView` to call `takePictureAsync()`. Keep processing to the background or Web Workers if complex.

## Workflow for "Scan & Suggest"
1. **Initialize Camera**: Show a smooth onboarding or contextual overlay asking to scan an environment.
2. **Capture Frame**: Capture an image or a sequence of images.
3. **Analyze**: Send the captured image to the detection backend, or process locally using lightweight models (e.g., TFLite).
4. **Overlay Results**: Draw visually appealing bounding boxes or stylized markers over detected items on the screen.
5. **Compute Suggestions**: Based on the recognized entities (e.g., "Keyboard", "Mouse"), suggest the missing logical items (e.g., "Mousepad", "Monitor").

## Best Practices
- **Performance**: Don't block the UI. Use appropriate resolution/quality settings in `takePictureAsync()` to balance speed vs. accuracy.
- **Feedback**: If scanning takes time, use skeleton loaders or subtle glowing animations on the scanning view.
- **Fallback**: Provide an option for the user to manually enter items if the camera fails to identify them or the environment is too dark.
