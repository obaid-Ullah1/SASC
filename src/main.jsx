import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// --- DEVEPREME CSS ---
import 'devextreme/dist/css/dx.light.css'; 
import 'devextreme/dist/css/dx.common.css';
// ---------------------------

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)