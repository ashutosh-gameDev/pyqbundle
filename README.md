# PrepPath Android app

A thin [Capacitor](https://capacitorjs.com) shell around the live student-web
site (`capacitor.config.ts` → `server.url`). Every web deploy updates the app
instantly - the native side only exists for what a WebView can't do: AdMob
and Google Play Billing.

## Building locally

This machine has no system-wide Android SDK/JDK - it builds against Unity's
bundled SDK and a separately-installed JDK 21:

- **Android SDK**: `android/local.properties` points `sdk.dir` at Unity
  6000.0.62f1's bundled SDK (`.../PlaybackEngines/AndroidPlayer/SDK`) - it
  already has build-tools 36.0.0 and platforms 34-36 on disk, no download
  needed. `local.properties` is gitignored (machine-specific); recreate it
  if it's missing, pointing at any Android SDK with those installed, or at
  a normal Android Studio-managed SDK if you have one.
- **JDK**: `@capacitor/android`'s own Gradle module requires Java 21
  (`sourceCompatibility`/`targetCompatibility VERSION_21`). Unity's own
  bundled JDKs are all 17 or 11 - not enough. A real JDK 21
  (Eclipse Temurin) was downloaded to `%USERPROFILE%\.jdks\jdk-21.0.12.1+1`.
  Point `JAVA_HOME` at it before running Gradle:
  ```
  set JAVA_HOME=%USERPROFILE%\.jdks\jdk-21.0.12.1+1
  ```
- `android/build.gradle` pins `buildToolsVersion "36.0.0"` project-wide
  (including the Capacitor-generated `capacitor-cordova-android-plugins`
  module, which `cap sync` regenerates and never sets this itself) -
  AGP's own default for compileSdk 35 is build-tools 34.0.0, which isn't
  installed here.

Then from `android/`:
```
gradlew.bat assembleDebug
```
Output: `android/app/build/outputs/apk/debug/app-debug.apk`.

To open/run in Android Studio instead (needed for an emulator, signing, or
a Play Console release build), just open the `android/` folder there - it
should pick up the same `local.properties`/Gradle settings.

## Updating after a Capacitor config/plugin change

```
npm install
npx cap sync android
```
