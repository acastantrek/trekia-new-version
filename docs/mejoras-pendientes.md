# Mejoras pendientes de la web

Resultado del análisis de la web del 29/09/2026. Cada tarea es independiente para poder resolverlas en sesiones distintas.
Al terminar una, marca la casilla (`[x]`) y apunta el commit o una nota breve debajo.

Prioridad: 🔴 crítico · 🟠 alta · 🟡 media · 🟢 baja

---

## 🔴 Crítico

- [ ] **1. El formulario de contacto no envía nada**
  - `src/components/ContactForm.tsx`: `submit` valida y muestra "Solicitud recibida", pero los datos no se mandan a ningún sitio.
  - Opciones: función serverless en Vercel + Resend, o un servicio como Formspree / Web3Forms.
  - Incluir estado de carga, gestión de error de envío y protección anti-spam (honeypot o similar).

- [ ] **2. Enlaces de redes sociales apuntan a `#`**
  - `src/data/siteData.ts` (`socialLinks`, con un `TODO`). Se usan en el header y en el footer.
  - Poner las URLs reales o quitar los iconos de las redes que no se usen.

## 🟠 SEO

- [ ] **3. Título y descripción únicos por página**
  - Ahora todas las rutas comparten el título y la descripción de `index.html`.
  - React 19 permite renderizar `<title>` y `<meta>` dentro de cada página; en el blog y los servicios, generarlos a partir de los datos (`blogPosts.ts`, `siteData.ts`).

- [ ] **4. Metadatos y archivos básicos de SEO**
  - `public/robots.txt` y `public/sitemap.xml` (con todas las rutas, incluidos `/blog/:slug` y `/servicios/:slug`).
  - `<link rel="canonical">` por página.
  - Etiquetas Open Graph y Twitter Card (título, descripción, imagen) para que las previews de LinkedIn/WhatsApp salgan bien.
  - Datos estructurados JSON-LD: `Organization` en el layout y `BlogPosting` en cada artículo.

- [ ] **5. Prerender del HTML de cada ruta**
  - El HTML inicial es un `<div id="root">` vacío; el contenido solo existe tras ejecutar JavaScript.
  - Generar HTML estático por ruta en el build (prerender) sin cambiar de hosting (Vercel). Especialmente importante para el blog.

- [ ] **6. Página 404**
  - `src/App.tsx` no tiene ruta `*`: una URL inexistente muestra el layout con el `main` vacío.

## 🟡 Rendimiento

- [x] **7. Optimizar imágenes**
  - `src/assets` pesa ~7 MB en JPG; varias entre 350 y 475 KB (`operacion-lista-para-automatizarse.jpg`, `dashboards-bi.jpg`, `logistica-y-transporte.jpg`, `retail-y-distribucion.jpg`).
  - Convertir a WebP/AVIF (p. ej. `vite-imagetools` o un script de conversión única), servir tamaños con `srcset`/`sizes` y añadir `width`/`height` a los `<img>` para evitar saltos de layout.
  - `src/assets/logo-mark-t.png` pesa 178 KB para ser un logo: pasarlo a SVG o WebP.
  - ✅ Hecho (29/09/2026): `vite-imagetools` convierte todas las imágenes importadas a WebP en 480/960/1600px (`vite.config.ts`), se pintan con `<ResponsiveImage>` (srcset + sizes + width/height). Imágenes: 6,98 MB → 2,59 MB al ancho máximo (-63 %), 1,76 MB a 960px (-75 %). Logo del header a 40/80px. Logos en WebP sin pérdida; el icono de /quienes-somos se regeneró a 1200px (`logo-icon-1200.png`) porque el original de 393px se veía borroso. Pendiente opcional: AVIF.

- [ ] **8. Code splitting por ruta**
  - El bundle principal pesa 471 KB (152 KB gzip) porque todas las páginas se importan de forma estática en `src/App.tsx`.
  - Cargar las páginas con `lazy()` + `Suspense`.

- [ ] **9. Reducir el chunk de la escena 3D**
  - El chunk `FirstFrameSignal` pesa 921 KB (252 KB gzip); incluye three + drei.
  - Revisar qué se importa de `@react-three/drei` y valorar no cargar la escena en móvil.

- [ ] **10. Alojar las fuentes en la propia web**
  - `index.html` carga DM Sans y Manrope desde Google Fonts: petición externa que retrasa el render y, en la UE, envía la IP del visitante a Google sin consentimiento.
  - Usar `@fontsource/dm-sans` y `@fontsource/manrope` (solo los pesos usados) y quitar los `preconnect` a Google.

- [ ] **11. Pausar los carruseles cuando no se ven**
  - `src/hooks/useCarouselMarquee.ts`: el `requestAnimationFrame` sigue activo aunque la sección esté fuera de pantalla.
  - Pausarlo con un `IntersectionObserver` sobre el track.

## 🟢 UX y accesibilidad

- [ ] **12. Texto justificado en móvil**
  - `src/styles/base.css`: `p, li { text-align: justify }` crea huecos grandes entre palabras en pantallas estrechas.
  - Alinear a la izquierda en móvil o añadir `hyphens: auto` (el `lang="es"` ya está en `index.html`).

- [ ] **13. Scroll al cambiar de página**
  - `src/layout/SiteLayout.tsx` hace `scrollTo({ top: 0, behavior: 'smooth' })` en cada cambio de ruta: desde el footer es una animación larga.
  - Salto instantáneo arriba al cambiar de ruta; scroll suave solo para anclas (`#`).

- [ ] **14. Navegación con teclado**
  - Menú móvil (`src/layout/Header.tsx`): cerrar con Escape y mantener el foco dentro mientras está abierto.
  - Revisar que todos los elementos interactivos tengan `:focus-visible` visible (solo hay 8 reglas de foco en todo el CSS).

- [ ] **15. Errores del formulario accesibles**
  - `src/components/ContactForm.tsx`: vincular cada mensaje de error a su campo con `aria-describedby` y marcar los obligatorios con `required`/`aria-required`.

- [ ] **16. Banner de cookies acorde a lo que se usa**
  - `src/lib/cookieConsent.ts` ofrece analítica, publicidad, etc., pero no se carga ninguna herramienta de ese tipo.
  - Simplificar las categorías o dejarlo preparado para bloquear scripts hasta que haya consentimiento; revisar que `CookiesPage` y `PrivacyPage` describan lo que realmente se usa.

## 💡 Conversión y contenido

- [ ] **17. Reseñas más creíbles**
  - Los testimonios solo muestran cargo y sector. Añadir nombre de empresa y/o logo, o casos de éxito con cifras.

- [ ] **18. CTA alternativo al formulario**
  - Enlace para reservar llamada (Calendly / Cal.com) o botón de WhatsApp junto al formulario de contacto.

## 🧹 Código

- [ ] **19. Lógica de carrusel duplicada**
  - `src/sections/TestimonialsSection.tsx` y `src/sections/BlogTeaserSection.tsx` repiten el seguimiento del scroll, los puntos y `goTo`. Extraer a un hook compartido.

- [ ] **20. CI en GitHub**
  - Workflow que ejecute `tsc -b`, `eslint` y `vite build` en cada push/PR a `develop` y `main`.
