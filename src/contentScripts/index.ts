import { onMessage, sendMessage } from 'webext-bridge/content-script'
import { createApp } from 'vue'
import App from './App.vue'
import { patchPortalRoot, setupApp } from '~/logic/common-setup'

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
  setupApp(app, { routeMode: 'memory', sendMessage, onMessage })
  app.mount(root)
})()

// (() => {
//   // mount component to context window
//   const container = document.createElement('div')
//   container.id = `${__NAME__}-profile-rwa-nft-btn`
//   const root = document.createElement('div')
//   patchPortalRoot(container, root)
//   const styleEl = document.createElement('link')
//   const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
//   styleEl.setAttribute('rel', 'stylesheet')
//   styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
//   shadowDOM.appendChild(styleEl)
//   shadowDOM.appendChild(root)

//   const interval = setInterval(() => {
//     const profileLink = document.querySelector('a[data-testid="AppTabBar_Profile_Link"]')
//     if (!profileLink)
//       return

//     clearInterval(interval)

//     let profileUrl = ''
//     for (const attr of profileLink.attributes) {
//       if (attr.name === 'href') {
//         profileUrl = attr.baseURI.toLowerCase()
//         break
//       }
//     }
//     // const currentUrl = location.href.toLocaleLowerCase()
//     // if (currentUrl !== profileUrl)
//     //   return

//     const editProfileBtn = document.querySelector('a[data-testid="editProfileButton"]')
//     if (editProfileBtn) {
//       editProfileBtn.before(container)
//       const app = createApp(ProfileRwaNFTBtn)
//       setupApp(app, { routeMode: 'memory', sendMessage, onMessage })
//       app.mount(root)
//     }
//   }, 500)
// })()
