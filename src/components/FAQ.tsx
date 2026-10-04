import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './motion/Reveal'
import EmailLink, { CONTACT_EMAIL } from './ui/EmailLink'

const faqs = [
  {
    q: '¿Qué incluye la auditoría gratuita?',
    a: 'Analizamos tus reservas, cancelaciones y horarios para cuantificar la facturación que estás perdiendo. En menos de 15 minutos te decimos exactamente dónde se te está escapando el dinero. Está valorada en 600 € y no tiene coste ni compromiso.',
  },
  {
    q: '¿Tengo que cambiar mi forma de trabajar o mis herramientas?',
    a: 'No. Configuramos el sistema sobre tu línea y tus canales actuales, sin cambiar tu operativa.',
  },
  {
    q: '¿Cuánto tarda en notarse el resultado?',
    a: 'El sistema empieza a gestionar reservas desde la implantación. Durante los primeros 90 días ajustamos guiones, horarios y reglas con los datos reales de tu restaurante, y cada mes recibes un panel con la facturación recuperada.',
  },
  {
    q: '¿Qué pasa si no veo resultados?',
    a: 'Tienes la Garantía Resultados Visibles: si no se ven, seguimos trabajando sin coste hasta lograrlo.',
  },
  {
    q: '¿Funciona si tengo varios locales?',
    a: 'Sí. El plan Premium está pensado para grupos de restauración, con gestión multi-local, reporting consolidado y soporte prioritario dedicado.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-28 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <Eyebrow number="05">FAQ</Eyebrow>
          <h2 className="mt-8 text-4xl font-medium leading-[1.05] md:text-5xl">
            <span className="text-fade">Preguntas </span>
            <span className="text-gradient">frecuentes</span>
          </h2>
          <p className="mt-6 max-w-xs text-muted-foreground">
            ¿Tienes otra duda? Escríbenos a{' '}
            <EmailLink className="text-foreground underline decoration-border underline-offset-4 hover:decoration-glow-violet">
              {CONTACT_EMAIL}
            </EmailLink>
          </p>
        </Reveal>

        <div className="border-t border-border">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <Reveal key={faq.q} delay={i * 0.06}>
                <div className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex gap-5">
                      <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                      <span className="text-lg font-medium">{faq.q}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border"
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pl-10 pr-12 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
