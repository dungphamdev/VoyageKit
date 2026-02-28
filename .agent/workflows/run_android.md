---
description: Start the project for Android development
---

# Run iOS Workflow

1. Clear the metro bundler cache:
// turbo
```bash
npm run start -- --clear
```

2. Alternatively, start specifically targeting android avoiding metro interactive prompt:
// turbo
```bash
npx expo start --android
```

3. Ensure you have an Android emulator running via Android Studio or a physical test device connected via USB debugging.
4. If issues persist regarding Metro bundler, kill the running Node process in the terminal before restarting.
