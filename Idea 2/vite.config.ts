import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
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
});
