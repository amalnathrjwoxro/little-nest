
import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const TwoColumnBlock: Block = {
  slug: 'twoColumn',
  labels: { singular: 'Two Column', plural: 'Two Columns' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
    },
  ],
}