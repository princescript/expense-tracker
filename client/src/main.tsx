import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/theme-context.tsx'

import { Toaster } from "sonner";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={3000}
      />
      <App />
    </ThemeProvider>
  </StrictMode>,
)