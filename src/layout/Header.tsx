import { ChevronDown, Menu, X, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { businessAreas } from '../data/businessAreas'
import { navItems, sectors, socialLinks } from '../data/siteData'
import { Logo } from '../components/Logo'
import { useFocusTrap } from '../hooks/useFocusTrap'

interface NavDropdownItem {
  to: string
  title: string
  Icon: LucideIcon
}

// Desplegables del menú desktop, indexados por el href del enlace principal
const navDropdowns: Record<string, NavDropdownItem[] | undefined> = {
  '/sectores': sectors.map((sector) => ({
    to: `/sectores#${sector.slug}`,
    title: sector.label,
    Icon: sector.icon,
  })),
  '/que-hacemos': businessAreas.map((area) => ({
    to: `/servicios/${area.slug}`,
    title: area.title,
    Icon: area.icon,
  })),
}

interface HeaderProps {
  // El estado del menú móvil vive en SiteLayout, que oculta el banner de cookies mientras está abierto
  menuOpen: boolean
  onMenuOpenChange: (open: boolean) => void
}

export function Header({ menuOpen: open, onMenuOpenChange: setOpen }: HeaderProps) {
  // Si el menú se cierra al pulsar un enlace no se vuelve a la posición anterior: SiteLayout lleva
  // la página nueva arriba y restaurarla provocaría un salto
  const closingToNavigate = useRef(false)
  const closeToNavigate = () => {
    if (open) closingToNavigate.current = true
    setOpen(false)
  }
  const [scrolled, setScrolled] = useState(false)
  const [closedDropdown, setClosedDropdown] = useState<string | null>(null)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const scrollY = window.scrollY
    const { body } = document
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    return () => {
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      if (!closingToNavigate.current)
        window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' })
      closingToNavigate.current = false
    }
  }, [open])

  // Menú móvil abierto: el foco no sale del panel y del botón de cerrar, y Escape lo cierra
  const actionsRef = useRef<HTMLDivElement>(null)
  useFocusTrap(actionsRef, open, () => setOpen(false))

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <div className="header-brand">
          <Logo />
          <div className="header-social">
            {socialLinks.map(({ label, href, Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ '--brand': color } as CSSProperties}
              >
                <Icon size={19} />
                <span className="header-social-tooltip" aria-hidden="true">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="header-actions" ref={actionsRef}>
          <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navegación principal">
            <div className="nav-links">
              {navItems.map((item) => {
                const dropdownItems = navDropdowns[item.href]
                const link = (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                    onClick={(event) => {
                      // Con ratón, quita el foco para que :focus-within no deje el desplegable
                      // abierto al salir; con teclado (detail === 0) se mantiene
                      if (event.detail > 0) event.currentTarget.blur()
                      closeToNavigate()
                    }}
                  >
                    {item.label}
                    {dropdownItems && (
                      <ChevronDown className="nav-caret" size={14} aria-hidden="true" />
                    )}
                  </NavLink>
                )
                if (!dropdownItems) return link
                return (
                  <div
                    className={`nav-item has-dropdown ${closedDropdown === item.href ? 'is-closed' : ''}`}
                    key={item.label}
                    onMouseLeave={() => setClosedDropdown(null)}
                    // Con teclado no hay mouseleave: al volver a entrar con el foco se reabre
                    onFocus={(event) => {
                      if (event.target.matches(':focus-visible')) setClosedDropdown(null)
                    }}
                  >
                    {link}
                    <div className="nav-dropdown">
                      <div className="nav-dropdown-panel">
                        {dropdownItems.map(({ to, title, Icon }, index) => (
                          <Link
                            key={to}
                            to={to}
                            style={{ '--i': index } as CSSProperties}
                            onClick={(event) => {
                              // Cierra el desplegable aunque el ratón siga encima
                              event.currentTarget.blur()
                              setClosedDropdown(item.href)
                            }}
                          >
                            <span className="nav-dropdown-icon">
                              <Icon size={17} />
                            </span>
                            <span className="nav-dropdown-text">
                              <strong>{title}</strong>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <Link className="nav-cta" to="/contacto" onClick={closeToNavigate}>
              Diagnóstico gratuito <span>↗</span>
            </Link>
          </nav>
          {/* Selector de tema (claro / mixto / oscuro) oculto por ahora: para recuperarlo,
              volver a renderizar aquí <ThemeToggle /> de '../components/ThemeToggle' */}
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  )
}
