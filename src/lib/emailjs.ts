import emailjs from '@emailjs/browser'

// EmailJS envía los correos desde la cuenta de Gmail de Velnox (conectada en emailjs.com).
// Estos identificadores son públicos por diseño: van en el navegador.
// La plantilla de aviso llega a velnoxflow@gmail.com y tiene enlazada como Auto-Reply
// la plantilla de confirmación que recibe el cliente.
const SERVICE_ID = 'service_abc1234'
const AUDIT_TEMPLATE_ID = 'template_xyz5678'
const PUBLIC_KEY = 'eis6lJeScbhBxwiPn'

export async function sendAuditRequest(email: string) {
  await emailjs.send(
    SERVICE_ID,
    AUDIT_TEMPLATE_ID,
    {
      email,
      date: new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid', dateStyle: 'full', timeStyle: 'short' }),
    },
    // Máximo 1 envío por minuto desde el mismo navegador, para frenar abusos.
    { publicKey: PUBLIC_KEY, limitRate: { id: 'audit', throttle: 60_000 } },
  )
}
