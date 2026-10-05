# Auditoría de la web: bugs y mejoras

Análisis completo del código del 01/10/2026 (rama `develop`, commit `8a326e2`): lectura de todos los
componentes, páginas, datos, estilos y configuración, más `npm run lint` (sin errores) y `npm run build`
(compila, con aviso de chunk > 500 KB).

Cada tarea es independiente para poder resolverla en una sesión distinta. Al terminar una, marca la
casilla (`[x]`) y apunta el commit o una nota breve debajo.

Prioridad: 🔴 crítico · 🟠 alta · 🟡 media · 🟢 baja

**Estado (05/10/2026):** hechas 1–15, 17–19 y 21–23 · parciales 16, 20 y 33 ·
pendientes 24–32 y 34–37. Verificado en un móvil real (tareas 2, 4 y 5) y previews de LinkedIn y WhatsApp con
la web publicada (tareas 10 y 11).

---

## 🔴 Bugs

- [x] **1. Una URL con un hash raro deja la web en blanco**
  - `src/layout/SiteLayout.tsx:25`: `document.querySelector(location.hash)` lanza `SyntaxError` si el hash
    no es un selector CSS válido (empieza por número, lleva `%`, `:`, `.`…). Ejemplo: `/contacto#1` o un
    enlace de una campaña con `#123`.
  - El error ocurre dentro de un `useEffect` y no hay ningún error boundary, así que React desmonta toda
    la app y queda la página en blanco.
  - Solución: `document.getElementById(decodeURIComponent(location.hash.slice(1)))` dentro de un
    `try/catch`, y añadir un error boundary global en `App.tsx` con una pantalla de "algo ha fallado".
  - ✅ Hecho (02/10/2026, `1e7b1be`): `getElementById` con el hash decodificado (en `try/catch`). `ErrorBoundary`
    alrededor del `<Outlet>` en `SiteLayout` (con `key` por ruta) que muestra `ErrorPage` y mantiene
    header y footer.

- [x] **2. El 3D del hero bloquea el scroll en móvil**
  - `src/three/OperationsCore.tsx`: `OrbitControls` pone `touch-action: none` en el canvas. En móvil la
    figura ocupa ~350–440 px de alto (`responsive.css`), así que si el usuario desliza el dedo sobre ella
    la página no se desplaza y "parece colgada". Verificar en un móvil real.
  - Opciones: desactivar `OrbitControls` en pantallas táctiles (`(pointer: coarse)`), o dejar solo
    `autoRotate` sin interacción en móvil.
  - ✅ Hecho (02/10/2026, `9d1b1b3`; el primer intento de `1e7b1be` no tenía efecto): la figura se sigue pudiendo girar en móvil. `.canvas-3d` (el div de R3F
    donde OrbitControls pone `touch-action: none`) lleva `touch-action: pan-y !important`: el
    arrastre horizontal gira la figura y el vertical desplaza la página. Verificado en un
    móvil real (02/10/2026).

- [x] **3. Slugs inexistentes redirigen en vez de dar 404**
  - `src/pages/BlogPostPage.tsx:14` y `src/pages/ServicePage.tsx:14` hacen `<Navigate>` a `/blog` y
    `/que-hacemos` cuando el slug no existe. El usuario no sabe que el enlace estaba mal y Google lo trata
    como un soft 404.
  - Renderizar `<NotFoundPage />` en esos casos, igual que la ruta `*`.
  - ✅ Hecho (02/10/2026, `1e7b1be`): ambas páginas renderizan `<NotFoundPage />` (con `noindex`).

- [x] **4. Saltos de scroll al navegar desde el menú móvil**
  - `src/layout/Header.tsx:59-65`: al cerrar el menú se restaura la posición anterior (`scrollTo(scrollY)`)
    y a la vez `SiteLayout` hace `scrollTo({ top: 0, behavior: 'smooth' })` por el cambio de ruta. Al
    pulsar un enlace del menú con la página bajada se ve la página nueva bajando y luego subiendo
    animada.
  - Al cambiar de ruta, salto instantáneo arriba (`behavior: 'instant'`); scroll suave solo para anclas
    `#`. En el cierre del menú por navegación, no restaurar la posición antigua.
  - ✅ Hecho (02/10/2026, `1e7b1be`): al cambiar de ruta salto instantáneo arriba; al cerrar el menú por un
    enlace no se restaura la posición (`closingToNavigate` en `Header`).
  - Verificado en un móvil real (02/10/2026).

