/**
 * Converts source photos in public/images/hubs/{category}/fN.(png|jpg|jpeg)
 * into web-sized WebP files next to them, then deletes the source:
 *   fN.webp     – max 1280px wide (cards, bands, heroes)
 *   fN-sm.webp  – max 480px wide (thumbnails, reels, sliders)
 *
 * Run from frontend/: `npm run images:hubs`
 */
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/images/hubs");
const SIZES = [
  { suffix: "", width: 1280, quality: 78 },
  { suffix: "-sm", width: 480, quality: 72 },
];

let before = 0;
let after = 0;

for (const category of await readdir(ROOT)) {
  const dir = path.join(ROOT, category);
  if (!(await stat(dir)).isDirectory()) continue;

  for (const name of await readdir(dir)) {
    if (!/\.(png|jpe?g)$/i.test(name)) continue;
    const source = path.join(dir, name);
    const base = name.replace(/\.[a-z]+$/i, "");
    before += (await stat(source)).size;

    for (const { suffix, width, quality } of SIZES) {
      const out = path.join(dir, `${base}${suffix}.webp`);
      const info = await sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 5 })
        .toFile(out);
      after += info.size;
    }
    await unlink(source);
    console.log(`${category}/${base}`);
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`${mb(before)} MB -> ${mb(after)} MB`);
