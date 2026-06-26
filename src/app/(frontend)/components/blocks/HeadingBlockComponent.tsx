import type { ElementType } from 'react'
import type { Page } from '@/payload-types'

type HeadingBlock = Extract<NonNullable<Page['content']>[number], { blockType: 'heading' }>

export function HeadingBlockComponent({ text, level = 'h2', align = 'left' }: HeadingBlock) {
  const Tag = (level || 'h2') as ElementType
  return (
    <Tag
      className="font-semibold"
      style={{
        color: '#3d1f2a',
        textAlign: align || 'left',
        fontSize: level === 'h1' ? '2.5rem' : level === 'h2' ? '1.875rem' : '1.5rem',
        margin: '2rem auto 1rem',
        maxWidth: '900px',
        padding: '0 1.5rem',
      }}
    >
      {text}
    </Tag>
  )
}
