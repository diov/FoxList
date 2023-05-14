import { defineConfig, presetIcons, presetMini } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'remark-btn': `p-2 bg-transparent border-(~ solid gray-300) rounded text-blue-5 font-500 hover:bg-gray-100`,
    'remark-btn:disabled': 'p-2 bg-transparent border-(~ solid gray-300) rounded text-gray-5 font-500 pointer-events-none cursor-not-allowed',
  },
  presets: [
    presetMini(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})
