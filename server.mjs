import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const port = parseInt(process.env.PORT || '8080', 10)
const hostname = process.env.HOSTNAME || '0.0.0.0'
const app = next({ dev: false, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true)
    await handle(req, res, parsedUrl)
  }).listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
