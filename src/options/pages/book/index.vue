<script setup>

const stats = [
  { name: 'Number of books RWA NFT', value: '405' },
  { name: 'Average books RWA NFT sale Price', value: '100', unit: '$BST' },
  { name: 'Total OTP-SBT Sale', value: '50B', unit: '$BST' },
  { name: 'Total Market Cap', value: '123B', unit: '$BST' },
]
</script>

<template>
  <main>
    <header>
      <BookTopNav />

      <!-- Heading -->
      <div class="flex flex-col bg-gray-700/10 py-4 px-4 gap-x-8 gap-y-4 items-start justify-between sm:flex-row sm:px-6 sm:items-center lg:px-8">
        <div>
          <div class="flex gap-x-3 items-center">
            <div class="rounded-full flex-none bg-green-400/10 p-1 text-green-400">
              <div class="bg-current rounded-full h-2 w-2" />
            </div>
            <h1 class="flex text-base leading-7 gap-x-3">
              <span class="font-semibold text-white">Book</span>
              <span class="text-gray-600">/</span>
              <span class="font-semibold text-white">Overview</span>
            </h1>
          </div>
          <p class="mt-2 text-xs text-gray-400 leading-6">
            The book which publish via our RWA Protocol
          </p>
        </div>
        <!-- <div class="rounded-full flex-none order-first font-medium bg-indigo-400/10 ring-inset text-xs py-1 px-2 ring-1 ring-indigo-400/30 text-indigo-400 sm:order-none">
          Production
        </div> -->
      </div>

      <!-- Stats -->
      <div class="bg-gray-700/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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

    <BookList />
  </main>
</template>
