<script setup lang="ts">
const route = useRoute()
const tokenId = $computed(() => route.params.tokenId)
const slug = $computed(() => route.params.itemSlug)
const itemId = $computed(() => {
  return slug.split('-')[0]
})

const account = $(inject('account'))
let isLoading = $ref(true)

let { update, item } = $(itemStore())
const { getNftInfo } = $(nftStore());

onMounted(async () => {
  isLoading = true
  const itemURIArr = await readContract(
    { account, contractName: "RWAProtocol", functionName: 'getItems' },
    tokenId,
    itemId,
    1,
    ''
  );
  const cid = itemURIArr[0]
  item = await parseURIData(cid)
  isLoading = false;
  update({ tokenId, itemId, cid, })
  await getNftInfo(tokenId);

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
