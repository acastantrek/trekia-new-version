// Datos estructurados (schema.org) para buscadores. Se escapa "<" para que el texto nunca pueda
// cerrar la etiqueta <script>
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
