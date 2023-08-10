<script setup lang="ts">
import { get } from "lodash";
import { sendMessage } from "webext-bridge/options";

const { addSuccess, alertSuccess, addError, addLoading } = $(notificationStore());
const litNodeClient = $(inject('litNodeClient'))
const { distributor } = $(appStore());
const statusRef = $ref(null)
const route = useRoute();
const tokenId = $computed(() => route.params.tokenId);
const router = useRouter()
const { metadata } = $(useToken($$(tokenId)));

let account = $ref('')
onMounted(async () => {
  const rz = await sendMessage("getStoreInMemory", { keys: ["mnemonicStr", "previewData"] }, "background");
  account = getAccount(rz.mnemonicStr);
});


const tokenType = $computed(() => get(metadata, "properties.tokenType", ""));

const title = $ref("The future Of Web3: RWA Wallet");
const tags = $ref(["Wallet", "RWA", "NFT", "Web3", "Twitter", "PFP"].join(", "));
const excerpt = $ref(
  `RWA Wallet, which stands for Real World Asset Wallet, is a game-changing innovation in the world of blockchain-based finance. It introduces a new dimension by bridging the gap between traditional financial assets and the emerging decentralized economy. By combining the best features of both worlds, RWA Wallet offers users a unique and powerful financial tool.`
);
const image = $ref("ipfs://bafkreib5df2jypuupbbefdo2spzjnmydci3uimmxxe3jqko54ydlivjxuq");
const content = $ref(
  `Web3 wallets have become an integral part of the digital landscape, allowing users to securely store, manage, and interact with their cryptocurrencies and decentralized applications. Among the various options available, RWA Wallet stands out as a revolutionary addition to the web3 wallet industry.

One of the key features that sets RWA Wallet apart is its ability to integrate real-world assets into the blockchain ecosystem. This means that users can now tokenize their physical assets, such as real estate, commodities, or even rare artwork, and store them securely within their RWA Wallet. This opens up a whole new realm of possibilities for asset management, as users can now easily buy, sell, trade, and even lend their tokenized assets using smart contracts.

Another significant advantage of RWA Wallet is its tight integration with the web3 infrastructure. As web3 continues to gain traction, RWA Wallet ensures seamless compatibility with popular decentralized applications (dApps) and blockchain protocols. This means that users can effortlessly interact with a wide range of dApps, from decentralized finance (DeFi) platforms to non-fungible token (NFT) marketplaces, all from within their RWA Wallet.

It incorporates advanced security measures, such as multi-factor authentication and hardware wallet integration, to ensure the safety of users' assets. Additionally, RWA Wallet gives users full control over their private keys, which are never shared with any third-party entity. This puts users in charge of their own financial sovereignty, a key principle of the decentralized movement.

RWA Wallet's user-friendly interface and intuitive design further enhance its appeal. The wallet is designed to provide a seamless and intuitive experience, making it accessible to both experienced users and newcomers to the world of blockchain. Whether one is familiar with decentralized applications or not, RWA Wallet simplifies the user journey, making it easy to navigate through the various features and functionalities.

In conclusion, RWA Wallet is a groundbreaking addition to the web3 wallet industry. With its ability to tokenize real-world assets, seamless integration with web3 infrastructure, emphasis on security and user control, and user-friendly interface, RWA Wallet brings a new level of innovation and convenience to the world of decentralized finance. As the web3 ecosystem continues to evolve, RWA Wallet is poised to play a significant role in shaping the future of blockchain-based finance.
`
);
let category = $ref("Uncategory");
const categoryList = $ref([
  "Uncategory",
  "Productivity",
  "Fiction",
  "Visual Design",
  "Style",
  "Space",
  "Technology",
  "Programming",
  "Money",
  "Makers",
  "Cryptocurrency",
  "Art",
]);

const itemType = $ref("Text");
const itemTypeList = $ref(["Text", "Music", "Video", "Live"]);

const requireNFTPass = $ref(true);
const requiredNFTCount = $ref(1);

const enableOneTimePayment = $ref(true);
const oneTimePaymentBasicPrice = $ref(5);
const oneTimePaymentMaxSupply = $ref(10000);

