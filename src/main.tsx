import { createRoot } from 'react-dom/client';
import App from '@app/App.tsx';
import './index.scss';
import '@assets/fonts/SFUI/styles.css';

import WebApp from '@twa-dev/sdk';
import { game } from '@shared/game';
import { SnackbarProvider } from 'notistack';
import { SnackbarSuccess } from '@shared/components/SnackbarSuccess';
import { SnackbarError } from '@shared/components/SnackbarError';

WebApp.ready();
WebApp.expand();

game.init().then(() =>
  createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <SnackbarProvider
      autoHideDuration={1500}
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      TransitionProps={{ direction: 'down' }}
      Components={{ success: SnackbarSuccess, error: SnackbarError }}
    >
      <App />
    </SnackbarProvider>
    // </StrictMode>
  )
);
