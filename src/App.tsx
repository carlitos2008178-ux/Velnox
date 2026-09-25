import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Diagnosis from './components/Diagnosis'
import SystemSection from './components/SystemSection'
import ResultsBand from './components/ResultsBand'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ScrollProgress from './components/motion/ScrollProgress'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Diagnosis />
        <SystemSection />
        <ResultsBand />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
