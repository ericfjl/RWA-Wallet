<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/outline";
import Vue3Autocounter from 'vue3-autocounter';
import { vElementVisibility } from '@vueuse/components'

const { nft } = $(nftStore());

const db3DocId = $computed(() => nft.db3DocId)
const account = $(inject('account'))
let tiers = $ref([])
watchEffect(async () => {
  if (!account.privateKey) return
  if (!db3DocId) return

  const collectionName = 'twitter'
  const rz = await getDb3ItemById(account, collectionName, db3DocId)
  // const rz = await getDb3ItemByQuery(account, collectionName, '/[name="My First RWA NFT"]')
  tiers = rz.tierArr
})

const stats = $computed(() => {
  return [
    { theRef: ref(null), id: 1, name: "Sold / Max Supply", value: `${nft.totalSupply} / ${nft.maxSupply}` },
    { theRef: ref(null), id: 2, name: "OTP NFT income ($BST)", value: 84572 },
    { theRef: ref(null), id: 3, name: "Total Value Sold ($BST)", value: 103298 },
  ];
})

const { toggle, update } = $(tokenMintStore());

const route = useRoute();
const tokenId = $computed(() => route.params.tokenId);

const showMintModal = (amount) => {
  update({
    tokenId,
    amount,
    metaType: "mint",
  });
  toggle();
};

const inView = item => {
  return isShow => {
    if (!isShow) return
    item.theRef?.value?.start()
  }
}

</script>

<template>
  <div class="bg-gray-900 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <dl class="text-center grid gap-x-8 gap-y-16 grid-cols-1 lg:grid-cols-3">
        <div v-for="(stat, index) in stats" :key="stat.id" class="flex flex-col mx-auto max-w-xs gap-y-4">
          <dt class="text-base text-gray-400 leading-7">{{ stat.name }}</dt>
          <dd class="order-first font-semibold text-white tracking-tight text-3xl sm:text-5xl" v-element-visibility="inView(stat)">
            <template v-if="typeof stat.value === 'string'">
              {{ stat.value }}
            </template>
            <template v-else>
              <vue3-autocounter :ref="el => stat.theRef.value = el" :startAmount="0" :endAmount="stat.value" :duration="1" prefix="" suffix="" separator="" decimalSeparator="" :decimals="0" :autoinit="false" />
            </template>
          </dd>
        </div>
      </dl>
      <div class="mx-auto max-w-md space-y-4 mt-20 lg:space-y-0 lg:max-w-5xl lg:grid lg:gap-5 lg:grid-cols-2">
        <div v-for="tier in tiers" :key="tier.name" class="rounded-lg flex flex-col shadow-lg overflow-hidden">
          <div class="bg-white py-8 px-6 sm:p-10 sm:pb-6">
            <div>
              <h3 class="rounded-full font-semibold bg-indigo-100 text-base py-1 px-4 text-indigo-600 inline-flex" id="tier-standard">
                {{ tier.name }}
              </h3>
            </div>
            <div class="flex font-bold mt-4 tracking-tight text-6xl items-baseline" v-element-visibility="inView(tier)">
              {{ tier.nftCount }}
              <span class="font-medium ml-1 tracking-normal text-2xl text-gray-500"> NFTs</span>
            </div>
            <p class="mt-5 text-lg text-gray-500">{{ tier.desc }}</p>
          </div>
          <div class="flex flex-col space-y-6 bg-gray-50 flex-1 px-6 pt-6 pb-8 justify-between sm:p-10 sm:pt-6">
            <ul role="list" class="space-y-4">
              <li v-for="feature in tier.benefit" :key="feature" class="flex items-start">
                <div class="flex-shrink-0">
                  <CheckIcon class="h-6 text-green-500 w-6" aria-hidden="true" />
                </div>
                <p class="text-base ml-3 text-gray-700">{{ feature }}</p>
              </li>
            </ul>
            <div class="rounded-md shadow">
              <BsBtnBlack @click="showMintModal(tier.nftCount)" class="border border-transparent rounded-md flex font-medium bg-gray-800 text-base text-white w-full py-3 px-5 items-center justify-center hover:bg-gray-900" aria-describedby="tier-standard">Mint Now</BsBtnBlack>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
