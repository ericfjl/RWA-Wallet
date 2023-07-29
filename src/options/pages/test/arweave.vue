<script setup lang="ts">
import { genNodeAPI } from "arseeding-js";
const tabId = $(inject("tabId"));
const account = $(inject("account"));

onMounted(async () => {
  const instance = await genNodeAPI(account.privateKeyRaw);
  console.log("====> instance :", instance);
});
</script>
<template>
  <main bg-white>
    {{ tabId }}
    <br />
    {{ account }}
  </main>
</template>
