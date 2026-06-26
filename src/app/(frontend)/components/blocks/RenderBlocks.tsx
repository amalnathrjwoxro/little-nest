import type { Page } from '@/payload-types'
import { HeadingBlockComponent } from './HeadingBlockComponent'
import { ParagraphBlockComponent } from './ParagraphBlockComponent'
import { ImageBlockComponent } from './ImageBlockComponent'
import { TwoColumnBlockComponent } from './TwoColumnBlockComponent'
import { GalleryBlockComponent } from './GalleryBlockComponent'
import { ContactFormBlockComponent } from './ContactFormBlockComponent'

type LayoutBlock = NonNullable<Page['content']>[number]

export function RenderBlocks({ blocks }: { blocks: LayoutBlock[] }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case 'heading':
            return <HeadingBlockComponent key={i} {...block} />
          case 'paragraph':
            return <ParagraphBlockComponent key={i} {...block} />
          case 'image':
            return <ImageBlockComponent key={i} {...block} />
          case 'twoColumn':
            return <TwoColumnBlockComponent key={i} {...block} />
          case 'gallery':
            return <GalleryBlockComponent key={i} {...block} />
          case 'contactForm':
            return <ContactFormBlockComponent key={i} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}