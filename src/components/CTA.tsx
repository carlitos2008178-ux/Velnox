import { ArrowRight } from 'lucide-react'
import Reveal from './motion/Reveal'

export default function CTA() {
  return (
    <section id="auditoria" className="relative overflow-hidden border-b border-border/60 bg-secondary/40">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Descubre cuánto está perdiendo tu restaurante cada mes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Auditoría de facturación perdida gratuita y sin compromiso. En menos de 15 minutos te decimos
            exactamente dónde se te está escapando el dinero.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="tu@restaurante.com"
              className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm outline-none transition-colors focus:border-primary"
            />
            <button
              type="submit"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
            >
              Solicitar auditoría
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          <p className="mt-3 text-xs font-medium text-muted-foreground">Valor 600 € · Gratis, sin tarjeta ni permanencia.</p>
        </Reveal>
      </div>
    </section>
  )
}
