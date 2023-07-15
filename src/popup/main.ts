import { createApp } from 'vue'
import { onMessage, sendMessage } from 'webext-bridge/popup'

import App from './App.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'

const app = createApp(App)
setupApp(app, { sendMessage, onMessage })
app.mount('#app')
