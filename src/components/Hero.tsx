import { motion } from 'framer-motion'
import CountUp from './motion/CountUp'
import Eyebrow from './Eyebrow'
import Button from './ui/Button'

const rows = [
  { label: 'Reservas fuera de horario', value: 1620 },
  { label: 'No-shows evitados', value: 2000 },
  { label: 'Horas administrativas liberadas', value: 1350 },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-noise" />
      <div className="animate-float-slow pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-glow-violet opacity-25 blur-[140px]" />
      <div className="animate-float-slower pointer-events-none absolute top-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-glow-blue opacity-25 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 pt-40 pb-12 md:pt-48">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] sm:text-[11px] sm:tracking-[0.16em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-glow-violet" />
              Infraestructura de IA para restaurantes
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-8 text-5xl font-medium leading-[1.02] md:text-7xl"
          >
            <span className="text-fade">Recuperamos la facturación que </span>
            <span className="text-gradient">tu restaurante pierde</span>
            <span className="text-fade"> cada semana</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground"
          >
            Implantamos un sistema de IA que gestiona reservas, reduce no-shows y libera a tu equipo de tareas
            administrativas — operando 24/7, en piloto automático.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <Button href="#auditoria">Solicitar auditoría gratuita</Button>
            <Button href="#sistema" variant="ghost">
              Ver cómo funciona
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80"
          >
            Valor 600 € · Gratis para los primeros clientes
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
          className="relative mx-auto mt-20 max-w-3xl"
        >
          <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-gradient-to-r from-glow-blue/30 via-glow-violet/30 to-glow-pink/20 blur-3xl" />
          <div className="card-gradient-border relative rounded-3xl p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Eyebrow>Facturación recuperada · este mes</Eyebrow>
                <p className="mt-4 text-5xl font-medium tracking-tight md:text-6xl">
                  +<CountUp value={4970} /> €
                </p>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-300">
                ● En directo
              </span>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {rows.map((row) => (
                <div key={row.label} className="card-glass rounded-2xl p-4">
                  <p className="text-xs text-muted-foreground">{row.label}</p>
                  <p className="mt-2 text-2xl font-medium">
                    <CountUp value={row.value} /> €
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Sistema Mesa Llena™ — panel mensual con resultados en tiempo real
            </p>
          </div>
        </motion.div>
      </div>

      <div className="relative select-none overflow-hidden" aria-hidden>
        <p className="wordmark text-center text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em]">VELNOX</p>
      </div>
    </section>
  )
}
