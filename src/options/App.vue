<script setup lang="ts">
import { sendMessage } from 'webext-bridge/options'

const tabId = inject('tabId')
onMounted(async () => {
  tabId.value = await sendMessage('getTabId', {}, 'background')
})
</script>

<template>
  <RouterView />
</template>
