import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api requests to your backend server
      '/api': {
        target: 'http://localhost:5001', // Your backend server address
        changeOrigin: true,
        // secure: false, // uncomment if your backend is not https
        // rewrite: (path) => path.replace(/^\/api/, '') // if you want to remove /api prefix when forwarding
      }
    }
  }
})