import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import foxlist from './plugin'

export default defineConfig((env) => {
  return {
    plugins: [
      solidPlugin(),
      foxlist({
        version: '0.0.1',
      }),
    ],
    build: {
      target: 'esnext',
      watch: (env.mode === 'development' ? {
        include: ['src/**', 'plugin/**'],
      } : undefined),
      rollupOptions: {
        input: 'sidebar.html'
      }
    },
  }
})