let isLoading = $ref(false);
let error = $ref("");
let status = $ref("");
const doSubmit = async () => {
  if (isLoading) return;
  isLoading = true;

  status = "Get next item Id"
  nextTick(() => {
    statusRef.scrollIntoView({ behavior: "smooth" });
  });
  const nextItemId = (await readContract(
    {
      account,
      contractName: "RWAProtocol",
      functionName: "getItemsCount",
    },
    tokenId,
    ""
  )).toString();

  let otpTokenId = "";
  if (enableOneTimePayment === true) {
    status = "Start creating One Time Payment SBT"
    const inviteCommission = 100;
    const otpCid = await storeJson({
      name: `OTP for ${title}`,
      description: excerpt,
      image: get(metadata, "image", ""),
      properties: {
        category,
        tokenType: "OTP",
        distributor,
        basicPrice: oneTimePaymentBasicPrice,
        maxSupply: oneTimePaymentMaxSupply,
        tokenMetadata: metadata,
        itemId: nextItemId,
        tokenId,
      },
      external_url: "",
    });
    const { result } = await writeContract(
      {
        account,
        contractName: 'RWAProtocol',
        functionName: "addOTP",
      },
      parseEther(oneTimePaymentBasicPrice.toString()),
      inviteCommission,
      oneTimePaymentMaxSupply,
      otpCid,
      tokenId,
      nextItemId
    );

    otpTokenId = result.toString()
    addSuccess("Create One Time Payment SBT Successed!");
  }

  let litRz = "";
  if (requireNFTPass || enableOneTimePayment) {
    status = "Start encrypting your content with NFT Gating"
    const { doEncryptedString, generateCondition } = litHelper({ chain: CHAIN_NAME, litNodeClient, account });
    const contractAddress = getContractInfo("RWAProtocol").address;
    const ownerAddress = account.address;
    const nftPassCondition = generateCondition({ contractAddress, ownerAddress, tokenId, unlockAmount: requiredNFTCount });
    let accessControlConditions = nftPassCondition;
    if (otpTokenId) {
      const otpCondition = generateCondition({ contractAddress, ownerAddress, tokenId: otpTokenId, unlockAmount: "1" });
      accessControlConditions = [
        ...nftPassCondition,
        {
          operator: "or",
        },
        otpCondition[2],
      ];
    }

    litRz = await doEncryptedString(content, accessControlConditions);
    litRz = {
      ...litRz,
      accessControlConditions,
      requireNFTPass,
      requiredNFTCount,
      enableOneTimePayment,
      otpTokenId,
      oneTimePaymentBasicPrice,
      oneTimePaymentMaxSupply,
    };
    addSuccess("Encrypt your content with NFT Gating Successed!");
  }

  const nftItemData = {
    title,
    image,
    excerpt,
    category,
    tags,
    createdBy: account.address,
    itemType,
    content,
  };
  if (requireNFTPass || enableOneTimePayment) nftItemData.content = litRz;

  status = "Start uploading the encrypt content onto IPFS"
  const cid = await storeJson(nftItemData);
  addSuccess("Upload the encrypt content onto IPFS Successed!");

  status = "Start submiting item data onto blockchain"
  await writeContract(
    {
      account,
      contractName: 'RWAProtocol',
      functionName: "addItem",
    },
    itemType,
    tokenId,
    cid
  );
  addSuccess("Submit item data onto blockchain Successed!");

  alertSuccess(
    "Create new RWA NFT Gating Content Item successed!",
    async () => {
      router.push(`/options/twitter/${tokenId}`)
      isLoading = false
    }
  );
};
</script>

