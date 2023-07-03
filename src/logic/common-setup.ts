import type { App } from 'vue'
import { ref } from 'vue'
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import ResizeTextarea from 'resize-textarea-vue3'
import { encryptedMnemonic } from '~/logic/storage'

export function setupApp(app: App, opts = { }) {
  const { routeMode = 'webHash', sendMessage } = opts

  const tabId = ref('')
  app.provide('tabId', tabId)

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
  router.beforeEach(async (to, from) => {
    // console.log('====> to :', to, hasLogin.value, encryptedMnemonic.value)

    if (to.fullPath.startsWith('/options/onboarding'))
      return true

    // no mnemonic, just create or import new one
    if (!encryptedMnemonic.value)
      return { name: 'options-onboarding' }

    // check login status
    if (!hasLogin.value) {
      const rz = await sendMessage('getStoreInMemory', { keys: ['password', 'mnemonicStr'] }, 'background')
      if (!rz.mnemonicStr)
        return { name: 'options-onboarding-login' }

      hasLogin.value = true
    }
    // ...
    // explicitly return false to cancel the navigation
    // return false
  })
  app.use(router)
  app.use(ResizeTextarea)
  // Here you can install additional plugins for all contexts: popup, options page and content-script.
  // example: app.use(i18n)
  // example excluding content-script context: if (context !== 'content-script') app.use(i18n)
}

/**
 *
 * @param shadowRootContainer - The HTML element that is the shadowRoot's parent
 * @param portalRoot - The HTML element that you want Modals to be teleported to
 * @returns
 */
export function patchPortalRoot(
  shadowRootContainer: HTMLElement,
  portalRoot?: HTMLElement,
) {
  const elementById = Document.prototype.getElementById

  const element = portalRoot || shadowRootContainer.shadowRoot?.children[0]
  if (!element)
    return

  Document.prototype.getElementById = function (elementId: string) {
    if (elementId === 'headlessui-portal-root') {
      const d = document.createElement('div')
      d.id = 'headlessui-portal-root'
      element.appendChild(d)
      return d
    }
    return elementById.call(this, elementId)
  }

  const activeElementDescriptorGetter = Object.getOwnPropertyDescriptor(
    Document.prototype,
    'activeElement',
  )?.get

  Object.defineProperty(Document.prototype, 'activeElement', {
    get() {
      const activeElement = activeElementDescriptorGetter?.call(this)
      if (activeElement === shadowRootContainer)
        return shadowRootContainer.shadowRoot?.activeElement
    },
  })

  const targetGetter = Object.getOwnPropertyDescriptor(
    Event.prototype,
    'target',
  )?.get

  Object.defineProperty(Event.prototype, 'target', {
    get() {
      const target = targetGetter?.call(this)

      if (target === shadowRootContainer && this.path)
        return this.path[0]

      return target
    },
  })
}
