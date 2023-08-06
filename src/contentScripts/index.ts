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

const addTopRightBtns = () => {
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
}

const addProfileBtn = () => {
  let href = ''

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
  const app = createApp(ProfileRwaNFTBtn)
  setupApp(app)
  const profileId = ref('')
  app.provide('profileId', profileId)
  app.mount(root)
      
  let interval = 0
  const startInjectProfileBtnInterval = () => {
    console.log('====> startInjectProfileBtnInterval :')
    let intervalTimes = 1
    const maxInterverTimes = 4
    const intervalTimeSpan = 500
    interval = setInterval(() => {
      if (intervalTimes > maxInterverTimes) {
        console.log('====> startInjectProfileBtnInterval abortInject :', intervalTimes)
        clearInterval(interval)
        return
      }
      intervalTimes++

      const descInTwitter = document.querySelector('[data-testid="UserDescription"]')
      if (!descInTwitter) return

      const descText = descInTwitter.innerText
      const index = descText.indexOf('rwa-nft.com')
      if (index === -1) return
      
      let nftId = descText.substr(index).replace('rwa-nft.com/', '')
      nftId = nftId.split(' ')[0]
      // if (!nftId) return
      profileId.value = nftId
      console.log('====> descText, nftId :', descText, nftId)
      const usernameNode = document.querySelector('[data-testid="UserName"]')
      const avatarRowNode = usernameNode.previousSibling

      clearInterval(interval)

      const parentNode = avatarRowNode?.lastChild
      const firstChild = parentNode.firstChild
      parentNode.insertBefore(container, firstChild)
    }, intervalTimeSpan)
  }

  // check href change interval
  setInterval(() => {
    if (href==='' || href !== location.href) {
      href = location.href
      if (interval) {
        console.log('====> clearInterval in setInterval :', interval)
        profileId.value = ''
        clearInterval(interval)
      }
      startInjectProfileBtnInterval()
    }
  }, 500)
}

const addCardInTwitterStatus = () => {
  let href = ''
  let targetNode = null
  let interval = 0
  let observer = null

  const parseItem = item => {
    if(!item) return
    const searchText = 'https://rwa-nft.com/'
    const index = item.innerText.indexOf(searchText)
    if (index === -1) return

    const nftItemPath = ref(item.innerText.substr(index).replace(searchText, '').split('…')[0])
    // console.log('====> nftItemPath :', nftItemPath, item.innerText)

    const datetimeLink = item.querySelector('[datetime]').parentNode
    const id = datetimeLink.getAttribute('href')
    const container = document.createElement('div')
    container.id = `${__NAME__}-text-rwa-nft-item-${id}`
    const root = document.createElement('div')
    patchPortalRoot(container, root)
    const styleEl = document.createElement('link')
    const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
    styleEl.setAttribute('rel', 'stylesheet')
    styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
    shadowDOM.appendChild(styleEl)
    shadowDOM.appendChild(root)

    const statusRowNode = item.querySelector('[data-testid="reply"]').parentNode.parentNode.parentNode
    statusRowNode.before(container)
    const app = createApp(TextInTwitterBtn)
    setupApp(app)
    app.provide('nftItemPath', nftItemPath)
    app.mount(root)
  }

  const startInjectTweetNFTCardInterval = () => {
    console.log('====> startInjectTweetNFTCardInterval :')
    let intervalTimes = 1
    const maxInterverTimes = 4
    const intervalTimeSpan = 500
    interval = setInterval(() => {
      if (intervalTimes > maxInterverTimes) {
        console.log('====> startInjectTweetNFTCardInterval abortInject :', intervalTimes)
        clearInterval(interval)
        return
      }
      intervalTimes++

      targetNode = document.querySelector('[aria-labelledby*="accessible-list-"]')
      if (!targetNode) return

      const list = document.querySelectorAll('[aria-labelledby*="accessible-list-"] article[data-testid="tweet"]')
      list.forEach(parseItem)
      
      // 观察器的配置（需要观察什么变动）
      const config = { childList: true };

      // 当观察到变动时执行的回调函数
      const callback = function (mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for (let mutation of mutationsList) {
          console.log('====> mutation :', mutation.type)
          if (mutation.type === "childList") {
            for (var i = 0; i < mutation.addedNodes.length; i++){
              parseItem(mutation.addedNodes[i].querySelector('article[data-testid="tweet"]'))
            }
          }
        }
      }

      // 创建一个观察器实例并传入回调函数
      observer = new MutationObserver(callback);

      // 以上述配置开始观察目标节点
      observer.observe(targetNode.querySelector('[data-testid="cellInnerDiv"]').parentNode, config);
      clearInterval(interval)
    }, intervalTimeSpan)
  }

  setInterval(() => {
    if (href==='' || href !== location.href) {
      href = location.href
      if (interval) {
        console.log('====> clearInterval in setInterval :', interval)
        clearInterval(interval)
      }
      if (observer) {
        observer.disconnect();
      }
      startInjectTweetNFTCardInterval()
    }
  }, 500)
}

addProfileBtn()
addCardInTwitterStatus()