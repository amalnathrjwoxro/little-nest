
import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const ParagraphBlock: Block = {
  slug: 'paragraph',
  labels: { singular: 'Paragraph', plural: 'Paragraphs' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
      required: true,
    },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Narrow', value: 'narrow' },
      ],
    },
  ],
}