<script setup lang="ts">
import { genNodeAPI, getTokenTagByEver } from "arseeding-js";
const tabId = $(inject("tabId"));
const account = $(inject("account"));

onMounted(async () => {
  const instance = await genNodeAPI(account.privateKeyRaw);
  const arseedUrl = "https://arseed.web3infra.dev";
  const data = Buffer.from("need upload data ...");
  const payTags = await getTokenTagByEver("USDC"); // USDC,ETH,...
  const payCurrencyTag = payTags[0]; // everPay 支持的 token tag (chainType-symbol-id)
  const options = {
    tags: [
      { name: "Content-Type", value: "data type" },
      { name: "aa", value: "aaa" },
    ],
  };
  try {
    const resp = await instance.sendAndPay(arseedUrl, data, payCurrencyTag, options);
    console.log("====> resp :", resp);
  } catch (error) {
    console.log("====> error :", error);
  }
});
</script>
<template>
  <main bg-white>
    {{ tabId }}
    <br />
    {{ account }}
  </main>
</template>
