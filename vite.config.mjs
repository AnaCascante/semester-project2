import { defineConfig } from 'vite'

const basePath = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: '[name][extname]',
      },
    },
  },
  base: basePath,
})
