<script setup lang="ts">
interface Props {
  learnMoreAction: Function;
}
let { learnMoreAction } = defineProps<Props>();

const { nft } = $(nftStore());
</script>

<template>
  <div class="bg-white">
    <div class="bg-gradient-to-b from-indigo-100/20 pt-14 relative isolate overflow-hidden">
      <div class="bg-white shadow-xl -mr-96 origin-top-right inset-y-0 right-1/2 shadow-indigo-600/10 ring-1 ring-indigo-50 w-[200%] -z-10 skew-x-[-30deg] absolute sm:-mr-80 lg:-mr-96" aria-hidden="true" />
      <div class="mx-auto max-w-7xl py-32 px-6 sm:py-40 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-none lg:mx-0 lg:grid lg:gap-x-16 lg:gap-y-6 lg:grid-cols-2 xl:gap-x-8 xl:grid-cols-1 xl:grid-rows-1">
          <h1 class="font-bold tracking-tight max-w-2xl text-4xl text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
            {{ nft.token.subTitle || `RWA Wallet are changing the way people use Web3.` }}
          </h1>
          <div class="max-w-xl mt-6 lg:mt-0 xl:col-end-1 xl:row-start-1">
            <p class="text-lg text-gray-600 leading-8">
              {{
                nft.token.description ||
                ` RWA Wallet, which stands for Real World Asset Wallet, is a game-changing innovation in the world of blockchain-based finance. It
              introduces a new dimension by bridging the gap between traditional financial assets and the emerging decentralized economy. By combining
              the best features of both worlds, RWA Wallet offers users a unique and powerful financial tool.`
              }}
            </p>
            <div class="flex mt-10 gap-x-6 items-center">
              <button @click="learnMoreAction" class="rounded-md font-semibold bg-indigo-600 shadow-sm text-sm text-white py-2.5 px-3.5 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Become holder
              </button>
              <!-- <button @click="learnMoreAction" class="font-semibold text-sm text-gray-900 leading-6">
                Learn more <span aria-hidden="true">→</span>
              </button> -->
            </div>
          </div>
          <BsBoxImg :src="nft.token.image || 'ipfs://bafkreib2di3auwwykb5v4rdtrcjyvbpt6eeqqyrovihj5le2pqekrgbxru'" alt="" class="max-w-lg object-cover rounded-2xl mt-6 w-full aspect-[6/5] sm:mt-10 lg:max-w-none lg:mt-0 xl:mt-16 xl:row-span-2 xl:row-end-2" />
        </div>
      </div>
      <div class="bg-gradient-to-t from-white h-24 inset-x-0 bottom-0 -z-10 absolute sm:h-32" />
    </div>
  </div>
</template>
