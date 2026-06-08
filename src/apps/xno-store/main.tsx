import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './XnoStore.css'
import { XnoStore } from './XnoStore'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <XnoStore />
  </StrictMode>,
)