- [x] **5. Volver a pulsar el mismo ancla no hace nada**
  - `SiteLayout.tsx:23-30`: el efecto depende de `location.hash` + `pathname`. Si ya estás en
    `/sectores#industria`, bajas, y vuelves a elegir "Industria" en el desplegable, no se desplaza porque
    la URL no cambia.
  - Usar `location.key` como dependencia (cambia en cada navegación).
  - ✅ Hecho (02/10/2026, `1e7b1be`): el efecto depende de `location.key`.
  - Verificado en un móvil real (02/10/2026).

- [x] **6. Efecto secundario dentro de un `setState`**
  - `Header.tsx:35-41`: `setOpen` llama a `onMenuOpenChange` (que actualiza el estado de `SiteLayout`)
    desde dentro de la función actualizadora de `setOpenState`. React puede ejecutar esa función durante
    el render (y dos veces en StrictMode), lo que da el aviso *"Cannot update a component while
    rendering a different component"* y es frágil.
  - Subir el estado `menuOpen` a `SiteLayout` y pasarlo como prop, o notificar en un `useEffect([open])`.
  - ✅ Hecho (02/10/2026, `1e7b1be`): `menuOpen` vive en `SiteLayout` y `Header` lo recibe por props.

- [x] **7. Guardar el consentimiento de cookies puede fallar**
  - `src/lib/cookieConsent.ts:39`: `saveConsent` no tiene `try/catch` (a diferencia de `getStoredConsent`
    y `useTheme`). Con el almacenamiento bloqueado (Safari privado, políticas de empresa) el clic en
    "Aceptar/Rechazar" lanza una excepción y el banner no se cierra.
  - ✅ Hecho (02/10/2026, `1e7b1be`): `saveConsent` con `try/catch`; el banner se cierra aunque no se guarde.

- [x] **8. Desplegable bloqueado tras usarlo con teclado**
  - `Header.tsx:128-132`: al elegir una opción del desplegable se marca `is-closed`, que solo se limpia
    con `onMouseLeave`. Un usuario de teclado no dispara ese evento, así que ese desplegable ya no se
    vuelve a abrir con el foco hasta que pase el ratón por encima.
  - Limpiar también en `onBlur`/`onFocus` o al cambiar de ruta.
  - ✅ Hecho (02/10/2026, `1e7b1be`): `onFocus` con `:focus-visible` limpia `is-closed` al volver con teclado.

## 🟠 SEO

- [x] **9. Título y descripción únicos por página**
  - Todas las rutas comparten `<title>` y `description` de `index.html`.
  - React 19 permite renderizar `<title>`, `<meta>` y `<link rel="canonical">` dentro de cada página; en
    blog y servicios generarlos a partir de `blogPosts.ts` y `businessAreas.ts`.
  - ✅ Hecho (01/10/2026): componente `<Seo>` (`src/components/Seo.tsx`) en todas las páginas con título
    "… | Trek.IA", descripción y canonical sobre `SITE_URL` (`https://www.trek-ia.com`, en
    `siteData.ts`). Blog y servicios lo generan desde sus datos; la 404 lleva `noindex` y no lleva
    canonical. El título y la descripción de `index.html` quedan como respaldo para clientes sin JS
    (`data-fallback`) y `main.tsx` los quita al arrancar para que no haya duplicados.

