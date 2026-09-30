import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import RollText from './ui/RollText'
import Button from './ui/Button'

const links = [
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#sistema', label: 'Sistema' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#planes', label: 'Planes' },
  { href: '#faq', label: 'FAQ' },
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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-300 ${
          scrolled ? 'border-border bg-black/70 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2 text-lg font-semibold tracking-[0.2em]">
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-glow-blue to-glow-violet" />
          VELNOX
        </a>

        <nav className="hidden items-center gap-7 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="group transition-colors hover:text-foreground">
              <RollText>{link.label}</RollText>
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#auditoria" className="px-5 py-2.5">
            Auditoría gratuita
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border lg:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-border bg-black/90 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-4 p-6 font-mono text-sm uppercase tracking-[0.14em] text-muted-foreground">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="hover:text-foreground">
                  {link.label}
                </a>
              ))}
              <Button href="#auditoria" onClick={() => setOpen(false)} className="mt-2">
                Auditoría gratuita
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
