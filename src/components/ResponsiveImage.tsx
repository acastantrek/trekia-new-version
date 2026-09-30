import type { ImgHTMLAttributes } from 'react'
import type { Picture } from 'vite-imagetools'

interface ResponsiveImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'width' | 'height'
> {
  image: Picture
  /** Ancho con el que se muestra la imagen, para que el navegador elija la variante adecuada */
  sizes?: string
}

// <img> con srcset WebP y width/height reales (reservan el hueco y evitan saltos de layout)
export function ResponsiveImage({ image, sizes = '100vw', ...rest }: ResponsiveImageProps) {
  return (
    <img
      src={image.img.src}
      srcSet={image.sources.webp}
      sizes={sizes}
      width={image.img.w}
      height={image.img.h}
      {...rest}
    />
  )
}
