<script setup lang="ts">
interface Props {
  modelValue: string
  foo?: string
}
const {
  modelValue,
  foo = 'default-val',
} = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const payBy = $ref('$BSTEntropy')
const payTokenList = ['$BSTSwap', '$BSTEntropy']

const storeBy = $ref('NFT.Storage')
const storeServiceList = ['NFT.Storage', 'Arweave']

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
]

const open = $ref(true)
</script>

<template>
  <div class="bg-white flex flex-col h-screen min-w-sm shadow-xl w-full overflow-y-scroll">
    <div class="flex-1 py-6 px-4 overflow-y-auto sm:px-6">
      <div class="flex items-start justify-between">
        <h2 class="font-medium text-lg text-gray-900">
          RWA Action Preview
        </h2>
      </div>

      <div class="mt-8">
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 -my-6">
            <li class="flex py-6">
              <div class="border rounded-md border-gray-200 flex-shrink-0 h-24 p-5 w-24 overflow-hidden">
                <div i-streamline-money-currency-bitcoin-crypto-circle-payment-blokchain-finance-bitcoin-currency-money class="h-full object-cover object-center  w-full" />
              </div>

              <div class="flex flex-col font-medium flex-1 text-base px-4 text-gray-900 justify-between">
                <h3>
                  Create New RWA Fee
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Grant 100 $BST allowance
                </p>
              </div>
              <div flex flex-col justify-between items-end>
                <BsFormSelect id="payBy" v-model="payBy" :list="payTokenList" />
                <div class="flex flex-col text-gray-500 items-end">
                  <div>
                    0 $BST
                  </div>
                  <div>
                    46 Gwei
                  </div>
                </div>
              </div>
            </li>
            <li class="flex py-6">
              <div class="border rounded-md border-gray-200 flex-shrink-0 h-24 p-5 w-24 overflow-hidden">
                <div i-simple-icons-ipfs class="h-full object-cover object-center  w-full" />
              </div>

              <div class="flex flex-col font-medium flex-1 text-base px-4 text-gray-900 justify-between">
                <h3>
                  Pack and Store metadata
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Pack metadata and store onto Decentralized storage platform
                </p>
              </div>
              <div flex flex-col justify-between items-end>
                <BsFormSelect id="storeBy" v-model="storeBy" :list="storeServiceList" />
                <div class="flex flex-col text-gray-500 items-end">
                  <div>
                    0 $BST
                  </div>
                  <div>
                    0 Gwei
                  </div>
                </div>
              </div>
            </li>
            <li v-for="product in products" :key="product.id" class="flex py-6">
              <div class="border rounded-md border-gray-200 flex-shrink-0 h-24 w-24 overflow-hidden">
                <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full object-cover object-center w-full">
              </div>

              <div class="flex flex-col flex-1 ml-4">
                <div>
                  <div class="flex font-medium text-base text-gray-900 justify-between">
                    <h3>
                      <a :href="product.href">{{ product.name }}</a>
                    </h3>
                    <p class="ml-4">
                      {{ product.price }}
                    </p>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ product.color }}
                  </p>
                </div>
                <div class="flex flex-1 text-sm items-end justify-between">
                  <p class="text-gray-500">
                    Qty {{ product.quantity }}
                  </p>

                  <div class="flex">
                    <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
      <div class="flex font-medium text-base text-gray-900 justify-between">
        <p>Subtotal</p>
        <p>$262.00</p>
      </div>
      <p class="mt-0.5 text-sm text-gray-500">
        Shipping and taxes calculated at checkout.
      </p>
      <div class="mt-6">
        <a href="#" class="border border-transparent rounded-md flex font-medium bg-indigo-600 shadow-sm text-base text-white py-3 px-6 items-center justify-center hover:bg-indigo-700">Action Confirm</a>
      </div>
      <div class="flex mt-6 text-center text-sm text-gray-500 justify-center">
        <p>
          or
          <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="open = false">
            Reject
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
