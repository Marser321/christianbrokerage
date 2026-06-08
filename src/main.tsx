import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { VariantProvider } from './context/VariantContext'
import { router } from './router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VariantProvider>
      <RouterProvider router={router} />
    </VariantProvider>
  </StrictMode>,
)
