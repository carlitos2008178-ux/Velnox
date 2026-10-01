import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, loadEnv, type Connect, type Plugin } from 'vite'
import { askVelia, VeliaError } from './server/velia.ts'

// Expone POST /api/velia en `npm run dev` y `npm run preview`.
// La clave se lee de .env.local (ANTHROPIC_API_KEY) y nunca se envía al navegador.
function veliaApi(apiKey: string | undefined): Plugin {
  const handler: Connect.NextHandleFunction = (req, res, next) => {
    if (req.url !== '/api/velia') return next()
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'Método no permitido' })
    readJson(req)
      .then((body) => askVelia(apiKey, (body as { messages?: unknown })?.messages))
      .then((reply) => sendJson(res, 200, { reply }))
      .catch((error) => {
        const status = error instanceof VeliaError ? error.status : 500
        console.error('[velia]', error)
        sendJson(res, status, { error: error instanceof VeliaError ? error.message : 'Error interno' })
      })
  }
  return {
    name: 'velia-api',
    configureServer: (server) => void server.middlewares.use(handler),
    configurePreviewServer: (server) => void server.middlewares.use(handler),
  }
}

function readJson(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
      if (data.length > 50_000) reject(new VeliaError(413, 'Petición demasiado grande'))
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'))
      } catch {
        reject(new VeliaError(400, 'JSON no válido'))
      }
    })
    req.on('error', reject)
  })
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), veliaApi(env.ANTHROPIC_API_KEY)],
  }
})
