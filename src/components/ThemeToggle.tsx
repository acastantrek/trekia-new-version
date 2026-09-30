import { Moon, Sun, SunMoon, type LucideIcon } from 'lucide-react'
import { THEMES, useTheme, type Theme } from '../hooks/useTheme'

const options: Record<Theme, { icon: LucideIcon; label: string }> = {
  light: { icon: Sun, label: 'Modo claro' },
  mixed: { icon: SunMoon, label: 'Modo mixto' },
  dark: { icon: Moon, label: 'Modo oscuro' },
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Tema de color">
      <span
        className="theme-toggle-thumb"
        style={{ transform: `translateX(${THEMES.indexOf(theme) * 100}%)` }}
      />
      {THEMES.map((value) => {
        const { icon: Icon, label } = options[value]
        const active = value === theme
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            className={`theme-toggle-option ${active ? 'is-active' : ''}`}
            onClick={() => setTheme(value)}
          >
            <Icon size={13} />
          </button>
        )
      })}
    </div>
  )
}
