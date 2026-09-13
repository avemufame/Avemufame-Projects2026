import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Avemufame-Projects2026/songbook/', // 👈 Indica a Vite il percorso esatto su GitHub Pages
})
