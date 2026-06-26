
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Page } from '@/payload-types'

type ParagraphBlock = Extract<NonNullable<Page['content']>[number], { blockType: 'paragraph' }>

export function ParagraphBlockComponent({ content, maxWidth = 'normal' }: ParagraphBlock) {
  return (
    <div
      style={{
        maxWidth: maxWidth === 'narrow' ? '640px' : '900px',
        margin: '0 auto',
        padding: '0 1.5rem 1.5rem',
        color: '#c0849a',
        lineHeight: 1.7,
      }}
    >
      <RichText data={content} />
    </div>
  )
}
