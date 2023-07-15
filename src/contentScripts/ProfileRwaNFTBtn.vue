<script setup lang="ts">
import "../styles";
import { sendMessage } from "webext-bridge/content-script";

let tabId = $(inject("tabId"));
onMounted(async () => {
  tabId = await sendMessage("getTabId", {}, "background");
  // console.log('====> content-script onMounted get tabId :', tabId)
});

const openProfileTwitterLinkInExt = async () => {
  const url = `/options/twitter/29`
  await sendMessage('openOption', { url }, 'background')
}
</script>

<template>
  <div flex>
    <button class="bg-white rounded-full mr-3 mb-3 py-2 px-6" @click="openProfileTwitterLinkInExt">RWA NFT</button>
  </div>
</template>
