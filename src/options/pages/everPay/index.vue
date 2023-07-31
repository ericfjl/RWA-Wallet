<script setup lang="ts">
import Everpay, { EverpayInfo, TxsResult } from "everpay";
import { shortAddress, humanFormatEther, numberFormat } from '~/composables/web3'

const account = $(inject("account"));

const currentTab = $ref('Token List')
const tabs = ['Token List', 'Lockers', 'Basic Info', 'TXs']

let everpay = $ref('')
let info: EverpayInfo = $ref({});
const basicInfo = $computed(() => pickBy(info, (item, key) => key !== 'tokenList' && key !== 'lockers'))
const lockers = $computed(() => info.lockers)
const tokenList = $computed(() => groupBy(info.tokenList, item => item.chainType))
const filterOutArr = ['id', 'chainType', 'chainID', 'display', 'tns102Extra', 'crossChainInfoList', 'burnFees']
const itemKeys = $computed(() => filter(Object.keys(info?.tokenList[0] || {}), key => !filterOutArr.includes(key)))
let currentTabChainType = $ref('')
let balances = $ref([])
const balancesMap = $computed(() => keyBy(balances, 'tag'))

let txsResult: TxsResult = $ref({})
const txs = $computed(() => get(txsResult, 'txs', []))
let txsHead = $ref(['action', 'from', 'to', 'fee', 'everHash', 'statusStr'])
const page = $ref(1)
const action = $ref('transfer')

const debug = false;
onMounted(async () => {
  everpay = new Everpay({
    debug,
    account: account.address,
    ethConnectedSigner: getWalletClient(account),
  });
  info = await everpay.info();
  currentTabChainType = info.tokenList[0].chainType
  balances = await everpay.balances()
});

watchEffect(async () => {
  if (!everpay) return

  const opts = { page }
  if (action !== 'all') {
    opts.action = action
  }
  txsResult = await everpay.txsByAccount(opts)
  // txsHead = Object.keys(get(txsResult, 'txs[0]', {}))
})

