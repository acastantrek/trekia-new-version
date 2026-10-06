// Genera public/og-image.png (preview de redes, 1200x630), los favicons PNG, apple-touch-icon y public/favicon.ico a partir del logo.
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

// Favicons: la T del logo sobre fondo blanco. Se dibujan a 256 px y se reducen al resto de tamaños.
const ICON_SIZE = 256
const logoTrimmed = await sharp('src/assets/logo-mark-t.png').trim().toBuffer()

async function renderIcon({ inset, radius, markWidth }) {
  const square = `
<svg xmlns="http://www.w3.org/2000/svg" width="${ICON_SIZE}" height="${ICON_SIZE}">
  <rect x="${inset}" y="${inset}" width="${ICON_SIZE - inset * 2}" height="${ICON_SIZE - inset * 2}" rx="${radius}" fill="#ffffff" />
</svg>`
  const mark = await sharp(logoTrimmed).resize({ width: markWidth }).toBuffer()
  const { width, height } = await sharp(mark).metadata()
  return sharp(Buffer.from(square))
    .composite([{ input: mark, left: Math.round((ICON_SIZE - width) / 2), top: Math.round((ICON_SIZE - height) / 2) }])
    .png()
    .toBuffer()
}

const favicon = await renderIcon({ inset: 0, radius: 52, markWidth: 196 })
for (const size of [32, 48, 256]) {
  await sharp(favicon).resize(size, size).png({ compressionLevel: 9 }).toFile(`public/favicon-${size}.png`)
}
// iOS redondea las esquinas por su cuenta: cuadrado blanco completo
const appleIcon = await renderIcon({ inset: 0, radius: 0, markWidth: 150 })
await sharp(appleIcon).resize(180, 180).flatten({ background: '#ffffff' }).png({ compressionLevel: 9 }).toFile('public/apple-touch-icon.png')

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

console.log('Generados public/og-image.png, los favicons y public/favicon.ico')
