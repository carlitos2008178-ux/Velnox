import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './motion/Reveal'
import Button from './ui/Button'

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
    <section id="planes" className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-violet opacity-10 blur-[160px]" />

      <div className="relative mx-auto max-w-6xl px-6 py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow number="04">Planes</Eyebrow>
            <h2 className="mt-8 text-4xl font-medium leading-[1.05] md:text-5xl">
              <span className="text-fade">Un plan para cada etapa </span>
              <span className="text-gradient">de tu restaurante</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              Todos los planes incluyen la auditoría inicial de facturación perdida, valorada en 600 €, sin coste.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3 md:items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.12} className="h-full">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`relative flex h-full flex-col rounded-3xl p-8 ${
                  plan.highlighted ? 'card-gradient-border shadow-[0_0_80px_-20px_rgba(189,83,251,0.6)]' : 'card-glass'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-sm uppercase tracking-[0.16em]">{plan.name}</h3>
                  {plan.highlighted && (
                    <span className="rounded-full bg-gradient-to-r from-glow-blue to-glow-violet px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em]">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="mt-8 text-5xl font-medium tracking-tight">
                  {plan.price}
                  <span className="text-base font-normal text-muted-foreground">/mes</span>
                </p>
                <p className="mt-4 text-sm text-muted-foreground">{plan.description}</p>

                <div className="my-8 h-px bg-border" />

                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-glow-pink" />
                      <span className="text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button href="#auditoria" variant={plan.highlighted ? 'primary' : 'ghost'} className="mt-10 w-full">
                  Solicitar propuesta
                </Button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
