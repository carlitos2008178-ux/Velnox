import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import CountUp from './motion/CountUp'

const rows = [
  { label: 'Reservas fuera de horario', value: 1620 },
  { label: 'No-shows evitados', value: 2000 },
  { label: 'Horas administrativas liberadas', value: 1350 },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-noise" />
      <div className="animate-float-slow pointer-events-none absolute -top-32 right-[-8%] h-[30rem] w-[30rem] rounded-full opacity-[0.18] blur-3xl" style={{ background: 'var(--primary)' }} />
      <div className="animate-float-slower pointer-events-none absolute bottom-[-10%] left-[-8%] h-[24rem] w-[24rem] rounded-full opacity-[0.12] blur-3xl" style={{ background: 'var(--primary)' }} />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary shadow-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Infraestructura de IA para restaurantes
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl"
          >
            Recuperamos la facturación que{' '}
            <span className="bg-gradient-to-r from-primary to-[oklch(45%_.09_251.792)] bg-clip-text text-transparent">
              tu restaurante pierde
            </span>{' '}
            cada semana
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-lg text-lg text-muted-foreground"
          >
            No te entregamos un chatbot para que aprendas a usarlo. Implantamos un sistema de IA que
            gestiona reservas, reduce no-shows y libera a tu equipo de tareas administrativas —
            operando 24/7, en piloto automático.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#auditoria"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-center text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
            >
              Solicitar auditoría gratuita
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#sistema"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <PlayCircle size={16} />
              Ver cómo funciona
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 text-xs font-medium text-muted-foreground"
          >
            Auditoría de facturación perdida sin compromiso · Valor 600 €, gratis para los primeros clientes.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="rounded-2xl border border-border bg-card/90 p-6 shadow-2xl shadow-black/10 backdrop-blur">
            <p className="text-sm font-semibold text-muted-foreground">Facturación recuperada · este mes</p>
            <p className="mt-2 font-display text-4xl font-extrabold">
              +<CountUp value={4970} decimals={0} /> €
            </p>
            <div className="mt-6 space-y-4">
              {rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b border-border/60 pb-3 text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-semibold">
                    <CountUp value={row.value} /> €
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-secondary p-4 text-sm text-muted-foreground">
              Sistema Mesa Llena™ — panel mensual con resultados en tiempo real
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
