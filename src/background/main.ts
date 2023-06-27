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
  popupId: '',
}

const reFocusUnProcessPopup = async () => {
  if (!memoryStoreMap.popupId)
    return null

  const windows = await browser.windows.getAll()
  return windows
    ? windows.find((win) => {
      return win && win.type === 'popup' && win.id === memoryStoreMap.popupId
    })
    : null
}

onMessage('internalCall', async (msg) => {
  if (!isInternalEndpoint(msg.sender))
    return false

  const existPopup = await reFocusUnProcessPopup()
  if (existPopup)
    return browser.windows.update(memoryStoreMap.popupId, { focused: true })

  const { action, params, opts } = msg.data
  console.log('====> msg.data :', msg.data)
  const { top, left, width, height } = opts
  const newWindow = await browser.windows.create({
    url: './dist/options/index.html#/options/tx/preview',
    type: 'popup',
    width,
    height,
    left,
    top,
  })

  memoryStoreMap.popupId = newWindow.id
  return newWindow
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
