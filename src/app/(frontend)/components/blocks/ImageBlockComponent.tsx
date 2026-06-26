import Image from 'next/image'
import type { Media, Page } from '@/payload-types'

type ImageBlock = Extract<NonNullable<Page['content']>[number], { blockType: 'image' }>

function isMedia(image: ImageBlock['image']): image is Media {
  return typeof image === 'object' && image !== null
}

export function ImageBlockComponent({ image, caption, fullWidth }: ImageBlock) {
  const url = isMedia(image) ? image.url : null
  const alt = isMedia(image) ? image.alt || '' : ''
  if (!url) return null

  return (
    <figure
      style={{
        maxWidth: fullWidth ? '100%' : '900px',
        margin: '0 auto 2rem',
        padding: fullWidth ? 0 : '0 1.5rem',
      }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
        <Image src={url} alt={alt} fill style={{ objectFit: 'cover', borderRadius: fullWidth ? 0 : '12px' }} />
      </div>
      {caption && (
        <figcaption style={{ color: '#c0849a', fontSize: '0.85rem', marginTop: '0.5rem', textAlign: 'center' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
