---
description: Start the project for iOS development
---

# Running locally for iOS on Expo

This workflow describes how to properly start the development server for an iOS device using Expo SDK 54.

// turbo
1. Start the Expo development server, explicitly clearing cache if necessary.
```shell
npm run start -- -c
```

## Troubleshooting
- **Watchman issues**: Sometimes file watchers get stuck. You may need to run `watchman watch-del-all`.
- **Dependencies out of sync**: Run `npm install` again.
- **Expo Go Version Mismatch**: Ensure your device has the correct Expo Go version installed for SDK 54 (iOS version 54.0.2 is verified working). 
