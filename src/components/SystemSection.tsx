import { motion } from 'framer-motion'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './motion/Reveal'

const features = [
  'Agente de voz y WhatsApp que gestiona reservas 24/7, sin listas de espera',
  'Confirmación y recordatorio automático que reduce los no-shows',
  'Lista de espera inteligente que rellena las cancelaciones de última hora',
  'Panel mensual con la facturación recuperada, mes a mes, sin depender de tu equipo',
]

const steps = [
  { number: '01', title: 'Auditoría', description: 'Analizamos tus reservas, cancelaciones y horarios para cuantificar la facturación perdida.' },
  { number: '02', title: 'Implantación', description: 'Configuramos el sistema sobre tu línea y canales actuales. Sin cambiar tu operativa.' },
  { number: '03', title: 'Optimización 90 días', description: 'Ajustamos guiones, horarios y reglas del sistema según los datos reales de tu restaurante.' },
  { number: '04', title: 'Panel mensual', description: 'Recibes un informe claro de facturación recuperada, no-shows evitados y horas liberadas.' },
]

export default function SystemSection() {
  return (
    <section id="sistema" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <Eyebrow>Sistema Mesa Llena™</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              No entregamos un chatbot para que aprendas a usarlo
            </h2>
            <p className="mt-4 text-muted-foreground">
              Entregamos infraestructura de IA que se instala, se ajusta y funciona sola, con un equipo
              detrás que responde por los resultados.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
                  <span className="text-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-secondary px-5 py-4 text-sm font-semibold">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary" />
              Garantía Resultados Visibles — o seguimos trabajando sin coste hasta lograrlo.
            </div>
          </Reveal>

          <div className="relative grid gap-4">
            <div className="absolute left-[1.65rem] top-4 hidden h-[calc(100%-2rem)] w-px bg-border md:block" />
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.1}>
                <div className="relative flex gap-5 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-black/5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background font-display text-sm font-extrabold text-primary">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
