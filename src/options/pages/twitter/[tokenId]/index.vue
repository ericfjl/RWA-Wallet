<script setup lang="ts">
const nextView = $ref(null);
const scrollToNextView = () => {
  nextView.scrollIntoView({ behavior: "smooth" });
};

const route = useRoute();
const tokenId = $computed(() => route.params.tokenId);
const { getNftInfo } = $(nftStore());
onMounted(async () => {
  await getNftInfo(tokenId);
});
</script>

<template>
  <main>
    <!-- <TwitterHero :learnMoreAction="scrollToNextView" /> -->
    <div ref="nextView">
      <TwitterStatusPrice />
    </div>

    <!-- <TwitterListBook /> -->
    <!-- <TwitterListPhoto /> -->
    <TwitterListBlog />
    <TwitterFooter />
  </main>
</template>

<route lang="yaml">
meta:
  layout: landing
</route>
