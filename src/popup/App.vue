<script setup lang="ts">
import { sendMessage } from "webext-bridge/popup";

async function openOptionsPage(openOptionToUrl = "") {
  if (openOptionToUrl) {
    await sendMessage("storeInMemory", { openOptionToUrl }, "background");
  }

  browser.runtime.openOptionsPage();
}
</script>

<template>
  <main class="text-center py-5 px-4 text-gray-700 w-[300px]">
    <div>BS RWA Wallet</div>

    <button class="mt-2 btn" @click="openOptionsPage('')">Open Dashboard</button>
    <br />
  </main>
</template>
