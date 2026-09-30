import type { RootState } from '@react-three/fiber'

// Se comprueba una sola vez y se libera el contexto de prueba al momento: los navegadores
// limitan cuántos contextos WebGL pueden estar vivos a la vez
let webglSupport: boolean | undefined

export function isWebGLAvailable() {
  if (webglSupport !== undefined) return webglSupport
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    webglSupport = !!gl
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    webglSupport = false
  }
  return webglSupport
}

// Para <Canvas onCreated>: si el navegador pierde el contexto WebGL se muestra la imagen estática
export function watchContextLoss({ gl }: RootState, onLost: () => void) {
  gl.domElement.addEventListener('webglcontextlost', (event) => {
    event.preventDefault()
    onLost()
  })
}
