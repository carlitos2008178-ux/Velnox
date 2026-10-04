import { StrictMode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PrivacyPolicy from './pages/PrivacyPolicy.tsx'
import Terms from './pages/Terms.tsx'

// Sin router: las únicas páginas aparte son las legales.
const PAGES: Record<string, ComponentType> = {
  '/privacidad': PrivacyPolicy,
  '/terminos': Terms,
}
const Page = PAGES[window.location.pathname.replace(/\/$/, '')] ?? App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
