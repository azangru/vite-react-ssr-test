import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      input: "src/client/Main.tsx"
    }
  },
  plugins: [react()],
})
