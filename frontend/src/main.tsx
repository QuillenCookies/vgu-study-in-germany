import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { UniversityProvider } from './context/UniversityContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UniversityProvider>
        <App />
      </UniversityProvider>
    </BrowserRouter>
  </StrictMode>,
)
