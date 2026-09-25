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
    <section id="diagnostico" className="border-b border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="max-w-2xl">
          <Eyebrow>El diagnóstico</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Tres fugas de facturación que tu restaurante probablemente tiene ahora mismo
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {leaks.map((leak, i) => (
            <Reveal key={leak.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group h-full rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-xl hover:shadow-black/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <leak.icon size={20} />
                </div>
                <p className="mt-5 font-display text-2xl font-extrabold text-primary">{leak.amount}</p>
                <h3 className="mt-3 text-lg font-semibold">{leak.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{leak.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
