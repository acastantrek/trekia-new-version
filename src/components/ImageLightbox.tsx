import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect } from 'react'
import type { Picture } from 'vite-imagetools'
import { ResponsiveImage } from './ResponsiveImage'

interface LightboxImage {
  src: Picture
  alt: string
}

interface ImageLightboxProps {
  images: LightboxImage[]
  index: number
  onClose: () => void
  onIndexChange: (index: number) => void
}

export function ImageLightbox({ images, index, onClose, onIndexChange }: ImageLightboxProps) {
  const goTo = (next: number) => {
    onIndexChange((next + images.length) % images.length)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goTo(index - 1)
      if (event.key === 'ArrowRight') goTo(index + 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  useEffect(() => {
    const { body } = document
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'
    return () => {
      body.style.overflow = previousOverflow
    }
  }, [])

  const image = images[index]

  return (
    <div className="image-lightbox-overlay" role="presentation" onClick={onClose}>
      <button type="button" className="image-lightbox-close" onClick={onClose} aria-label="Cerrar">
        <X size={22} />
      </button>
      {images.length > 1 && (
        <button
          type="button"
          className="carousel-arrow image-lightbox-arrow image-lightbox-arrow-prev"
          onClick={(event) => {
            event.stopPropagation()
            goTo(index - 1)
          }}
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={22} />
        </button>
      )}
      <figure
        className="image-lightbox-figure"
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
        onClick={(event) => event.stopPropagation()}
      >
        <ResponsiveImage image={image.src} sizes="90vw" alt={image.alt} />
        {images.length > 1 && (
          <figcaption className="image-lightbox-counter">
            {index + 1} / {images.length}
          </figcaption>
        )}
      </figure>
      {images.length > 1 && (
        <button
          type="button"
          className="carousel-arrow image-lightbox-arrow image-lightbox-arrow-next"
          onClick={(event) => {
            event.stopPropagation()
            goTo(index + 1)
          }}
          aria-label="Imagen siguiente"
        >
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  )
}
