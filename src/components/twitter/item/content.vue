<script setup lang="ts">
const { toggle, update } = $(tokenMintStore());
let textContent = $ref("");
const account = $(inject('account'))
const litNodeClient = $(inject('litNodeClient'))

const { item, params } = $(itemStore())
const excerpt = $computed(() => {
  return item.excerpt || `The author do not provide excerpt for this RWA.`
})

const tokenId = $computed(() => params.tokenId)
let tokenBalance = $ref(0)
const requiredNFTCount = $computed(() => item.content?.requiredNFTCount || 0)
const otpTokenId = $computed(() => item.content?.otpTokenId || '')
let otpTokenBalance = $ref(0)
const isOwner = $computed(() => account.address !== '' && isSameAddress(item.createdBy, account.address))

watchEffect(async () => {
  if (tokenId === undefined) return

  if (requiredNFTCount > 0) {
    tokenBalance = await queryTokenBalance(account, tokenId)
  }

  if (otpTokenId !== '') {
    otpTokenBalance = await queryTokenBalance(account, otpTokenId)
  }
  if (tokenBalance > 0 || otpTokenBalance > 0 || isOwner) {
    // try unlock content automaticly
    const { doDecryptString } = litHelper({ chain: CHAIN_NAME, litNodeClient, account })
    const rz = await doDecryptString(item.content)
    console.log('====> rz :', rz)
  }
})

let status = $ref('')
const doClose = async () => {
  status = 'Unlocking the RWA'
  setTimeout(() => {
    textContent = 'successed!'
  }, 2000);
}

const showMintModal = (metaType = 'mint') => {
  let amount = item.content.requiredNFTCount
  let _tokenId = params.tokenId
  if (metaType === 'OTP') {
    amount = 1
    _tokenId = item.content.otpTokenId
  }
  update({
    tokenId: _tokenId,
    amount,
    metaType,
  }, {
    doClose
  });
  toggle();
};

</script>
<template>
  <div>
    <h1 class="font-bold mt-2 tracking-tight text-4xl text-gray-900 sm:text-5xl">{{ item.title }}</h1>
    <p class="mt-6 text-xl text-gray-700 leading-8">
      {{ excerpt }}
    </p>
    <div class="mt-10 text-base text-gray-700 leading-7 lg:max-w-none">
      <div v-if="textContent">
        <v-md-preview :text="textContent" />
      </div>
      <div v-else relative class="-mt-40">
        <div bg-gradient-to-b h-40 class="to-white from-white/30"></div>
        <div py-10 flex flex-col items-center mb-10>
          <template v-if="status">
            <BsLoadingIcon w-10 h-10 />
            {{ status }}
          </template>
          <template v-else>
            <div text-3xl mb-10>
              Read the full content via
            </div>
            <div flex justify="center" items-center>
              <BsBtnBlack @click="showMintModal()"> Mint {{ requiredNFTCount }} NFT Pass </BsBtnBlack>
              <div mx-5 font-bold>Or</div>
              <BsBtnBlack @click="showMintModal('OTP')"> Mint 1 OTP-SBT </BsBtnBlack>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
