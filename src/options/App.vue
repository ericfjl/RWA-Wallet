<script setup lang="ts">
import { sendMessage } from "webext-bridge/options";
import { useEventListener } from '@vueuse/core'

const router = useRouter();

useEventListener(document, 'visibilitychange', async (evt) => {
  const { openOptionToUrl } = await sendMessage("getStoreInMemory", { keys: ["openOptionToUrl"] }, "background");
  if (openOptionToUrl) {
    await sendMessage("storeInMemory", { openOptionToUrl: "" }, "background");
    router.replace(openOptionToUrl);
  }
})

</script>

<template>
  <RouterView />
</template>
