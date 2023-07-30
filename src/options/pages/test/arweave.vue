<script setup lang="ts">
import { genNodeAPI, getTokenTagByEver } from "arseeding-js";
const tabId = $(inject("tabId"));
const account = $(inject("account"));

onMounted(async () => {
  const instance = await genNodeAPI(account.privateKeyRaw);
  const arseedUrl = "https://arseed.web3infra.dev";
  const data = Buffer.from("need upload data ...");
  const options = {
    tags: [
      { name: "Content-Type", value: "data type" },
      { name: "aa", value: "aaa" },
    ],
  };
  const tokenTags = await getTokenTagByEver("bnb");
  try {
    // const resp = await instance.sendAndPay(arseedUrl, data, tokenTags[0], options);
    // console.log("====> resp :", resp);
    console.log("====> tokenTags :", tokenTags);
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
