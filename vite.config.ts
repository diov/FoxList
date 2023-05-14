import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import solidPlugin from 'vite-plugin-solid'
import foxlist from './plugin'

export default defineConfig((env) => {
  return {
    plugins: [
      solidPlugin(),
      UnoCSS(),
      foxlist({
        version: '0.0.1',
        watch: ['vite.config.ts', 'uno.config.ts']
      }),
    ],
    build: {
      target: 'esnext',
      rollupOptions: {
        input: 'sidebar.html'
      }
    },
  }
})
