import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import mkcert from "vite-plugin-mkcert";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), mkcert()],
  server: {
    port: 3001
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@app': path.resolve(__dirname, './src/app'),
      '@game': path.resolve(__dirname, './src/game'),
      '@@game': path.resolve(__dirname, './src/game')
    }
  }
});
