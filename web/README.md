## Installation

```bash
$ cd web
$ npm install
```

## Building project (For web)

```bash
$ ionic build
```

## Building project (For android)

```bash
$ ionic capacitor copy android && cd android && ./gradlew assembleRelease
```

## How to get the APK (Android)

```bash
$ Go to the path : android/app/build/outputs/apk/
$ The name of the APK will be : app-release-unsigned.apk
```