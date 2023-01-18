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

## How to launch with docker

```bash
$ cd /web
$ docker build -t area-app .
$ docker run -d --network=host area-app:latest
```
Please note that --network=host allow you the access to the container running web app with localhost or 127.0.0.1 IP.