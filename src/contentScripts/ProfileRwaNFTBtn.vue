<script setup lang="ts">
import "../styles";
import { sendMessage } from "webext-bridge/content-script";

let tabId = $(inject("tabId"));
let profileId = $(inject("profileId"));
onMounted(async () => {
  tabId = await sendMessage("getTabId", {}, "background");
  // console.log('====> content-script onMounted get tabId :', tabId)
});

const openProfileTwitterLinkInExt = async () => {
  const url = `/options/${profileId}`
  await sendMessage('openOption', { url }, 'background')
}
</script>

<template>
  <div flex h-12>
    <button class="bg-white rounded-full h-9 mr-3 py-2 px-3" @click="openProfileTwitterLinkInExt">RWA NFT</button>
  </div>
</template>
