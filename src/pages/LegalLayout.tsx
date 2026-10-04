import { useEffect, type ReactNode } from 'react'
import EmailLink, { CONTACT_EMAIL } from '../components/ui/EmailLink'
import { OWNER } from './owner'

export type LegalSectionInfo = { id: string; title: string }

type LayoutProps = {
  docTitle: string
  titleStart: string
  titleAccent: string
  intro: ReactNode
  updated: string
  sections: LegalSectionInfo[]
  children: ReactNode
}

export default function LegalLayout({ docTitle, titleStart, titleAccent, intro, updated, sections, children }: LayoutProps) {
  useEffect(() => {
    document.title = `${docTitle} — Velnox`
  }, [docTitle])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2 text-lg font-semibold tracking-[0.2em]">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-glow-blue to-glow-violet" />
            VELNOX
          </a>
          <a href="/" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground">
            ← Volver a la web
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">/Legal</p>
        <h1 className="mt-6 text-4xl font-medium leading-[1.05] md:text-6xl">
          <span className="text-fade">{titleStart} </span>
          <span className="text-gradient">{titleAccent}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">{intro}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Última actualización: {updated}
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-[16rem_1fr]">
          <nav aria-label="Índice" className="md:sticky md:top-24 md:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-foreground">Índice</p>
            <ol className="mt-4 space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-3 text-muted-foreground transition-colors hover:text-foreground">
                    <span className="font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="min-w-0 space-y-14 text-[15px] leading-relaxed text-foreground/85">{children}</article>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Velnox. Todos los derechos reservados.</span>
          <span className="flex gap-6">
            <a href="/privacidad" className="hover:text-foreground">
              Privacidad
            </a>
            <a href="/terminos" className="hover:text-foreground">
              Términos
            </a>
            <a href="/" className="hover:text-foreground">
              Volver a la web
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}

export function LegalSection({ sections, n, children }: { sections: LegalSectionInfo[]; n: number; children: ReactNode }) {
  const { id, title } = sections[n]
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <h2 className="flex items-baseline gap-4 text-2xl font-medium text-foreground">
        <span className="font-mono text-xs text-muted-foreground">{String(n + 1).padStart(2, '0')}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

export function OwnerCard() {
  return (
    <dl className="card-glass grid gap-x-6 gap-y-3 rounded-2xl p-6 sm:grid-cols-[10rem_1fr]">
      <Dt>Titular</Dt>
      <dd>{OWNER.name}</dd>
      <Dt>NIF / CIF</Dt>
      <dd>{OWNER.taxId}</dd>
      <Dt>Domicilio</Dt>
      <dd>{OWNER.address}</dd>
      <Dt>Nombre comercial</Dt>
      <dd>{OWNER.brand}</dd>
      <Dt>Correo electrónico</Dt>
      <dd>
        <Mail />
      </dd>
      <Dt>Teléfono</Dt>
      <dd>{OWNER.phones}</dd>
    </dl>
  )
}

export function CardList({ items }: { items: { title: string; body: ReactNode; meta?: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it.title} className="card-glass rounded-2xl p-4">
          <p className="font-medium text-foreground">{it.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{it.body}</p>
          {it.meta && <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{it.meta}</p>}
        </li>
      ))}
    </ul>
  )
}

export function B({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-foreground">{children}</strong>
}

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-glow-violet">
      {children}
    </a>
  )
}

export function Mail() {
  return (
    <EmailLink className="text-foreground underline decoration-border underline-offset-4 hover:decoration-glow-violet">
      {CONTACT_EMAIL}
    </EmailLink>
  )
}

function Dt({ children }: { children: ReactNode }) {
  return <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{children}</dt>
}
