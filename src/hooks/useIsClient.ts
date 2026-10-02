import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

// false en el prerender y durante la hidratación, true después. Para lo que depende del navegador
// (almacenamiento, WebGL…): así el primer render del cliente coincide con el HTML prerenderizado
// y no hay errores de hidratación
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
