import { defineConfig } from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['main', 'mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 mx-auto'],
    ['pt-lg', 'lg:pt-24 pt-12 sm:pt-15'],
    ['flex-bc', 'flex justify-between items-center'],
    ['flex-ec', 'flex justify-end items-center'],
    ['flex-cc', 'flex justify-center items-center'],
    ['flex-cx', 'flex justify-center'],
    ['flex-cy', 'flex items-center'],
    ['btn', 'rounded-md font-semibold bg-zinc-900 shadow-sm text-sm text-white py-2.5 px-3.5 hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
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
