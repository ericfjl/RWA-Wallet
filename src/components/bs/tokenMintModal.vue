<script setup lang="ts">
import { get } from "lodash";
import { formatEther } from "viem";
import { sendMessage } from "webext-bridge/options";

let { isShow, params, opts, tokenId } = $(tokenMintStore());

const { payTokenAddress, payBy, distributor, currentAllowance } = $(appStore());

let account = $ref("");
onMounted(async () => {
  const rz = await sendMessage("getStoreInMemory", { keys: ["mnemonicStr", "previewData"] }, "background");
  account = getAccount(rz.mnemonicStr);
});

const { addSuccess } = $(notificationStore());
const { metadata, basicPrice, totalSupply, maxSupply, isLoading: isTokenLoading, doUpdate: updateToken } = $(useToken($$(tokenId)));
let status = $ref("");

const mintCost = $computed(() => {
  if (!params.amount) return 0;
  return basicPrice * BigInt(params.amount);
});

let isLoading = $ref(false);
const balanceEnough = $ref(false);

const canSubmit = $computed(() => {
  if (isLoading) return false;
  if (params.amount <= 0) return false;

  return balanceEnough;
});

const doClose = async () => {
  if (opts.doClose) {
    await opts.doClose();
  }
  isShow = false;
  isLoading = false;
  status = "";
  params = {};
  opts = {};
};
const doSubmit = async () => {
  if (isLoading) return;

  isLoading = true;

  const amount = params.amount;
  const metaType = params.metaType;
  const metadata = {
    amount,
    metaType,
    basicPrice: basicPrice.toString(),
    payTokenAddress,
    payBy,
    distributor,
  };
  status = "start pack and store mint metadata";
  const cid = await storeJson(metadata);

  if (currentAllowance < mintCost) {
    status = "start add allowance for pay token";
    const spenderAddress = getContractInfo("BuidlerProtocol").address;
    await writeContract(
      {
        account,
        contractName: payBy.replace("$", ""),
        functionName: "approve",
      },
      spenderAddress,
      mintCost
    );
  }

  if (metaType === "OTP") {
    status = "start buy One Time Payment SBT";
    await writeContract(
      {
        account,
        contractName: "BuidlerProtocol",
        functionName: "buyOTP",
      },
      tokenId,
      params.amount,
      cid,
      payTokenAddress,
      distributor
    );
    addSuccess(`Buy ${params.amount} One Time Payment SBT Successed!`);
  } else {
    status = "start buy RWA NFT";
    await writeContract(
      {
        account,
        contractName: "BuidlerProtocol",
        functionName: "addMeta",
      },
      metaType,
      tokenId,
      amount,
      cid,
      payTokenAddress,
      distributor
    );
    addSuccess(`Buy ${params.amount} RWA NFT Successed!`);
  }
  await doClose();
};
</script>

<template>
  <BsDialogWide :show="isShow" @close="doClose">
    <div sm:w-100>
      <div class="flex items-center">
        <div class="rounded-lg bg-gray-200 h-10 mr-2 overflow-hidden aspect-1">
          <BsBoxImg :src="get(metadata, 'image')" class="h-full object-cover object-center w-full group-hover:opacity-75" />
        </div>
        <h3 class="font-semibold flex-1 text-base text-gray-900 leading-6">#{{ tokenId }} {{ metadata.name }}</h3>
        <div>
          <BsLoadingIcon v-if="isTokenLoading" />
          <span v-else> {{ totalSupply }} / {{ maxSupply }} </span>
        </div>
      </div>
      <div mt-8>
        <div flex justify="between" items-center>
          <div>Basic Price</div>
          <div>{{ formatEther(basicPrice) }} $BST</div>
        </div>
        <div flex justify="between" items-center>
          <div>Mint Amount</div>
          <input
            id="amount"
            v-model="params.amount"
            type="text"
            name="amount"
            autocomplete="amount"
            class="rounded-md border-0 shadow-sm ring-inset my-2 py-1.5 px-2 ring-1 ring-slate-300 text-slate-900 w-20 block placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-700"
          />
        </div>
        <BsFormSelectBst v-model="mintCost" v-model:balance-enough="balanceEnough" my-4 space-y-4 border-y-gray-2 border-y-1 py-5>
          Total Cost
        </BsFormSelectBst>
        <div v-if="status" flex flex-col justify-center items-center py-4>
          <BsLoadingIcon />
          <div mt-2>{{ status }}</div>
        </div>
        <BsBtnBlack w-full :disabled="!canSubmit" my-4 :is-loading="isLoading" @click="doSubmit"> Mint</BsBtnBlack>
      </div>
    </div>
  </BsDialogWide>
</template>
