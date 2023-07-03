<script setup lang="ts">
import { onMessage, sendMessage } from 'webext-bridge/content-script'
import { createBgAction } from '~/logic/callBackground'

const image = $ref('ipfs://bafybeidhf5bw7xx3pq3pxzcgazxy7qdf5a2zlumqubg6vpdehxekyr3jwq')
const name = $ref('My First RWA NFT')
const description = $ref('What a good NFT!')
const tokenType = 'Web3NFT.Social'
const inviteCommission = $ref(1)
const distributor = $ref('rwa-wallet')
let isLoading = $ref(false)
const category = $ref('Uncategory')
const categoryList = $ref([
  'Uncategory',
  'Productivity',
  'Fiction',
  'Visual Design',
  'Style',
  'Space',
  'Technology',
  'Programming',
  'Money',
  'Makers',
  'Cryptocurrency',
  'Art',
])

const tags = $ref('Web3, RWA, NFT')
const basicPrice = $ref(100) // $BST
const maxSupply = $ref(10000)
const error = $ref('')

const tabId = $(inject('tabId'))

const internalCall = createBgAction(sendMessage, onMessage)
const doSubmit = async () => {
  isLoading = true
  const params = {
    image,
    name,
    description,
    category,
    tags,
    tokenType,
    distributor,
    basicPrice,
    maxSupply,
    inviteCommission,
  }
  const opts = {
    tabId,
  }
  try {
    const rz = await internalCall('createRwaNft', params, opts)
    console.log('====> rz :', rz)
  }
  catch (e) {
    console.log('====> createRwaNft error :', e)
  }
  isLoading = false
}
</script>

<template>
  <div main max-w-2xl text-white text-sm bg-black>
    <div class="space-y-12">
      <div class="border-b border-white/10 pb-12">
        <h2 class="font-semibold text-base  leading-7">
          New Book RWA NFT
        </h2>
        <p class="mt-1  text-gray-400 leading-6">
          This information will be publish in the RWA NFT
        </p>

        <div class="mt-10 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="name" class="font-medium   leading-6 block">NFT Name</label>
            <div class="mt-2">
              <div class="rounded-md flex bg-white/5 ring-inset ring-1 ring-white/10 focus-within:ring-inset focus-within:ring-2 focus-within:ring-indigo-500">
                <input id="name" v-model="name" type="text" name="name" autocomplete="name" class="bg-transparent border-0 flex-1  py-1.5 pl-1 placeholder:text-slate-600 sm: sm:leading-6 focus:ring-0 " placeholder="Your Cool NFT Name">
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label for="cover-photo" class="font-medium   leading-6 block">NFT collection Cover Image</label>
            <BsBoxBanner v-model="image" title="Cover Photo" class="mt-2" />
          </div>

          <div class="col-span-full">
            <label for="about" class="font-medium   leading-6 block">NFT Description</label>
            <div class="mt-2">
              <textarea id="about" v-model="description" name="about" rows="3" class="rounded-md bg-white/5 border-0 shadow-sm ring-inset  w-full py-1.5 ring-1 ring-white/10 block sm: sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-500 " />
            </div>
            <p class="mt-3  text-gray-400 leading-6">
              Write a few sentences about this NFT.
            </p>
          </div>

          <div class="col-span-full">
            <label for="category" class="font-medium   mb-2 leading-6 block">Category</label>
            <div class="mt-2">
              <BsFormSelect id="category" v-model="category" is-dark :list="categoryList" min-w-60 :has-add-new="true" />
            </div>
          </div>

          <div class="col-span-full">
            <label for="tags" class="font-medium   leading-6 block">Tags</label>
            <div mt-2>
              <input id="tags" v-model="tags" type="text" name="tags" autocomplete="tags" class="rounded-md flex bg-white/5 ring-inset w-full ring-1 ring-white/10 placeholder:text-slate-600 focus-within:ring-inset focus-within:ring-2 focus-within:ring-indigo-500" placeholder="Seperated by comma">
            </div>
          </div>

          <div class="col-span-full">
            <label for="basicPrice" class="font-medium   leading-6 block">Invest share basic price</label>
            <div class="rounded-md flex shadow-sm mt-2">
              <input id="basicPrice" v-model="basicPrice" type="text" name="basicPrice" autocomplete="basicPrice" class="rounded-none rounded-l-md flex-grow bg-white/5 border-0 ring-inset  w-full min-w-0 py-1.5 px-2 ring-1 ring-gray-300 block placeholder:text-slate-600 sm: sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-sky-500 ">
              <span class="border rounded-r-md border-l-0 border-gray-300 px-3 text-gray-500 inline-flex items-center ">$BST</span>
            </div>
          </div>

          <div class="col-span-full">
            <label for="maxSupply" class="font-medium   leading-6 block">Invest share max supply</label>
            <div class="rounded-md flex shadow-sm mt-2">
              <input id="maxSupply" v-model="maxSupply" type="text" name="maxSupply" autocomplete="maxSupply" class="rounded-md bg-white/5 border-0 shadow-sm ring-inset mt-2  w-full py-1.5 px-2 ring-1 ring-slate-300 block placeholder:text-slate-600 sm: sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-700 " placeholder="">
            </div>
          </div>
        </div>
      </div>

      <div class="border-b border-white/10 pb-12">
        <div mt-5 flex justify="between">
          <span font-bold>
            Total Valuation
          </span>
          <span>
            {{ maxSupply * basicPrice }} $BST
          </span>
        </div>
        <div mt-5 text-right text-gray-5 leading-5>
          10% of the sales revenue will be shared with these <br> share investors according to the corresponding proportion
        </div>
      </div>
    </div>

    <BsAlertError v-if="error" my-5>
      {{ error.message }}
    </BsAlertError>
    <div class="flex mt-6 gap-x-6 items-center justify-end">
      <button type="button" class="font-semibold  leading-6" @click="$router.go(-1)">
        Cancel
      </button>
      <BsBtnIndigo :is-loading="isLoading" @click="doSubmit">
        Save
      </BsBtnIndigo>
    </div>
  </div>
</template>
