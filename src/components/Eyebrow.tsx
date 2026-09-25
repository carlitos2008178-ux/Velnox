export default function Eyebrow({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  )
}
