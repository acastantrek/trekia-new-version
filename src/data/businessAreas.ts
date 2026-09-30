import type { Picture } from 'vite-imagetools'
import {
  AlertTriangle,
  Barcode,
  BarChart3,
  Bell,
  Bot,
  CheckCircle2,
  ClipboardList,
  Clock,
  Code,
  Copy,
  Database,
  Eye,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  FolderSearch,
  Headset,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  LifeBuoy,
  Link2,
  Mail,
  MapPin,
  Package,
  PhoneCall,
  Puzzle,
  Receipt,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Tag,
  Target,
  Timer,
  TrendingUp,
  Truck,
  UserX,
  UsersRound,
  Warehouse,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import trazabilidadImage from '../assets/services/trazabilidad-control.jpg'
import automatizacionMapeoImage from '../assets/services/detail/automatizacion-mapeo.jpg'
import dashboardsKpisImage from '../assets/services/detail/dashboards-kpis.jpg'
import iaAtencionImage from '../assets/services/detail/ia-atencion.jpg'
import trazabilidadAlmacenImage from '../assets/services/detail/trazabilidad-almacen.jpg'
import administracionImage from '../assets/blog/coste-real-de-un-proyecto-de-automatizacion.jpg'

interface IconItem {
  label: string
  icon: LucideIcon
}

interface IconCard {
  title: string
  text: string
  icon: LucideIcon
}

export interface BusinessArea {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  image: Picture
  imageAlt: string
  /** Tres puntos clave: tarjeta de /que-hacemos y hero de su página */
  features: IconItem[]
  /** Problemas habituales ("¿Te suena?") */
  pains: IconCard[]
  /** Qué automatizamos */
  capabilities: IconCard[]
  /** Lo que ganas */
  results: IconItem[]
}

// Áreas de negocio: tarjetas de "Qué hacemos" (home y /que-hacemos), desplegable del menú
// y página de cada una en /servicios/:slug
export const businessAreas: BusinessArea[] = [
  {
    slug: 'compras-y-pedidos',
    title: 'Compras y pedidos',
    description: 'Automatizamos solicitudes, aprobaciones, pedidos y seguimientos.',
    icon: ShoppingCart,
    image: trazabilidadImage,
    imageAlt: 'Persona revisando un catálogo de productos en una tablet',
    features: [
      { label: 'Solicitudes y aprobaciones', icon: FileText },
      { label: 'Pedidos a proveedores', icon: Truck },
      { label: 'Seguimiento y avisos', icon: Bell },
    ],
    pains: [
      {
        title: 'Pedidos por correo y Excel',
        text: 'Cada solicitud llega por un canal distinto.',
        icon: Mail,
      },
      {
        title: 'Aprobaciones atascadas',
        text: 'Nadie sabe quién tiene que firmar.',
        icon: Clock,
      },
      {
        title: 'Seguimiento a base de llamadas',
        text: 'Para saber si algo llega, hay que preguntar.',
        icon: PhoneCall,
      },
    ],
    capabilities: [
      { title: 'Solicitudes de compra', text: 'Un solo formulario, con todo.', icon: FileText },
      {
        title: 'Aprobaciones automáticas',
        text: 'Por importe, área o proveedor.',
        icon: CheckCircle2,
      },
      { title: 'Pedidos a proveedores', text: 'Generados sin copiar datos.', icon: Truck },
      { title: 'Avisos y recordatorios', text: 'Retrasos y entregas a tiempo.', icon: Bell },
      { title: 'Comparativa de proveedores', text: 'Precios y plazos a la vista.', icon: Scale },
      { title: 'Conexión con tu ERP', text: 'Todo se registra una vez.', icon: Link2 },
    ],
    results: [
      { label: 'Menos tiempo por pedido', icon: Timer },
      { label: 'Menos errores y duplicados', icon: ShieldCheck },
      { label: 'Cada compra a la vista', icon: Eye },
    ],
  },
  {
    slug: 'almacen-y-logistica',
    title: 'Almacén y logística',
    description: 'Digitalizamos entradas, salidas, stock, incidencias y trazabilidad.',
    icon: Warehouse,
    image: trazabilidadAlmacenImage,
    imageAlt: 'Trabajador revisando existencias con una tablet en un almacén',
    features: [
      { label: 'Entradas y salidas', icon: Package },
      { label: 'Stock en tiempo real', icon: Barcode },
      { label: 'Trazabilidad e incidencias', icon: Tag },
    ],
    pains: [
      {
        title: 'Inventario en papel o Excel',
        text: 'El stock real y el del sistema no cuadran.',
        icon: ClipboardList,
      },
      {
        title: 'Mercancía difícil de localizar',
        text: 'Se pierde tiempo buscando ubicaciones.',
        icon: Search,
      },
      {
        title: 'Incidencias sin registrar',
        text: 'Roturas y faltas que nadie documenta.',
        icon: AlertTriangle,
      },
    ],
    capabilities: [
      { title: 'Entradas y salidas', text: 'Desde el móvil o con lector.', icon: Package },
      { title: 'Stock en tiempo real', text: 'Al día en cada movimiento.', icon: Barcode },
      { title: 'Ubicaciones', text: 'Cada producto en su hueco.', icon: MapPin },
      { title: 'Trazabilidad por lote', text: 'Qué entró y hacia dónde salió.', icon: Tag },
      { title: 'Incidencias', text: 'Con foto, nota y responsable.', icon: AlertTriangle },
      { title: 'Expediciones', text: 'Preparación y envíos coordinados.', icon: Truck },
    ],
    results: [
      { label: 'Inventario fiable', icon: Target },
      { label: 'Pedidos preparados antes', icon: Timer },
      { label: 'Trazabilidad completa', icon: Eye },
    ],
  },
  {
    slug: 'administracion',
    title: 'Administración',
    description:
      'Reducimos tareas manuales, documentos repetitivos y actualización de datos.',
    icon: FolderOpen,
    image: administracionImage,
    imageAlt: 'Escritorio con libreta, calculadora e informes impresos',
    features: [
      { label: 'Generación de documentos', icon: FileText },
      { label: 'Actualización de datos', icon: Database },
      { label: 'Menos tareas repetitivas', icon: Clock },
    ],
    pains: [
      {
        title: 'Datos copiados a mano',
        text: 'La misma información en varios sitios.',
        icon: Copy,
      },
      {
        title: 'Documentos uno a uno',
        text: 'Facturas, albaranes y contratos a mano.',
        icon: FileText,
      },
      {
        title: 'Papeles que no aparecen',
        text: 'Carpetas y correos sin orden.',
        icon: FolderSearch,
      },
    ],
    capabilities: [
      { title: 'Documentos automáticos', text: 'Plantillas que se rellenan solas.', icon: FileText },
      { title: 'Facturas y albaranes', text: 'Lectura y registro automático.', icon: Receipt },
      { title: 'Datos sincronizados', text: 'Un cambio llega a todo.', icon: Database },
      { title: 'Archivo digital', text: 'Todo ordenado y localizable.', icon: FolderOpen },
      { title: 'Vencimientos y cobros', text: 'Avisos antes de que sea tarde.', icon: Bell },
      { title: 'Tareas programadas', text: 'Informes y cierres solos.', icon: Clock },
    ],
    results: [
      { label: 'Horas libres cada semana', icon: Timer },
      { label: 'Menos errores al transcribir', icon: ShieldCheck },
      { label: 'Equipo en lo importante', icon: UsersRound },
    ],
  },
  {
    slug: 'comercial-y-atencion-al-cliente',
    title: 'Comercial y atención al cliente',
    description: 'Automatizamos seguimientos, respuestas, avisos y gestión de oportunidades.',
    icon: Headset,
    image: iaAtencionImage,
    imageAlt: 'Equipo de atención al cliente trabajando con auriculares frente al ordenador',
    features: [
      { label: 'Seguimiento comercial', icon: UsersRound },
      { label: 'Respuestas automáticas', icon: Mail },
      { label: 'Gestión de oportunidades', icon: BarChart3 },
    ],
    pains: [
      {
        title: 'Consultas sin responder',
        text: 'Correos y mensajes que se acumulan.',
        icon: Inbox,
      },
      {
        title: 'Oportunidades que se enfrían',
        text: 'Nadie hace el seguimiento a tiempo.',
        icon: UserX,
      },
      {
        title: 'Clientes en hojas sueltas',
        text: 'Cada comercial con su propio Excel.',
        icon: FileSpreadsheet,
      },
    ],
    capabilities: [
      { title: 'Seguimiento comercial', text: 'Historial y próximos pasos.', icon: UsersRound },
      { title: 'Respuestas automáticas', text: 'Dudas frecuentes al momento.', icon: Mail },
      { title: 'Asistente con IA', text: 'Clasifica y prepara respuestas.', icon: Bot },
      { title: 'Oportunidades', text: 'Un embudo claro y ordenado.', icon: BarChart3 },
      { title: 'Recordatorios', text: 'Llamadas y ofertas sin olvidos.', icon: Bell },
      { title: 'Presupuestos', text: 'Listos en minutos.', icon: FileText },
    ],
    results: [
      { label: 'Respuestas más rápidas', icon: Zap },
      { label: 'Más oportunidades cerradas', icon: TrendingUp },
      { label: 'Clientes a la vista', icon: Eye },
    ],
  },
  {
    slug: 'datos-y-control',
    title: 'Datos y control',
    description: 'Centralizamos la información para saber qué está pasando sin perseguir Excels.',
    icon: BarChart3,
    image: dashboardsKpisImage,
    imageAlt: 'Panel con indicadores clave de rendimiento en pantalla',
    features: [
      { label: 'Indicadores en tiempo real', icon: BarChart3 },
      { label: 'Información unificada', icon: Database },
      { label: 'Mejores decisiones', icon: UsersRound },
    ],
    pains: [
      {
        title: 'Excels que no cuadran',
        text: 'Cada área tiene sus propios números.',
        icon: FileSpreadsheet,
      },
      {
        title: 'Informes que llegan tarde',
        text: 'Cuando se ven, ya no sirven.',
        icon: Clock,
      },
      {
        title: 'Decisiones a ciegas',
        text: 'Falta visión de conjunto.',
        icon: HelpCircle,
      },
    ],
    capabilities: [
      { title: 'Indicadores en vivo', text: 'Lo importante, siempre al día.', icon: BarChart3 },
      { title: 'Datos unificados', text: 'Todos tus sistemas en uno.', icon: Database },
      { title: 'Paneles por área', text: 'Cada equipo ve lo suyo.', icon: LayoutDashboard },
      { title: 'Alertas', text: 'Aviso cuando algo se desvía.', icon: Bell },
      { title: 'Informes automáticos', text: 'Se generan y envían solos.', icon: FileText },
      { title: 'Una sola verdad', text: 'Los mismos números para todos.', icon: ShieldCheck },
    ],
    results: [
      { label: 'Visión completa del negocio', icon: Eye },
      { label: 'Decisiones más rápidas', icon: Zap },
      { label: 'Adiós a preparar informes', icon: Timer },
    ],
  },
  {
    slug: 'procesos-a-medida',
    title: 'Procesos a medida',
    description:
      'Si hoy depende de correos, llamadas, Excel o copiar y pegar, probablemente podemos mejorarlo.',
    icon: Puzzle,
    image: automatizacionMapeoImage,
    imageAlt: 'Persona dibujando el mapa de un proceso de gestión en una pizarra',
    features: [
      { label: 'Aplicaciones internas', icon: Settings },
      { label: 'Automatizaciones específicas', icon: Workflow },
      { label: 'Integraciones con tus sistemas', icon: Code },
    ],
    pains: [
      {
        title: 'Todo va por correo',
        text: 'Procesos que dependen de reenviar.',
        icon: Mail,
      },
      {
        title: 'Copiar y pegar',
        text: 'Datos que se pasan a mano.',
        icon: Copy,
      },
      {
        title: 'Llamadas para todo',
        text: 'Información que solo tiene una persona.',
        icon: PhoneCall,
      },
    ],
    capabilities: [
      { title: 'Aplicaciones internas', text: 'Hechas a tu forma de trabajar.', icon: Settings },
      { title: 'Automatizaciones', text: 'Flujos que conectan cada paso.', icon: Workflow },
      { title: 'Integraciones', text: 'Tus sistemas, conectados.', icon: Code },
      { title: 'IA aplicada', text: 'Clasificar, extraer y resumir.', icon: Bot },
      { title: 'Desde el móvil', text: 'Para quien trabaja fuera.', icon: Smartphone },
      { title: 'Soporte y evolución', text: 'Crece contigo.', icon: LifeBuoy },
    ],
    results: [
      { label: 'Menos tareas manuales', icon: Timer },
      { label: 'Sistemas conectados', icon: Link2 },
      { label: 'Procesos que escalan', icon: TrendingUp },
    ],
  },
]
