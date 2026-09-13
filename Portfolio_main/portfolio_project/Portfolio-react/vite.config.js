import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // Added for GitHub Pages subfolder routing
  server: {
    watch: {
      // This tells your Mac to ignore the massive node_modules folder
      ignored: ['**/node_modules/**', '**/.git/**']
    }
  }
})
