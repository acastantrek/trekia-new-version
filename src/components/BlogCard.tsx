import { Link } from 'react-router-dom'
import type { BlogPost } from '../data/blogPosts'
import { trackSpotlight } from '../lib/trackSpotlight'
import { ResponsiveImage } from './ResponsiveImage'

function withEllipsis(text: string) {
  return `${text.replace(/[.\s]+$/, '')}…`
}

interface BlogCardProps {
  post: BlogPost
  /** Copia decorativa (bucle del carrusel): oculta a lectores de pantalla y sin foco */
  clone?: boolean
}

export function BlogCard({ post, clone = false }: BlogCardProps) {
  return (
    <article
      className={`blog-card ${clone ? 'is-clone' : ''}`}
      aria-hidden={clone || undefined}
      inert={clone}
    >
      <Link
        className="blog-card-link glow-card"
        to={`/blog/${post.slug}`}
        onMouseMove={trackSpotlight}
      >
        <div className="blog-card-media">
          <ResponsiveImage
            image={post.image}
            sizes="(max-width: 600px) 90vw, (max-width: 1040px) 50vw, 33vw"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="blog-card-body">
          <div className="blog-card-meta">
            <span>{post.tag}</span>
            <small>{post.date}</small>
          </div>
          <h3>{post.title}</h3>
          <p>{withEllipsis(post.excerpt)}</p>
        </div>
      </Link>
    </article>
  )
}
