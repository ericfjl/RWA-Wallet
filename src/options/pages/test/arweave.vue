<script setup lang="ts">
import { genNodeAPI, getTokenTagByEver, getItemMeta, getBundleFee } from "arseeding-js/esm/index";
const tabId = $(inject("tabId"));
const account = $(inject("account"));

onMounted(async () => {
  const instance = await genNodeAPI(account.privateKeyRaw);
  const arseedUrl = "https://arseed.web3infra.dev";
  const data = Buffer.from("need upload data ...");
  const options = {
    tags: [
      { name: "Content-Type", value: "text/plain" }, // https://web3infra.dev/zh-cn/docs/arseeding/other/tags/#content-type
      // tags: https://web3infra.dev/zh-cn/docs/arseeding/other/tags/
      { name: "aa", value: "aaa" },
    ],
  };
  const tokenTags = await getTokenTagByEver("bnb");
  try {
    // const resp = await instance.sendAndPay(arseedUrl, data, tokenTags[0], options);
    // console.log("====> resp :", resp);

    const itemId = "UVCohHv0wDkmE7V2CgxHkiHwtRHJONb1MCIuS0jvTfg";
    const itemMeta = await getItemMeta(arseedUrl, itemId);
    console.log("====> itemMeta :", itemMeta);

    const size = 1024;
    const currency = "bnb";
    const res = await getBundleFee(arseedUrl, size, currency);
    console.log(res);
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
