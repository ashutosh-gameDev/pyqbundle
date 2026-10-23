const sharp = require("sharp");
const path = require("path");

// Source is a flat 271x189 PNG (graduation cap glyph on a near-black solid
// background, rgb(5,5,6)) - not square, so first padded to a square canvas
// with that same background color before deriving anything else from it.
const SRC = path.join(__dirname, "icon-source-gradcap.png");
const BG_COLOR = { r: 5, g: 5, b: 6, alpha: 1 };
const RES_DIR = path.join(__dirname, "..", "android", "app", "src", "main", "res");

const DENSITIES = {
  mdpi: { icon: 48, fg: 108 },
  hdpi: { icon: 72, fg: 162 },
  xhdpi: { icon: 96, fg: 216 },
  xxhdpi: { icon: 144, fg: 324 },
  xxxhdpi: { icon: 192, fg: 432 },
};

async function main() {
  const meta = await sharp(SRC).metadata();
  const side = Math.max(meta.width, meta.height);

  // Padded square, background baked in - used for the legacy flat icon
  // (ic_launcher.png/_round.png, which have no separate background layer)
  // and the Play Store listing icon.
  const squareFlat = await sharp(SRC)
    .resize(side, side, { fit: "contain", background: BG_COLOR })
    .flatten({ background: BG_COLOR })
    .png()
    .toBuffer();

  // Foreground layer for adaptive icons - the glyph scaled down to ~70% and
  // centered on a transparent canvas, so it stays inside the safe zone
  // regardless of which mask shape (circle/squircle/rounded square) a
  // launcher applies - a full-bleed foreground gets its corners clipped.
  const glyphOnly = await sharp(SRC)
    .resize(side, side, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  for (const [density, { icon, fg }] of Object.entries(DENSITIES)) {
    const dir = path.join(RES_DIR, `mipmap-${density}`);

    await sharp(squareFlat).resize(icon, icon).png().toFile(path.join(dir, "ic_launcher.png"));
    await sharp(squareFlat).resize(icon, icon).png().toFile(path.join(dir, "ic_launcher_round.png"));

    const glyphSize = Math.round(fg * 0.7);
    const fgCanvas = sharp({
      create: { width: fg, height: fg, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    });
    const glyphResized = await sharp(glyphOnly).resize(glyphSize, glyphSize).toBuffer();
    await fgCanvas
      .composite([{ input: glyphResized, left: Math.round((fg - glyphSize) / 2), top: Math.round((fg - glyphSize) / 2) }])
      .png()
      .toFile(path.join(dir, "ic_launcher_foreground.png"));

    console.log(`wrote ${density}`);
  }

  await sharp(squareFlat).resize(512, 512).png().toFile(path.join(__dirname, "icon-512.png"));
  console.log("wrote store-assets/icon-512.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
