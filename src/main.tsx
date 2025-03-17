import { createRoot } from 'react-dom/client';
import App from '@app/App.tsx';
import { StrictMode } from 'react';
import './index.scss';
import '@assets/fonts/SFUI/styles.css';

import WebApp from '@twa-dev/sdk';

WebApp.ready();
WebApp.expand();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
