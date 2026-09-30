import type { Picture } from 'vite-imagetools'
import {
  Activity,
  Barcode,
  BarChart3,
  Bell,
  Blocks,
  Bot,
  Building2,
  Clock,
  Code,
  ConciergeBell,
  Database,
  Ellipsis,
  Facebook,
  Factory,
  FileText,
  HeartPulse,
  Instagram,
  Linkedin,
  Mail,
  Network,
  Package,
  ScanSearch,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Store,
  Tag,
  Truck,
  UsersRound,
  Workflow,
  Wrench,
  Youtube,
  type LucideIcon,
} from 'lucide-react'
import automatizacionImage from '../assets/services/automatizacion-procesos.jpg'
import erpImage from '../assets/services/integraciones-erp.jpg'
import dashboardsImage from '../assets/services/dashboards-bi.jpg'
import iaOperacionesImage from '../assets/services/ia-operaciones.jpg'
import softwareMedidaImage from '../assets/services/software-a-medida.jpg'
import trazabilidadImage from '../assets/services/trazabilidad-control.jpg'
import logisticaImage from '../assets/sectors/logistica-y-transporte.jpg'
import industriaImage from '../assets/sectors/industria.jpg'
import sanitarioImage from '../assets/sectors/sanitario.jpg'
import retailImage from '../assets/sectors/retail-y-distribucion.jpg'
import hosteleriaImage from '../assets/sectors/hosteleria-y-turismo.jpg'
import serviciosImage from '../assets/sectors/servicios.jpg'
import equipoDashboardsImage from '../assets/about/equipo-dashboards.jpg'
import equipoDesarrolloImage from '../assets/about/equipo-desarrollo.jpg'
import equipoOficinaImage from '../assets/about/equipo-oficina.jpg'
import equipoRevisionCodigoImage from '../assets/about/equipo-revision-codigo.jpg'
import automatizacionMapeoImage from '../assets/services/detail/automatizacion-mapeo.jpg'
import automatizacionReglasImage from '../assets/services/detail/automatizacion-reglas.jpg'
import erpMultisistemaImage from '../assets/services/detail/erp-multisistema.jpg'
import erpConexionImage from '../assets/services/detail/erp-conexion.jpg'
import dashboardsKpisImage from '../assets/services/detail/dashboards-kpis.jpg'
import dashboardsPresentacionImage from '../assets/services/detail/dashboards-presentacion.jpg'
import iaAtencionImage from '../assets/services/detail/ia-atencion.jpg'
import iaAbstractoImage from '../assets/services/detail/ia-abstracto.jpg'
import softwareCodigoImage from '../assets/services/detail/software-codigo.jpg'
import softwareEquipoImage from '../assets/services/detail/software-equipo.jpg'
import trazabilidadPlantaImage from '../assets/services/detail/trazabilidad-planta.jpg'
import trazabilidadAlmacenImage from '../assets/services/detail/trazabilidad-almacen.jpg'
import administracionImage from '../assets/blog/coste-real-de-un-proyecto-de-automatizacion.jpg'

export interface FeatureItem {
  slug: string
  title: string
  description: string
  longDescription: string
  extendedParagraphs: string[]
  gallery: { src: Picture; alt: string }[]
  includes: string[]
  icon: LucideIcon
  image: Picture
}

export interface BenefitItem {
  title: string
  description: string
  icon: LucideIcon
}

// TODO: sustituir por las URLs reales de Instagram, Facebook y YouTube
export const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/trek-ia-79968b43b/',
    Icon: Linkedin,
    color: '#0A66C2',
  },
  { label: 'Instagram', href: '#', Icon: Instagram, color: '#E4405F' },
  { label: 'Facebook', href: '#', Icon: Facebook, color: '#1877F2' },
  { label: 'YouTube', href: '#', Icon: Youtube, color: '#FF0000' },
]

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Quiénes somos', href: '/quienes-somos' },
  { label: 'Qué hacemos?', href: '/que-hacemos' },
  { label: 'Sectores', href: '/sectores' },
  { label: 'Método', href: '/metodo' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contáctanos', href: '/contacto' },
]

