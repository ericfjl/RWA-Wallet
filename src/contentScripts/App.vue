<script setup lang="ts">
import '../styles'

import { sendMessage } from 'webext-bridge/content-script'

let showContent = $ref(false)
let showWrite = $ref(true)
const doClose = () => {
  showContent = false
  showWrite = false
}

let tabId = $(inject('tabId'))
onMounted(async () => {
  tabId = await sendMessage('getTabId', {}, 'background')
  // console.log('====> content-script onMounted get tabId :', tabId)
})
</script>

<template>
  <div class="flex font-sans top-0 right-0 leading-1em z-999 fixed items-end select-none">
    <div v-show="showContent || showWrite" class="bg-black rounded-lg h-min shadow w-max text-gray-800 relative" p="x-4 y-2" m="y-auto r-2" transition="opacity duration-300">
      <button type="button" class="rounded-full bg-indigo-600 shadow-sm text-white p-2 -left-10 absolute hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " @click="doClose">
        <ic-round-close class="h-5 w-5" aria-hidden="true" />
      </button>
      <ContentMain v-show="showContent" />
      <FormMain v-show="showWrite" />
    </div>

    <div v-show="!showContent && !showWrite">
      <button class="border-none rounded-full cursor-pointer flex h-10 shadow mb-2 w-10" bg="indigo-600 hover:indigo-700" @click="showContent = true">
        <ic-outline-format-list-bulleted class="m-auto text-white text-lg block" />
      </button>
      <button class="border-none rounded-full cursor-pointer flex h-10 shadow w-10" bg="green-600 hover:green-700" @click="showWrite = true">
        <material-symbols-edit-square class="m-auto text-white text-lg block" />
      </button>
    </div>
  </div>
</template>
