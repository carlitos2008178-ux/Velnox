import type { ReactNode } from 'react'
import { Mail, Phone } from 'lucide-react'
import EmailLink, { CONTACT_EMAIL } from './ui/EmailLink'
import RollText from './ui/RollText'
import VoiceOrb from './VoiceOrb'

const product = [
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#sistema', label: 'Sistema' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#planes', label: 'Planes' },
  { href: '#faq', label: 'FAQ' },
]

const legal: { href: string; label: string; newTab?: boolean }[] = [
  { href: '/privacidad', label: 'Privacidad', newTab: true },
  { href: '/terminos', label: 'Términos', newTab: true },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <div>
            <a href="#top" className="flex items-center gap-2 text-lg font-semibold tracking-[0.2em]">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-glow-blue to-glow-violet" />
              VELNOX
            </a>
            <p className="mt-5 max-w-xs text-sm text-muted-foreground">
              Infraestructura de IA que recupera la facturación que tu restaurante pierde cada semana.
            </p>
          </div>

          <FooterCol title="Producto">
            {product.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group text-muted-foreground transition-colors hover:text-foreground">
                  <RollText>{l.label}</RollText>
                </a>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Contacto">
            <li>
              <EmailLink className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <Mail size={14} /> {CONTACT_EMAIL}
              </EmailLink>
            </li>
            <li>
              <a href="tel:+34696791722" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <Phone size={14} /> 696 79 17 22
              </a>
            </li>
            <li>
              <a href="tel:+34636747242" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <Phone size={14} /> 636 74 72 42
              </a>
            </li>
            <li>
              <a href="#auditoria" className="group text-muted-foreground transition-colors hover:text-foreground">
                <RollText>Auditoría gratuita</RollText>
              </a>
            </li>
          </FooterCol>

          <FooterCol title="Legal">
            {legal.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.newTab ? { target: '_blank', rel: 'noopener' } : {})}
                  className="group text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RollText>{l.label}</RollText>
                </a>
              </li>
            ))}
          </FooterCol>

          <VoiceOrb className="justify-self-center md:justify-self-end" />
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-border py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Velnox. Todos los derechos reservados.</span>
          <a href="#top" className="group hover:text-foreground">
            <RollText>Volver arriba ↑</RollText>
          </a>
        </div>
      </div>

      <div className="select-none overflow-hidden" aria-hidden>
        <p className="wordmark -mb-[4vw] text-center text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] opacity-60">VELNOX</p>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-foreground">/{title}</p>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  )
}
