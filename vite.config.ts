import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, loadEnv, type Connect, type Plugin } from 'vite'
import { ApiError, parseJson } from './server/common.js'
import { askVelia, checkVeliaRateLimit } from './server/velia.js'

type Route = (body: unknown, ip: string) => Promise<unknown>

// Expone las funciones de /api en `npm run dev` y `npm run preview`, igual que en Vercel.
// Las claves se leen de .env.local y nunca se envían al navegador.
function apiRoutes(env: Record<string, string>): Plugin {
  const routes: Record<string, Route> = {
    '/api/velia': async (body, ip) => {
      checkVeliaRateLimit(ip)
      return { reply: await askVelia(env.ANTHROPIC_API_KEY, (body as { messages?: unknown })?.messages) }
    },
  }

  const handler: Connect.NextHandleFunction = (req, res, next) => {
    const route = req.url ? routes[req.url] : undefined
    if (!route) return next()
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'Método no permitido' })
    readBody(req)
      .then((text) => route(parseJson(text), req.socket.remoteAddress ?? 'local'))
      .then((result) => sendJson(res, 200, result))
      .catch((error) => {
        console.error(`[${req.url}]`, error)
        if (error instanceof ApiError) sendJson(res, error.status, { error: error.message })
        else sendJson(res, 500, { error: 'Error interno' })
      })
  }

  return {
    name: 'velnox-api',
    configureServer: (server) => void server.middlewares.use(handler),
    configurePreviewServer: (server) => void server.middlewares.use(handler),
  }
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
      if (data.length > 50_000) reject(new ApiError(413, 'Petición demasiado grande'))
    })
    req.on('end', () => resolve(data))
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
    plugins: [react(), tailwindcss(), apiRoutes(env)],
  }
})
