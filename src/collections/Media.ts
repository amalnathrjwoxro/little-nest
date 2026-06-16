import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',

  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },

  upload: {
    //staticDir: path.resolve("public/media"), // stored in /public/media
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
  },

  fields: [
    {
      name: 'alt',
      type: 'text',

      
      required: true,
      label: 'Alt text',
    },
  ],
}
