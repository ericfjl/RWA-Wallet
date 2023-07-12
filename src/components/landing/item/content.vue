<script setup lang="ts">
import { sendMessage } from "webext-bridge/options";

const route = useRoute()
const tokenId = $computed(() => route.params.tokenId)
const slug = $computed(() => route.params.itemSlug)
const itemId = $computed(() => {
  return slug.split('-')[0]
})

const textContent = $ref("");

let account = $ref('')
let item = $ref({})
let isLoading = $ref(true)
const excerpt = $computed(() => {
  return item.excerpt || `RWA Wallet, which stands for Real World Asset Wallet, is a game-changing innovation in the world of blockchain-based finance. It introduces a
      new dimension by bridging the gap between traditional financial assets and the emerging decentralized economy. By combining the best features of
      both worlds, RWA Wallet offers users a unique and powerful financial tool.`
})
onMounted(async () => {
  const { mnemonicStr } = await sendMessage("getStoreInMemory", { keys: ["mnemonicStr"] }, "background");
  account = getAccount(mnemonicStr);
  const itemURIArr = await readContract(
    { account, contractName: "BuidlerProtocol", functionName: 'getItems' },
    tokenId,
    itemId,
    1,
    ''
  );
  item = await parseURIData(itemURIArr[0])
  isLoading = false;
});

const { toggle, update } = $(tokenMintStore());

const showMintModal = (metaType = 'mint') => {
  let amount = item.content.requiredNFTCount
  let _tokenId = tokenId
  if (metaType === 'OTP') {
    amount = 1
    _tokenId = item.content.otpTokenId
  }
  update({
    tokenId: _tokenId,
    amount,
    metaType,
  });
  toggle();
};

const requiredNFTCount = $computed(() => item.content?.requiredNFTCount || 0)
</script>
<template>
  <div>
    <h1 class="font-bold mt-2 tracking-tight text-4xl text-gray-900 sm:text-5xl">{{ item.title }}</h1>
    <p class="mt-6 text-xl text-gray-700 leading-8">
      {{ excerpt }}
    </p>
    <div class="mt-10 text-base text-gray-700 leading-7 lg:max-w-none">
      <!-- <v-md-preview v-if="textContent" :text="textContent" /> -->
      <div v-if="textContent">
        {{ textContent }}
      </div>
      <div v-else border border-dashed py-20 border-gray-7 rounded-md flex flex-col items-center bg-gray-5 text-white mb-10>
        <div flex justify="center" items-center>
          <BsBtnBlack @click="showMintModal()"> Mint {{ requiredNFTCount }} NFT Pass </BsBtnBlack>
          <div mx-5 font-bold>Or</div>
          <BsBtnBlack @click="showMintModal('OTP')"> Mint 1 OTP-SBT </BsBtnBlack>
        </div>
        <div mt-5>to Unlock the RWA content</div>
      </div>
      <!--       
      <p>
        Web3 wallets have become an integral part of the digital landscape, allowing users to securely store, manage, and interact with their
        cryptocurrencies and decentralized applications. Among the various options available, RWA Wallet stands out as a revolutionary addition to the
        web3 wallet industry.
      </p>
      <ul role="list" class="space-y-8 mt-8 text-gray-600">
        <li class="flex gap-x-3">
          <div i-ic-baseline-link class="flex-none h-5 mt-1 text-indigo-600 w-5" aria-hidden="true" />
          <span
            ><strong class="font-semibold text-gray-900">Connect Web3 to Real World.</strong>One of the key features that sets RWA Wallet apart is its
            ability to integrate real-world assets into the blockchain ecosystem. This means that users can now tokenize their physical assets, such
            as real estate, commodities, or even rare artwork, and store them securely within their RWA Wallet. This opens up a whole new realm of
            possibilities for asset management, as users can now easily buy, sell, trade, and even lend their tokenized assets using smart
            contracts.</span
          >
        </li>
        <li class="flex gap-x-3">
          <div i-ic-baseline-settings-suggest class="flex-none h-5 mt-1 text-indigo-600 w-5" aria-hidden="true" />
          <span
            ><strong class="font-semibold text-gray-900">Tight integration with Web3 infrastructure.</strong>Another significant advantage of RWA
            Wallet is its tight integration with the web3 infrastructure. As web3 continues to gain traction, RWA Wallet ensures seamless
            compatibility with popular decentralized applications (dApps) and blockchain protocols. This means that users can effortlessly interact
            with a wide range of dApps, from decentralized finance (DeFi) platforms to non-fungible token (NFT) marketplaces, all from within their
            RWA Wallet.</span
          >
        </li>
        <li class="flex gap-x-3">
          <div i-ion-lock-closed class="flex-none h-5 mt-1 text-indigo-600 w-5" aria-hidden="true" />
          <span
            ><strong class="font-semibold text-gray-900">Furthermore, RWA Wallet emphasizes security and user control.</strong> It incorporates
            advanced security measures, such as multi-factor authentication and hardware wallet integration, to ensure the safety of users' assets.
            Additionally, RWA Wallet gives users full control over their private keys, which are never shared with any third-party entity. This puts
            users in charge of their own financial sovereignty, a key principle of the decentralized movement.</span
          >
        </li>
      </ul>
      <p class="mt-8">
        RWA Wallet's user-friendly interface and intuitive design further enhance its appeal. The wallet is designed to provide a seamless and
        intuitive experience, making it accessible to both experienced users and newcomers to the world of blockchain. Whether one is familiar with
        decentralized applications or not, RWA Wallet simplifies the user journey, making it easy to navigate through the various features and
        functionalities.
      </p>
      <h2 class="font-bold mt-16 tracking-tight text-2xl text-gray-900">Conclusion</h2>
      <p class="mt-6">
        In conclusion, RWA Wallet is a groundbreaking addition to the web3 wallet industry. With its ability to tokenize real-world assets, seamless
        integration with web3 infrastructure, emphasis on security and user control, and user-friendly interface, RWA Wallet brings a new level of
        innovation and convenience to the world of decentralized finance. As the web3 ecosystem continues to evolve, RWA Wallet is poised to play a
        significant role in shaping the future of blockchain-based finance.
      </p> -->
    </div>
  </div>
</template>
