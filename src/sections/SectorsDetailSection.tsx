import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { sectors } from '../data/siteData'
import { ResponsiveImage } from '../components/ResponsiveImage'

// Contenido de cada sector, en el mismo orden que `sectors` de siteData
const sectorDetails = [
  {
    heading: 'Rutas, entregas y almacenes coordinados sin depender del teléfono',
    paragraphs: [
      'En logística, cada minuto cuenta y cada error se multiplica: un pedido mal asignado, una ruta que no se actualiza o una incidencia que nadie registra acaban en retrasos, costes extra y clientes que llaman para preguntar dónde está su envío.',
      'Conectamos el sistema de gestión de almacén, el TMS y las herramientas de los conductores para que la información fluya sola, y automatizamos las tareas que hoy se resuelven con llamadas, correos y hojas de cálculo.',
    ],
    examples: [
      'Seguimiento de envíos en tiempo real y avisos automáticos al cliente',
      'Asignación de pedidos y planificación de rutas a partir de reglas claras',
      'Registro de incidencias y albaranes digitales desde el móvil',
    ],
    imageAlt: 'Carretilla elevadora moviendo palés entre las estanterías de un almacén',
  },
  {
    heading: 'Producción conectada, del pedido a la planta',
    paragraphs: [
      'En la industria conviven sistemas de muchas épocas: un ERP que gestiona pedidos, máquinas que generan datos que nadie consulta y partes de producción que se siguen rellenando en papel y se pasan a mano.',
      'Integramos esos sistemas para que las órdenes de producción, el consumo de materiales y la calidad se registren una sola vez y estén disponibles para quien los necesita, con trazabilidad completa de cada lote.',
    ],
    examples: [
      'Partes de producción digitales conectados con el ERP',
      'Trazabilidad de lotes y materiales de principio a fin',
      'Paneles de OEE, paradas y rendimiento por línea',
    ],
    imageAlt: 'Operarias trabajando en una línea de montaje industrial',
  },
  {
    heading: 'Menos carga administrativa, más tiempo para las personas',
    paragraphs: [
      'En el ámbito sanitario, la gestión administrativa resta cada día horas a la atención: citas, autorizaciones, facturación a aseguradoras o inventario de material que se controla con procesos manuales y propensos a error.',
      'Automatizamos esos flujos respetando la confidencialidad de los datos y la normativa, para que los equipos clínicos y de gestión dediquen su tiempo a lo que de verdad importa.',
    ],
    examples: [
      'Gestión de citas y recordatorios automáticos a pacientes',
      'Validación y facturación a aseguradoras sin tareas repetitivas',
      'Control de stock de material sanitario y caducidades',
    ],
    imageAlt: 'Profesional sanitaria con bata sujetando un estetoscopio',
  },
  {
    heading: 'Stock, pedidos y canales siempre sincronizados',
    paragraphs: [
      'En retail y distribución, el problema rara vez es vender: es saber en todo momento qué hay, dónde está y cuándo reponerlo, cuando las ventas llegan por tienda física, ecommerce, marketplaces y comerciales al mismo tiempo.',
      'Unificamos la información de todos los canales en un único flujo, automatizamos la reposición y damos visibilidad real del margen por producto, tienda o cliente.',
    ],
    examples: [
      'Inventario sincronizado entre tiendas, almacén y ecommerce',
      'Pedidos de reposición automáticos según rotación y stock mínimo',
      'Informes de ventas y margen actualizados sin exportar datos',
    ],
    imageAlt: 'Pasillo de un supermercado con estanterías llenas de productos',
  },
  {
    heading: 'Reservas, equipos y operaciones bajo control en temporada alta',
    paragraphs: [
      'En hostelería y turismo, la demanda cambia de un día para otro y la operación tiene que adaptarse al momento: reservas que llegan por varios canales, turnos que se reorganizan y proveedores que hay que coordinar.',
      'Conectamos el PMS, los canales de reserva y las herramientas internas para que la información esté al día y el equipo pueda centrarse en la experiencia del cliente.',
    ],
    examples: [
      'Reservas centralizadas desde todos los canales de venta',
      'Planificación de turnos y tareas de limpieza o mantenimiento',
      'Previsión de ocupación y compras a proveedores',
    ],
    imageAlt: 'Camarera preparando las mesas de un restaurante',
  },
  {
    heading: 'Procesos internos más ágiles para empresas de servicios',
    paragraphs: [
      'En las empresas de servicios, el valor está en las personas, pero una parte importante de su tiempo se va en tareas que no lo aportan: preparar presupuestos, imputar horas, perseguir facturas o buscar documentos.',
      'Automatizamos esos procesos y conectamos CRM, facturación y gestión de proyectos para que cada cliente, proyecto y hora tenga una única fuente de verdad.',
    ],
    examples: [
      'Presupuestos y propuestas generados a partir de plantillas y datos del CRM',
      'Imputación de horas y rentabilidad por proyecto en tiempo real',
      'Facturación y seguimiento de cobros automatizados',
    ],
    imageAlt: 'Tres profesionales revisando documentos en una reunión de oficina',
  },
]

const indexFromHash = (hash: string) =>
  Math.max(
    0,
    sectors.findIndex((sector) => `#${sector.slug}` === hash),
  )

// Los seis sectores en un solo bloque con pestañas. Los enlaces /sectores#slug (menú y home)
// abren directamente la pestaña de ese sector
export function SectorsDetailSection() {
  const location = useLocation()
  const [active, setActive] = useState(() => indexFromHash(location.hash))
  const [prevHash, setPrevHash] = useState(location.hash)

  if (location.hash !== prevHash) {
    setPrevHash(location.hash)
    if (location.hash) setActive(indexFromHash(location.hash))
  }

  const sector = sectors[active]
  const detail = sectorDetails[active]

  return (
    <section className="section sectors-detail">
      {/* Anclas para el scroll de /sectores#slug: el panel solo muestra un sector cada vez */}
      {sectors.map((item) => (
        <span className="sectors-anchor" id={item.slug} key={item.slug} aria-hidden="true" />
      ))}
      <div className="container">
        <Reveal>
          <div className="tabs-nav sectors-tabs" role="tablist" aria-label="Sectores">
            {sectors.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  id={`sector-tab-${item.slug}`}
                  aria-selected={index === active}
                  aria-controls="sector-panel"
                  className={`tab ${index === active ? 'is-active' : ''}`}
                  onClick={() => setActive(index)}
                >
                  <span className="tab-badge">
                    <Icon size={18} />
                  </span>
                  <span className="tab-text">
                    <strong>{item.label}</strong>
                  </span>
                </button>
              )
            })}
          </div>
          <div
            className="tab-panel"
            id="sector-panel"
            role="tabpanel"
            aria-labelledby={`sector-tab-${sector.slug}`}
            key={active}
          >
            <div className="tab-panel-media">
              <ResponsiveImage
                image={sector.image}
                sizes="(max-width: 820px) 100vw, 480px"
                alt={detail.imageAlt}
                loading="lazy"
              />
            </div>
            <div className="tab-panel-content">
              <span className="process-step-label">{sector.label}</span>
              <h3>{detail.heading}</h3>
              {detail.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <ul className="sector-detail-examples">
                {detail.examples.map((example) => (
                  <li key={example}>
                    <CheckCircle2 size={18} />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
