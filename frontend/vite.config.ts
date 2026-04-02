import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/db-api': {
        target: 'https://v6.db.transport.rest',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/db-api/, '') // Removes '/db-api' from the URL before forwarding
      }
    }
  }
})