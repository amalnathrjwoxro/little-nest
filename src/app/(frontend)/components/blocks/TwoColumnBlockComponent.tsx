
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media, Page } from '@/payload-types'

type TwoColumnBlock = Extract<NonNullable<Page['content']>[number], { blockType: 'twoColumn' }>

function isMedia(image: TwoColumnBlock['image']): image is Media {
  return typeof image === 'object' && image !== null
}

export function TwoColumnBlockComponent({ image, imagePosition = 'left', heading, content }: TwoColumnBlock) {
  const url = isMedia(image) ? image.url : null
  const alt = isMedia(image) ? image.alt || '' : ''

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: (imagePosition || 'left') === 'left' ? 'row' : 'row-reverse',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '2rem',
        maxWidth: '1100px',
        margin: '0 auto 3rem',
        padding: '0 1.5rem',
      }}
    >
      <div style={{ flex: '1 1 320px', position: 'relative', aspectRatio: '4/3' }}>
        {url && (
          <Image src={url} alt={alt} fill style={{ objectFit: 'cover', borderRadius: '12px' }} />
        )}
      </div>
      <div style={{ flex: '1 1 320px' }}>
        {heading && (
          <h3 style={{ color: '#3d1f2a', fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            {heading}
          </h3>
        )}
        {content && <RichText data={content} />}
      </div>
    </div>
  )
}
