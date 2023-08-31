import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { prismjsPlugin } from 'vite-plugin-prismjs'
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    prismjsPlugin({
      languages: ['go', 'shell', 'java', 'javascript', 'rust', 'c', 'cpp', 'css', 'json', 'sql', 'c#', 'git', 'lua', 'yaml', 'docker', 'typescript', 'html', 'xml'],
    }),
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
