import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Orbit_Gallery/',   // 👈 ADD THIS LINE
  plugins: [react()],
})