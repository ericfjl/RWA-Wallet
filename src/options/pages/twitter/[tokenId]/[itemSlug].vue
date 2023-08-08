<script setup lang="ts">
import { sendMessage } from "webext-bridge/options";

const route = useRoute()
const tokenId = $computed(() => route.params.tokenId)
const slug = $computed(() => route.params.itemSlug)
const itemId = $computed(() => {
  return slug.split('-')[0]
})


let account = $ref('')
let isLoading = $ref(true)

let { item, update } = $(itemStore())

onMounted(async () => {
  const { mnemonicStr } = await sendMessage("getStoreInMemory", { keys: ["mnemonicStr"] }, "background");
  account = getAccount(mnemonicStr);
  const itemURIArr = await readContract(
    { account, contractName: "RWAProtocol", functionName: 'getItems' },
    tokenId,
    itemId,
    1,
    ''
  );
  item = await parseURIData(itemURIArr[0])
  isLoading = false;
  update({ tokenId })
});
</script>
<template>
  <div bg-white>
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
      <TwitterItemBreadcrumb py-10 />
      <TwitterItemImgs />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: landing
</route>
