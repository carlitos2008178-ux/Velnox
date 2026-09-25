import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#sistema', label: 'Sistema' },
  { href: '#planes', label: 'Planes' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-border/60 bg-background/85 shadow-sm shadow-black/5 backdrop-blur-lg'
          : 'border-transparent bg-background/40 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">
            V
          </span>
          Velnox
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="relative transition-colors hover:text-foreground group">
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#auditoria"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 md:inline-block"
        >
          Auditoría gratuita
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <nav className="flex flex-col gap-4 px-6 py-4 text-sm font-medium text-muted-foreground">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="hover:text-foreground">
                  {link.label}
                </a>
              ))}
              <a
                href="#auditoria"
                onClick={() => setOpen(false)}
                className="rounded-full bg-primary px-5 py-2.5 text-center font-semibold text-primary-foreground"
              >
                Auditoría gratuita
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
