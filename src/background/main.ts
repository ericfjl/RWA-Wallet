import { isInternalEndpoint } from 'webext-bridge'
import { onMessage, sendMessage } from 'webext-bridge/background'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener(({ reason }): void => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL)
    // while install trigger open the options page to route to onboarding page
    browser.runtime.openOptionsPage()
    // chrome.tabs.create({
    //   url: 'onboarding.html'
    // })
    // chrome.runtime.setUninstallURL('https://example.com/extension-survey');
})

let memoryStoreMap = {
  password: '',
  mnemonicStr: 'truth similar disagree slot lecture quiz hundred season energy fix alarm spring',
  tabId: '',
  action: '',
  params: '',
  opts: '',
}

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  memoryStoreMap.tabId = tabId
})

onMessage('getTabId', () => {
  return memoryStoreMap.tabId
})
onMessage('actionResolve', async (msg) => {
  const { tabId } = msg.data
  console.log('====> tabId :', tabId)
  await sendMessage(`actionResolve@${tabId}`, msg.data, `options@${tabId}`)
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

  try {
    const existPopup = await reFocusUnProcessPopup()
    if (existPopup) {
      await browser.windows.update(memoryStoreMap.popupId, { focused: true })
      return existPopup
    }

    const { action, params, opts } = msg.data
    memoryStoreMap.action = action
    memoryStoreMap.params = params
    memoryStoreMap.opts = opts

    await sendMessage(`actionResolve@${opts.tabId}`, msg.data, `options@${opts.tabId}`)

    const { top, left, width, height } = opts
    const newWindow = await browser.windows.create({
      url: './dist/options/index.html#/options/tx/preview',
      type: 'popup',
      width,
      height,
      left,
      top,
    })

    return newWindow
  }
  catch (e) {
    console.log('====> e :', e)
  }
})