export const metrics = [
  { value: '-65%', label: 'tiempo operativo manual' },
  { value: '+40%', label: 'capacidad sin ampliar plantilla' },
  { value: '3–6', label: 'semanas hasta primeros resultados' },
]

export const solutions: FeatureItem[] = [
  {
    slug: 'automatizacion-procesos',
    title: 'Automatización de procesos',
    description: 'Eliminamos tareas repetitivas y conectamos cada paso del flujo operativo.',
    longDescription:
      'Diseñamos flujos que eliminan el trabajo manual repetitivo y conectan cada paso de la operación, desde la entrada del dato hasta la acción final, sin depender de que una persona lo ejecute a mano cada vez. Trabajamos sobre los procesos que ya existen en tu empresa: pedidos, facturas, altas de cliente, reportes internos, cualquier tarea que se repita con las mismas reglas pero distinto dato cada vez. En lugar de sustituir tu forma de trabajar, la hacemos más rápida y fiable, liberando al equipo para que dedique su tiempo a lo que realmente requiere criterio humano. Cada automatización se prueba antes de activarse en real, y queda con un responsable claro por si algo necesita ajustarse más adelante. El objetivo final no es sustituir personas, sino que dejen de perder el tiempo haciendo de puente entre sistemas que deberían hablar solos.',
    extendedParagraphs: [
      'Muchas empresas siguen dependiendo de personas que copian datos de un sistema a otro, revisan hojas de cálculo manualmente o repiten el mismo proceso decenas de veces al día. Ese trabajo no aporta valor, pero consume horas y genera errores que luego alguien tiene que detectar y corregir. Con el tiempo, ese desgaste se normaliza: el equipo asume que así son las cosas, aunque nadie eligió trabajar así desde el principio.',
      'Empezamos mapeando el proceso tal como ocurre hoy, no como debería ocurrir en teoría. Identificamos los pasos que se repiten sin criterio, los puntos donde se pierde información y los cuellos de botella que frenan al equipo antes de tocar una sola herramienta. Ese mapa se construye hablando con quien ejecuta el proceso cada día, no solo revisando el manual o el diagrama oficial que casi nunca coincide con la realidad.',
      'El resultado es un flujo automatizado que conecta tus aplicaciones, ejecuta las tareas repetitivas sin intervención humana y avisa a las personas solo cuando de verdad hace falta que decidan algo. Cada automatización queda documentada paso a paso, así que cualquier persona del equipo puede entender qué hace, por qué existe y qué pasaría si se detuviera. No dependes de una única persona que "sabe cómo funciona esto": el conocimiento queda en el sistema, no solo en la cabeza de alguien. Y cuando el proceso cambia, porque el negocio cambia, el flujo se ajusta con nosotros en días, no en meses. Piensa en ello como delegar el trabajo repetitivo a un compañero que nunca se cansa, nunca se olvida de un paso y siempre sigue exactamente las reglas que le habéis dado. Y si en algún momento decides recuperar el control manual de un paso, puedes hacerlo sin desmontar todo lo demás.',
    ],
    gallery: [
      {
        src: automatizacionMapeoImage,
        alt: 'Persona dibujando el mapa de un proceso de gestión en una pizarra',
      },
      {
        src: automatizacionReglasImage,
        alt: 'Configuración de reglas de automatización en una pantalla',
      },
    ],
    includes: [
      'Mapeo del proceso real, no del proceso ideal.',
      'Automatización de tareas repetitivas y traspaso de información entre sistemas.',
      'Alertas y puntos de control para intervenir cuando algo se sale del flujo esperado.',
      'Documentación clara de cada flujo automatizado, sin cajas negras.',
    ],
    icon: Workflow,
    image: automatizacionImage,
  },
  {
    slug: 'integraciones-erp-crm',
    title: 'Integraciones ERP/CRM',
    description: 'Unificamos tus sistemas para que los datos viajen sin fricción ni duplicidades.',
    longDescription:
      'Unificamos los sistemas que ya usas para que el dato viaje una sola vez y llegue igual a todas partes, eliminando duplicidades entre administración, comercial y operaciones. No importa si tu ERP, tu CRM y tus hojas de cálculo llevan años sin hablarse entre sí: construimos las conexiones necesarias para que la información fluya automáticamente, con las reglas de negocio de tu empresa aplicadas en cada paso. El objetivo no es cambiar de herramientas, sino conseguir que las que ya tienes trabajen como si fueran una sola. El proceso empieza por un mapa de qué dato vive en cada sistema hoy, para no dar por hecho nada sobre cómo funciona realmente tu operación. Ese mapa inicial también sirve para decidir con criterio qué automatizar primero y qué puede esperar.',
    extendedParagraphs: [
      'Es habitual que el ERP, el CRM y las hojas de cálculo del equipo comercial cuenten historias distintas sobre el mismo cliente o pedido. Cada sistema tiene su propia versión de la verdad, y alguien tiene que reconciliarlas a mano al final de cada semana. Ese trabajo de reconciliación no solo cuesta horas: también introduce errores humanos justo en los datos que más deberían pesar en una decisión.',
      'Conectamos esos sistemas para que el dato se introduzca una sola vez y viaje automáticamente a donde tiene que estar, sin duplicados ni hojas de cálculo paralelas que nadie termina de actualizar. El resultado se nota primero en los equipos que hasta ahora dependían de pedir el dato a otro departamento y esperar a que alguien tuviera tiempo de pasárselo.',
      'No sustituimos tus herramientas: las hacemos hablar entre sí. Cada equipo sigue trabajando donde ya sabe trabajar, con la garantía de que todos ven la misma información actualizada en tiempo real. Definimos qué sistema es la fuente de verdad para cada tipo de dato, cliente, pedido, stock, factura, y montamos las sincronizaciones necesarias para que el resto se actualicen solos. Cuando algo no cuadra, el propio sistema lo señala en lugar de que alguien lo descubra semanas después revisando un informe. Con el tiempo, esta base conectada también facilita añadir nuevas herramientas sin volver a empezar de cero cada vez que el negocio incorpora un sistema. Al final, cada persona sigue mirando su pantalla de siempre, pero con la certeza de que refleja la misma realidad que ve el resto del equipo.',
    ],
    gallery: [
      {
        src: erpMultisistemaImage,
        alt: 'Puesto de trabajo con varias pantallas mostrando distintos sistemas conectados',
      },
      {
        src: erpConexionImage,
        alt: 'Cables de red convergiendo en un único punto, como metáfora de la integración de sistemas',
      },
    ],
    includes: [
      'Definición de una única fuente de verdad por cada tipo de dato.',
      'Sincronización automática entre ERP, CRM y otras herramientas.',
      'Reglas y alertas ante discrepancias entre sistemas.',
      'Migración progresiva, sin parar la operación durante el cambio.',
    ],
    icon: Network,
    image: erpImage,
  },
  {
    slug: 'dashboards-bi',
    title: 'Dashboards y BI',
    description: 'Indicadores fiables y accionables para decidir con la operación en tiempo real.',
    longDescription:
      'Construimos indicadores fiables sobre datos que ya has validado, para que decidir con la operación en tiempo real deje de depender de preguntar a alguien. Partimos de las preguntas que de verdad se hace el negocio cada semana, no de una lista genérica de métricas, y las convertimos en paneles que cualquier persona del equipo puede consultar sin esperar a que alguien le prepare un informe. Cuando el dato cambia, el panel cambia con él. No se trata de mostrar más datos, sino de mostrar los datos correctos al ritmo en que la operación los necesita para actuar. Un buen panel se nota porque, después de mirarlo, sabes qué hacer a continuación.',
    extendedParagraphs: [
      'Tener datos no es lo mismo que tener información útil. Muchas empresas acumulan reportes que nadie mira porque no responden a la pregunta que de verdad importa en el día a día del negocio. Ese exceso de reportes suele ser señal de que nadie se ha parado a preguntar qué decisión concreta debería apoyar cada uno de ellos.',
      'Diseñamos cada panel junto a la persona que lo va a usar: qué decisión necesita tomar, con qué frecuencia y qué dato le falta hoy para tomarla con confianza, en vez de partir de una plantilla genérica. Esa conversación inicial suele revelar que el problema no era la falta de datos, sino tenerlos repartidos en sitios distintos y sin conectar.',
      'El resultado son paneles conectados directamente a tus fuentes de datos reales, sin exportar a Excel ni depender de que alguien actualice un informe cada semana antes de la reunión. Cada indicador lleva detrás una definición clara y compartida, así que cuando dos personas miran el mismo número, ambas confían en que significa lo mismo. Y cuando el negocio cambia de prioridades, el panel se ajusta con nosotros en lugar de quedarse midiendo lo que ya dejó de importar. Y si un indicador deja de ser útil, lo retiramos: un panel lleno de métricas que nadie mira es tan inútil como no tener panel. Con el tiempo, esos paneles se convierten en el lenguaje común con el que el equipo habla de resultados, en vez de discutir sobre qué número es el correcto.',
    ],
    gallery: [
      {
        src: dashboardsKpisImage,
        alt: 'Panel con indicadores clave de rendimiento en pantalla',
      },
      {
        src: dashboardsPresentacionImage,
        alt: 'Persona presentando gráficos de ventas a un compañero en una pantalla',
      },
    ],
    includes: [
      'Definición de indicadores clave junto a quien los va a usar.',
      'Conexión directa a las fuentes de datos reales de la operación.',
      'Paneles pensados para decidir, no solo para informar.',
      'Revisión periódica para que el dashboard evolucione con el negocio.',
    ],
    icon: BarChart3,
    image: dashboardsImage,
  },
  {
    slug: 'ia-operaciones',
    title: 'IA para operaciones',
    description: 'Agentes y modelos aplicados a clasificar, prever, responder y ejecutar.',
    longDescription:
      'Aplicamos modelos y agentes de IA donde generan valor real: clasificar, priorizar, prever y responder con una persona siempre en control del resultado. No partimos de la tecnología para buscarle un uso, partimos de la tarea concreta que hoy le quita tiempo a tu equipo o le añade riesgo a la operación, y evaluamos si un modelo puede asumirla de forma fiable. Cuando el caso de uso es sólido, lo desplegamos con supervisión humana desde el primer día. Priorizamos siempre los casos donde el error tiene un coste bajo y corregible, dejando las decisiones más sensibles en manos de las personas. Cada caso de uso empieza como una prueba acotada, y solo escala cuando demuestra que funciona de forma consistente.',
    extendedParagraphs: [
      'La IA genera más ruido que valor cuando se aplica sin un caso de uso claro. Nuestro punto de partida no es la tecnología, es la tarea concreta que hoy consume tiempo o genera errores en tu operación. Evitamos deliberadamente los proyectos de IA que suenan bien en una presentación pero no resuelven un problema real de tu día a día.',
      'Aplicamos modelos y agentes para clasificar información, priorizar casos, prever demanda o responder consultas repetitivas, siempre con una persona en control de las decisiones que de verdad importan. El agente propone y acelera, pero la responsabilidad final de una decisión importante sigue siendo de una persona, no del modelo.',
      'Cada despliegue se mide desde el primer día: cuánto tiempo ahorra, cuántos errores evita y dónde conviene ajustar el modelo para que siga siendo fiable con el tiempo. Revisamos periódicamente su comportamiento frente a casos nuevos, y si el modelo empieza a fallar en un tipo concreto de situación, lo detectamos y corregimos antes de que afecte al resultado del negocio. La IA se queda donde aporta, y se retira donde no. La confianza en el sistema se gana con resultados consistentes, no con promesas, así que preferimos avanzar despacio y bien antes que rápido y frágil. Ese enfoque gradual es lo que permite escalar la IA sin poner en riesgo la operación mientras se aprende.',
    ],
    gallery: [
      {
        src: iaAtencionImage,
        alt: 'Equipo de atención al cliente trabajando con auriculares frente al ordenador',
      },
      {
        src: iaAbstractoImage,
        alt: 'Representación abstracta de inteligencia artificial sobre una placa de circuitos',
      },
    ],
    includes: [
      'Identificación de casos de uso con impacto medible, no genéricos.',
      'Modelos y agentes entrenados sobre los datos y criterios de tu operación.',
      'Supervisión humana en cada punto crítico de decisión.',
      'Medición del resultado desde el primer despliegue.',
    ],
    icon: Bot,
    image: iaOperacionesImage,
  },
  {
    slug: 'software-a-medida',
    title: 'Software a medida',
    description: 'Herramientas adaptadas a tu proceso, equipo y forma real de trabajar.',
    longDescription:
      'Construimos herramientas adaptadas a tu proceso real cuando ninguna plataforma genérica encaja con la forma en que tu equipo trabaja de verdad. Empezamos por entender qué hace único a tu proceso, no por enseñarte un catálogo de funcionalidades, y diseñamos el software alrededor de eso. El resultado es una herramienta que se siente como si la hubiera construido alguien que conoce tu operación, porque así ha sido. Antes de escribir código, validamos contigo cada pantalla y cada flujo, para que el primer prototipo ya se parezca a lo que el equipo necesita usar cada día. Preferimos entregar algo pequeño que funciona de verdad antes que un plan ambicioso que tarda meses en dar la primera señal de vida.',
    extendedParagraphs: [
      'Cuando ninguna plataforma del mercado encaja con cómo trabaja tu equipo, adaptar el proceso a la herramienta suele salir más caro a largo plazo que construir la herramienta a medida desde el principio. Ese coste no siempre se ve en la factura, se ve en la fricción diaria de un equipo que trabaja contra su propia herramienta en vez de con ella.',
      'Diseñamos y desarrollamos software pensado para tu proceso real, no para el caso genérico que resuelve una plataforma estándar. Priorizamos lo que de verdad diferencia tu operación frente a la competencia. Lo que no es diferencial lo resolvemos con soluciones ya probadas, para invertir el esfuerzo de desarrollo donde realmente aporta ventaja.',
      'El desarrollo no termina en el lanzamiento: seguimos manteniendo, ajustando y haciendo evolucionar la herramienta a medida que tu negocio cambia y crece. Tienes acceso directo al equipo que la construyó, no a un ticket de soporte genérico, así que los cambios se entienden en contexto y se implementan rápido. Y como el código es tuyo, nunca dependes de que sigamos nosotros para poder seguir avanzando. Eso significa que la herramienta sigue mejorando después del lanzamiento, en lugar de quedarse congelada en la versión del primer día. Con el tiempo, esa cercanía con el equipo que la construyó se traduce en cambios que llegan en días, no en el próximo trimestre.',
    ],
    gallery: [
      {
        src: softwareCodigoImage,
        alt: 'Primer plano de una pantalla con código de programación',
      },
      {
        src: softwareEquipoImage,
        alt: 'Equipo de desarrollo revisando software juntos en un portátil',
      },
    ],
    includes: [
      'Diseño centrado en el proceso y el equipo que lo usará cada día.',
      'Desarrollo propio para lo que es tu ventaja competitiva.',
      'Integración con el resto de sistemas que ya usas.',
      'Mantenimiento y evolución continua tras el lanzamiento.',
    ],
    icon: Blocks,
    image: softwareMedidaImage,
  },
  {
    slug: 'trazabilidad-control',
    title: 'Trazabilidad y control',
    description: 'Visibilidad completa de estados, incidencias, responsables y tiempos.',
    longDescription:
      'Damos visibilidad completa sobre estados, incidencias, responsables y tiempos, para que ninguna decisión dependa de preguntar cómo va la cosa. Cada pedido, expediente o proceso queda registrado en cada etapa, con quién lo tiene, cuánto lleva y si algo se ha desviado de lo esperado. La información deja de vivir en la cabeza de una persona o en una hoja de cálculo que solo ella actualiza, y pasa a estar disponible para quien la necesite, en el momento en que la necesite. Ese registro no añade burocracia al equipo: se genera de forma automática a partir del trabajo que ya hacen, sin pasos extra que nadie quiere rellenar. Esa visibilidad compartida también cambia las conversaciones internas: se discuten hechos, no percepciones de quién tiene razón.',
    extendedParagraphs: [
      'Cuando nadie tiene visibilidad completa de en qué estado está cada pedido, incidencia o proceso, las decisiones se toman preguntando en vez de consultando datos fiables. Esa dependencia de preguntar convierte a una sola persona en el cuello de botella de toda la operación, aunque nadie lo haya decidido así.',
      'Construimos sistemas de trazabilidad que registran cada estado, cada responsable y cada tiempo de forma automática, para que la información esté disponible sin tener que perseguirla de departamento en departamento. Cada cambio de estado queda con fecha y responsable, así que reconstruir qué pasó con un pedido concreto deja de ser una investigación.',
      'El resultado es un histórico fiable de lo que ha pasado y una alerta temprana cuando algo se desvía de lo esperado, antes de que se convierta en un problema mayor para el cliente. Cuando surge una incidencia, se puede reconstruir exactamente qué ocurrió, en qué punto y quién estaba a cargo, sin depender de la memoria de nadie. Esa trazabilidad no solo resuelve problemas más rápido: también permite detectar patrones y evitar que el mismo error se repita. Con el tiempo, ese histórico se convierte también en una fuente de mejora: muestra dónde se repiten los mismos cuellos de botella y por qué. Esa mejora continua es la diferencia entre apagar incendios cada semana y evitar que empiecen.',
    ],
    gallery: [
      {
        src: trazabilidadPlantaImage,
        alt: 'Operaria consultando un sistema de control de inventario en una planta industrial',
      },
      {
        src: trazabilidadAlmacenImage,
        alt: 'Trabajador revisando existencias con una tablet en un almacén',
      },
    ],
    includes: [
      'Seguimiento de cada estado y responsable en tiempo real.',
      'Registro histórico de incidencias y tiempos de resolución.',
      'Alertas automáticas cuando algo se desvía de lo esperado.',
      'Visibilidad compartida entre los equipos implicados.',
    ],
    icon: ScanSearch,
    image: trazabilidadImage,
  },
]

