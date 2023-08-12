import type { App } from 'vue'
import { ref } from 'vue'
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import ResizeTextarea from 'resize-textarea-vue3'
import { createPinia } from 'pinia'
import * as LitJsSdk from "@lit-protocol/lit-node-client";

// import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import Hljs from 'highlight.js'

export function setupApp(app: App, opts = { }) {
  const { routeMode = 'webHash', sendMessage } = opts

  const tabId = ref('')
  app.provide('tabId', tabId)

  const account:HDAccount = ref(null)
  app.provide('account', account)

  // route
  const routeModeMap = {
    memory: createMemoryHistory,
    web: createWebHistory,
    webHash: createWebHashHistory,
  }
  const routes = setupLayouts(generatedRoutes)
  const router = createRouter({
    history: routeModeMap[routeMode](),
    routes,
  })
  const hasLogin = ref(false)
  const litNodeClient = ref('')
  let isLitConnecting = false
  app.provide('litNodeClient', litNodeClient)

  const initLit = async () => {
    const client = new LitJsSdk.LitNodeClient({
      debug: false,
      litNetwork: "jalapeno",
      alertWhenUnauthorized: false,
    });
    await client.connect();
    litNodeClient.value = client
    isLitConnecting = false
  }

  router.beforeEach(async (to, from) => {
    if (!tabId.value) {
      tabId.value = await sendMessage("getTabId", {}, "background");
    }

    if (litNodeClient.value === '' && !isLitConnecting) {
      isLitConnecting = true
      nextTick(async() => {
        await initLit()
      })
    }

    if (to.fullPath.startsWith('/options/onboarding'))
      return true

    // no mnemonic, just create or import new one
    if (!encryptedMnemonic.value)
      return { name: 'options-onboarding' }

    // check login status
    if (!hasLogin.value) {
      const rz = await sendMessage('getStoreInMemory', { keys: ['password', 'mnemonicStr'] }, 'background')
      if (!rz.mnemonicStr) {
        return { name: 'options-onboarding-login' }
      }else {
        account.value = getAccount(rz.mnemonicStr);
      }

      hasLogin.value = true
    }

    // ...
    // explicitly return false to cancel the navigation
    // return false
  })
  app.use(router)
  app.use(ResizeTextarea)

  // VMdEditor.use(githubTheme, {
  //   Hljs,
  // })
  // app.use(VMdEditor)

  VMdPreview.use(githubTheme, {
    Hljs,
  })
  app.use(VMdPreview)

  // pinia
  const pinia = createPinia()
  app.use(pinia)
  pinia.state.value = {}

  // Here you can install additional plugins for all contexts: popup, options page and content-script.
  // example: app.use(i18n)
  // example excluding content-script context: if (context !== 'content-script') app.use(i18n)
}
