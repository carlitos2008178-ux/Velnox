// Etiqueta de sección estilo "01 /LABEL"
export default function Eyebrow({ children, number }: { children: string; number?: string }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
      {number && (
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-border px-1.5 text-[10px] text-foreground">
          {number}
        </span>
      )}
      <span>/{children}</span>
    </span>
  )
}