export interface BusinessArea {
  title: string
  description: string
  features: { label: string; icon: LucideIcon }[]
  image: Picture
  imageAlt: string
}

// Áreas de negocio de la sección "Qué hacemos" (home y /que-hacemos)
export const businessAreas: BusinessArea[] = [
  {
    title: 'Compras y pedidos',
    description: 'Automatizamos solicitudes, aprobaciones, pedidos y seguimientos.',
    features: [
      { label: 'Solicitudes y aprobaciones', icon: FileText },
      { label: 'Pedidos a proveedores', icon: Truck },
      { label: 'Seguimiento y avisos', icon: Bell },
    ],
    image: trazabilidadImage,
    imageAlt: 'Persona revisando un catálogo de productos en una tablet',
  },
  {
    title: 'Almacén y logística',
    description: 'Digitalizamos entradas, salidas, stock, incidencias y trazabilidad.',
    features: [
      { label: 'Entradas y salidas', icon: Package },
      { label: 'Stock en tiempo real', icon: Barcode },
      { label: 'Trazabilidad e incidencias', icon: Tag },
    ],
    image: trazabilidadAlmacenImage,
    imageAlt: 'Trabajador revisando existencias con una tablet en un almacén',
  },
  {
    title: 'Administración',
    description:
      'Reducimos tareas manuales, documentos repetitivos y actualización de datos.',
    features: [
      { label: 'Generación de documentos', icon: FileText },
      { label: 'Actualización de datos', icon: Database },
      { label: 'Menos tareas repetitivas', icon: Clock },
    ],
    image: administracionImage,
    imageAlt: 'Escritorio con libreta, calculadora e informes impresos',
  },
  {
    title: 'Comercial y atención al cliente',
    description: 'Automatizamos seguimientos, respuestas, avisos y gestión de oportunidades.',
    features: [
      { label: 'Seguimiento comercial', icon: UsersRound },
      { label: 'Respuestas automáticas', icon: Mail },
      { label: 'Gestión de oportunidades', icon: BarChart3 },
    ],
    image: iaAtencionImage,
    imageAlt: 'Equipo de atención al cliente trabajando con auriculares frente al ordenador',
  },
  {
    title: 'Datos y control',
    description: 'Centralizamos la información para saber qué está pasando sin perseguir Excels.',
    features: [
      { label: 'Indicadores en tiempo real', icon: BarChart3 },
      { label: 'Información unificada', icon: Database },
      { label: 'Mejores decisiones', icon: UsersRound },
    ],
    image: dashboardsKpisImage,
    imageAlt: 'Panel con indicadores clave de rendimiento en pantalla',
  },
  {
    title: 'Procesos a medida',
    description:
      'Si hoy depende de correos, llamadas, Excel o copiar y pegar, probablemente podemos mejorarlo.',
    features: [
      { label: 'Aplicaciones internas', icon: Settings },
      { label: 'Automatizaciones específicas', icon: Workflow },
      { label: 'Integraciones con tus sistemas', icon: Code },
    ],
    image: automatizacionMapeoImage,
    imageAlt: 'Persona dibujando el mapa de un proceso de gestión en una pizarra',
  },
]

