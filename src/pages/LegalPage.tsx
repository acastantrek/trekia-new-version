import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'

export function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="Aviso legal"
        title="Información legal sobre Trek.IA."
        description="Datos identificativos y condiciones de uso de este sitio web, conforme a la Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE)."
      />
      <section className="section legal-section">
        <div className="container legal-content">
          <Reveal>
            <h2>1. Datos identificativos</h2>
            <p>
              En cumplimiento del deber de información recogido en el artículo 10 de la Ley
              34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio
              Electrónico, se informa de los siguientes datos:
            </p>
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
              <li>
                <strong>Teléfono:</strong> 930 15 70 06
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.04}>
            <h2>2. Objeto</h2>
            <p>
              El presente sitio web tiene como finalidad informar sobre los servicios de software,
              automatización de procesos e inteligencia artificial que presta Kenned Group SL bajo
              la marca Trek.IA, así como facilitar el contacto con potenciales clientes.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2>3. Condiciones de uso</h2>
            <p>
              El acceso y la navegación por este sitio web atribuyen la condición de usuario y
              suponen la aceptación de las condiciones recogidas en este aviso legal. El usuario se
              compromete a hacer un uso adecuado y lícito del sitio web, de conformidad con la
              legislación aplicable, la buena fe y el orden público, absteniéndose de utilizarlo de
              cualquier forma que pueda impedir o dañar su funcionamiento, o los derechos de
              terceros.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h2>4. Propiedad intelectual e industrial</h2>
            <p>
              Todos los contenidos del sitio web, incluyendo a título enunciativo textos,
              fotografías, gráficos, imágenes, iconos, tecnología, software, marcas y demás
              elementos, son propiedad de Kenned Group SL o de terceros que han autorizado su uso,
              y están protegidos por la normativa de propiedad intelectual e industrial. Queda
              prohibida su reproducción, distribución, comunicación pública o transformación total
              o parcial sin autorización expresa del titular.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <h2>5. Exclusión de responsabilidad</h2>
            <p>
              Kenned Group SL no se hace responsable de las interrupciones del servicio, retrasos,
              errores o mal funcionamiento del sitio web derivados de causas ajenas a su control, ni
              de los daños que pudieran derivarse del uso ilícito o inadecuado del mismo por parte
              de terceros. Se reserva el derecho a suspender el acceso al sitio web sin previo
              aviso, con carácter temporal, por razones técnicas o de mantenimiento.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h2>6. Protección de datos</h2>
            <p>
              Los datos personales facilitados a través de los formularios de este sitio web serán
              tratados por Kenned Group SL con la finalidad de atender las solicitudes de contacto
              e información recibidas, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley
              Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos
              digitales. El usuario puede ejercer sus derechos de acceso, rectificación, supresión,
              oposición, limitación y portabilidad dirigiéndose a hello@trek-ia.com.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <h2>7. Legislación aplicable y jurisdicción</h2>
            <p>
              Las presentes condiciones se rigen por la legislación española. Para la resolución de
              cualquier controversia que pudiera derivarse del acceso o uso de este sitio web, las
              partes se someten a los juzgados y tribunales de Barcelona, salvo que la normativa
              aplicable disponga otra cosa.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
