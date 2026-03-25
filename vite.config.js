import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    host: true,
    proxy: {
      '/mediapipe': {
        target: 'https://cdn.jsdelivr.net/npm/@mediapipe',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mediapipe/, '')
      }
    }
  },
})