export const businessTypes: { label: string; icon: LucideIcon }[] = [
  { label: 'Taller', icon: Wrench },
  { label: 'Asesoría', icon: FileText },
  { label: 'Consultoría', icon: UsersRound },
  { label: 'Centro clínico', icon: Stethoscope },
  { label: 'Tienda', icon: Store },
  { label: 'Pyme', icon: Building2 },
  { label: 'y más', icon: Ellipsis },
]

// Franja final de /sectores
export const departments = [
  'Compras',
  'Administración',
  'Comercial',
  'Almacén',
  'Operaciones',
  'Atención al cliente',
  'Dirección',
]

export const processSteps = [
  {
    number: '0',
    label: 'Entender',
    title: 'Analizamos',
    description: 'Estudiamos tu contexto, procesos, objetivos y oportunidades.',
  },
  {
    number: '1',
    label: 'Definir',
    title: 'Diseñamos',
    description: 'Definimos la solución, la estrategia y el enfoque técnico.',
  },
  {
    number: '2',
    label: 'Construir',
    title: 'Implementamos',
    description: 'Desarrollamos, integramos y ponemos la solución en marcha.',
  },
  {
    number: '3',
    label: 'Mejorar',
    title: 'Optimizamos',
    description: 'Medimos, iteramos y escalamos el impacto.',
  },
]

