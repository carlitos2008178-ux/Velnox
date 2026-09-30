import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Statement from './components/Statement'
import Diagnosis from './components/Diagnosis'
import SystemSection from './components/SystemSection'
import ResultsBand from './components/ResultsBand'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ScrollProgress from './components/motion/ScrollProgress'

function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <Diagnosis />
        <SystemSection />
        <ResultsBand />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
