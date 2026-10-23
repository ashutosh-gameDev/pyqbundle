import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.pyqbundle.student",
  appName: "PYQ Bundle",
  webDir: "www",
  server: {
    // Loads the live student-web site directly, instead of bundling a
    // local copy - every web deploy updates the app instantly, no store
    // review needed for content/UI changes.
    url: "https://app.pyqbundle.com",
    androidScheme: "https",
  },
  android: {
    // Targeting API 36 means Android forces the app to draw edge-to-edge
    // (under the status bar and gesture/nav bar) with no way to opt out -
    // this tells Capacitor to compensate by margining the WebView itself
    // to the real system-bar-safe area, instead of drawing content under
    // the status bar/buttons. Without this (the default is "disable"),
    // the AdMob banner's own native positioning (which already reads the
    // real system inset) and our WebView's content disagree about where
    // the screen's true edges are - explains both the status-bar/button
    // overlap and the banner-vs-bottom-nav mismatch reported on-device.
    adjustMarginsForEdgeToEdge: "force",
  },
};

export default config;
