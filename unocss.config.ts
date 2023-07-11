import { defineConfig } from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['main', 'mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 mx-auto'],
    ['pt-lg', 'lg:pt-24 pt-12 sm:pt-15'],
    ['flex-bc', 'flex justify-between items-center'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
