import { ArrowUpRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { navItems, socialLinks } from '../data/siteData'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Logo />
          <p>
            Automatizamos procesos.
            <br />
            Impulsamos negocios.
            <br />
            Somos tu departamento de IA.
          </p>
          <div className="footer-social">
            <span>Síguenos</span>
            <div className="footer-social-icons">
              {socialLinks.map(({ label, href, Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ '--brand': color } as CSSProperties}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <span>Explorar</span>
            {navItems.slice(0, 5).map((item) => (
              <Link key={item.label} to={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <span>Contacto</span>
            <a href="mailto:hello@trek-ia.com">
              hello@trek-ia.com <ArrowUpRight size={14} />
            </a>
            <a href="tel:+34930157006">930 15 70 06</a>
            <Link to="/contacto">Solicitar diagnóstico</Link>
          </div>
          <div className="footer-blog">
            <span>Nuestro Blog</span>
            <p>Ideas prácticas sobre automatización, datos e IA aplicada.</p>
            <Link className="footer-blog-cta" to="/blog">
              Leer el blog <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        {/* El año del prerender puede no coincidir con el del visitante (cambio de año) */}
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} Trek.IA. Tecnología con impacto operativo.
        </span>
        <div className="footer-legal-links">
          <Link to="/aviso-legal">Aviso legal</Link>
          <Link to="/politica-privacidad">Política de privacidad</Link>
          <Link to="/politica-cookies">Política de cookies</Link>
        </div>
      </div>
    </footer>
  )
}
