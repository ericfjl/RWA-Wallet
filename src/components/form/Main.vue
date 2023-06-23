<script setup lang="ts">
const tabs = $ref([
  'New Content',
  'New NFT',
])

const currentTab = $ref(tabs[1])
</script>

<template>
  <div w-120 flex>
    <div class="w-full">
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px" aria-label="Tabs">
          <button v-for="tab in tabs" :key="tab" class="font-medium border-b-2 text-center text-sm py-4 px-1 w-1/2" :class="[currentTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']" :aria-current="currentTab === tab ? 'page' : undefined" @click="currentTab = tab">
            {{ tab }}
          </button>
        </nav>
      </div>
      <div p-5 max-h-screen overflow-y-scroll pb-25>
        <FormContent v-show="currentTab === 'New Content'" />
        <FormNFT v-show="currentTab === 'New NFT'" />
      </div>
    </div>
  </div>
</template>
