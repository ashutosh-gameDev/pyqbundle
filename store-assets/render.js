const sharp = require("sharp");
const path = require("path");

async function main() {
  await sharp(path.join(__dirname, "icon-512.svg")).resize(512, 512).png().toFile(path.join(__dirname, "icon-512.png"));

  // Feature graphic must have NO alpha channel (Play Console requirement) -
  // flatten onto an opaque background before encoding.
  await sharp(path.join(__dirname, "feature-graphic.svg"))
    .resize(1024, 500)
    .flatten({ background: "#1c5aa8" })
    .png()
    .toFile(path.join(__dirname, "feature-graphic.png"));

  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
