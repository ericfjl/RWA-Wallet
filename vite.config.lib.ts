import AutoImport from 'unplugin-auto-import/vite'
import { r } from './scripts/utils'
export const optimizeDeps = {
  include: [
    'vue',
    '@vueuse/core',
    'webextension-polyfill',
  ],
  exclude: [
    'vue-demi',
  ],
}

export const theAutoImport = AutoImport({
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
        'map',
        'reverse',
        'cloneDeep',
        'filter',
        'sortBy',
        'truncate',
        'keyBy',
        'groupBy',
        'upperFirst',
        'take',
        'reverse',
        'slice',
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
})
