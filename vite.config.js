import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.jsx'],
      refresh: true,
    }),
    react(),
  ],
  server: {
    host: '0.0.0.0',
    hmr: {
      host: 'localhost',
    },
    allowedHosts: [
      'portfolio-professeur.onrender.com',  // Your Render.com domain
      'localhost',                          // For local development
      '127.0.0.1'                          // Alternative localhost
    ]
  },
  build: {
    manifest: true,  // Important for Laravel asset handling
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],  // Better caching for React
          vendor: ['lodash', 'axios']     // Add other vendor libraries
        }
      }
    }
  }
});