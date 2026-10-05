import { useEffect, useEffectEvent, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface FocusTrapOptions {
  /** Al activarse, mueve el foco al propio contenedor (necesita `tabIndex={-1}`) */
  focusContainer?: boolean
  /** Dónde devolver el foco al cerrar, si el elemento que lo tenía se oculta al abrir (con
   *  `display: none` el navegador le quita el foco antes de que este hook pueda guardarlo) */
  returnFocusRef?: RefObject<HTMLElement | null>
}

// Mientras `active`, Tab y Mayús+Tab no salen del contenedor y Escape llama a `onEscape`. Al
// desactivarse, si el foco estaba dentro (o se perdió porque el contenedor desapareció), vuelve al
// elemento que lo tenía al activarse: el botón que abrió el menú o el modal
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  onEscape: () => void,
  { focusContainer = false, returnFocusRef }: FocusTrapOptions = {},
) {
  const escape = useEffectEvent(onEscape)

  useEffect(() => {
    const container = containerRef.current
    if (!active || !container) return
    const opener =
      returnFocusRef?.current ??
      (document.activeElement instanceof HTMLElement ? document.activeElement : null)
    if (focusContainer) container.focus({ preventScroll: true })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        escape()
        return
      }
      if (event.key !== 'Tab') return
      // Solo los que se ven: en móvil los desplegables del menú desktop siguen en el DOM ocultos
      const focusable = [...container.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (element) => element.getClientRects().length > 0,
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const current = document.activeElement
      const outside = !container.contains(current)
      if (event.shiftKey && (current === first || current === container || outside)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (current === last || outside)) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      const current = document.activeElement
      const focusWasInside =
        current === document.body || current === null || container.contains(current)
      if (focusWasInside && opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [active, containerRef, focusContainer, returnFocusRef])
}
