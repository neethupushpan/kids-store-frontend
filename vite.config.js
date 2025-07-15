import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Required by Vercel for production build
  },
  server: {
    port: 5190, // Local development only
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Backend for local dev
        changeOrigin: true,
      },
    },
  },
});
