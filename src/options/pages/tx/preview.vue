<script setup lang="ts">
import { sendMessage } from "webext-bridge/options";
import { getAccount, getContractInfo, parseEther, writeContract } from "~/logic/web3";

const payBy = $ref("$BSTEntropy");
const payTokenList = ["$BSTSwap", "$BSTEntropy"];

const storeBy = $ref("NFT.Storage");
const storeServiceList = ["NFT.Storage", "Arweave"];
let params = $ref({});
let opts = $ref({});
let account = $ref("");
let isLoading = $ref(false);
onMounted(async () => {
  const rz = await sendMessage("getStoreInMemory", { keys: ["mnemonicStr", "action", "params", "opts"] }, "background");
  params = rz.params;
  opts = rz.opts;
  account = getAccount(rz.mnemonicStr);
});

const doSubmit = async () => {
  isLoading = true;
  try {
    // call allowance
    const { address: spenderAddress } = getContractInfo("BuidlerProtocol");
    const bstPayAmount = parseEther("100");
    const rz1 = await writeContract(
      {
        account,
        contractName: "BSTEntropy",
        functionName: "approve",
      },
      spenderAddress,
      bstPayAmount
    );
    console.log("====> rz1 :", rz1);
    // upload to decentralized storage
    // create token
    await sendMessage(`actionResolve@${opts.tabId}`, { tabId: opts.tabId }, `content-script@${opts.tabId}`);
  } catch (err) {
    console.log("====> err :", err);
    await sendMessage(`actionReject@${opts.tabId}`, { err }, `content-script@${opts.tabId}`);
  } finally {
    // self.close();
    isLoading = false;
  }
};

const doCancel = async () => {
  console.log("====> doCancel :", opts);
  await sendMessage(`actionReject@${opts.tabId}`, { err: { message: "user deny" } }, `content-script@${opts.tabId}`);
  self.close();
};
</script>

<template>
  <div class="bg-white flex flex-col h-screen min-w-sm shadow-xl w-full overflow-y-scroll">
    <div class="flex-1 py-6 px-4 overflow-y-auto sm:px-6">
      <div class="flex items-start justify-between">
        <h2 class="font-medium text-lg text-gray-900">RWA Action Preview</h2>
      </div>

      <div class="mt-8">
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 -my-6">
            <li class="flex py-6">
              <div class="border rounded-md border-gray-200 flex-shrink-0 h-24 p-5 w-24 overflow-hidden">
                <div
                  i-streamline-money-currency-bitcoin-crypto-circle-payment-blokchain-finance-bitcoin-currency-money
                  class="h-full object-cover object-center w-full"
                />
              </div>

              <div class="flex flex-col font-medium flex-1 text-base px-4 text-gray-900 justify-between">
                <h3>Create New RWA Fee</h3>
                <p class="mt-1 text-sm text-gray-500">Grant 100 $BST allowance</p>
              </div>
              <div flex flex-col justify-between items-end>
                <BsFormSelect id="payBy" v-model="payBy" :list="payTokenList" />
                <div class="flex flex-col text-gray-500 items-end">
                  <div>0 $BST</div>
                  <div>46 Gwei</div>
                </div>
              </div>
            </li>
            <li class="flex py-6">
              <div class="border rounded-md border-gray-200 flex-shrink-0 h-24 p-5 w-24 overflow-hidden">
                <div i-simple-icons-ipfs class="h-full object-cover object-center w-full" />
              </div>

              <div class="flex flex-col font-medium flex-1 text-base px-4 text-gray-900 justify-between">
                <h3>Pack and Store metadata</h3>
                <p class="mt-1 text-sm text-gray-500">Pack metadata and store onto Decentralized storage platform</p>
              </div>
              <div flex flex-col justify-between items-end>
                <BsFormSelect id="storeBy" v-model="storeBy" :list="storeServiceList" />
                <div class="flex flex-col text-gray-500 items-end">
                  <div>0 $BST</div>
                  <div>0 Gwei</div>
                </div>
              </div>
            </li>
            <li class="flex py-6">
              <div class="border rounded-md border-gray-200 flex-shrink-0 h-24 p-0 w-24 overflow-hidden">
                <BsBoxImg :src="params.image" :has-modal="true" class="h-full object-cover object-center w-full" />
              </div>

              <div class="flex flex-col font-medium flex-1 text-base px-4 text-gray-900 justify-between">
                <h3>
                  {{ params.name }}
                </h3>
                <p class="mt-1 text-sm text-gray-500">Use the metadata to build your RWA NFT!</p>
              </div>
              <div flex flex-col justify-between items-end>
                <div />
                <div class="flex flex-col text-gray-500 items-end">
                  <div>100 $BST</div>
                  <div>2000 Gwei</div>
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
        <div flex flex-col items-end>
          <div>100<span inline-block w-12 text-right>$BST</span></div>
          <div>2046 <span inline-block w-12 text-right>Gwei</span></div>
        </div>
      </div>
      <div class="mt-6">
        <BsBtnIndigo :is-loading="isLoading" @click="doSubmit" w-full> Action Confirm </BsBtnIndigo>
      </div>
      <div class="flex mt-6 text-center text-sm text-gray-500 justify-center">
        <p>
          or
          <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="doCancel">
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
