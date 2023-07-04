<script setup lang="ts">
import "../styles";

import { sendMessage } from "webext-bridge/content-script";

const isShow = $ref(false);

let tabId = $(inject("tabId"));
onMounted(async () => {
  tabId = await sendMessage("getTabId", {}, "background");
  // console.log('====> content-script onMounted get tabId :', tabId)
});
</script>

<template>
  <div flex>
    <button class="bg-white rounded-full py-3 px-6" @click="isShow = true">RWA NFT</button>
    test2
    <BsDialogDefault :show="isShow" @close="isShow = false">
      <div bg-white>hello</div>
    </BsDialogDefault>
  </div>
</template>
