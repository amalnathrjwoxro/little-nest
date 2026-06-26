
import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: { singular: 'Contact Form', plural: 'Contact Forms' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Get in touch',
    },
    {
      name: 'subheading',
      type: 'text',
    },
  ],
}