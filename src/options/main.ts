/* eslint-disable unicorn/prefer-node-protocol */
import '../styles'

import { Buffer } from 'buffer'
import { sendMessage } from 'webext-bridge/options'

import { createApp } from 'vue'

import App from './App.vue'
import { setupApp } from '~/logic/common-setup'

window.Buffer = Buffer

const app = createApp(App)
setupApp(app, { sendMessage })
app.mount('#app')
