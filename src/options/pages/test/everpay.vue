<script setup lang="ts">
import Everpay from "everpay";
import { getTokenTagByEver } from "arseeding-js";
const account = $(inject("account"));

let info: EverpayInfo = $ref(null);
let balance = $ref("");
const debug = true;
onMounted(async () => {
  const everpay = new Everpay({
    debug,
    account: account.address,
    ethConnectedSigner: getWalletClient(account),
  });
  info = await everpay.info();
  console.log("====> info :", info);
  let tag = await getTokenTagByEver("usdc", debug);
  tag = tag[0];

  console.log("====> tag :", tag);
  balance = await everpay.balance({ tag });
});
</script>
<template>
  <main bg-white>
    <div>balance: {{ balance }}</div>
  </main>
</template>
