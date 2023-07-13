import { onMessage, sendMessage } from 'webext-bridge/content-script'
import { createApp } from 'vue'
import App from './App.vue'
import ProfileRwaNFTBtn from './ProfileRwaNFTBtn.vue'
import TextInTwitterBtn from './TextInTwitterBtn.vue'


/**
 *
 * @param shadowRootContainer - The HTML element that is the shadowRoot's parent
 * @param portalRoot - The HTML element that you want Modals to be teleported to
 * @returns
 */
function patchPortalRoot(
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

const setupApp = app => {
  const tabId = ref('')
  app.provide('tabId', tabId)
}

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  // mount component to context window
  const container = document.createElement('div')
  container.id = __NAME__
  const root = document.createElement('div')
  patchPortalRoot(container, root)
  const styleEl = document.createElement('link')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)
  document.body.appendChild(container)
  const app = createApp(App)
  setupApp(app)
  app.mount(root)
})();

(() => {
  // mount component to context window
  const container = document.createElement('div')
  container.id = `${__NAME__}-profile-rwa-nft-btn`
  const root = document.createElement('div')
  patchPortalRoot(container, root)
  const styleEl = document.createElement('link')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)

  const interval = setInterval(() => {
    const profileLink = document.querySelector('[data-testid="editProfileButton"]')
    const descInTwitter = document.querySelector('[data-testid="UserDescription"]')
    if (!profileLink || !descInTwitter)
      return

    clearInterval(interval)

    // const descText = descInTwitter.innerText
    // const nftId = descText.substr(descText.indexOf('rwa.web3hacker.world')).replace('rwa.web3hacker.world/', '')

    // let profileUrl = ''
    // for (const attr of profileLink.attributes) {
    //   if (attr.name === 'href') {
    //     profileUrl = attr.baseURI.toLowerCase()
    //     break
    //   }
    // }
    // const currentUrl = location.href.toLocaleLowerCase()
    // if (currentUrl !== profileUrl)
    //   return

    profileLink.before(container)
    const app = createApp(ProfileRwaNFTBtn)
    setupApp(app)
    app.mount(root)
  }, 500)
})();

(() => {
  // mount component to context window
  const container = document.createElement('div')
  container.id = `${__NAME__}-text-rwa-nft-item`
  const root = document.createElement('div')
  patchPortalRoot(container, root)
  const styleEl = document.createElement('link')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)

  const interval = setInterval(() => {
    const textInTwitter = document.querySelector('[data-testid="tweetText"]')
    if (!textInTwitter)
      return

    clearInterval(interval)

    // const nftId = descText.substr(descText.indexOf('rwa.web3hacker.world')).replace('rwa.web3hacker.world/', '')
    console.log('====> textInTwitter :', textInTwitter)

    // let profileUrl = ''
    // for (const attr of profileLink.attributes) {
    //   if (attr.name === 'href') {
    //     profileUrl = attr.baseURI.toLowerCase()
    //     break
    //   }
    // }
    // const currentUrl = location.href.toLocaleLowerCase()
    // if (currentUrl !== profileUrl)
    //   return

    textInTwitter.before(container)
    const app = createApp(TextInTwitterBtn)
    setupApp(app)
    app.mount(root)
  }, 500)
})()
