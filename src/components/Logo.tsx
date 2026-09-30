import { Link, useLocation } from 'react-router-dom'
// Se muestra a 30px de alto: basta con versiones pequeñas (1x y 2x)
import logoMark from '../assets/logo-mark-t.png?w=40;80&format=webp&lossless=true&as=picture'
import { ResponsiveImage } from './ResponsiveImage'

export function Logo() {
  const location = useLocation()

  const handleClick = () => {
    if (location.pathname === '/' && !location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <Link className="logo" to="/" aria-label="Trek.IA, inicio" onClick={handleClick}>
      <ResponsiveImage
        className="logo-mark"
        image={logoMark}
        sizes="40px"
        alt=""
        aria-hidden="true"
      />
      <span>Trek.IA</span>
    </Link>
  )
}
