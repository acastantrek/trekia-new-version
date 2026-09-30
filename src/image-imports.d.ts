// Las imágenes importadas pasan por vite-imagetools (ver vite.config.ts) y llegan como `Picture`.
// Este archivo se referencia antes que vite/client para sustituir su tipado de `string`.
declare module '*.jpg' {
  const picture: import('vite-imagetools').Picture
  export default picture
}
declare module '*.jpeg' {
  const picture: import('vite-imagetools').Picture
  export default picture
}
declare module '*.png' {
  const picture: import('vite-imagetools').Picture
  export default picture
}
declare module '*.webp' {
  const picture: import('vite-imagetools').Picture
  export default picture
}
// Imports con directivas explícitas (p. ej. `logo.png?w=40;80&format=webp&as=picture`)
declare module '*as=picture' {
  const picture: import('vite-imagetools').Picture
  export default picture
}
