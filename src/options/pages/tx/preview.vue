<script setup lang="ts">
import { useNFTStorage } from "@rwa/web3-storage";
import { sendMessage } from "webext-bridge/options";

const payBy = $ref("$BSTEntropy");
const payTokenList = ["$BSTSwap", "$BSTEntropy"];
const payTokenAddress = $computed(() => {
  const { address } = getContractInfo("BSTSwap");
  const { address: address2 } = getContractInfo("BSTEntropy");
  if (payBy === "$BSTEntropy") return address2;
  return address;
});

const storeBy = $ref("NFT.Storage");
const storeServiceList = ["NFT.Storage", "Arweave"];
let params = $ref({});
let opts = $ref({});
let account = $ref("");
let isLoading = $ref(false);
const route = useRoute();
const tabId = $computed(() => route.query.tabId);
let context = "";

onMounted(async () => {
  console.log("====> route :", route, route.query, location);
  const rz = await sendMessage("getStoreInMemory", { keys: ["mnemonicStr", "previewData"] }, "background");
  params = rz.previewData[tabId].params;
  opts = rz.previewData[tabId].opts;
  context = opts.context;
  account = getAccount(rz.mnemonicStr);
});

const { storeJson } = useNFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIxMmZkRTRBOEFhY0RCZWE3RWFkRGNFMGU1NkI0NTFDQzdlNTM2QjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzM4MTgzMDU2MywibmFtZSI6Ik5UQiJ9.Yj9ie65LXh6t6QECtGzKViX-AeTiAHnVoYybY3qfqNk",
});

let status = $ref("");

const doSubmit = async () => {
  isLoading = true;
  try {
    // call allowance
    status = "approve allowance";
    const { address: spenderAddress } = getContractInfo("BuidlerProtocol");
    const bstPayAmount = parseEther("100");
    const rzApprove = await writeContract(
      {
        account,
        contractName: "BSTEntropy",
        functionName: "approve",
      },
      spenderAddress,
      bstPayAmount
    );
    console.log("====> rzApprove :", rzApprove);

    // upload to decentralized storage
    status = "upload to decentralized storage";
    const properties = pick(params, ["category", "tags", "tokenType", "distributor", "basicPrice", "maxSupply", "inviteCommission"]);
    const external_url = ""; // This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site.
    const metadata = {
      ...pick(params, ["name", "description", "image"]),
      properties,
      external_url,
    };
    const cid = await storeJson(metadata);
    console.log("====> cid :", cid);

    const tokenList = await readContract(
      {
        account,
        contractName: "BuidlerProtocol",
        functionName: "getTokenList",
      },
      0,
      1000
    );
    const tokenId = tokenList[0].length;
    // create token
    status = "create new NFT on BuidlerProtocol";
    const rzToken = await writeContract(
      {
        account,
        contractName: "BuidlerProtocol",
        functionName: "addToken",
      },
      params.tokenType,
      parseEther(params.basicPrice.toString()),
      params.inviteCommission * 100,
      params.maxSupply,
      cid,
      payTokenAddress
    );
    console.log("====> rzApprove2, cid, rzToken, tokenId :", rzApprove, cid, rzToken, tokenId);
    // send back the result
    await sendMessage(`actionResolve@${tabId}`, { tokenId }, `content-script@${tabId}`);
  } catch (err) {
    console.log("====> err :", err);
    await sendMessage(`actionReject@${tabId}`, { err }, `content-script@${tabId}`);
  }

  isLoading = false;
  self.close();
};

const doSubmit2 = async () => {
  isLoading = true;

  status = "approve allowance";
  await new Promise((r) => setTimeout(r, 2000));
  status = "upload to decentralized storage";
  await new Promise((r) => setTimeout(r, 2000));
  status = "create new NFT on BuidlerProtocol";
  await new Promise((r) => setTimeout(r, 2000));
  await sendMessage(`actionResolve@${tabId}`, { tokenId: 13 }, `${context}@${tabId}`);
  isLoading = false;
  self.close();
};

const doCancel = async () => {
  console.log("====> `${context}@${tabId}` :", `${context}@${tabId}`);
  await sendMessage(`actionReject@${tabId}`, { err: { message: "user deny" } }, `${context}@${tabId}`);
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
                <div i-streamline-money-currency-bitcoin-crypto-circle-payment-blokchain-finance-bitcoin-currency-money class="h-full object-cover object-center w-full" />
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
        <div flex mb-3 text-base justify-center items-center v-if="status">
          <div i-eos-icons-loading class="h-6 text-black mr-2 w-6" />

          {{ status }}
        </div>
        <BsBtnIndigo :is-loading="isLoading" @click="doSubmit2" w-full> Action Confirm </BsBtnIndigo>
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
