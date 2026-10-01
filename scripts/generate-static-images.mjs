// Genera public/og-image.png (preview de redes, 1200x630) y public/favicon.ico a partir del logo.
// Se ejecuta a mano cuando cambie el logo o el texto: node scripts/generate-static-images.mjs
import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const OG_WIDTH = 1200
const OG_HEIGHT = 630
const LOGO_SIZE = 150

const background = `
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}">
  <defs>
    <radialGradient id="glow-blue" cx="85%" cy="15%" r="60%">
      <stop offset="0%" stop-color="#4f8cff" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#4f8cff" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow-violet" cx="10%" cy="100%" r="55%">
      <stop offset="0%" stop-color="#7c5cff" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#7c5cff" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#4f8cff" />
      <stop offset="55%" stop-color="#38d6ff" />
      <stop offset="100%" stop-color="#7c5cff" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#050713" />
  <rect width="100%" height="100%" fill="url(#glow-blue)" />
  <rect width="100%" height="100%" fill="url(#glow-violet)" />
  <g font-family="Manrope, 'Segoe UI', Arial, sans-serif" fill="#eef2ff">
    <text x="${96 + LOGO_SIZE + 28}" y="208" font-size="64" font-weight="800">Trek.IA</text>
    <text x="96" y="352" font-size="58" font-weight="800">Automatizamos procesos.</text>
    <text x="96" y="428" font-size="58" font-weight="800" fill="url(#accent)">Impulsamos negocios.</text>
    <text x="96" y="520" font-size="30" fill="#9aa6c8">Software, automatización e IA aplicada para empresas</text>
  </g>
  <rect x="96" y="560" width="120" height="6" rx="3" fill="url(#accent)" />
</svg>`

const logo = await sharp('src/assets/logo-mark-t.png')
  .resize(LOGO_SIZE, LOGO_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer()

await sharp(Buffer.from(background))
  .composite([{ input: logo, left: 96, top: 92 }])
  .png({ compressionLevel: 9 })
  .toFile('public/og-image.png')

// ICO con los PNG de 32 y 48 px dentro (formato admitido por todos los navegadores actuales)
const pngs = await Promise.all(['public/favicon-32.png', 'public/favicon-48.png'].map((f) => readFile(f)))
const header = Buffer.alloc(6 + 16 * pngs.length)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(pngs.length, 4)
let offset = header.length
pngs.forEach((png, index) => {
  const size = png.readUInt32BE(16)
  const entry = 6 + 16 * index
  header.writeUInt8(size, entry)
  header.writeUInt8(size, entry + 1)
  header.writeUInt16LE(1, entry + 4)
  header.writeUInt16LE(32, entry + 6)
  header.writeUInt32LE(png.length, entry + 8)
  header.writeUInt32LE(offset, entry + 12)
  offset += png.length
})
await writeFile('public/favicon.ico', Buffer.concat([header, ...pngs]))

console.log('Generados public/og-image.png y public/favicon.ico')
