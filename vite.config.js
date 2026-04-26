import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3010
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        admin: './admin.html',
        caseStudy: './case-study.html',
        links: './links.html'
      }
    }
  }
})