<template>
  <div bg-white>
    <div class="flex flex-col mx-auto flex-1 w-full max-w-2xl py-8 px-4">
      <div class="flex-1 text-base text-gray-700 leading-7">
        <input class="border-b font-bold border-gray-200 mt-6 tracking-tight w-full p-4 pl-0 text-3xl text-gray-900 sm:text-4xl focus:outline-none" v-model="title" placeholder="Your title here" />
        <div mt-5>
          <label for="tags" class="font-medium leading-6 block">Tags</label>
          <div mt-2>
            <input id="tags" v-model="tags" type="text" name="tags" autocomplete="tags" class="rounded-md border-0 shadow-sm ring-inset w-full py-1.5 px-2 ring-1 ring-gray-300 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Seperated by comma" />
          </div>
        </div>
        <div mt-5>
          <label font-medium text-sm mb-2 text-gray-900 leading-6 block for="excerpt">Excerpt</label>
          <div class="rounded-md border-gray-300 border-1 p-4 block">
            <resize-textarea id="excerpt" v-model="excerpt" w-full placeholder="Write some excerpt" :rows="2" :cols="4" />
          </div>
        </div>
        <div mt-5>
          <label for="cover-photo" class="font-medium leading-6 block">Content Cover Image</label>
          <BsBoxBanner v-model="image" title="Cover Photo" class="mt-2" />
        </div>
        <div mt-5 flex justify="between">
          <div>
            <label for="category" class="font-medium text-sm mb-2 text-gray-900 leading-6 block">Category</label>
            <BsFormSelect id="category" v-model="category" :list="categoryList" min-w-60 :has-add-new="true" />
          </div>
          <div hidden>
            <label for="itemType" class="font-medium text-sm mb-2 text-gray-900 leading-6 block">Type</label>
            <BsFormSelect id="itemType" v-model="itemType" :list="itemTypeList" min-w-60 :has-add-new="false" />
          </div>
        </div>
        <div mt-5>
          <label font-medium text-sm mb-2 text-gray-900 leading-6 block for="content">Content for Unlock</label>
          <div class="rounded-md border-gray-300 border-1 p-4 block">
            <resize-textarea id="content" v-model="content" w-full placeholder="Write some content that for paid readers" :rows="2" :cols="4" />
          </div>
        </div>
        <h3 font-medium text-sm mb-2 text-gray-500 leading-6 block mt-10 pt-8 border-t border-gray-200>Payment</h3>
        <div mt-5>
          <BsFormToggle title="Enable NFT Holder Gating" v-model="requireNFTPass">
            This encrypted content requires the reader to hold your Share NFT to unlock
          </BsFormToggle>
        </div>
        <div v-show="requireNFTPass" mt-2 flex justify="end" items-center>
          <label font-medium text-sm text-gray-600 leading-6 block>How many NFTs should the reader hold to unlock?</label>
          <input id="requiredNFTCount" type="number" v-model="requiredNFTCount" name="requiredNFTCount" autocomplete="requiredNFTCount" class="rounded-md border-0 shadow-sm ring-inset ml-4 py-1.5 px-2 ring-1 ring-gray-300 text-gray-900 w-40 block sm:max-w-xs placeholder:text-gray-400 sm:text-sm sm:leading-6" />
        </div>
        <div mt-5>
          <BsFormToggle title="Enable One Time Payment" v-model="enableOneTimePayment">
            Readers can pay for the content's SBT to unlock it, work as a one-time payment
          </BsFormToggle>
        </div>
        <div v-show="enableOneTimePayment" mt-2>
          <div mt-2 flex justify="end" items-center>
            <label font-medium text-sm text-gray-600 leading-6 block>How much $BST should the reader to pay for this SBT?</label>
            <div class="rounded-md flex shadow-sm ml-4">
              <input id="oneTimePaymentBasicPrice" type="number" v-model="oneTimePaymentBasicPrice" name="oneTimePaymentBasicPrice" class="rounded-none rounded-l-md border-0 flex-1 ring-inset min-w-0 py-1.5 pl-2 ring-1 ring-gray-300 text-gray-900 w-25 block placeholder:text-gray-400 sm:text-sm sm:leading-6" />
              <span class="border rounded-r-md border-l-0 border-gray-300 px-3 text-gray-500 inline-flex items-center sm:text-sm">$BST</span>
            </div>
          </div>
          <div mt-2 flex justify="end" items-center>
            <label font-medium text-sm text-gray-600 leading-6 block>Max Supply of the SBT? (0 as unlimit)</label>
            <div class="rounded-md flex shadow-sm ml-4">
              <input id="oneTimePaymentMaxSupply" type="number" v-model="oneTimePaymentMaxSupply" name="oneTimePaymentMaxSupply" class="rounded-md border-0 flex-1 ring-inset min-w-0 py-1.5 pl-2 ring-1 ring-gray-300 text-gray-900 w-25 block placeholder:text-gray-400 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>
        <BsAlertError v-if="error" my-5>
          {{ error.message }}
        </BsAlertError>
        <div v-show="status" flex flex-col justify-center items-center py-4 h-50 ref="statusRef">
          <BsLoadingIcon w-10 h-10 />
          <div mt-2>{{ status }}</div>
        </div>
        <div class="flex pt-8 gap-x-3 justify-end" mt-5 border-t border-gray-200>
          <BsBtnBlack :is-loading="isLoading" @click="doSubmit"> Save </BsBtnBlack>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: landing
</route>
