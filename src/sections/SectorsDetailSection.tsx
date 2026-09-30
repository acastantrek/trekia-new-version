import { CheckCircle2 } from 'lucide-react'
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

export function SectorsDetailSection() {
  return (
    <section className="section sectors-detail">
      <div className="container">
        {sectors.map((sector, index) => {
          const detail = sectorDetails[index]
          const Icon = sector.icon
          return (
            <div
              className={`detail-row ${index % 2 === 1 ? 'is-reverse' : ''}`}
              id={sector.slug}
              key={sector.slug}
            >
              <Reveal className="detail-media">
                <ResponsiveImage
                  image={sector.image}
                  sizes="(max-width: 820px) 100vw, 600px"
                  alt={detail.imageAlt}
                  loading="lazy"
                />
              </Reveal>
              <Reveal className="detail-content" delay={0.08}>
                <div className="detail-number">
                  <Icon size={20} />
                </div>
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
              </Reveal>
            </div>
          )
        })}
      </div>
    </section>
  )
}