const isSuccessed = item => {
  const statusObj = JSON.parse(get(item, 'internalStatus'))
  return statusObj.status === 'success'
}
const showTxValue = (item, key) => {
  switch (key) {
    case 'from':
    case 'to':
    case 'everHash':
      return shortAddress(item[key])
    case 'action':
      return `${item[key]} ${item['tokenSymbol']} ${humanFormatEther(item['amount'])}`
    case 'statusStr':
      return `https://scan.everpay.io/tx/${item['everHash']}`
    default:
      return item[key]
  }
}
</script>
<template>
  <main px-sm py-4>
    <div class="px-4 pt-6 sm:px-0">
      <h3 class="font-semibold text-base text-white leading-7">{{ account.address }}</h3>
      <p class="mt-1 text-sm max-w-2xl text-gray-400 leading-6">Details about your everPay service.</p>
    </div>
    <div class="bg-gray-900 pt-6">
      <div class="mx-auto ">
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">Select a tab</label>
          <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
          <select id="tabs" name="tabs" class="border-none rounded-md bg-white/5 shadow-sm ring-inset text-base text-white w-full py-2 pr-10 pl-3 ring-1 ring-white/10 block sm:text-sm focus:ring-inset focus:ring-2 focus:ring-indigo-500">
            <option v-for="tab in tabs" :key="tab" :selected="tab === currentTab">{{ tab }}</option>
          </select>
        </div>
        <div class="hidden sm:block">
          <nav class=" flex border-white/10 py-2">
            <ul role="list" class="flex flex-none font-semibold min-w-full text-sm px-2 text-gray-400 leading-6 gap-x-6">
              <li v-for="tab in tabs" :key="tab" @click="currentTab = tab" cursor-pointer hover:text-indigo-400>
                <span :class="tab === currentTab ? 'text-indigo-400' : ''">{{ tab }}</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="border-t border-white/10 mt-6">
      <dl class="divide-y divide-white/10">
        <template v-if="currentTab === 'Basic Info'">
          <div class="py-6 px-4 sm:grid sm:px-0 sm:gap-4 sm:grid-cols-3" v-for="(item, key) in basicInfo">
            <dt class="font-medium text-sm text-white leading-6">{{ key }}</dt>
            <dd class="mt-1 text-sm text-gray-400 leading-6 sm:mt-0 sm:col-span-2">{{ item }}</dd>
          </div>
        </template>

        <template v-if="currentTab === 'Lockers'">
          <div class="py-6 px-4 sm:grid sm:px-0 sm:gap-4 sm:grid-cols-3" v-for="(item, key) in lockers">
            <dt class="font-medium text-sm text-white leading-6">{{ key }}</dt>
            <dd class="mt-1 text-sm text-gray-400 leading-6 sm:mt-0 sm:col-span-2">{{ item }}</dd>
          </div>
        </template>
        <template v-if="currentTab === 'Token List2'">
          <div class="py-6 px-4 sm:grid sm:px-0 sm:gap-4 sm:grid-cols-3" v-for="(item, chainType) in tokenList">
            <dt class="font-medium text-sm text-white leading-6">{{ chainType }}</dt>
            <dd class="mt-1 text-sm text-gray-400 leading-6 sm:mt-0 sm:col-span-2">{{ item }}</dd>
          </div>
        </template>
        <template v-if="currentTab === 'Token List'">
          <div class="bg-gray-900 pt-6">
            <div class="mx-auto ">
              <div class="sm:hidden">
                <label for="tabs" class="sr-only">Select a tab</label>
                <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                <select id="tabs" name="tabs" class="border-none rounded-md bg-white/5 shadow-sm ring-inset text-base text-white w-full py-2 pr-10 pl-3 ring-1 ring-white/10 block sm:text-sm focus:ring-inset focus:ring-2 focus:ring-indigo-500">
                  <option v-for="(items, tab) in tokenList" :key="tab" :selected="tab === currentTabChainType">{{ tab }}</option>
                </select>
              </div>
              <div class="hidden sm:block">
                <nav class=" flex border-white/10 py-2">
                  <ul role="list" class="flex flex-none font-semibold min-w-full text-sm px-2 text-gray-400 leading-6 gap-x-6">
                    <li v-for="(items, tab) in tokenList" :key="tab" @click="currentTabChainType = tab" cursor-pointer hover:text-indigo-400>
                      <span :class="tab === currentTabChainType ? 'text-indigo-400' : ''">{{ tab }}</span>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div class="mt-8 flow-root" v-for="(items, chainType) in tokenList" :class="currentTabChainType === chainType ? '' : 'hidden'">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="min-w-full py-2 inline-block align-middle sm:px-6 lg:px-8">
                <table class="divide-y min-w-full divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" class="font-semibold text-left text-sm text-white py-3.5 px-3" v-for="key in itemKeys" :key="`${chainType}-${key}`">{{ key }}</th>
                      <th scope="col" class="text-left py-3.5 pr-4 pl-3 relative sm:pr-0">
                        <span class="text-white">Blance</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-800">
                    <tr v-for="item in items" :key="item.id">
                      <td class="text-sm py-4 px-3 text-gray-300 whitespace-nowrap" v-for="key in itemKeys" :key="`${item.id}-${key}`">
                        <template v-if="key === 'totalSupply'">
                          {{ item[key] }}
                        </template>
                        <template v-else>
                          {{ item[key] }}
                        </template>
                      </td>
                      <td class="flex font-medium text-sm text-white py-4 pr-4 pl-3 relative whitespace-nowrap sm:pr-0">
                        <span flex-1>{{ balancesMap[item.tag]?.balance }}</span>
                        <a target="_blank" :href="`https://app.everpay.io/deposit/${item.tag}`" class="text-indigo-400 hover:text-indigo-300">Deposit</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </template>

        <template v-if="currentTab === 'TXs'">
          <div class="mt-8 flow-root">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="min-w-full py-2 inline-block align-middle sm:px-6 lg:px-8">
                <table class="divide-y min-w-full divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" class="font-semibold text-left text-sm text-white py-3.5 px-3" v-for="key in txsHead">{{ key }}</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-800">
                    <tr v-for="item in txs" :key="item.id">
                      <td class="text-sm py-4 px-3 text-gray-300 whitespace-nowrap" v-for="key in txsHead">
                        <template v-if="key === 'statusStr'">
                          <a target="_blank" :href="showTxValue(item, key)" :class="isSuccessed(item) ? 'text-green' : 'text-red'" class="flex items-center justify-between">
                            <span>{{ isSuccessed(item) ? 'Successed' : 'Failed' }}</span>
                            <span i-lucide-external-link w-5 h-5></span>
                          </a>
                        </template>
                        <template v-else>
                          {{ showTxValue(item, key) }}
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>
      </dl>
    </div>
  </main>
</template>
