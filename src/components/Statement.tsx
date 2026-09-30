import Eyebrow from './Eyebrow'
import WordReveal from './motion/WordReveal'

export default function Statement() {
  return (
    <section className="border-y border-border">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <Eyebrow>Nuestra forma de trabajar</Eyebrow>
        <WordReveal
          className="mt-8 text-3xl font-medium leading-tight md:text-5xl"
          text="No te entregamos un chatbot para que aprendas a usarlo. Entregamos infraestructura de IA que se instala, se ajusta y funciona sola, con un equipo detrás que responde por los resultados."
        />
      </div>
    </section>
  )
}
