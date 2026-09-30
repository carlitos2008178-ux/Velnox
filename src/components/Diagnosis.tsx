import { motion } from 'framer-motion'
import { Clock, PhoneMissed, Users } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './motion/Reveal'

const leaks = [
  {
    icon: Clock,
    amount: '≈1.620 €/mes',
    title: 'Reservas fuera de horario',
    description:
      'Clientes que intentan reservar por la noche, fines de semana o cuando la línea está ocupada, y terminan en el restaurante de la competencia.',
  },
  {
    icon: PhoneMissed,
    amount: '≈2.000 €/mes',
    title: 'No-shows y cancelaciones tardías',
    description:
      'Mesas bloqueadas para comensales que nunca llegan, sin confirmación automática ni lista de espera que las recupere.',
  },
  {
    icon: Users,
    amount: '≈1.350 €/mes',
    title: 'Personal saturado en tareas administrativas',
    description:
      'Camareros y encargados contestando el teléfono y WhatsApp en vez de atender la sala, con el coste de oportunidad que eso implica.',
  },
]

export default function Diagnosis() {
  return (
    <section id="diagnostico" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-end">
          <Reveal>
            <Eyebrow number="01">El diagnóstico</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl font-medium leading-[1.05] md:text-5xl">
              <span className="text-fade">Tres fugas de facturación que tu restaurante </span>
              <span className="text-gradient">probablemente tiene ahora mismo</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {leaks.map((leak, i) => (
            <Reveal key={leak.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="card-glass group relative h-full overflow-hidden rounded-3xl p-7"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-glow-violet opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/[0.04] text-foreground">
                    <leak.icon size={18} />
                  </div>
                </div>
                <p className="mt-10 text-3xl font-medium tracking-tight text-gradient">{leak.amount}</p>
                <h3 className="mt-4 text-xl font-medium">{leak.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{leak.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
