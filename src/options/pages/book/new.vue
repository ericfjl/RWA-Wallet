<script setup lang="ts">

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
              <span class="font-semibold text-white">New</span>
            </h1>
          </div>
          <p class="mt-2 text-xs text-gray-400 leading-6">
            Create new book NFT via our RWA Protocol
          </p>
        </div>
      </div>
    </header>

    <BookNew />
  </main>
</template>
