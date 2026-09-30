import { ArrowUpRight } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './motion/Reveal'
import RollText from './ui/RollText'

export default function CTA() {
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

          <form
            className="mx-auto mt-10 flex max-w-lg flex-col gap-2 rounded-full border border-border bg-white/[0.04] p-2 backdrop-blur sm:flex-row max-sm:rounded-3xl"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="tu@restaurante.com"
              aria-label="Tu email"
              className="w-full rounded-full bg-transparent px-5 py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-black transition-shadow hover:shadow-[0_0_40px_-6px_rgba(189,83,251,0.8)]"
            >
              <RollText>Solicitar auditoría</RollText>
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </form>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Valor 600 € · Gratis, sin tarjeta ni permanencia
          </p>
        </Reveal>
      </div>
    </section>
  )
}
