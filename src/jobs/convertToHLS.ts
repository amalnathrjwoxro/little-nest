
import type { TaskConfig } from 'payload'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
import os from 'os'
import path from 'path'

// Resolve ffmpeg binary manually — avoids Turbopack breaking ffmpeg-static's __dirname resolution
const ffmpegBinaryName = process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg'
const ffmpegPath =
  process.env.FFMPEG_LOCAL_PATH ||
  path.join(process.cwd(), 'node_modules', 'ffmpeg-static', ffmpegBinaryName)

if (!fs.existsSync(ffmpegPath)) {
  console.error('[convertToHLS] FFmpeg binary not found at:', ffmpegPath)
}

ffmpeg.setFfmpegPath(ffmpegPath)

const s3 = new S3Client({
  region: process.env.S3_REGION || '',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
})

export const convertToHLSTask: TaskConfig<{
  input: { docId: string; s3Key: string }
  output: { success: boolean }
}> = {
  slug: 'convertToHLS',
  inputSchema: [
    { name: 'docId', type: 'text', required: true },
    { name: 's3Key', type: 'text', required: true },
  ],
  outputSchema: [{ name: 'success', type: 'checkbox' }],
  handler: async ({ input, req }) => {
    const { docId, s3Key } = input
    const bucket = process.env.S3_BUCKET || ''
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hls-'))
    const localMp4 = path.join(tmpDir, 'source.mp4')

    try {
      await req.payload.update({
        collection: 'video-source',
        id: docId,
        data: { hlsStatus: 'processing' },
      })

      // 1. Download original MP4 from S3
const getResult = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: s3Key }))
const writeStream = fs.createWriteStream(localMp4)
await new Promise<void>((resolve, reject) => {
  ;(getResult.Body as NodeJS.ReadableStream).pipe(writeStream)
  writeStream.on('finish', () => resolve())
  writeStream.on('error', reject)
})

      // 2. Run FFmpeg to generate HLS segments (high quality, near-lossless)
      const outputDir = path.join(tmpDir, 'hls')
      fs.mkdirSync(outputDir)
      const playlistPath = path.join(outputDir, 'playlist.m3u8')

await new Promise<void>((resolve, reject) => {
  ffmpeg(localMp4)
    .outputOptions([
      '-c:v libx264',
      '-preset slow',
      '-crf 16',
      '-c:a aac',
      '-b:a 256k',
      '-hls_time 6',
      '-hls_playlist_type vod',
      '-hls_segment_filename', path.join(outputDir, 'segment_%03d.ts'),
    ])
    .output(playlistPath)
    .on('end', () => resolve())
    .on('error', reject)
    .run()
})

      // 3. Upload all generated files (playlist + segments) back to S3
      const hlsPrefix = `hls/${docId}`
      const files = fs.readdirSync(outputDir)

      for (const file of files) {
        const filePath = path.join(outputDir, file)
        const upload = new Upload({
          client: s3,
          params: {
            Bucket: bucket,
            Key: `${hlsPrefix}/${file}`,
            Body: fs.createReadStream(filePath),
            ContentType: file.endsWith('.m3u8')
              ? 'application/vnd.apple.mpegurl'
              : 'video/mp2t',
          },
        })
        await upload.done()
      }

      const masterUrl = `https://${bucket}.s3.${process.env.S3_REGION}.amazonaws.com/${hlsPrefix}/playlist.m3u8`

      // 4. Update the doc with the final HLS URL
      await req.payload.update({
        collection: 'video-source',
        id: docId,
        data: { hlsStatus: 'ready', hlsMasterUrl: masterUrl },
      })

      return { output: { success: true } }
    } catch (err) {
      req.payload.logger.error(err)
      await req.payload.update({
        collection: 'video-source',
        id: docId,
        data: { hlsStatus: 'failed' },
      })
      throw err
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    }
  },
}