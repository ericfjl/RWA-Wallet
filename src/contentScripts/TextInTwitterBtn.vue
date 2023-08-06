<script setup lang="ts">
import "../styles";
import { sendMessage } from "webext-bridge/content-script";

let tabId = $(inject("tabId"));
onMounted(async () => {
  tabId = await sendMessage("getTabId", {}, "background");
  // console.log('====> content-script onMounted get tabId :', tabId)
});

let nftItemPath = $(inject("nftItemPath"));

const openLink = async () => {
  const url = `/options/${nftItemPath}`
  await sendMessage('openOption', { url }, 'background')
}
</script>

<template>
  <div p-10 flex flex-col justify="center" items-center border-dashed border rounded-md my-10 bg-gray-5>
    <div flex justify="center" items-center mt-10>
      <BsBtnBlack @click="openLink"> Mint 1 NFT Pass </BsBtnBlack>
      <div mx-5 font-bold>Or</div>
      <BsBtnBlack @click="openLink"> Mint 1 OTP-SBT </BsBtnBlack>
    </div>
    <div mt-5 text-white>to Unlock the RWA content</div>
  </div>
</template>
