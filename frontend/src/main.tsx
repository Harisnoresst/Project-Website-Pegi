import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TransactionProvider } from './context/TransactionContext'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TransactionProvider>
      <App />
    </TransactionProvider>
  </React.StrictMode>,
)

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then((registration) => {
//         console.log('ServiceWorker berhasil didaftarkan dengan scope:', registration.scope);
//       })
//       .catch((error) => {
//         console.error('ServiceWorker gagal didaftarkan:', error);
//       });
//   });
// }