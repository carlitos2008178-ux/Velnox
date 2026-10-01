import { askVelia, checkRateLimit, VeliaError } from '../server/velia.js'

// Función de Vercel: POST /api/velia en la web publicada.
// La clave se configura en Vercel como variable de entorno ANTHROPIC_API_KEY.
export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'desconocida'
    checkRateLimit(ip)
    const text = await request.text()
    if (text.length > 50_000) throw new VeliaError(413, 'Petición demasiado grande')
    let body: { messages?: unknown }
    try {
      body = JSON.parse(text || '{}')
    } catch {
      throw new VeliaError(400, 'JSON no válido')
    }
    const reply = await askVelia(process.env.ANTHROPIC_API_KEY, body?.messages)
    return Response.json({ reply })
  } catch (error) {
    console.error('[velia]', error)
    if (error instanceof VeliaError) return Response.json({ error: error.message }, { status: error.status })
    return Response.json({ error: 'Error interno' }, { status: 500 })
  }
}
