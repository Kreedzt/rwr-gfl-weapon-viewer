import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rwr-gfl-weapon-viewer/',
  plugins: [react()]
})
