import { useState, type FormEvent } from 'react'
import { ArrowUpRight, CircleCheck, LoaderCircle } from 'lucide-react'
import { sendAuditRequest } from '../lib/emailjs'
import Eyebrow from './Eyebrow'
import Reveal from './motion/Reveal'
import RollText from './ui/RollText'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [trap, setTrap] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    // Campo trampa relleno: es un bot. Se simula el éxito sin enviar nada.
    if (trap) return setStatus('sent')
    setStatus('sending')
    try {
      await sendAuditRequest(email.trim())
      setStatus('sent')
    } catch {
      setError('No hemos podido enviar tu solicitud. Inténtalo de nuevo en un minuto o escríbenos a velnoxflow@gmail.com.')
      setStatus('error')
    }
  }

  return (
    <section id="auditoria" className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      <div className="animate-float-slow pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-violet opacity-30 blur-[140px]" />
      <div className="animate-float-slower pointer-events-none absolute left-1/3 top-1/3 h-[20rem] w-[20rem] rounded-full bg-glow-blue opacity-25 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center md:py-40">
        <Reveal>
          <Eyebrow>Empieza hoy</Eyebrow>
          <h2 className="mt-8 text-4xl font-medium leading-[1.02] md:text-6xl">
            <span className="text-fade">Descubre cuánto está perdiendo </span>
            <span className="text-gradient">tu restaurante cada mes</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Auditoría de facturación perdida gratuita y sin compromiso. En menos de 15 minutos te decimos exactamente
            dónde se te está escapando el dinero.
          </p>

          {status === 'sent' ? (
            <div
              role="status"
              className="card-gradient-border mx-auto mt-10 flex max-w-lg flex-col items-center gap-3 rounded-3xl p-6 text-center"
            >
              <CircleCheck size={28} className="text-emerald-300" />
              <p className="text-lg font-medium">¡Solicitud enviada!</p>
              <p className="text-sm text-muted-foreground">
                Te hemos mandado un correo de confirmación a <span className="text-foreground">{email}</span>. Nos pondremos
                en contacto contigo en breve. Si no lo ves, revisa la carpeta de spam.
              </p>
            </div>
          ) : (
            <form
              className="mx-auto mt-10 flex max-w-lg flex-col gap-2 rounded-full border border-border bg-white/[0.04] p-2 backdrop-blur sm:flex-row max-sm:rounded-3xl"
              onSubmit={onSubmit}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@restaurante.com"
                aria-label="Tu email"
                className="w-full rounded-full bg-transparent px-5 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              {/* Campo trampa para bots: invisible para las personas. */}
              <input
                type="text"
                name="company"
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-black transition-shadow hover:shadow-[0_0_40px_-6px_rgba(189,83,251,0.8)] disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    Enviando… <LoaderCircle size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    <RollText>Solicitar auditoría</RollText>
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p role="alert" className="mt-4 text-sm text-red-300">
              {error}
            </p>
          )}
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Valor 600 € · Gratis, sin tarjeta ni permanencia
          </p>
          <p className="mx-auto mt-3 max-w-md text-xs text-muted-foreground/80">
            Al enviar tu correo aceptas que te contactemos sobre la auditoría, según nuestra{' '}
            <a href="/privacidad" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-foreground">
              política de privacidad
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  )
}