- [x] **10. Archivos y metadatos básicos**
  - No existen `public/robots.txt` ni `public/sitemap.xml` (incluir `/blog/:slug` y `/servicios/:slug`).
  - Sin etiquetas Open Graph / Twitter Card: las previews en LinkedIn y WhatsApp salen sin imagen ni
    texto. Crear una imagen `og.png` 1200×630.
  - Datos estructurados JSON-LD: `Organization`/`LocalBusiness` (con dirección, teléfono, redes) en el
    layout y `BlogPosting` en cada artículo.
  - No hay `/favicon.ico`: la petición automática del navegador acaba en el rewrite a `index.html`.
  - ✅ Hecho (01/10/2026): `public/robots.txt`; `sitemap.xml` generado en cada build por un plugin de
    `vite.config.ts` (rutas fijas de `src/data/site.ts` + slugs de blog y servicios, 22 URLs).
    `<Seo>` añade Open Graph y Twitter Card con `public/og-image.png` (1200×630); los artículos llevan
    `og:type=article`. JSON-LD `Organization` en el layout y `BlogPosting` en cada artículo (fecha ISO en
    el nuevo campo `published` de `blogPosts.ts`). `public/favicon.ico` con los PNG de 32 y 48 px. La
    imagen OG y el ICO se regeneran con `node scripts/generate-static-images.mjs`.
  - Con el prerender (tarea 11) cada página ya sirve su propio Open Graph sin JS: previews de
    LinkedIn y WhatsApp verificadas con la web publicada (02/10/2026). Pendiente: en `sameAs` va el
    LinkedIn actual, que es un perfil personal (ver tarea 16).

