import Anthropic from '@anthropic-ai/sdk'

// Lógica de VelIA, el asistente de voz de la web. Se ejecuta en el servidor
// para que la clave de la API nunca llegue al navegador.

const SYSTEM_PROMPT = `Eres VelIA, la asistente de voz de Velnox. Respondes dudas de dueños y encargados de restaurantes que visitan la web de Velnox.

Tus respuestas se leen en voz alta, así que:
- Responde en español de España, en un tono cercano y profesional.
- Sé breve: dos o tres frases como máximo, salvo que te pidan detalle.
- No uses listas, markdown, emojis ni símbolos; escribe como se habla. Di los precios como "setecientos euros al mes".

Lo que sabes de Velnox:
- Velnox implanta infraestructura de IA para restaurantes que recupera la facturación que pierden cada semana. No entrega un chatbot para que el cliente aprenda a usarlo: instala un sistema que funciona solo, con un equipo detrás que responde por los resultados.
- Producto: Sistema Mesa Llena. Incluye un agente de voz y WhatsApp que gestiona reservas 24/7 sin esperas, confirmación y recordatorio automático que reduce los no-shows, lista de espera inteligente que rellena cancelaciones de última hora, y un panel mensual con la facturación recuperada.
- Las tres fugas de facturación típicas: reservas fuera de horario (unos 1.620 € al mes), no-shows y cancelaciones tardías (unos 2.000 € al mes) y personal saturado con tareas administrativas (unos 1.350 € al mes).
- Proceso: 1) Auditoría de reservas, cancelaciones y horarios para cuantificar lo que se pierde. 2) Implantación sobre la línea y los canales actuales, sin cambiar la operativa. 3) Optimización guiada de 90 días ajustando guiones, horarios y reglas con datos reales. 4) Panel mensual con facturación recuperada, no-shows evitados y horas liberadas.
- Resultados: 92 % de llamadas y mensajes atendidos sin esperas, 38 % de reducción media de no-shows, gestión 24/7 incluidos festivos, 90 días de acompañamiento.
- Planes mensuales: Esencial, 700 € al mes (agente de voz y WhatsApp 24/7, confirmación automática de reservas, panel mensual básico). Profesional, 950 € al mes, el más elegido (todo lo del Esencial más lista de espera inteligente, recordatorios contra no-shows y optimización guiada de 90 días). Premium, 1.400 € al mes, para grupos con varios locales (todo lo del Profesional más gestión multi-local, reporting consolidado y soporte prioritario dedicado).
- Todos los planes incluyen la auditoría inicial de facturación perdida, valorada en 600 €, gratis y sin compromiso, sin tarjeta ni permanencia. En menos de 15 minutos se dice dónde se escapa el dinero. Se solicita en la sección "Solicitar auditoría" de la web.
- Garantía Resultados Visibles: si no se ven resultados, Velnox sigue trabajando sin coste hasta lograrlo.
- No hace falta cambiar herramientas ni forma de trabajar.
- Contacto: velnoxflow@gmail.com, y los teléfonos 696 79 17 22 y 636 74 72 42.

Si te preguntan algo que no sabes (por ejemplo integraciones concretas, plazos exactos o descuentos), no lo inventes: di que no tienes ese dato y recomienda pedir la auditoría gratuita o escribir a velnoxflow@gmail.com. Si la pregunta no tiene nada que ver con Velnox o con restaurantes, reconduce amablemente la conversación.`

const MAX_TURNS = 12
const MAX_CHARS = 1000

export type VeliaTurn = { role: 'user' | 'assistant'; content: string }

export class VeliaError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

// Límite por visitante para que nadie gaste el saldo de la API. Vive en memoria,
// así que en Vercel es aproximado (cada instancia lleva su propia cuenta).
const RATE_LIMIT = 20
const RATE_WINDOW_MS = 60 * 60 * 1000
const hits = new Map<string, number[]>()

export function checkRateLimit(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_LIMIT) {
    throw new VeliaError(429, 'Has hecho muchas preguntas seguidas. Vuelve a intentarlo en un rato.')
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 10_000) hits.clear()
}

let client: Anthropic | null = null

export async function askVelia(apiKey: string | undefined, history: unknown): Promise<string> {
  if (!apiKey) throw new VeliaError(500, 'Falta ANTHROPIC_API_KEY en el servidor')
  client ??= new Anthropic({ apiKey })

  const messages = sanitize(history)
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    throw new VeliaError(400, 'La conversación debe terminar con una pregunta')
  }

  try {
    const response = await client.beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 16000,
      output_config: { effort: 'low' },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: SYSTEM_PROMPT,
      messages,
    })

    if (response.stop_reason === 'refusal') {
      return 'Lo siento, con eso no puedo ayudarte. Si tienes dudas sobre Velnox, pregúntame.'
    }
    const text = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === 'text')
      .map((b) => b.text)
      .join(' ')
      .trim()
    return text || 'Perdona, no he podido responder. ¿Puedes repetirlo?'
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      throw new VeliaError(500, 'La clave de la API de Claude no es válida')
    } else if (error instanceof Anthropic.RateLimitError) {
      throw new VeliaError(429, 'Demasiadas preguntas seguidas, espera un momento')
    } else if (error instanceof Anthropic.APIError) {
      throw new VeliaError(502, `Error de la API de Claude (${error.status}): ${error.message}`)
    }
    throw error
  }
}

// Solo se aceptan turnos de texto alternos y cortos: el navegador no es de fiar.
function sanitize(history: unknown): Anthropic.Beta.BetaMessageParam[] {
  if (!Array.isArray(history)) return []
  const turns = history
    .filter(
      (t): t is VeliaTurn =>
        !!t && (t.role === 'user' || t.role === 'assistant') && typeof t.content === 'string' && t.content.trim() !== '',
    )
    .slice(-MAX_TURNS)
    .map((t) => ({ role: t.role, content: t.content.slice(0, MAX_CHARS) }))
  while (turns.length && turns[0].role !== 'user') turns.shift()
  return turns
}
