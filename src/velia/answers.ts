// VelIA gratuita: respuestas preparadas, sin IA. Se elige la respuesta cuyo tema
// tenga más palabras clave en la pregunta (sin tildes ni mayúsculas).

type Topic = { keywords: string[]; weight?: number; answer: string }

const TOPICS: Topic[] = [
  {
    keywords: ['esencial', 'basico', 'mas barato', 'economico'],
    weight: 3,
    answer:
      'El plan Esencial cuesta 700 € al mes. Incluye el agente de voz y WhatsApp que atiende reservas 24/7, la confirmación automática de reservas y un panel mensual básico.',
  },
  {
    keywords: ['profesional', 'recomendado', 'mas elegido', 'recomiendas'],
    weight: 3,
    answer:
      'El plan Profesional cuesta 950 € al mes y es el más elegido. Incluye todo lo del Esencial, más la lista de espera inteligente, recordatorios que reducen los no-shows y 90 días de optimización guiada.',
  },
  {
    keywords: ['premium', 'varios locales', 'locales', 'restaurantes', 'sucursales', 'cadena', 'grupo', 'franquicia', 'multi'],
    weight: 3,
    answer:
      'Para grupos con varios locales está el plan Premium, de 1.400 € al mes. Incluye todo lo del Profesional, más gestión multi-local, reporting consolidado y soporte prioritario dedicado.',
  },
  {
    keywords: ['precio', 'precios', 'cuesta', 'cuanto vale', 'cuanto es', 'plan', 'planes', 'tarifa', 'coste', 'caro', 'pagar', 'mensualidad', 'euros'],
    answer:
      'Tenemos tres planes mensuales: Esencial por 700 €, Profesional por 950 €, que es el más elegido, y Premium por 1.400 € para varios locales. Todos incluyen gratis la auditoría inicial, valorada en 600 €.',
  },
  {
    keywords: ['auditoria', 'gratis', 'gratuita', 'gratuito', 'prueba', 'probar', 'empezar', 'analisis', 'diagnostico', 'contratar', 'apuntarme'],
    weight: 2,
    answer:
      'La auditoría es gratuita y sin compromiso, valorada en 600 €. Analizamos tus reservas, cancelaciones y horarios, y en menos de 15 minutos te decimos dónde se te escapa el dinero. Puedes pedirla en el botón "Solicitar auditoría" de la web.',
  },
  {
    keywords: ['garantia', 'no funciona', 'no veo resultados', 'devolucion', 'riesgo', 'y si no'],
    weight: 2,
    answer:
      'Tienes la Garantía Resultados Visibles: si no se ven resultados, seguimos trabajando sin coste hasta lograrlo.',
  },
  {
    keywords: ['permanencia', 'contrato', 'compromiso', 'tarjeta', 'darme de baja', 'cancelar el servicio'],
    weight: 2,
    answer: 'La auditoría inicial es gratis, sin tarjeta y sin permanencia. Para las condiciones exactas de cada plan, escríbenos a velnoxflow@gmail.com.',
  },
  {
    keywords: ['no show', 'no-show', 'noshow', 'no shows', 'no vienen', 'plantones', 'cancelacion', 'cancelaciones', 'lista de espera'],
    weight: 2,
    answer:
      'Enviamos confirmaciones y recordatorios automáticos, y una lista de espera inteligente rellena las cancelaciones de última hora. De media, los no-shows bajan un 38 %.',
  },
  {
    keywords: ['reserva', 'reservas', 'whatsapp', 'llamadas', 'telefono ocupado', 'por la noche', 'fuera de horario', '24', 'agente de voz', 'contesta'],
    answer:
      'Un agente de voz y WhatsApp atiende las reservas 24 horas al día, también fuera de horario y en festivos, sin esperas. El 92 % de las llamadas y mensajes se atienden al momento.',
  },
  {
    keywords: ['cuanto tarda', 'tiempo', 'cuando', 'rapido', 'plazo', 'dias', 'implantacion', 'instalar', 'notar'],
    answer:
      'El sistema empieza a gestionar reservas desde la implantación. Durante los primeros 90 días lo ajustamos con los datos reales de tu restaurante, y cada mes recibes un panel con la facturación recuperada.',
  },
  {
    keywords: ['cambiar', 'herramientas', 'software', 'programa', 'integra', 'tpv', 'mi forma de trabajar', 'operativa'],
    answer: 'No tienes que cambiar nada. Configuramos el sistema sobre tu línea de teléfono y tus canales actuales, sin cambiar tu forma de trabajar.',
  },
  {
    keywords: ['resultados', 'recuperar', 'recupero', 'facturacion', 'pierdo', 'perdiendo', 'dinero', 'ganar', 'datos', 'metricas'],
    answer:
      'Un restaurante típico pierde unos 1.620 € al mes en reservas fuera de horario, unos 2.000 € en no-shows y unos 1.350 € en horas de personal haciendo tareas administrativas. Velnox ataca esas tres fugas y te lo muestra cada mes en un panel.',
  },
  {
    keywords: ['como funciona', 'funciona', 'que haceis', 'que es velnox', 'velnox', 'servicio', 'ofreceis', 'sistema', 'mesa llena', 'a que os dedicais'],
    answer:
      'Velnox instala en tu restaurante el Sistema Mesa Llena: una IA que gestiona reservas por teléfono y WhatsApp 24/7, reduce los no-shows y libera a tu equipo de tareas administrativas. Empezamos con una auditoría gratuita, lo implantamos y lo optimizamos 90 días.',
  },
  {
    keywords: ['contacto', 'contactar', 'email', 'correo', 'telefono', 'llamar', 'hablar con', 'persona', 'humano', 'numero'],
    weight: 2,
    answer: 'Puedes escribirnos a velnoxflow@gmail.com o llamarnos al 696 79 17 22 o al 636 74 72 42.',
  },
  {
    keywords: ['quien eres', 'que eres', 'eres un robot', 'eres una ia', 'velia', 'como te llamas'],
    weight: 2,
    answer: 'Soy VelIA, la asistente de Velnox. Pregúntame por los planes, la auditoría gratuita, la garantía o cómo funciona el sistema.',
  },
  {
    keywords: ['gracias', 'adios', 'hasta luego', 'genial', 'perfecto', 'vale'],
    answer: '¡A ti! Si te surge cualquier otra duda, aquí estoy.',
  },
  {
    keywords: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'hey', 'que tal'],
    answer: '¡Hola! Soy VelIA. ¿Qué quieres saber sobre Velnox? Puedes preguntarme por los planes, la auditoría gratuita o cómo funciona.',
  },
]

const FALLBACK =
  'Eso no lo sé responder. Puedes preguntarme por los planes, la auditoría gratuita, la garantía o cómo funciona, o escribirnos a velnoxflow@gmail.com.'

function normalize(text: string) {
  return ` ${text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9ñ\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `
}

export function answerQuestion(question: string): string {
  const q = normalize(question)
  let best: Topic | null = null
  let bestScore = 0
  for (const topic of TOPICS) {
    let score = 0
    for (const kw of topic.keywords) {
      // Coincidencia de palabra o frase completa (" plan " no casa con "planta").
      if (q.includes(` ${kw} `)) score += (topic.weight ?? 1) * (kw.includes(' ') ? 2 : 1)
    }
    if (score > bestScore) {
      best = topic
      bestScore = score
    }
  }
  return best?.answer ?? FALLBACK
}
