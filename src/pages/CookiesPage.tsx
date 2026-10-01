import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'

export function CookiesPage() {
  return (
    <>
      <Seo
        title="Política de cookies"
        description="Información sobre las cookies que utiliza el sitio web de Trek.IA y cómo puedes gestionarlas o desactivarlas."
      />
      <PageHero
        eyebrow="Política de cookies"
        title="Cómo usamos las cookies en este sitio."
        description="Información sobre las cookies que utiliza este sitio web y cómo puedes gestionarlas."
      />
      <section className="section legal-section">
        <div className="container legal-content">
          <Reveal>
            <h2>1. Qué son las cookies</h2>
            <p>
              Las cookies son pequeños archivos de texto que un sitio web guarda en tu navegador
              para recordar información entre visitas, como preferencias o el estado de una
              sesión.
            </p>
          </Reveal>

          <Reveal delay={0.04}>
            <h2>2. Cookies que utilizamos</h2>
            <p>
              Este sitio utiliza únicamente cookies técnicas necesarias para su funcionamiento,
              como la que guarda tu elección sobre este mismo aviso de cookies, para no volver a
              mostrártelo en cada visita. No utilizamos cookies de análisis, publicidad ni
              seguimiento de terceros.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2>3. Cómo gestionar o desactivar las cookies</h2>
            <p>
              Puedes eliminar o bloquear las cookies desde la configuración de tu navegador. Ten
              en cuenta que bloquear las cookies técnicas puede afectar al funcionamiento correcto
              del sitio.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h2>4. Cambios en esta política</h2>
            <p>
              Si en el futuro incorporamos cookies de análisis o de terceros, actualizaremos esta
              página y solicitaremos tu consentimiento antes de activarlas, conforme a la
              normativa vigente.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
