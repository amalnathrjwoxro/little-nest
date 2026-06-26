
import Image from 'next/image'
import type { Media, Page } from '@/payload-types'

type GalleryBlock = Extract<NonNullable<Page['content']>[number], { blockType: 'gallery' }>
type GalleryImage = NonNullable<NonNullable<GalleryBlock['images']>[number]>['image']

function isMedia(image: GalleryImage): image is Media {
  return typeof image === 'object' && image !== null
}

export function GalleryBlockComponent({ images, columns = '3' }: GalleryBlock) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '1rem',
        maxWidth: '1100px',
        margin: '0 auto 3rem',
        padding: '0 1.5rem',
      }}
    >
      {images?.map((item, i) => {
        const url = isMedia(item.image) ? item.image.url : null
        const alt = isMedia(item.image) ? item.image.alt || '' : ''
        if (!url) return null
        return (
          <figure key={i} style={{ position: 'relative', aspectRatio: '1/1' }}>
            <Image src={url} alt={alt} fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
            {item.caption && (
              <figcaption style={{ fontSize: '0.75rem', color: '#c0849a', marginTop: '0.4rem' }}>
                {item.caption}
              </figcaption>
            )}
          </figure>
        )
      })}
    </div>
  )
}
