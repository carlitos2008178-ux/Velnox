import { Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <a href="#top" className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">
                V
              </span>
              Velnox
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Infraestructura de IA que recupera la facturación que tu restaurante pierde cada semana.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <p className="font-semibold text-foreground">Producto</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li><a href="#diagnostico" className="transition-colors hover:text-foreground">Diagnóstico</a></li>
                <li><a href="#sistema" className="transition-colors hover:text-foreground">Sistema</a></li>
                <li><a href="#planes" className="transition-colors hover:text-foreground">Planes</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground">Contacto</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>
                  <a href="mailto:velnoxflow@gmail.com" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
                    <Mail size={14} /> velnoxflow@gmail.com
                  </a>
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Phone size={14} className="shrink-0" />
                  <span>
                    <a href="tel:+34696791722" className="transition-colors hover:text-foreground">696 79 17 22</a>
                    {' / '}
                    <a href="tel:+34636747242" className="transition-colors hover:text-foreground">636 74 72 42</a>
                  </span>
                </li>
                <li><a href="#auditoria" className="transition-colors hover:text-foreground">Auditoría gratuita</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground">Legal</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-foreground">Privacidad</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Términos</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Velnox. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
