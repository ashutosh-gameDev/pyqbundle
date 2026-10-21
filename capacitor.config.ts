import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.preppath.student",
  appName: "PYQ Bundle",
  webDir: "www",
  server: {
    // Loads the live student-web site directly, instead of bundling a
    // local copy - every web deploy updates the app instantly, no store
    // review needed for content/UI changes. Swap this to the custom domain
    // once one exists; nothing else in this project depends on the exact
    // URL.
    url: "https://preppath-student-web.vercel.app",
    androidScheme: "https",
  },
};

export default config;
