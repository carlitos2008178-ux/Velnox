import CountUp from './motion/CountUp'
import Eyebrow from './Eyebrow'
import Reveal from './motion/Reveal'

const stats = [
  { value: 92, suffix: '%', title: 'Atención sin esperas', label: 'de llamadas y mensajes atendidos sin esperas' },
  { value: -38, suffix: '%', title: 'Menos no-shows', label: 'de reducción media en no-shows' },
  { value: 24, suffix: '/7', title: 'Siempre activo', label: 'gestión de reservas, festivos incluidos' },
  { value: 90, suffix: ' días', title: 'Optimización guiada', label: 'de acompañamiento antes de dejarte solo' },
]

export default function ResultsBand() {
  return (
    <section id="resultados" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-end">
          <Reveal>
            <Eyebrow number="03">Resultados</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl font-medium leading-[1.05] md:text-5xl">
              <span className="text-fade">Métricas que se notan </span>
              <span className="text-gradient">en la caja</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.title} delay={i * 0.1} className="h-full bg-background">
              <div className="group relative h-full p-8 transition-colors hover:bg-white/[0.03]">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{stat.title}</p>
                <p className="mt-10 text-6xl font-medium tracking-tight">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-4 text-sm text-muted-foreground">{stat.label}</p>
                <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-glow-blue via-glow-violet to-glow-pink transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