- [x] **11. Prerender del HTML de cada ruta**
  - El HTML inicial es un `<div id="root">` vacío. Generar HTML estático por ruta en el build (p. ej.
    `vite-react-ssg` o prerender propio) sin cambiar de hosting. Muy importante para el blog.
  - ✅ Hecho (02/10/2026, `f74672c`): `npm run build` hace también un build de servidor de
    `src/entry-server.tsx` y `scripts/prerender.mjs` genera un HTML por ruta (22 rutas: fijas, blog y
    servicios) con su `<title>`, descripción, canonical, Open Graph, JSON-LD y el contenido. La app no
    se hidrata: `createRoot` sustituye el HTML al arrancar. El banner de cookies solo se pinta en el
    navegador. El 3D sale como la imagen estática en el HTML generado.
  - Actualización (02/10/2026): la app ya se hidrata (`hydrateRoot`) en lugar de repintar el HTML,
    y el prerender usa `prerenderToNodeStream` para esperar a las páginas cargadas con `lazy()`.
    Lo que depende del navegador (banner de cookies, comprobación de WebGL) se pinta tras hidratar
    con `useIsClient`. Verificado en Chrome headless: las 22 rutas y la 404 se hidratan sobre el
    HTML original sin errores (un HTML alterado a propósito sí da el error #418).
  - Ojo al tocar el layout: si `SiteLayout` o un contexto (p. ej. `LazyMotion` con features
    asíncronas) cambia antes de que la página se hidrate, React descarta su HTML y la repinta
    entera sin avisar. Por eso el estado de cookies vive en `CookieConsent`, la página está
    memorizada en `SiteLayout` y `domAnimation` se carga de forma síncrona.
  - `prerenderToNodeStream` va con `progressiveChunkSize: Infinity`: sin eso React deja el fallback
    en `<main>` y mueve la página a un `<div hidden>` con un script que la coloca al cargar (sin JS
    el contenido quedaba oculto). Comprobado: ningún HTML de `dist` lleva `$RC(` ni `div hidden`.

- [x] **12. La página 404 devuelve HTTP 200**
  - `vercel.json` reescribe todo a `index.html`, así que una URL inexistente responde 200 aunque se vea la
    404. Con el prerender (tarea 11) se puede generar un `404.html` y limitar el rewrite a las rutas
    reales; mientras tanto, al menos `<meta name="robots" content="noindex">` en `NotFoundPage`.
  - ✅ Hecho (02/10/2026, `f74672c`): `scripts/prerender.mjs` genera `404.html` y `vercel.json` usa
    `cleanUrls` + `trailingSlash: false` sin rewrite general: Vercel sirve `/blog/slug` desde
    `blog/slug.html` y cualquier otra ruta devuelve 404 con `404.html`. Al añadir una ruta nueva en
    `App.tsx` hay que añadirla también a `STATIC_ROUTES` (o a sus datos) para que se genere.
  - Verificado en la preview de Vercel: rutas anidadas 200, rutas inexistentes 404 y `/blog/`
    redirige a `/blog`.

## 🟠 Legal y contenido

- [x] **13. Aviso legal incompleto**
  - `src/pages/LegalPage.tsx`: la LSSI (art. 10.1.b) exige los datos de inscripción en el Registro
    Mercantil (tomo, folio, hoja, inscripción) de Kenned Group SL. Añadirlos.
  - ✅ Hecho (02/10/2026): Registro Mercantil de Barcelona, tomo 45412, folio 44, hoja 486890,
    inscripción 1.ª. Los datos están en `company.registry` (`src/data/site.ts`) y `LegalPage` los
    muestra tras el CIF.

- [x] **14. Política de privacidad: incoherencias**
  - `PrivacyPage.tsx:42`: dice que, "si lo autorizas", se envían comunicaciones comerciales, pero el
    formulario no tiene casilla para ello. Quitar la frase o añadir una casilla opcional separada.
  - No menciona Google Fonts (se envía la IP del visitante a Google al cargar la web). Se resuelve mejor
    con la tarea 19 (fuentes propias); si no, añadirlo a privacidad y cookies.
  - ✅ Hecho (02/10/2026, `e217348`): quitada la frase de comunicaciones comerciales (ahora dice que los datos
    no se usan para eso). Google Fonts ya no se usa (tarea 19), así que no hace falta mencionarlo.

- [x] **15. Cifras sin respaldo en el home**
  - `siteData.ts` `metrics` (`-65%`, `+40%`, `3–6 semanas`) y los chips del hero
    (`HeroSection.tsx:59-68`: "Flujos activos 24", "Eficiencia operativa 92.4%", "↗ 18.6%") parecen datos
    reales pero son inventados. Riesgo de credibilidad y de publicidad engañosa.
  - Respaldar con un caso real ("en el proyecto X…"), matizar ("hasta un…") o convertir los chips en
    algo claramente ilustrativo.
  - Formato numérico en español: `92,4 %` en vez de `92.4%`.
  - ✅ Revisado (02/10/2026, `3cb586a`): las métricas y los chips del hero son datos reales, se mantienen.
    Formato español con espacio no separable: `-65 %`, `+40 %`, `92,4 %`, `↗ 18,6 %` y el `20 %` del artículo de costes.

- [ ] **16. Erratas y textos**
  - `siteData.ts:58`: "Qué hacemos?" → "¿Qué hacemos?" (menú y footer).
  - `blogPosts.ts:63`: "si el modelo mejora el proceso o simplemente lo distinto" → "o simplemente lo
    cambia".
  - `ContactPage.tsx:66`: bajo el teléfono pone "Respuesta en 1–2 días laborables"; mejor el horario de
    atención (p. ej. "L–V, 9:00–18:00").
  - El enlace de LinkedIn (`siteData.ts:43`) es un perfil personal (`/in/…`); si existe página de
    empresa (`/company/…`), usar esa.
  - Parcial (02/10/2026, `e217348`): corregidos "¿Qué hacemos?" y "o simplemente lo cambia".
  - Horario de atención: decidido no ponerlo; se mantiene "Respuesta en 1–2 días laborables".
  - Pendiente: LinkedIn. El enlace sí lleva a la cuenta de Trek.IA, pero es un perfil personal
    (`/in/`); cuando se cree la página de empresa (`/company/…`), cambiar `siteData.ts` (también
    alimenta `sameAs` del JSON-LD).

- [x] **17. Testimonios ficticios con fotos de terceros**
  - `siteData.ts:203-247`: los testimonios son de ejemplo y usan avatares de `i.pravatar.cc` (fotos de
    personas reales, servidas desde un dominio externo). Ahora mismo `TestimonialsSection` no se usa,
    pero si se reactiva tal cual sería contenido engañoso. No publicarlos hasta tener testimonios reales
    (con nombre de empresa o logo y permiso).
  - ✅ Hecho (02/10/2026): borrados `TestimonialsSection`, `testimonials.css`, los datos de
    `siteData.ts` y sus reglas en `responsive.css`. Si hay testimonios reales, se rehace desde git.

## 🟡 Rendimiento

- [x] **18. Code splitting por ruta**
  - Bundle principal: 461 KB (149 KB gzip) porque todas las páginas se importan de forma estática en
    `src/App.tsx`. Cargarlas con `lazy()` + `Suspense`.
  - `framer-motion` se usa solo para el `Reveal` y el `ProcessSection`: valorar `LazyMotion` + `m` para
    cargar solo las features necesarias (~30 KB menos), o sustituir `Reveal` por CSS +
    `IntersectionObserver`.
  - ✅ Hecho (02/10/2026): cada página es un chunk con `lazy()` (`App.tsx`) y framer-motion usa
    `LazyMotion` + `m` con `domAnimation`. JS principal: 466 → 355 KB (150 → 117 KB gzip); las
    páginas pesan 1–13 KB cada una. Al navegar se mantiene la página anterior hasta que llega la
    nueva (transición de React Router + `Suspense` fuera del `ErrorBoundary`).

- [x] **19. Alojar las fuentes en la propia web**
  - `index.html:27-32` carga DM Sans y Manrope desde Google Fonts: CSS bloqueante + petición externa +
    IP a Google sin consentimiento.
  - Usar `@fontsource-variable/dm-sans` y `@fontsource-variable/manrope` (o archivos `woff2` en `public`
    con `preload`) y quitar los `preconnect`.
  - ✅ Hecho (02/10/2026, `e217348`): `@fontsource-variable/dm-sans` y `@fontsource-variable/manrope`
    importadas en `main.tsx`; el CSS usa `'DM Sans Variable'` y `'Manrope Variable'`. Sin peticiones
    externas: el navegador solo descarga el bloque latino de cada fuente (~62 KB en total).

- [ ] **20. Escena 3D pesada y siempre activa**
  - El chunk `OperationsCore` pesa 924 KB (253 KB gzip) y se descarga también en móvil.
  - El `<Canvas>` sigue renderizando a 60 fps aunque el hero esté fuera de pantalla (gasta batería y
    CPU mientras se lee el resto del home). Pausar con `frameloop="demand"`/`"never"` cuando no es
    visible (`IntersectionObserver`) o cuando la pestaña está oculta.
  - Coste de GPU: `shadows` + `ContactShadows` + `meshPhysicalMaterial` transparentes. Valorar quitar
    sombras en móvil o mostrar directamente la imagen estática en móviles/gama baja.
  - Importar de `@react-three/drei` solo lo necesario o sustituir `Line`/`Sparkles` por geometría propia
    para reducir el chunk.
  - Parcial (02/10/2026): la escena deja de pintarse fuera de pantalla (`frameloop="never"` con
    `IntersectionObserver` en `OperationsCore`): medido en Chrome, ~3.900 draw calls/s en pantalla y
    0 fuera. Pendiente: tamaño del chunk (es casi todo three.js) y coste de GPU en móvil.

- [x] **21. El título principal aparece tarde (LCP)**
  - El `h1` del hero y de `PageHero` va dentro de `<Reveal>`, que arranca con `opacity: 0` y solo se
    muestra tras cargar el JS y animar 0,65 s. Eso retrasa el LCP.
  - No animar el bloque que está en el primer pantallazo, o animar solo `transform` sin `opacity`.
  - ✅ Hecho (02/10/2026): `<Reveal onLoad>` en los heros (home, `PageHero`, Quiénes somos,
    servicios, sectores y la cabecera de /que-hacemos) anima con CSS (`.reveal-on-load` en `ui.css`) solo el desplazamiento, sin
    opacidad y sin esperar al JS: el título es visible desde el primer pintado del HTML
    prerenderizado. Respeta `prefers-reduced-motion`.

## 🟡 Accesibilidad

- [x] **22. Las animaciones ignoran "reducir movimiento"**
  - `src/components/Reveal.tsx` anima siempre: framer-motion no respeta `prefers-reduced-motion` salvo
    que se configure. Envolver la app en `<MotionConfig reducedMotion="user">` (en `main.tsx` o
    `SiteLayout`).
  - ✅ Hecho (02/10/2026): `<MotionConfig reducedMotion="user">` en `App.tsx` y, como `Reveal`
    anima `transform` entero (que MotionConfig no cubre), `Reveal` usa `useReducedMotion` para que
    el desplazamiento dure 0 y solo quede el fundido. Regla global en `base.css` que anula
    animaciones, transiciones y scroll suave por CSS. Verificado en Chrome headless emulando la
    preferencia: sin posiciones intermedias, y la hidratación sigue sin errores.
  - Pendiente menor: los `scrollIntoView`/`scrollTo` con `behavior: 'smooth'` en JS y el giro
    automático de la figura 3D siguen activos con la preferencia.

- [x] **23. Navegación con teclado en menú y modales**
  - Menú móvil (`Header.tsx`): cerrar con Escape, mantener el foco dentro mientras está abierto y
    devolverlo al botón al cerrar.
  - `CookiePreferencesModal`: tiene `aria-modal` pero no mueve el foco al abrirse, no lo atrapa y no se
    cierra con Escape.
  - Pestañas de `/metodo` (`MethodDetailSection.tsx`): el patrón ARIA de tabs requiere flechas
    izquierda/derecha y `tabIndex={-1}` en las pestañas no activas.
  - Revisar `:focus-visible`: los inputs del formulario quitan el `outline` (`contact.css:142`) y el foco
    se marca solo con un `box-shadow` de opacidad 0.1, casi invisible. Hay muy pocas reglas de foco en
    el CSS (botones, enlaces del footer, tarjetas de área…).
  - ✅ Hecho (05/10/2026): hook `useFocusTrap` (`src/hooks/useFocusTrap.ts`) para el menú móvil y el
    modal de cookies: Tab y Mayús+Tab no salen, Escape cierra y el foco vuelve al botón que lo abrió.
    El modal recibe el foco al abrirse; Escape lo cierra sin guardar (si no había consentimiento, el
    banner sigue). Banner y botón de cookies se ocultan sin desmontarse mientras el modal está abierto.
    Pestañas de `/metodo` con tabindex itinerante, flechas, Inicio y Fin; el panel es enfocable.
    Contorno `:focus-visible` global en `base.css` y halo del formulario más visible. Verificado en
    Chrome con teclado real (menú en un iframe de 400 px).

- [ ] **24. Formulario de contacto**
  - `src/components/ContactForm.tsx`: vincular cada error con su campo (`aria-describedby` + `id` en el
    `<small>`), marcar los obligatorios (`aria-required` y un asterisco visible) y mover el foco al primer
    campo con error al enviar.
  - Añadir `name` y `autoComplete` (`name`, `organization`, `email`, `tel`) para que el navegador
    autorrellene.
  - Añadir `maxLength` razonables (p. ej. 2000 en el mensaje).

- [ ] **25. Detalles menores**
  - `DataFlowCore`/`OperationsCore`: `aria-label` en un `div` sin `role` no se anuncia; usar
    `role="img"`.
  - `BlogPostPage.tsx:36`: la imagen usa `alt={post.title}`, que repite el `h1`; poner `alt=""` o una
    descripción real.
  - Fechas del blog como texto ("Septiembre 2026"): usar `<time dateTime="2026-09">`.
  - Textos de 10–12 px en etiquetas (`hero.css`, `tabs.css`, `economic.css`…): revisar contraste y
    legibilidad.
  - Texto justificado (`base.css:148-151`, `p, li { text-align: justify }`): crea huecos grandes en móvil;
    ya hay varias excepciones en el CSS. Alinear a la izquierda en móvil o añadir `hyphens: auto`.

## 🟢 UX y conversión

- [ ] **26. Datos de contacto clicables en /contacto**
  - `ContactPage.tsx:58-65`: email y teléfono están en `<strong>` sin enlace. Convertirlos en
    `mailto:` y `tel:+34930157006` (en el footer ya lo son).

- [ ] **27. Tarjetas de "Qué hacemos" clicables enteras**
  - `WhatWeDoSection.tsx:46-52`: solo la flecha pequeña enlaza a la página del servicio. Hacer clicable
    toda la tarjeta (enlace con `::after` que cubra la tarjeta) y que el foco se vea.

- [ ] **28. Servicios accesibles desde el menú móvil**
  - En móvil el desplegable está oculto (`responsive.css:118`), así que las 6 páginas `/servicios/*` solo
    se alcanzan desde `/que-hacemos`. Valorar un acordeón en el menú móvil o enlaces en el footer.

- [ ] **29. CTA alternativo al formulario**
  - Botón para reservar llamada (Cal.com / Calendly) o WhatsApp junto al formulario.

- [ ] **30. El blog no aparece en el home**
  - `BlogTeaserSection` existe pero no se usa. Valorar añadirlo al home (ayuda a SEO y da sensación de
    actividad) o borrarlo (tarea 33).
  - En los artículos, enlazar al método (`/metodo`) y a los servicios relacionados donde el texto ya los
    menciona ("nuestro método de trabajo").

- [ ] **31. Banner de cookies acorde a lo que se usa**
  - `cookieConsent.ts` y el modal ofrecen analítica, rendimiento, publicidad y "sin categorizar", pero no
    se carga nada de eso. Simplificar a "solo técnicas" (sin banner o con un aviso informativo) o dejar
    preparado el bloqueo real de scripts para cuando se añada analítica.

## 🟢 Seguridad y despliegue

- [ ] **32. Cabeceras HTTP en `vercel.json`**
  - Añadir `Content-Security-Policy` (permitir `api.web3forms.com`), `Strict-Transport-Security`,
    `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` y
    `frame-ancestors 'none'`.
  - Caché larga e inmutable para `/assets/*` (los nombres llevan hash).
  - Anti-spam del formulario: el honeypot ayuda poco; valorar Cloudflare Turnstile o hCaptcha (Web3Forms
    los admite).

## 🧹 Código

- [ ] **33. Código y estilos sin usar**
  - Secciones y componentes no referenciados: `BenefitsSection`, `BlogTeaserSection`,
    `ChallengesSection`, `OperationsShowcaseSection` (y con ella `three/DataFlowCore.tsx`),
    `TestimonialsSection`, `TeamPhotosCarousel`, `ImageLightbox`, `useCarouselMarquee`. `ThemeToggle` y
    `useTheme` están ocultos a propósito (comentario en `Header.tsx`).
  - Su CSS se sigue importando en `styles/index.css` (`benefits.css`, `challenges.css`, `showcase.css`,
    `testimonials.css`, `lightbox.css`, `solutions.css` — este último sin ninguna clase en uso) y suma al
    CSS de 82 KB.
  - Datos sin uso: `benefits`, `testimonials` (si se borran las secciones).
  - Imágenes sin referenciar en `src/assets` (~2,9 MB en el repo): `about/mision-ia-asistente.jpg`,
    `logo-icon-1200.png`, `sectors/sectores-intro.jpg`, `services/automatizacion-procesos.jpg`,
    `services/capacidades.jpg`, `services/dashboards-bi.jpg`, `services/ia-operaciones.jpg`,
    `services/integraciones-erp.jpg`, `services/software-a-medida.jpg` y en `services/detail/`:
    `automatizacion-reglas`, `dashboards-presentacion`, `erp-conexion`, `erp-multisistema`,
    `ia-abstracto`, `software-codigo`, `software-equipo`, `trazabilidad-planta`.
  - Decidir qué se conserva para el futuro (p. ej. moverlo a una carpeta `archive/`) y borrar el resto.
  - Parcial (02/10/2026): `TestimonialsSection`, `testimonials.css` y los datos `testimonials` ya
    están borrados (tarea 17).

- [ ] **34. Lógica de carrusel duplicada**
  - `SectorsSection`, `TeamPhotosCarousel`, `BlogTeaserSection` y `TestimonialsSection` repiten el
    seguimiento del scroll, `scrollToIndex` y `goTo`. Extraer un hook `useCarousel(trackRef, count)`.

- [ ] **35. Imagen reutilizada entre secciones**
  - `businessAreas.ts:54`: el servicio "Administración" usa la imagen de un artículo del blog
    (`coste-real-de-un-proyecto-de-automatizacion.jpg`). Con imágenes sin usar disponibles (tarea 33),
    darle una propia.

- [ ] **36. Datos de contacto repetidos**
  - Email, teléfono, dirección y CIF están escritos a mano en `Footer.tsx`, `ContactPage.tsx`,
    `LegalPage.tsx` y `PrivacyPage.tsx`. Centralizarlos en `siteData.ts` (también servirá para el
    JSON-LD de la tarea 10).
  - Parcial: `company` en `src/data/site.ts` ya tiene todos los datos y lo usa el JSON-LD de
    `SiteLayout`, pero `Footer`, `ContactPage`, `LegalPage` y `PrivacyPage` siguen con los datos
    escritos a mano.

- [ ] **37. CI y calidad**
  - Workflow de GitHub Actions que ejecute `tsc -b`, `eslint` y `vite build` en cada push/PR a
    `develop` y `main`.
  - Añadir `engines`/`.nvmrc` con la versión de Node, y un `README.md` con cómo arrancar y desplegar.
  - Opcional: Lighthouse CI sobre el preview de Vercel para vigilar rendimiento y accesibilidad.
