<script setup lang="ts">
import { WebBundlr } from "@bundlr-network/client";

const account = $(inject("account"));
const doUpload = async () => {
  const client = getWalletClient(account);
  client.getSigner = () => client;
  client.getAddress = async () => client.getAddresses().then((a) => a[0]);

  const bundlr = new WebBundlr("https://devnet.bundlr.network", "matic", client, {
    providerUrl: "https://polygon-mumbai.g.alchemy.com/v2/LwtsIVO7HQgliuatrjYmnqs0gVp5uxrl",
  });
  await bundlr.ready();
  console.log("====> bundlr.address :", bundlr.address);
  // await bundlr.upload("GM world");
};
</script>
<template>
  <div>
    <BsBtnIndigo @click="doUpload">Upload</BsBtnIndigo>
  </div>
</template>
