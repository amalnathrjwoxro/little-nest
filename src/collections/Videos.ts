import type { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',

  access: {
    read: () => true,
    create: ({ req }) => (req.user as any)?.role === 'admin',
    update: ({ req }) => (req.user as any)?.role === 'admin',
    delete: ({ req }) => (req.user as any)?.role === 'admin',
  },

  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
{
  name: 'video',
  type: 'upload',
  relationTo: 'video-source',
  required: true,
},
  ],
}