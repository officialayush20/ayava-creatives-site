const sharp = require("sharp");
const path = require("path");

const downloads = "C:\\Users\\adity\\Downloads";
const src2 = path.join(downloads, "WhatsApp Image 2026-08-07 at 3.19.44 PM (1).jpeg");

async function keyOutBlack(src, threshold) {
  const img = sharp(src).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum <= threshold) {
      data[i + 3] = 0;
    } else if (lum <= threshold + 20) {
      data[i + 3] = Math.round((255 * (lum - threshold)) / 20);
    }
  }
  return { data, info };
}

// The wordmark/glyph strokes are near-white + low saturation; the wave mark
// is teal/blue/green + high saturation. Recolor only the low-saturation
// (white) pixels to graphite ink so the mark works on a light background,
// leaving the gradient wave untouched.
function recolorWhiteToGraphite(data, info, inkHex) {
  const { channels } = info;
  const ink = [
    parseInt(inkHex.slice(1, 3), 16),
    parseInt(inkHex.slice(3, 5), 16),
    parseInt(inkHex.slice(5, 7), 16),
  ];
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a === 0) continue;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (sat < 0.15 && lum > 60) {
      // white/gray stroke pixel -> blend toward graphite, preserving its
      // original alpha/antialiasing so edges stay soft
      const mix = lum / 255; // brighter (more opaque-looking) pixels stay closer to full ink
      data[i] = Math.round(ink[0]);
      data[i + 1] = Math.round(ink[1]);
      data[i + 2] = Math.round(ink[2]);
      data[i + 3] = Math.round(a * Math.min(1, mix + 0.35));
    }
  }
}

(async () => {
  const { data, info } = await keyOutBlack(src2, 18);
  // Transparent master — colorful mark + white wordmark, for use on dark surfaces
  await sharp(Buffer.from(data), { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png()
    .toFile("public/logo-mark-dark-bg.png");

  // Light-background variant — wordmark recolored to graphite ink
  const dataCopy = Buffer.from(data);
  recolorWhiteToGraphite(dataCopy, info, "#1C1B1B");
  await sharp(dataCopy, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .trim()
    .png()
    .toFile("public/logo-mark-light-bg.png");

  await sharp(Buffer.from(data), { raw: { width: info.width, height: info.height, channels: info.channels } })
    .trim()
    .png()
    .toFile("public/logo-mark-dark-bg.png");

  console.log("done");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
