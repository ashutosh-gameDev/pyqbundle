const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// density -> { icon px, foreground px } - matches Capacitor's own default
// scaffold sizes exactly (foreground is 2.25x the flat icon, the standard
// Android adaptive-icon ratio: 108dp canvas for a 48dp mdpi icon).
const DENSITIES = {
  mdpi: { icon: 48, fg: 108 },
  hdpi: { icon: 72, fg: 162 },
  xhdpi: { icon: 96, fg: 216 },
  xxhdpi: { icon: 144, fg: 324 },
  xxxhdpi: { icon: 192, fg: 432 },
};

const RES_DIR = path.join(__dirname, "..", "android", "app", "src", "main", "res");

async function main() {
  for (const [density, { icon, fg }] of Object.entries(DENSITIES)) {
    const dir = path.join(RES_DIR, `mipmap-${density}`);
    await sharp(path.join(__dirname, "icon-512.svg")).resize(icon, icon).png().toFile(path.join(dir, "ic_launcher.png"));
    await sharp(path.join(__dirname, "icon-round.svg")).resize(icon, icon).png().toFile(path.join(dir, "ic_launcher_round.png"));
    await sharp(path.join(__dirname, "icon-foreground.svg")).resize(fg, fg).png().toFile(path.join(dir, "ic_launcher_foreground.png"));
    console.log(`wrote ${density}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
