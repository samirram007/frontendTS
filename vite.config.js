import tailwindcss from '@tailwindcss/vite'
import tanstackRouter from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open:true

  },
  build: {
    // ssr: 'src/entry-server.tsx', // for server rendering
    // outDir: 'dist-ssr',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // All node_modules go into a vendor chunk
          // if (id.includes('node_modules')) {
          //   if (id.includes('react') || id.includes('react-dom')) {
          //     return 'react-vendor'
          //   }
          //   if (id.includes('@tanstack/react-query')) {
          //     return 'query-vendor'
          //   }
          //   return 'vendor'
          // }

          // Optionally, split routes by folder
          if (id.includes('src/features/accounts/settings')) {
            return 'accounts-settings'
          }

          if (id.includes('src/features/accounts')) {
            return 'accounts'
          }
        },
      },
    },
  },
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      spa: {
        enabled: true,
        prerender: {
          crawlLinks: true,
        },
      },
      sitemap: {
        host: 'https://localhost:3000',
      },
    }),
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  // server: { 
  //   proxy: {
  //     '/api': {
  //       target: 'https://aipt-api.local',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
