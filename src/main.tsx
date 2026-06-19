import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { VariantProvider } from './context/VariantContext'
import { router } from './router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <VariantProvider>
        <RouterProvider router={router} />
      </VariantProvider>
    </LanguageProvider>
  </StrictMode>,
)
