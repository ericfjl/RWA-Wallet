/// <reference types="vitest" />
import { dirname, relative } from 'node:path'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { isDev, port, r } from './scripts/utils'
import packageJson from './package.json'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export const sharedConfig: UserConfig = {
  root: r('src'),
  resolve: {
    alias: {
      '~/': `${r('src')}/`,
      assert: 'rollup-plugin-node-polyfills/polyfills/assert',
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      // buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6'
    },
  },
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(packageJson.name),
    global: 'window',
		'process.env.NODE_DEBUG': 'false',
		'window.global': 'globalThis'
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
      dirs: [
        { dir: r('src/pages'), baseRoute: '' },
        { dir: r('src/options/pages'), baseRoute: 'options' },
        { dir: r('src/popup/pages'), baseRoute: 'popup' },
        { dir: r('src/contentScripts/pages'), baseRoute: 'contentScripts' },
      ],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      layoutsDirs: r('src/layouts'),
    }),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          'webextension-polyfill': [
            ['*', 'browser'],
          ],
          'lodash': [
            'isEqual',
            'uniq',
            'random',
            'find',
            'findIndex',
            'pick',
            'remove',
            'some',
            'trim',
            'merge',
            'forEach',
            'kebabCase',
            'pickBy',
            'get',
            'reverse',
            'cloneDeep',
            'filter',
            'sortBy',
            'keyBy',
            'groupBy',
            'upperFirst',
            'take',
            'reverse',
            'shuffle',
          ],
          'pinia': [
            'acceptHMRUpdate',
            'defineStore',
            'storeToRefs',
          ],
        },
      ],
      dirs: [
        r('src/stores'),
        r('src/composables'),
      ],
      dts: r('src/auto-imports.d.ts'),
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: [r('src/components')],
      directoryAsNamespace: true,
      // generate `components.d.ts` for ts support with Volar
      dts: r('src/components.d.ts'),
      resolvers: [
        // auto import icons
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    // https://github.com/antfu/unplugin-icons
    Icons(),

    // https://github.com/unocss/unocss
    UnoCSS(),

    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        return html.replace(/"\/assets\//g, `"${relative(dirname(path), '/assets')}/`)
      },
    },
  ],
  optimizeDeps: {
    include: [
      'vue',
      '@vueuse/core',
      'webextension-polyfill',
    ],
    exclude: [
      'vue-demi',
    ],
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          // buffer: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
}

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    watch: isDev
      ? {}
      : undefined,
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        options: r('src/options/index.html'),
        popup: r('src/popup/index.html'),
      }
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
}))
