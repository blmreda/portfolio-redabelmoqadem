import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Assurez-vous que c'est `/` et non `./`
  // Optionnel, mais conseillé pour être explicite
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
// L'accolade fermante `}` doit être ici.