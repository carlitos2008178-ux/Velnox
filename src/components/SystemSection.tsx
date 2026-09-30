import { motion } from 'framer-motion'
import { Check, ShieldCheck } from 'lucide-react'
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
    <section id="sistema" className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-glow-blue opacity-15 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6 py-28">
        <div className="grid gap-16 md:grid-cols-2">
          <Reveal>
            <Eyebrow number="02">Sistema Mesa Llena™</Eyebrow>
            <h2 className="mt-8 text-4xl font-medium leading-[1.05] md:text-5xl">
              <span className="text-fade">Un sistema que trabaja </span>
              <span className="text-gradient">mientras tú atiendes la sala</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Infraestructura de IA que se instala sobre tus canales actuales y se optimiza con los datos reales de tu
              restaurante.
            </p>

            <ul className="mt-10 space-y-3">
              {features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-glow-blue to-glow-violet">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-foreground/90">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="card-glass mt-10 flex items-start gap-3 rounded-2xl px-5 py-4 text-sm">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-glow-pink" />
              <span>
                <span className="font-medium">Garantía Resultados Visibles</span>
                <span className="text-muted-foreground"> — o seguimos trabajando sin coste hasta lograrlo.</span>
              </span>
            </div>
          </Reveal>

          <div className="border-t border-border">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.08}>
                <div className="group relative flex gap-6 border-b border-border py-8 transition-colors">
                  <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-glow-pink">
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium transition-transform duration-500 group-hover:translate-x-2">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-glow-blue to-glow-violet transition-all duration-700 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
