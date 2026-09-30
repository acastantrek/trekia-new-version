import { Cookie } from 'lucide-react'

interface CookieSettingsButtonProps {
  onClick: () => void
}

export function CookieSettingsButton({ onClick }: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      className="cookie-settings-button"
      onClick={onClick}
      aria-label="Configuración de cookies"
    >
      <Cookie size={28} />
    </button>
  )
}
