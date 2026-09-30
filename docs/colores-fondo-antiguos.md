# Colores de fondo antiguos (modo mixto)

Paleta del modo mixto antes del cambio de la rama `testing-bg-colors` (commit `40f7e28`).
Para recuperarla, sustituye estos dos bloques en `src/styles/base.css`.

| | Color base |
|---|---|
| Secciones oscuras (impares) | `#141b36` |
| Secciones claras (pares) | `#cdd4e5` |

```css
/* Modo mixto con poco salto entre secciones: oscuro más claro y claro más gris que en los
   modos puros; los textos secundarios se oscurecen para mantener el contraste */
:root[data-theme='mixed'] {
  --bg: #141b36;
  --bg-alt: #161d39;
  --bg-alt-2: #18203c;
  --bg-soft: #19213e;

  --surface-rgb: 29, 37, 68;
  --panel: rgba(var(--surface-rgb), 0.72);
}
:where(:root[data-theme='mixed'] main > :nth-child(even)) {
  --bg: #cdd4e5;
  --bg-alt: #c8d0e2;
  --bg-alt-2: #c3cbdf;
  --bg-soft: #c8d0e2;

  --surface-rgb: 232, 236, 245;
  --panel: rgba(var(--surface-rgb), 0.82);

  --label: #2750b8;
  --muted: #454e6e;
  --faint: #4d5676;
}
```
