import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  build: {
    minify: true,
    sourcemap: mode !== 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Split large dependencies into separate chunks
          utils: ['@tanstack/react-query', 'axios']
        }
      }
    }
  },
  server: { // Add this server configuration
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173, // Or your preferred port
    // open: true, // Optionally open the browser on start
  }
}))
