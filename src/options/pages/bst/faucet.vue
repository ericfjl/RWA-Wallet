<script setup lang="ts">
import { shortAddress, humanFormatEther, numberFormat } from '~/composables/web3'

const { addSuccess, alertSuccess, addError, addLoading } = $(notificationStore());
const { payTokenAddress, walletAddress } = $(appStore())
const account = $(inject('account'))

let balance = $ref(0n)
let isLoading = $ref(false)
let faucetWalletAddress = $ref('')

const queryBalance = async () => {
  balance = await readContract({
    contractName: 'BSTEntropy',
    functionName: 'balanceOf'
  }, faucetWalletAddress)
}

const doSubmit = async () => {
  if (isLoading || !faucetWalletAddress) return

  isLoading = true
  await writeContract(
    {
      account,
      contractName: 'BSTEntropy',
      functionName: "faucetMint",
    },
    faucetWalletAddress,
  )

  await queryBalance()
  addSuccess('Request faucet success')
  isLoading = false
}


onMounted(() => {
  faucetWalletAddress = walletAddress
})

watchEffect(async () => {
  if (!faucetWalletAddress) return
  await queryBalance()
})

</script>
<template>
  <div mx-auto max-w-5xl pt-10>
    <div class="bg-indigo-600 rounded-2xl shadow-xl py-10 px-6 relative overflow-hidden sm:py-20 sm:px-12">
      <div aria-hidden="true" class="-mt-72 inset-0 absolute sm:-mt-32 md:mt-0">
        <svg class="h-full w-full inset-0 absolute" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
          <path class="text-indigo-500 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
          <path class="text-indigo-700 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
        </svg>
      </div>
      <div class="relative">
        <div class="sm:text-center">
          <h2 class="font-bold text-white tracking-tight text-3xl sm:text-4xl">
            Buidler Stable Token Entropy($BSTEntropy) Faucet
          </h2>
          <p class="mx-auto mt-6 text-lg max-w-2xl text-indigo-200">
            The RWA-Protocol require $BST Token to pay as fee.
          </p>
        </div>
        <div class="mt-12 justify-center sm:flex sm:mx-auto sm:max-w-2xl">
          <div class="flex-1 min-w-0">
            <label for="wallet-address" class="sr-only">Wallet address</label>
            <input id="wallet-address" v-model="faucetWalletAddress" :disabled="isLoading" class="border border-transparent rounded-md shadow-sm text-base w-full py-3 px-5 placeholder-gray-500 text-gray-900 block focus:border-transparent focus:outline-none focus:ring-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600" placeholder="Enter your wallet address">
          </div>
          <div class="flex mt-4 sm:mt-0 sm:ml-3">
            <BsBtnBlack :is-loading="isLoading" @click="doSubmit">
              Send Me $BSTEntropy
            </BsBtnBlack>
          </div>
        </div>
        <div v-if="faucetWalletAddress" class="mt-12 sm:text-center">
          <h2 class="font-bold text-white tracking-tight text-3xl sm:text-4xl">
            {{ shortAddress(faucetWalletAddress) }} have {{ humanFormatEther(balance) }} $BSTEntropy
          </h2>
        </div>
      </div>
    </div>
    <BstFaq bg-white rounded-2xl mt-10 />
  </div>
</template>

