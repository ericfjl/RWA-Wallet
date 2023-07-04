import * as options from "webext-bridge/options";
import * as contentScript from "webext-bridge/content-script";
import * as popup from "webext-bridge/popup";

const contextMap = {
  options,
  popup,
  'content-script': contentScript,
}
export const createBgAction = (context) => {
  return async (action: string, params = {}, opts = {}) => {
    let left = 0
    let top = 0
    let newWindow = ''
    const width = 800
    const height = 800
    const { screenX, screenY, outerWidth } = window
    top = Math.max(screenY, 0)
    left = Math.max(screenX + (outerWidth - width), 0)
    const { tabId } = opts
    let returnedPromise = new Promise((resolve, reject) => {
      console.log('====> contextMap[context] :', contextMap[context])
      contextMap[context].onMessage(`actionResolve@${tabId}`, msg => {
        console.log('====> actionResolve msg :', msg)
        resolve(msg.data)
        return true
      })
      contextMap[context].onMessage(`actionReject@${tabId}`, msg => {
        console.log(`actionReject@${tabId}`, msg)
        reject(msg.data.err)
        return true
      })
    })

    try {
      opts = {
        top,
        left,
        width,
        height,
        context,
        ...opts,
      }
    
      newWindow = await contextMap[context].sendMessage('internalCall', { action, params, opts }, 'background')
    }
    catch (e) {
      console.log('====> e :', e)
    }

    return returnedPromise
  }
}
