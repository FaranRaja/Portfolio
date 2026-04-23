import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) return 'three-core';
          if (id.includes('@react-three')) return 'three-fiber';
          if (id.includes('framer-motion')) return 'framer';
          if (id.includes('react-dom')) return 'react-dom';
        },
      },
    },
  },
})
