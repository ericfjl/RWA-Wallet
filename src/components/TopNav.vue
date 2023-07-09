<script setup lang="ts">
const route = useRoute();
const path = $computed(() => route.path);
const categoryKey = $computed(() => path.split("/")[2]);

const categoryMap = {
  twitter: {
    name: "NFTFi Twitter",
  },
};
const category = $computed(() => categoryMap[categoryKey] || {});
const newTokenLink = $computed(() => `/options/${categoryKey}/new`);

const items = $computed(() => {
  return [
    {
      name: "New",
      href: `/options/${categoryKey}/new`,
      current: path === `/options/${categoryKey}/new`,
      hidden: true,
      desc: "Create new NFT that connect with your twitter",
    },
    { name: "Overview", href: `/options/${categoryKey}`, current: path === `/options/${categoryKey}`, desc: "Financialize your twitter via Web3" },
    { name: "Topics", href: "#", current: false },
    { name: "Trending", href: "#", current: false },
    { name: "Top", href: "#", current: false },
    { name: "Events", href: "#", current: false },
    { name: "Settings", href: "#", current: false },
  ];
});

const showInNavItems = $computed(() => items.filter((item) => !item.hidden));
const currentItem = $computed(() => find(items, (item) => item.current));
const overviewItem = $computed(() => find(items, (item) => item.name === "Overview"));
const isOverview = $computed(() => currentItem.name === overviewItem.name);

const stats = [
  { name: "Number of Twitter RWA NFT", value: "5032" },
  { name: "Average RWA NFT Sale Price", value: "345", unit: "$BST" },
  { name: "Total OTP-SBT Sale", value: "50B", unit: "$BST" },
  { name: "Total Market Cap", value: "123B", unit: "$BST" },
];
</script>

<template>
  <header>
    <nav class="border-b flex border-white/10 h-18 py-4 overflow-x-auto">
      <ul role="list" class="flex flex-none font-semibold text-sm px-4 text-gray-400 leading-6 gap-x-6 items-center sm:px-6 lg:px-8">
        <li v-for="item in showInNavItems" :key="item.name">
          <router-link :to="item.href" :class="item.current ? 'text-indigo-400' : ''">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
      <div flex-1 space-x-2 flex justify="end" pr-8>
        <router-link v-if="path !== newTokenLink" :to="newTokenLink" class="rounded-md font-semibold bg-indigo-600 shadow-sm text-sm text-white py-2 px-3 inline-flex items-center hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          New {{ category.name }}
        </router-link>
      </div>
    </nav>

    <div class="flex flex-col bg-gray-700/10 py-4 px-4 gap-x-8 gap-y-4 items-start justify-between sm:flex-row sm:px-6 sm:items-center lg:px-8">
      <div>
        <div class="flex gap-x-3 items-center">
          <div class="rounded-full flex-none bg-green-400/10 p-1 text-green-400">
            <div class="bg-current rounded-full h-2 w-2" />
          </div>
          <h1 class="flex text-base leading-7 gap-x-3">
            <router-link :to="overviewItem.href" class="font-semibold text-white">{{ category.name }}</router-link>
            <span class="text-gray-600">/</span>
            <span class="font-semibold text-white">{{ currentItem.name }}</span>
          </h1>
        </div>
        <p class="mt-2 text-xs text-gray-400 leading-6">{{ category.desc }}</p>
      </div>
      <!-- <div class="rounded-full flex-none order-first font-medium bg-indigo-400/10 ring-inset text-xs py-1 px-2 ring-1 ring-indigo-400/30 text-indigo-400 sm:order-none">
          Beta
        </div> -->
    </div>
    <div class="bg-gray-700/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" v-show="isOverview">
      <div v-for="(stat, statIdx) in stats" :key="stat.name" class="border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8" :class="[statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '']">
        <p class="font-medium text-sm text-gray-400 leading-6">
          {{ stat.name }}
        </p>
        <p class="flex mt-2 gap-x-2 items-baseline">
          <span class="font-semibold text-white tracking-tight text-4xl">{{ stat.value }}</span>
          <span v-if="stat.unit" class="text-sm text-gray-400">{{ stat.unit }}</span>
        </p>
      </div>
    </div>
  </header>
</template>
