import { ArrowLeft } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { CtaSection } from '../sections/CtaSection'
import { blogPosts } from '../data/blogPosts'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { JsonLd } from '../components/JsonLd'
import { Seo } from '../components/Seo'
import { SITE_URL } from '../data/site'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <>
      <Seo title={post.title} description={post.excerpt} type="article" />
      <JsonLd
        data={{
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: new URL(post.image.img.src, SITE_URL).href,
          datePublished: post.published,
          inLanguage: 'es',
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
          author: { '@type': 'Organization', name: 'Equipo Trek.IA', url: SITE_URL },
          publisher: { '@id': `${SITE_URL}/#organization` },
        }}
      />
      <PageHero
        eyebrow={post.tag}
        title={post.title}
        description={`${post.date} · Equipo Trek.IA`}
      />
      <section className="section legal-section">
        <div className="container legal-content">
          <Reveal>
            <Link className="blog-back-link" to="/blog">
              <ArrowLeft size={16} />
              Volver al blog
            </Link>
          </Reveal>
          <Reveal className="service-detail-media" delay={0.05}>
            <ResponsiveImage
              image={post.image}
              sizes="(max-width: 1240px) 100vw, 1200px"
              alt={post.title}
            />
          </Reveal>
          {post.content.map((paragraph, index) => (
            <Reveal className="article-p" delay={index * 0.04} key={paragraph.slice(0, 24)}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  )
}
