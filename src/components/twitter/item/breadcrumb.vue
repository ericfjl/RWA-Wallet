<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/20/solid";


const route = useRoute();
const tokenId = $computed(() => route.params.tokenId);

const { nftName } = $(nftStore())

const pages = $computed(() => {
  return [
    { name: "Twitter NFT", to: '/options/twitter/', current: false },
    { name: nftName, to: `/options/twitter/${tokenId}`, current: true },
  ];
})
</script>


<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex space-x-4 items-center">
      <li>
        <div>
          <router-link to="/options" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </router-link>
        </div>
      </li>
      <li v-for="page in pages" :key="page.name">
        <div class="flex items-center">
          <svg class="flex-shrink-0 h-5 text-gray-300 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
          </svg>
          <router-link :to="page.to" class="font-medium text-sm ml-4 text-gray-500 hover:text-gray-700" :aria-current="page.current ? 'page' : undefined">{{
            page.name
          }}</router-link>
        </div>
      </li>
    </ol>
  </nav>
</template>