export const benefits: BenefitItem[] = [
  {
    title: 'Resultados medibles',
    description: 'Cada proyecto parte de una métrica operativa y un objetivo de negocio.',
    icon: Activity,
  },
  {
    title: 'Desarrollo ágil',
    description: 'Entregas frecuentes para validar antes y reducir el riesgo técnico.',
    icon: Sparkles,
  },
  {
    title: 'Seguridad y RGPD',
    description: 'Privacidad, permisos y gobierno del dato integrados desde el diseño.',
    icon: ShieldCheck,
  },
  {
    title: 'Acompañamiento continuo',
    description: 'Evolucionamos la solución al ritmo de tus procesos y prioridades.',
    icon: UsersRound,
  },
]

export const sectors = [
  {
    slug: 'logistica-y-transporte',
    label: 'Logística y transporte',
    summary: 'Rutas, entregas y almacenes coordinados en tiempo real.',
    tags: 'Trazabilidad · incidencias',
    icon: Truck,
    image: logisticaImage,
  },
  {
    slug: 'industria',
    label: 'Industria',
    summary: 'Producción conectada y trazable, del pedido a la planta.',
    tags: 'Producción · control operativo',
    icon: Factory,
    image: industriaImage,
  },
  {
    slug: 'sanitario',
    label: 'Sanitario',
    summary: 'Menos carga administrativa y más tiempo para la atención.',
    tags: 'Citas · documentación',
    icon: HeartPulse,
    image: sanitarioImage,
  },
  {
    slug: 'retail-y-distribucion',
    label: 'Retail y distribución',
    summary: 'Stock, pedidos y canales de venta siempre sincronizados.',
    tags: 'Stock · reposición',
    icon: ShoppingCart,
    image: retailImage,
  },
  {
    slug: 'hosteleria-y-turismo',
    label: 'Hostelería y turismo',
    summary: 'Reservas, turnos y proveedores bajo control en temporada alta.',
    tags: 'Reservas · operativa diaria',
    icon: ConciergeBell,
    image: hosteleriaImage,
  },
  {
    slug: 'servicios',
    label: 'Servicios',
    summary: 'Presupuestos, horas y facturación sin tareas repetitivas.',
    tags: 'Clientes · seguimiento',
    icon: UsersRound,
    image: serviciosImage,
  },
]

