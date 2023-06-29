<script setup lang="ts">
import { storageDemo } from '~/logic/storage'

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}

const testWindow = async () => {
  const { screenX, screenY, outerWidth } = window
  console.log('====> window :', screenX, screenY, outerWidth)
}
</script>

<template>
  <main class="text-center py-5 px-4 text-gray-700 w-[300px]">
    <Logo />
    <div>Popup</div>
    <SharedSubtitle />

    <button class="mt-2 btn" @click="openOptionsPage">
      Open Options
    </button>
    <button class="mt-2 btn" @click="testWindow">
      test window
    </button>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div>
  </main>
</template>
