import {
  Activity,
  Building2,
  ConciergeBell,
  Ellipsis,
  Factory,
  FileText,
  HeartPulse,
  Instagram,
  Linkedin,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Store,
  Truck,
  UsersRound,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
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

export interface BenefitItem {
  title: string
  description: string
  icon: LucideIcon
}

// Facebook y YouTube están ocultos por ahora; para mostrarlos, añadir aquí sus entradas
// con los iconos Facebook y Youtube de lucide-react
export const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/trek-ia-79968b43b/',
    Icon: Linkedin,
    color: '#0A66C2',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/trekia_solutions/',
    Icon: Instagram,
    color: '#E4405F',
  },
]

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Quiénes somos', href: '/quienes-somos' },
  { label: '¿Qué hacemos?', href: '/que-hacemos' },
  { label: 'Sectores', href: '/sectores' },
  { label: 'Método', href: '/metodo' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contáctanos', href: '/contacto' },
]

export const metrics = [
  // Espacio no separable antes de % (formato español) para que no se corte la línea
  { value: '-65 %', label: 'tiempo operativo manual' },
  { value: '+40 %', label: 'capacidad sin ampliar plantilla' },
  { value: '3–6', label: 'semanas hasta primeros resultados' },
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