export const teamPhotos = [
  { src: equipoDesarrolloImage, alt: 'Equipo de Trek.IA trabajando sobre código y dashboards' },
  {
    src: equipoDashboardsImage,
    alt: 'Equipo de Trek.IA revisando un panel de indicadores operativos',
  },
  { src: equipoRevisionCodigoImage, alt: 'Dos personas del equipo revisando código en pantalla' },
  { src: equipoOficinaImage, alt: 'Equipo de Trek.IA trabajando en la oficina' },
]

// Contenido de ejemplo: sustituir por testimonios reales de clientes en cuanto se disponga de ellos.
export const testimonials = [
  {
    quote:
      'Automatizamos en seis semanas un proceso que llevaba años haciéndose a mano. El equipo entendió nuestra operación antes de tocar una sola línea de código.',
    role: 'Directora de Operaciones',
    sector: 'Sector logística',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    quote:
      'Lo que más valoramos es que no nos vendieron una plataforma cerrada: conectaron lo que ya teníamos y resolvieron el problema real, no uno genérico.',
    role: 'Responsable de Sistemas',
    sector: 'Distribución industrial',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    quote:
      'Pasamos de depender de una persona para saber el estado de cada pedido a tener un panel que consulta todo el equipo en tiempo real.',
    role: 'Gerencia',
    sector: 'Servicios B2B',
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
  {
    quote:
      'El diagnóstico inicial ya nos aportó valor: nos hicieron ver cuellos de botella que dábamos por normales después de años funcionando así.',
    role: 'Director de Producción',
    sector: 'Industria manufacturera',
    avatar: 'https://i.pravatar.cc/150?img=52',
  },
  {
    quote:
      'Necesitábamos cumplir con protección de datos sin frenar el día a día de las consultas. Encontraron el equilibrio sin añadir burocracia al equipo clínico.',
    role: 'Coordinadora de Operaciones',
    sector: 'Sector salud',
    avatar: 'https://i.pravatar.cc/150?img=44',
  },
  {
    quote:
      'Redujimos a la mitad el tiempo que dedicábamos a tareas administrativas repetitivas. Ahora ese tiempo lo invertimos en atender mejor a los clientes.',
    role: 'Responsable Administrativo',
    sector: 'Servicios administrativos',
    avatar: 'https://i.pravatar.cc/150?img=56',
  },
]

export const economicModel = [
  {
    tag: 'Arranque',
    title: 'Setup inicial',
    description: 'Análisis, diseño, configuración e implantación de la primera solución.',
  },
  {
    tag: 'Operación',
    title: 'Cuota mensual',
    description: 'Infraestructura, soporte, monitorización y continuidad del servicio.',
  },
  {
    tag: 'Evolución',
    title: 'Mejora continua',
    description: 'Nuevos flujos, integraciones y capacidades según avance el negocio.',
  },
]
