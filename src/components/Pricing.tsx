import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './motion/Reveal'

const plans = [
  {
    name: 'Esencial',
    price: '700 €',
    description: 'Para restaurantes que quieren dejar de perder reservas fuera de horario.',
    features: ['Agente de voz y WhatsApp 24/7', 'Confirmación automática de reservas', 'Panel mensual básico'],
    highlighted: false,
  },
  {
    name: 'Profesional',
    price: '950 €',
    description: 'El plan más elegido: incluye reducción activa de no-shows y lista de espera inteligente.',
    features: [
      'Todo lo del plan Esencial',
      'Lista de espera inteligente',
      'Recordatorios que reducen no-shows',
      'Optimización guiada 90 días',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '1.400 €',
    description: 'Para grupos de restauración con varios locales y necesidades a medida.',
    features: ['Todo lo del plan Profesional', 'Multi-local y reporting consolidado', 'Soporte prioritario dedicado'],
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="planes" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="max-w-2xl">
          <Eyebrow>Planes</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Un plan para cada etapa de tu restaurante
          </h2>
          <p className="mt-4 text-muted-foreground">
            Todos los planes incluyen la auditoría inicial de facturación perdida, valorada en 600 €, sin coste.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={
                  plan.highlighted
                    ? 'relative h-full rounded-2xl border-2 border-primary bg-card p-8 shadow-xl shadow-primary/10'
                    : 'relative h-full rounded-2xl border border-border bg-card p-8 hover:shadow-lg hover:shadow-black/5'
                }
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-8 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    <Sparkles size={12} />
                    Recomendado
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <p className="mt-4 font-display text-4xl font-extrabold">
                  {plan.price}
                  <span className="text-base font-medium text-muted-foreground">/mes</span>
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#auditoria"
                  className={
                    plan.highlighted
                      ? 'mt-8 block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25'
                      : 'mt-8 block rounded-full border border-border px-6 py-3 text-center text-sm font-semibold transition-colors hover:bg-secondary'
                  }
                >
                  Solicitar propuesta
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
