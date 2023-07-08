<script setup lang="ts"></script>
<template>
  <div bg-white>
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
      <LandingItemBreadcrumb py-10 />
      <LandingItemImgs />
      <LandingItemText />
      <LandingFooter />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: landing
</route>
