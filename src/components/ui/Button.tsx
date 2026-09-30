import { ArrowUpRight } from 'lucide-react'
import RollText from './RollText'

type Variant = 'primary' | 'ghost'

const styles: Record<Variant, string> = {
  primary: 'bg-white text-black hover:shadow-[0_0_40px_-6px_rgba(189,83,251,0.7)]',
  ghost: 'border border-border bg-white/[0.03] text-foreground hover:bg-white/[0.07]',
}

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
}: {
  href: string
  children: string
  variant?: Variant
  className?: string
  onClick?: () => void
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-all duration-300 ${styles[variant]} ${className}`}
    >
      <RollText>{children}</RollText>
      <span className="relative inline-flex h-4 w-4 overflow-hidden">
        <ArrowUpRight size={16} className="absolute transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-4" />
        <ArrowUpRight size={16} className="absolute -translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </a>
  )
}
