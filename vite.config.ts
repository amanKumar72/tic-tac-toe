import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['annamaria-semipolitical-nonabsolutely.ngrok-free.dev']
  },
  plugins: [react(), tailwindcss()],
})
