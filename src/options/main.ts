/* eslint-disable unicorn/prefer-node-protocol */
import '../styles'
import { onMessage, sendMessage } from 'webext-bridge/options'
import { createApp } from 'vue'

import App from './App.vue'
import { setupApp } from '~/logic/common-setup'

const app = createApp(App)
setupApp(app, { sendMessage, onMessage })
app.mount('#app')
