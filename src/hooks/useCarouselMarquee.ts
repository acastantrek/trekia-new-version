import { useEffect, useRef, type RefObject } from 'react'

const DESKTOP_QUERY = '(min-width: 821px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

// En desktop desplaza el carrusel sin parar, lentamente, hacia la izquierda. El track debe
// renderizar las `itemCount` cards dos veces: al llegar a la copia se vuelve atrás exactamente
// una vuelta, así el primero reaparece por la derecha sin salto. Se pausa con el ratón encima.
export function useCarouselMarquee(
  trackRef: RefObject<HTMLElement | null>,
  itemCount: number,
  speed = 60,
) {
  const pausedRef = useRef(false)

  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return
    const desktop = window.matchMedia(DESKTOP_QUERY)
    let frame = 0
    let last = performance.now()
    let position = trackRef.current?.scrollLeft ?? 0

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100)
      last = now
      frame = requestAnimationFrame(tick)
      const track = trackRef.current
      const first = track?.children[0] as HTMLElement | undefined
      const firstClone = track?.children[itemCount] as HTMLElement | undefined
      if (!track || !first || !firstClone || !desktop.matches || pausedRef.current) return
      // Si el usuario ha movido el carrusel a mano, se continúa desde ahí
      if (Math.abs(track.scrollLeft - position) > 2) position = track.scrollLeft
      const loopWidth = firstClone.offsetLeft - first.offsetLeft
      position += (speed * dt) / 1000
      if (position >= loopWidth) position -= loopWidth
      track.scrollLeft = position
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [trackRef, itemCount, speed])

  return {
    onMouseEnter: () => {
      pausedRef.current = true
    },
    onMouseLeave: () => {
      pausedRef.current = false
    },
  }
}
