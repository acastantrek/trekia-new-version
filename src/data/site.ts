// Datos generales de la web. Sin imports para poder usarlos también desde vite.config.ts
// (sitemap) además de desde la app (SEO y datos estructurados)

// Dominio de producción (el dominio sin www redirige aquí): base de las URLs canónicas
export const SITE_URL = 'https://www.trek-ia.com'
export const SITE_NAME = 'Trek.IA'

// Imagen de las previews en redes (public/, generada con scripts/generate-static-images.mjs)
export const OG_IMAGE = { path: '/og-image.png', width: 1200, height: 630 }

export const company = {
  legalName: 'Kenned Group SL',
  taxId: 'B66788605',
  // Inscripción en el Registro Mercantil (obligatoria en el aviso legal, art. 10.1.b LSSI)
  registry: { city: 'Barcelona', volume: '45412', folio: '44', sheet: '486890', entry: '1' },
  email: 'hello@trek-ia.com',
  phone: '+34930157006',
  address: {
    street: 'Gran Via de Carles III, 53, entlo 5ª',
    postalCode: '08028',
    locality: 'Barcelona',
    region: 'Cataluña',
    country: 'ES',
  },
}

// Rutas fijas que se indexan (las de blog y servicios se añaden desde sus datos)
export const STATIC_ROUTES = [
  '/',
  '/quienes-somos',
  '/que-hacemos',
  '/sectores',
  '/metodo',
  '/blog',
  '/catalogo',
  '/contacto',
  '/aviso-legal',
  '/politica-privacidad',
  '/politica-cookies',
]
