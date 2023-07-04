<script setup lang="ts">
function openOptionsPage() {
  browser.runtime.openOptionsPage();
}
</script>

<template>
  <main class="text-center py-5 px-4 text-gray-700 w-[300px]">
    <div>BS RWA Wallet</div>

    <button class="mt-2 btn" @click="openOptionsPage">Open Dashboard</button>
  </main>
</template>
