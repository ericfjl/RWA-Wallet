<script setup lang="ts">
import { formatEther } from "viem";
import { truncate, get } from "lodash";

const account = $(inject("account"));
let items = $ref([]);
let isLoading = $ref(true);
onMounted(async () => {
  const functionName = "getTokenList";
  const [tokenURIArr, basicPriceArr, totalSupplyArr, maxSupplyArr, itemsCountArr, metaCountArr] = await readContract(
    { account, contractName: "RWAProtocol", functionName },
    0,
    100
  );
  // const functionName = 'getTokenListByType'
  // readContract({ account, contractName: 'RWAProtocol', functionName }, 'NFTFi-Twitter', 0, 100)
  const tokenInfoArr = await Promise.all(tokenURIArr.map(parseURIData));
  items = reverse(
    tokenInfoArr
      .map((token, index) => {
        return {
          tokenId: index,
          token,
          basicPrice: basicPriceArr[index].toString(),
          totalSupply: totalSupplyArr[index].toString(),
          maxSupply: maxSupplyArr[index].toString(),
          itemsCount: itemsCountArr[index].toString(),
          metaCount: metaCountArr[index].toString(),
        };
      })
      .filter((item) => "OTP" !== get(item, "token.properties.tokenType"))
  );
  isLoading = false;
});
</script>

<template>
  <main>
    <TopNav />

    <div class="border-t border-white/10 pt-11">
      <h2 class="font-semibold text-base text-white px-4 leading-7 sm:px-6 lg:px-8">Newest</h2>
      <div v-if="isLoading" flex justify-center items-center w-full h-100>
        <div i-svg-spinners-blocks-shuffle-3 text-white class="h-14 w-14"></div>
      </div>
      <table v-else class="mt-6 text-left overflow-x-scroll whitespace-nowrap">
        <colgroup>
          <col class="w-full sm:w-4/12" />
          <col class="lg:w-4/12" />
          <col class="lg:w-2/12" />
          <col class="lg:w-1/12" />
          <col class="lg:w-1/12" />
        </colgroup>
        <thead class="border-b border-white/10 text-sm text-white leading-6">
          <tr>
            <th scope="col" class="font-semibold py-2 pr-8 pl-4 sm:pl-6 lg:pl-8">NFT</th>
            <th scope="col" class="font-semibold py-2 pr-8 pl-0 hidden sm:table-cell">Description</th>
            <th scope="col" class="font-semibold text-right py-2 pr-4 pl-0 sm:text-left sm:pr-8 lg:pr-20">Sold / Max</th>
            <th scope="col" class="font-semibold py-2 pr-8 pl-0 hidden md:table-cell lg:pr-20">Tags</th>
            <th scope="col" class="font-semibold py-2 pr-8 pl-0 hidden md:table-cell lg:pr-20">Price <span text-gray-5>($BST)</span></th>
            <!-- <th scope="col" class="font-semibold text-right py-2 pr-4 pl-0 hidden sm:pr-6 sm:table-cell lg:pr-8">Created at</th> -->
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-for="item in items" :key="item.tokenId">
            <td class="py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
              <router-link :to="`/options/twitter/${item.tokenId}`" class="flex gap-x-4 items-center">
                <BsBoxImg :src="item.token.image" alt="" class="rounded-full bg-gray-800 h-8 w-8" />
                <div class="font-medium text-sm text-white leading-6 truncate hover:text-indigo-600">#{{ item.tokenId }} {{ item.token.name }}</div>
              </router-link>
            </td>
            <td class="py-4 pr-4 pl-0 hidden sm:pr-8 sm:table-cell">
              <div class="flex gap-x-3">
                <div class="font-mono text-sm text-gray-400 leading-6">
                  {{ truncate(item.token.description) }}
                </div>
                <span
                  class="rounded-md font-medium bg-gray-400/10 ring-inset text-xs py-1 px-2 ring-1 ring-gray-400/20 text-gray-400 inline-flex items-center"
                  >{{ item.token.properties.category }}</span
                >
              </div>
            </td>
            <td class="text-sm py-4 pr-4 pl-0 leading-6 sm:pr-8 lg:pr-20">
              <div class="flex gap-x-2 items-center justify-end sm:justify-start">
                <div class="text-white hidden sm:block">{{ item.totalSupply }} / {{ item.maxSupply }}</div>
              </div>
            </td>
            <td class="text-sm py-4 pr-8 pl-0 text-gray-400 leading-6 hidden md:table-cell lg:pr-20">
              <BsTags :tags="get(item, 'token.properties.tags', ['Web3', 'RWA', 'Twitter', 'NFT'])" />
            </td>
            <td class="text-sm py-4 pr-8 pl-0 text-gray-400 leading-6 hidden md:table-cell lg:pr-20">
              {{ formatEther(item.basicPrice) }}
            </td>
            <!-- <td class="text-right text-sm py-4 pr-4 pl-0 text-gray-400 leading-6 hidden sm:pr-6 sm:table-cell lg:pr-8">
              <time :datetime="item.token.createdAt">{{ item.token.createdAt }}</time>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
