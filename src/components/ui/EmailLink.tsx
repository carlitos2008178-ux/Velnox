import type { MouseEvent, ReactNode } from 'react'

export const CONTACT_EMAIL = 'velnoxflow@gmail.com'

const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`

// En ordenador abre la ventana de "Redactar" de Gmail con el destinatario ya puesto.
// En móvil se deja el mailto:, que abre la app de correo (Gmail en la mayoría de Android).
export default function EmailLink({ className, children }: { className?: string; children: ReactNode }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) return
    e.preventDefault()
    window.open(GMAIL_COMPOSE, '_blank', 'noopener')
  }

  return (
    <a href={`mailto:${CONTACT_EMAIL}`} onClick={onClick} className={className}>
      {children}
    </a>
  )
}
