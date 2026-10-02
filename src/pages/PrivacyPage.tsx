import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'

export function PrivacyPage() {
  return (
    <>
      <Seo
        title="Política de privacidad"
        description="Cómo trata Trek.IA los datos personales recogidos en este sitio web, conforme al RGPD y la LOPDGDD, y cómo ejercer tus derechos."
      />
      <PageHero
        eyebrow="Política de privacidad"
        title="Cómo tratamos tus datos personales."
        description="Información sobre el tratamiento de datos personales recogidos a través de este sitio web, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD)."
      />
      <section className="section legal-section">
        <div className="container legal-content">
          <Reveal>
            <h2>1. Responsable del tratamiento</h2>
            <ul>
              <li>
                <strong>Razón social:</strong> Kenned Group SL
              </li>
              <li>
                <strong>Nombre comercial:</strong> Trek.IA
              </li>
              <li>
                <strong>CIF:</strong> B66788605
              </li>
              <li>
                <strong>Domicilio:</strong> Gran Via de Carles III, 53, entlo 5ª, Les Corts, 08028
                Barcelona
              </li>
              <li>
                <strong>Correo electrónico:</strong> hello@trek-ia.com
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.04}>
            <h2>2. Finalidad del tratamiento</h2>
            <p>
              Los datos personales que nos facilitas a través de los formularios de contacto y
              diagnóstico se tratan con las siguientes finalidades: responder a tus consultas y
              valorar tu solicitud de diagnóstico o presupuesto. No se utilizan para enviarte
              comunicaciones comerciales, no se toman decisiones automatizadas ni se elaboran
              perfiles a partir de estos datos.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2>3. Legitimación</h2>
            <p>
              La base legal para el tratamiento de tus datos es tu consentimiento, otorgado al
              marcar la casilla correspondiente y enviar el formulario, así como la ejecución de
              medidas precontractuales a solicitud tuya cuando el contacto tiene como fin valorar la
              prestación de un servicio.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h2>4. Conservación de los datos</h2>
            <p>
              Los datos se conservarán durante el tiempo necesario para atender tu solicitud y,
              posteriormente, mientras no se solicite su supresión, durante el plazo en el que
              pudieran derivarse responsabilidades legales.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <h2>5. Destinatarios</h2>
            <p>
              No se ceden datos a terceros salvo obligación legal. Determinados proveedores de
              servicios tecnológicos (hosting, envío de formularios) pueden acceder a los datos como
              encargados del tratamiento, en cumplimiento del artículo 28 del RGPD y siempre bajo un
              contrato que garantiza la confidencialidad y seguridad de la información.
            </p>
            <p>
              En concreto, los datos que envías a través del formulario de contacto (nombre,
              empresa, email, teléfono y mensaje) se transmiten mediante el servicio Web3Forms, que
              los reenvía a nuestro correo electrónico. El sitio web está alojado en Vercel Inc.
              Algunos de estos proveedores pueden tratar los datos fuera del Espacio Económico
              Europeo; en ese caso, las transferencias internacionales se realizan con las garantías
              adecuadas previstas en el RGPD, como las cláusulas contractuales tipo aprobadas por la
              Comisión Europea.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h2>6. Derechos del interesado</h2>
            <p>
              Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión,
              oposición, limitación del tratamiento y portabilidad de los datos, dirigiéndote por
              escrito a hello@trek-ia.com, adjuntando copia de un documento que acredite tu
              identidad. Asimismo, tienes derecho a presentar una reclamación ante la Agencia
              Española de Protección de Datos (www.aepd.es) si consideras que el tratamiento no se
              ajusta a la normativa vigente.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <h2>7. Origen de los datos</h2>
            <p>
              Los únicos datos que se tratan son los que el propio interesado facilita
              voluntariamente a través de los formularios de este sitio web.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <h2>8. Cambios en esta política</h2>
            <p>
              Esta política de privacidad puede actualizarse para adaptarse a cambios normativos o
              en la forma en que tratamos los datos. Te recomendamos revisarla periódicamente. Para
              cualquier duda sobre el tratamiento de tus datos, puedes consultar también nuestro{' '}
              <Link to="/aviso-legal">aviso legal</Link>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
