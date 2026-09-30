import { useEffect } from 'react'

interface SceneReadySignalProps {
  onReady: () => void
}

// Avisa en cuanto la escena se ha montado dentro del canvas (el <Suspense> ya ha resuelto). No se
// esperan fotogramas pintados: si el bucle de render tarda o no arranca, el loader no se queda
// clavado
export function SceneReadySignal({ onReady }: SceneReadySignalProps) {
  useEffect(() => {
    onReady()
  }, [onReady])
  return null
}
