import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error handler for debugging blank screens
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Global Error:", message, error);
  // Optional: show a small alert on the page if it's blank
  const root = document.getElementById('root');
  if (root && root.innerHTML === "") {
    root.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">
      <h2>Error de carga</h2>
      <p>${message}</p>
      <pre style="font-size: 10px;">${error?.stack || ''}</pre>
    </div>`;
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
