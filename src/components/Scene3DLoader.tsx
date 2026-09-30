import { useEffect, useId, useRef, useState } from 'react'

export type Scene3DStage = 'download' | 'init' | 'done'

// El navegador no informa del progreso real de la descarga y el arranque de WebGL, así que el
// porcentaje avanza hacia un tope por fase y solo llega al 100% cuando la escena ya se ha pintado
const STAGE_CAP: Record<Scene3DStage, number> = { download: 70, init: 94, done: 100 }
const STAGE_SPEED: Record<Scene3DStage, number> = { download: 0.035, init: 0.05, done: 0.22 }

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface Scene3DLoaderProps {
  stage: Scene3DStage
}

export function Scene3DLoader({ stage }: Scene3DLoaderProps) {
  const gradientId = useId()
  const value = useRef(0)
  const [progress, setProgress] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    let frame = 0
    const tick = () => {
      const cap = STAGE_CAP[stage]
      value.current += (cap - value.current) * STAGE_SPEED[stage]
      if (stage === 'done' && value.current > 99.5) {
        setProgress(100)
        setFinished(true)
        return
      }
      setProgress(Math.floor(value.current))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [stage])

  return (
    <div
      className={`scene-loader ${finished ? 'is-hidden' : ''}`}
      role="progressbar"
      aria-label="Cargando figura 3D"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-hidden={finished}
    >
      <div className="scene-loader-ring">
        <span className="scene-loader-orbit" />
        <svg viewBox="0 0 120 120">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--blue)" />
              <stop offset="55%" stopColor="var(--cyan)" />
              <stop offset="100%" stopColor="var(--violet)" />
            </linearGradient>
          </defs>
          <circle className="scene-loader-track" cx="60" cy="60" r={RADIUS} />
          <circle
            className="scene-loader-progress"
            cx="60"
            cy="60"
            r={RADIUS}
            stroke={`url(#${gradientId})`}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
          />
        </svg>
        <div className="scene-loader-value">
          <strong>{progress}</strong>
          <small>%</small>
        </div>
      </div>
      <p className="scene-loader-text">Cargando figura 3D</p>
    </div>
  )
}
