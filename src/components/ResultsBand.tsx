import { PhoneCall, TrendingDown, CalendarClock, Gauge } from 'lucide-react'
import CountUp from './motion/CountUp'
import Reveal from './motion/Reveal'

const stats = [
  { icon: PhoneCall, value: 92, suffix: '%', label: 'de llamadas y mensajes atendidos sin esperas' },
  { icon: TrendingDown, value: -38, suffix: '%', label: 'de reducción media en no-shows' },
  { icon: CalendarClock, value: 24, prefix: '', suffix: '/7', label: 'gestión de reservas, festivos incluidos' },
  { icon: Gauge, value: 90, suffix: ' días', label: 'de optimización guiada antes de dejarte solo' },
]

export default function ResultsBand() {
  return (
    <section className="border-b border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1}>
            <div className="text-center sm:text-left">
              <stat.icon size={22} className="mx-auto text-primary-foreground/70 sm:mx-0" />
              <p className="mt-3 font-display text-3xl font-extrabold">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-primary-foreground/85">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
