import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React app mounted successfully');
} catch (error) {
  console.error('Error mounting React app:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; color: white; background: #0B1120; min-height: 100vh;">
      <h1 style="color: red;">Error Loading App</h1>
      <pre style="color: #ff6b6b;">${error instanceof Error ? error.message : String(error)}</pre>
      <p>Check the browser console for more details.</p>
    </div>
  `;
}