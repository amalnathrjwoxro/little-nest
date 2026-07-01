import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'        
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { convertToHLSTask } from './jobs/convertToHLS'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ContactForm } from './collections/Contactform'
import { Blogs } from './collections/Blogs'
import { Products } from './collections/Products'
import { Pages } from './collections/Pages'
import { Header } from './globals/Header'
import { Videos } from './collections/Videos'
import { VideoSource } from './collections/VideoSource'




const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ContactForm, Blogs, Products, Videos, VideoSource, Pages],
jobs: {
  tasks: [convertToHLSTask],
  autoRun: [
    {
      cron: '*/1 * * * *',
      limit: 10,
    },
  ],
},
  globals: [Header],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
s3Storage({
  collections: {
    media: true,
    'video-source': true,
  },
  bucket: process.env.S3_BUCKET || '',
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: process.env.S3_REGION || '',
  },
}),
  ],
})