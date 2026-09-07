import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
      '@portfolio-data': path.resolve(__dirname, '../shared/portfolioData'),
    },
  },

  server: {
    fs: {
      allow: ['..'],
    },
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'gsap',
      'lucide-react'
    ]
  },

  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    reportCompressedSize: true,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('/node_modules/three') ||
            id.includes('/node_modules/@react-three/')
          ) {
            return 'three';
          }

          if (
            id.includes('/node_modules/gsap') ||
            id.includes('/node_modules/canvas-confetti') ||
            id.includes('/node_modules/jspdf')
          ) {
            return 'effects';
          }

          return undefined;
        }
      }
    }
  }
});