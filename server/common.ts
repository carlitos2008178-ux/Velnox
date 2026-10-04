// Utilidades compartidas por las funciones del servidor (/api/*).

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

// Límite de usos por clave (IP, correo...) en una ventana de tiempo. Vive en memoria,
// así que en Vercel es aproximado: cada instancia lleva su propia cuenta.
export function createRateLimiter(limit: number, windowMs: number, message: string) {
  const hits = new Map<string, number[]>()
  return (key: string) => {
    const now = Date.now()
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
    if (recent.length >= limit) throw new ApiError(429, message)
    recent.push(now)
    hits.set(key, recent)
    if (hits.size > 10_000) hits.clear()
  }
}

export function parseJson(text: string): unknown {
  if (text.length > 50_000) throw new ApiError(413, 'Petición demasiado grande')
  try {
    return JSON.parse(text || '{}')
  } catch {
    throw new ApiError(400, 'JSON no válido')
  }
}
