import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import './css/index.css';
import './css/bootstrap.css';
import './css/toastify.css'
import './css/animate.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
