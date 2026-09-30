import { BlogCard } from '../components/BlogCard'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { ButtonLink } from '../components/ButtonLink'
import { blogPosts } from '../data/blogPosts'

export function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ideas prácticas sobre automatización, datos e IA aplicada."
        description="Lo que aprendemos ayudando a empresas B2B a operar con menos fricción, escrito sin relleno."
      />
      <section className="section blog-section">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.06}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
          <Reveal className="blog-cta" delay={0.2}>
            <p>Publicamos nuevos artículos próximamente. ¿Tienes un reto que no aparece aquí?</p>
            <ButtonLink to="/contacto">Hablemos</ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
