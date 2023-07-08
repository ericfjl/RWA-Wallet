<script setup lang="ts">
const nextView = $ref();
const scrollToNextView = () => {
  nextView.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <main>
    <LandingHero :learnMoreAction="scrollToNextView" />
    <div ref="nextView">
      <LandingStatusPrice />
    </div>

    <!-- <LandingListBook /> -->
    <LandingListPhoto />
    <LandingFooter />
  </main>
</template>

<route lang="yaml">
meta:
  layout: landing
</route>
