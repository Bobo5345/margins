/**
 * Strips the white background from the logos in /logo and writes
 * transparent, trimmed PNG + WebP files to /public/logos.
 *
 *   npm run logos
 *
 * Method: flood-fill from the image border through "near-white" pixels.
 * Only white that touches the outside is removed, so white details
 * enclosed inside a logo (e.g. lettering inside the NCERC gear) survive.
 * Pixels on the boundary get partial alpha based on their whiteness,
 * with the white "un-mixed" out of their colour, so edges have no halo.
 */
import sharp from 'sharp'
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'logo'
const OUT = 'public/logos'
const HARD = 238 // >= this on every channel counts as background white
const SOFT = 200 // between SOFT and HARD: anti-aliased edge, partially transparent

const whiteness = (r, g, b) => Math.min(r, g, b)

async function removeBackground(file) {
  const { data, info } = await sharp(path.join(SRC, file))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info
  const px = (x, y) => (y * w + x) * 4

  // 1. Flood fill background from every border pixel.
  const bg = new Uint8Array(w * h)
  const stack = []
  const pushIfWhite = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return
    const k = y * w + x
    if (bg[k]) return
    const i = k * 4
    if (whiteness(data[i], data[i + 1], data[i + 2]) >= HARD) {
      bg[k] = 1
      stack.push(x, y)
    }
  }
  for (let x = 0; x < w; x++) pushIfWhite(x, 0), pushIfWhite(x, h - 1)
  for (let y = 0; y < h; y++) pushIfWhite(0, y), pushIfWhite(w - 1, y)
  while (stack.length) {
    const y = stack.pop()
    const x = stack.pop()
    pushIfWhite(x + 1, y), pushIfWhite(x - 1, y), pushIfWhite(x, y + 1), pushIfWhite(x, y - 1)
  }

  // 2. Clear background; feather pixels that border it.
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const k = y * w + x
      const i = px(x, y)
      if (bg[k]) {
        data[i + 3] = 0
        continue
      }
      const touchesBg =
        (x > 0 && bg[k - 1]) || (x < w - 1 && bg[k + 1]) || (y > 0 && bg[k - w]) || (y < h - 1 && bg[k + w])
      if (!touchesBg) continue
      const wv = whiteness(data[i], data[i + 1], data[i + 2])
      if (wv <= SOFT) continue
      const a = 1 - (wv - SOFT) / (255 - SOFT) // 1 = opaque, 0 = pure white
      data[i + 3] = Math.round(255 * a)
      // Remove the white that was blended into this edge pixel.
      for (let c = 0; c < 3; c++) {
        data[i + c] = Math.max(0, Math.min(255, Math.round((data[i + c] - 255 * (1 - a)) / Math.max(a, 0.01))))
      }
    }
  }

  const base = path.parse(file).name.toLowerCase()
  const img = sharp(data, { raw: { width: w, height: h, channels: 4 } }).trim({ threshold: 1 })
  const buf = await img.png().toBuffer()
  await sharp(buf).png({ compressionLevel: 9 }).toFile(path.join(OUT, `${base}.png`))
  await sharp(buf).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT, `${base}.webp`))
  const meta = await sharp(buf).metadata()
  console.log(`${file} -> ${base}.png/.webp (${meta.width}x${meta.height})`)
}

await mkdir(OUT, { recursive: true })
for (const file of await readdir(SRC)) {
  if (/\.(jpe?g|png)$/i.test(file)) await removeBackground(file)
}
