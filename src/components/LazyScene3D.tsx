import { Component, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { ComponentType, LazyExoticComponent, ReactNode } from 'react'
import type { Picture } from 'vite-imagetools'
import { isWebGLAvailable } from '../lib/webgl'
import { ResponsiveImage } from './ResponsiveImage'
import { Scene3DLoader, type Scene3DStage } from './Scene3DLoader'

export interface Scene3DProps {
  /** El código de la escena ya se ha descargado y el canvas se está montando */
  onLoaded: () => void
  /** La escena ya está montada dentro del canvas */
  onReady: () => void
  /** El canvas no puede funcionar (p. ej. se ha perdido el contexto WebGL) */
  onFail: () => void
}

interface LazyScene3DProps {
  scene: LazyExoticComponent<ComponentType<Scene3DProps>>
  /** Captura de la escena que se muestra si el 3D no puede funcionar */
  fallback: Picture
  fallbackAlt: string
}

// Si la escena no está lista en este tiempo se muestra la imagen estática en su lugar
const READY_TIMEOUT_MS = 20000

// Los errores al montar la escena (también los de dentro del <Canvas>) llegan hasta aquí
class SceneErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('[3D] La escena ha fallado, se muestra la imagen estática:', error)
    this.props.onError()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

// Escena 3D cargada bajo demanda con un loader de porcentaje encima hasta que se monta. Si WebGL
// no está disponible, la escena falla, se pierde el contexto o tarda demasiado, se muestra
// `fallback` en su lugar
export function LazyScene3D({ scene: Scene, fallback, fallbackAlt }: LazyScene3DProps) {
  const [stage, setStage] = useState<Scene3DStage>('download')
  const [failed, setFailed] = useState(() => !isWebGLAvailable())
  const isReady = useRef(false)

  // Las fases solo avanzan: un aviso tardío de "cargado" no devuelve el loader atrás
  const onLoaded = useCallback(() => setStage((prev) => (prev === 'download' ? 'init' : prev)), [])
  const onReady = useCallback(() => {
    isReady.current = true
    setStage('done')
  }, [])
  const onFail = useCallback(() => setFailed(true), [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!isReady.current) setFailed(true)
    }, READY_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [])

  if (failed) {
    return (
      <div className="scene-3d">
        <ResponsiveImage
          className="scene-fallback"
          image={fallback}
          sizes="(max-width: 820px) 100vw, 800px"
          alt={fallbackAlt}
        />
      </div>
    )
  }

  return (
    <div className="scene-3d">
      <SceneErrorBoundary onError={onFail}>
        <Suspense fallback={null}>
          <Scene onLoaded={onLoaded} onReady={onReady} onFail={onFail} />
        </Suspense>
      </SceneErrorBoundary>
      <Scene3DLoader stage={stage} />
    </div>
  )
}
