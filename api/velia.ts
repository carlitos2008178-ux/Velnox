import { ApiError, parseJson } from '../server/common.js'
import { askVelia, checkVeliaRateLimit } from '../server/velia.js'

// Función de Vercel: POST /api/velia en la web publicada.
// La clave se configura en Vercel como variable de entorno ANTHROPIC_API_KEY.
export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'desconocida'
    checkVeliaRateLimit(ip)
    const body = parseJson(await request.text()) as { messages?: unknown }
    const reply = await askVelia(process.env.ANTHROPIC_API_KEY, body?.messages)
    return Response.json({ reply })
  } catch (error) {
    console.error('[velia]', error)
    if (error instanceof ApiError) return Response.json({ error: error.message }, { status: error.status })
    return Response.json({ error: 'Error interno' }, { status: 500 })
  }
}
