import { isInternalEndpoint } from 'webext-bridge'
import { onMessage, sendMessage } from 'webext-bridge/background'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  await sendMessage('updateTabId', { tabId }, `content-script@${tabId}`)
})

let memoryStoreMap = {
  password: '',
  mnemonicStr: '',
}

onMessage('internalCall', async (msg) => {
  if (!isInternalEndpoint(msg.sender))
    return false
  console.log('====> msg :', msg)

  // const { action, params, opts } = msg.data
  // const { top, left, width, height } = opts
  // const newWindow = await browser.windows.create({
  //   url: './dist/options/index.html#/options/',
  //   type: 'popup',
  //   width,
  //   height,
  //   left,
  //   top,
  // })
  // console.log('====> newWindow :', newWindow)
  return 'hehe'
})

onMessage('storeInMemory', async (msg) => {
  // Respond only if request is from 'devtools', 'content-script', 'popup', 'options', or 'background' endpoint
  if (!isInternalEndpoint(msg.sender))
    return false

  memoryStoreMap = {
    ...memoryStoreMap,
    ...msg.data,
  }
})

onMessage('getStoreInMemory', async (msg) => {
  if (!isInternalEndpoint(msg.sender))
    return false

  const data = {}
  msg.data.keys.map(key => data[key] = memoryStoreMap[key])
  return data
})
