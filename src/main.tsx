import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PrivacyPolicy from './pages/PrivacyPolicy.tsx'

// Sin router: la única página aparte es la política de privacidad.
const isPrivacy = window.location.pathname.replace(/\/$/, '') === '/privacidad'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPrivacy ? <PrivacyPolicy /> : <App />}
  </StrictMode>,
)
