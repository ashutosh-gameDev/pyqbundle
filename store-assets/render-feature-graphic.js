const sharp = require("sharp");
const path = require("path");

const BG = "#050506";

async function main() {
  const icon = await sharp(path.join(__dirname, "icon-512.png")).resize(220, 220).png().toBuffer();

  const textSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500">
      <text x="372" y="252" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="700" fill="#ffffff">PYQ Bundle</text>
      <text x="374" y="304" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="400" fill="#9fb8e6">Free PYQs &amp; Mock Tests for Competitive Exams</text>
    </svg>
  `);

  await sharp({ create: { width: 1024, height: 500, channels: 3, background: BG } })
    .composite([
      { input: icon, left: 112, top: 140 },
      { input: textSvg, left: 0, top: 0 },
    ])
    .flatten({ background: BG })
    .png()
    .toFile(path.join(__dirname, "feature-graphic.png"));

  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
