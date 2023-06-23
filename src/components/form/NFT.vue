<script setup lang="ts">
import { formatEther, formatUnits } from 'viem'
import { sendMessage } from 'webext-bridge/content-script'

const addTokenCost = $ref('0.001')
const bstBalance = $ref('1000')
const payTokenAddress = $ref('')
const payTokenList = $ref([])

const error = $ref('')
const name = $ref('')
let description = $ref('')
description = ''
const image = $ref('')
const tokenType = 'Web3NFT.Social' // only this type be display on Web3NFT.Social
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
const tags = $ref('')
const basicPrice = $ref(100) // $BST
const maxSupply = $ref(10000)
const inviteCommission = $ref(1)

const distributor = $ref('')

const isLoading = $ref(false)

const canSubmit = $computed(() => {
  if (
    name === ''
    || description === ''
    || image === ''
    || category === ''
  )
    return false

  if (bstBalance < addTokenCost)
    return false

  return true
})

const internalCall = async (action: string, params = {}, opts = {}, dest = 'background') => {
  let left = 0
  let top = 0
  const width = 400
  const height = 620
  const { screenX, screenY, outerWidth } = window
  top = Math.max(screenY, 0)
  left = Math.max(screenX + (outerWidth - width), 0)

  opts = {
    top,
    left,
    width,
    height,
    ...opts,
  }
  const rz = await sendMessage('internalCall', { action, params, opts }, dest)
  return rz
}

const doSubmit = async () => {
  try {
    const params = {}
    const opts = {}
    await internalCall('createRwaNft', params, opts)
  }
  catch (e) {
    console.log('====> e :', e)
  }

  // console.log('====> browser.action :', browser.action)
  // if (isLoading)
  //   return
  // isLoading = true

  // try {
  //   // opt1: JSON-RPC window.ethereum
  //   // const [address] = await window.ethereum.request({
  //   //   method: 'eth_requestAccounts',
  //   // })
  //   // const account = address
  //   // opt2: private key account
  //   // import { privateKeyToAccount } from 'viem/accounts'
  //   // const account = privateKeyToAccount(
  //   //   '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  //   // )
  //   // opt3: Mnemonic Account
  //   // import { mnemonicToAccount } from 'viem/accounts'
  //   // const account = mnemonicToAccount(
  //   //   'legal winner thank year wave sausage worth useful legal winner thank yellow'
  //   // )
  //   const account = ''

  //   await createRwaNft({
  //     image,
  //     name,
  //     description,
  //     category,
  //     tags,
  //     tokenType,
  //     distributor,
  //     basicPrice,
  //     maxSupply,
  //     inviteCommission,
  //     payTokenAddress,
  //   }, {
  //     nftStorageToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIxMmZkRTRBOEFhY0RCZWE3RWFkRGNFMGU1NkI0NTFDQzdlNTM2QjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzM4MTgzMDU2MywibmFtZSI6Ik5UQiJ9.Yj9ie65LXh6t6QECtGzKViX-AeTiAHnVoYybY3qfqNk',
  //     walletClient,
  //     publicClient,
  //   })
  // }
  // catch (err) {
  //   error = err
  // }
  // isLoading = false
}
</script>

<template>
  <div class="flex flex-col mx-auto flex-1 py-8 pb-20">
    <div class="flex-1 text-base text-gray-700 leading-7">
      <input v-model="name" class="border-b font-bold border-gray-200 mt-6 tracking-tight w-full p-4 pl-0 text-3xl text-gray-900 sm:text-4xl focus:outline-none" placeholder="Your NFT name">
      <div mt-5>
        <div class="rounded-md border-gray-300 border-1  p-4 pb-2 block">
          <resize-textarea id="description" v-model="description" w-full placeholder="Write some description" :rows="2" :cols="4" />
        </div>
      </div>
      <div class="mt-5 pb-10 ">
        <div flex-1 pr-5>
          <div>
            <label for="category" class="font-medium text-sm mb-2 text-gray-900 leading-6 block">Category</label>
            <BsFormSelect id="category" v-model="category" :list="categoryList" min-w-60 :has-add-new="true" />
          </div>
          <div mt-5>
            <label for="tags" class="font-medium text-sm text-slate-900 leading-6 block">Tags</label>
            <input id="tags" v-model="tags" type="text" name="tags" autocomplete="tags" class="rounded-md border-0 shadow-sm ring-inset mt-2 w-full py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-700" placeholder="Seperated by comma">
          </div>
          <div mt-5>
            <label for="basicPrice" class="font-medium text-sm text-slate-900 leading-6 block">Invest share basic price</label>
            <div class="rounded-md flex shadow-sm mt-2">
              <input id="basicPrice" v-model="basicPrice" type="text" name="basicPrice" autocomplete="basicPrice" class="rounded-none rounded-l-md flex-grow border-0 ring-inset w-full min-w-0 py-1.5 px-2 ring-1 ring-gray-300 text-gray-900 block placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-sky-500">
              <span class="border rounded-r-md border-l-0 border-gray-300 px-3 text-gray-500 inline-flex items-center sm:text-sm">$BST</span>
            </div>
          </div>
          <div mt-5>
            <label for="maxSupply" class="font-medium text-sm text-slate-900 leading-6 block">Invest share max supply</label>
            <input id="maxSupply" v-model="maxSupply" type="text" name="maxSupply" autocomplete="maxSupply" class="rounded-md border-0 shadow-sm ring-inset mt-2 w-full py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-700">
          </div>
          <div mt-5 flex justify="between">
            <span font-bold>
              Total Valuation
            </span>
            <span>
              {{ maxSupply * basicPrice }} $BST
            </span>
          </div>
          <div mt-5 text-right text-gray-5 leading-5>
            10% of the sales revenue will be shared with these share investors according to the corresponding proportion
          </div>
        </div>
        <div class="mt-5 w-full aspect-2/3 sm:(w-1/2 mt-0 aspect-auto) ">
          <label for="cover-photo" class="font-medium text-sm text-gray-900 leading-6 block">Cover Image</label>
          <BsBoxBanner v-model="image" title="Cover Photo" class="h-full mt-2" />
        </div>
      </div>
      <div mt-5 border-t border-gray-200 pt-5 flex justify="between" items-center>
        <label class="font-bold text-sm mr-5 text-slate-900 leading-6 block">Create Creation Cost</label>
        <div>
          <div flex justify="end" items-center>
            <span text-xl mr-5>{{ formatEther(addTokenCost) }}</span>
            <BsFormSelect id="payTokenAddress" v-model="payTokenAddress" :list="payTokenList" />
          </div>
          <div mt-2>
            <span font-bold>Your balance:</span> {{ formatUnits(bstBalance) }} {{ payTokenAddress }}
          </div>
        </div>
      </div>
      <BsAlertError v-if="error" my-5>
        {{ error.message }}
      </BsAlertError>
      <div class="flex pt-8 gap-x-3 justify-end" mt-5 border-t border-gray-200>
        <BsBtnBlack :is-loading="isLoading" @click="doSubmit">
          Save
        </BsBtnBlack>
      </div>
    </div>
  </div>
</template>
