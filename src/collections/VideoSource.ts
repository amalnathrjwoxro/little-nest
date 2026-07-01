// src/collections/VideoSource.ts
import type { CollectionConfig } from 'payload'

export const VideoSource: CollectionConfig = {
  slug: 'video-source',

  access: {
    read: () => true,
    create: ({ req }) => (req.user as any)?.role === 'admin',
    update: ({ req }) => (req.user as any)?.role === 'admin',
    delete: ({ req }) => (req.user as any)?.role === 'admin',
  },

  upload: {
    mimeTypes: ['video/mp4', 'video/quicktime'],
    disableLocalStorage: true,
  },

  fields: [
    {
      name: 'hlsStatus',
      type: 'select',
      defaultValue: 'pending',
      options: ['pending', 'processing', 'ready', 'failed'],
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'hlsMasterUrl',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],

hooks: {
  afterChange: [
    async ({ doc, req, operation }) => {
      console.log('[VideoSource afterChange]', { operation, hlsStatus: doc.hlsStatus, docId: doc.id })

      if (operation === 'create' && doc.hlsStatus === 'pending') {
        console.log('[VideoSource] Queuing convertToHLS job for', doc.id)
        await req.payload.jobs.queue({
          task: 'convertToHLS',
          input: {
            docId: doc.id,
            s3Key: doc.filename,
          },
        })
        console.log('[VideoSource] Job queued successfully')
      }
    },
  ],
},
}