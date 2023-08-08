<script setup lang="ts">
let { update, toggle } = $(txStore());
import IcBaselineFacebook from '~icons/ic/baseline-facebook'
import MdiInstagram from '~icons/mdi/instagram'
import MdiTwitter from '~icons/mdi/twitter'
import MdiGithub from '~icons/mdi/github'
import BxlYoutube from '~icons/bxl/youtube'
import MaterialSymbolsAddLink from '~icons/material-symbols/add-link'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const image = $ref("");
const name = $ref("My First RWA NFT");
const subTitle = $ref(`We’re changing the way people connect to Web3.`);
const description = $ref(
  `RWA Wallet, which stands for Real World Asset Wallet, is a game-changing innovation in the world of blockchain-based finance. It introduces a new dimension by bridging the gap between traditional financial assets and the emerging decentralized economy. By combining the best features of both worlds, RWA Wallet offers users a unique and powerful financial tool.`
);
const tokenType = "NFTFi-Twitter";
const inviteCommission = $ref(1);
const distributor = $ref("rwa-wallet");
let isLoading = $ref(false);
const category = $ref("Uncategory");
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

const router = useRouter();
const tags = $ref(["Wallet", "RWA", "NFT", "Web3", "Twitter", "PFP"].join(", "));
const basicPrice = $ref(100); // $BSTa
const maxSupply = $ref(10000);
const error = $ref("");

const afterSuccess = async () => {
  router.push("/options/twitter/");
};

const doSubmit = async () => {
  update(
    {
      image,
      name,
      subTitle,
      description,
      category,
      tags,
      tokenType,
      distributor,
      basicPrice,
      maxSupply,
      inviteCommission,
    },
    {
      afterSuccess,
    }
  );
  toggle();
};

const currentStep = $ref('Valuation')
const steps = ['NFT Base Information', 'Valuation', 'Tier Setup', 'Meta && Social Links']
const currentStepIndex = $computed(() => steps.indexOf(currentStep))

const defaultTierData = {
  name: '',
  desc: '',
  benefit: ['']
}
const tierArr = $ref([cloneDeep(defaultTierData)])

const addBenefit = (item, index) => {
  item.benefit.splice(index + 1, 0, '')
}
const removeBenefit = (item, index) => {
  item.benefit.splice(index, 1)
}

const addTier = () => {
  tierArr.push(cloneDeep(defaultTierData))
}

const removeTier = index => {
  tierArr.splice(index, 1)
}

const iconComponentMap = {
  Custom: MaterialSymbolsAddLink,
  Facebook: IcBaselineFacebook,
  Instagram: MdiInstagram,
  Twitter: MdiTwitter,
  Github: MdiGithub,
  Youtube: BxlYoutube,
}
const linkIconList = Object.keys(iconComponentMap)

const links = $ref([
  { icon: 'Twitter', link: 'https://twitter.com/HelloRWA' },
  { icon: 'Github', link: 'https://github.com/HelloRWA' },
])
const addLink = index => {
  links.splice(index + 1, 0, { icon: 'Custom', link: '' })
}

const removeLink = index => {
  links.splice(index, 1)
}
</script>

<template>
  <main>
    <TopNav />
    <div main max-w-4xl text-white text-sm>
      <nav aria-label="Progress" mb-20>
        <ol role="list" class="space-y-4 md:flex md:space-x-8 md:space-y-0">
          <li v-for="(step, index) in steps" :key="step" class="md:flex-1">
            <div v-if="currentStepIndex > index" class="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 group md:border-l-0 md:border-t-4 md:pt-4 md:pb-0 md:pl-0 hover:border-indigo-800">
              <span class="font-medium text-sm text-indigo-600 group-hover:text-indigo-800">Step {{ index + 1 }}</span>
              <span class="font-medium text-sm">{{ step }}</span>
            </div>
            <div v-else-if="currentStepIndex === index" class="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pt-4 md:pb-0 md:pl-0" aria-current="step">
              <span class="font-medium text-sm text-indigo-600">Step {{ index + 1 }}</span>
              <span class="font-medium text-sm">{{ step }}</span>
            </div>
            <div v-else class="flex flex-col border-l-4 border-gray-200 py-2 pl-4 group md:border-l-0 md:border-t-4 md:pt-4 md:pb-0 md:pl-0 hover:border-gray-300">
              <span class="font-medium text-sm text-gray-500 group-hover:text-gray-700">Step {{ index + 1 }}</span>
              <span class="font-medium text-sm">{{ step }}</span>
            </div>
          </li>
        </ol>
      </nav>
      <template v-if="currentStep === 'NFT Base Information'">
        <div class="space-y-12">
          <div class="border-b border-white/10 pb-12">
            <h2 class="font-semibold text-base leading-7">New RWA NFT</h2>
            <p class="mt-1 text-gray-400 leading-6">This information will be publish in the RWA Protocol</p>

            <div class="mt-10 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label for="name" class="font-medium leading-6 block">NFT Name</label>
                <div class="mt-2">
                  <div class="rounded-md flex bg-white/5 ring-inset ring-1 ring-white/10 focus-within:ring-inset focus-within:ring-2 focus-within:ring-indigo-500">
                    <input id="name" v-model="name" type="text" name="name" autocomplete="name" class="bg-transparent border-0 flex-1 py-1.5 px-3 placeholder:text-slate-600 sm: sm:leading-6 focus:ring-0 " placeholder="Your Cool NFT Name" />
                  </div>
                </div>
              </div>
              <div class="col-span-full">
                <label for="subTitle" class="font-medium leading-6 block">NFT Sub Title</label>
                <div class="mt-2">
                  <div class="rounded-md flex bg-white/5 ring-inset ring-1 ring-white/10 focus-within:ring-inset focus-within:ring-2 focus-within:ring-indigo-500">
                    <input id="subTitle" v-model="subTitle" type="text" name="subTitle" autocomplete="subTitle" class="bg-transparent border-0 flex-1 py-1.5 px-3 placeholder:text-slate-600 sm: sm:leading-6 focus:ring-0 " placeholder="The NFT Sub Title" />
                  </div>
                </div>
              </div>

              <div class="col-span-full">
                <label for="cover-photo" class="font-medium leading-6 block">NFT Cover Image</label>
                <BsBoxBanner v-model="image" title="Cover Photo" class="mt-2" />
              </div>

              <div class="col-span-full">
                <label for="about" class="font-medium leading-6 block">NFT Description</label>
                <div class="mt-2">
                  <textarea id="about" v-model="description" name="about" rows="3" class="rounded-md bg-white/5 border-0 shadow-sm ring-inset w-full py-1.5 ring-1 ring-white/10 block sm: sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-500 " />
                </div>
                <p class="mt-3 text-gray-400 leading-6">Write a few sentences about this NFT.</p>
              </div>


            </div>
          </div>


        </div>

        <div class="flex mt-6 gap-x-6 items-center justify-end">
          <BsBtnIndigo @click="currentStep = 'Valuation'"> Next </BsBtnIndigo>
        </div>
      </template>
      <template v-if="currentStep === 'Valuation'">
        <div class="space-y-12">
          <div>
            <h2 class="font-semibold text-base leading-7">Valuation</h2>
            <p class="mt-1 text-gray-400 leading-6">Setup your NFT Valuation.</p>
          </div>

          <div class="col-span-full">
            <label for="basicPrice" class="font-medium leading-6 block">Invest share basic price</label>
            <div class="rounded-md flex shadow-sm mt-2">
              <input id="basicPrice" v-model="basicPrice" type="text" name="basicPrice" autocomplete="basicPrice" class="rounded-none rounded-l-md flex-grow bg-white/5 border-0 ring-inset w-full min-w-0 py-1.5 px-2 ring-1 ring-gray-300 block placeholder:text-slate-600 sm: sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-sky-500 " />
              <span class="border rounded-r-md border-l-0 border-gray-300 px-3 text-gray-500 inline-flex items-center">$BST</span>
            </div>
          </div>

          <div class="col-span-full">
            <label for="maxSupply" class="font-medium leading-6 block">Invest share max supply</label>
            <div class="rounded-md flex shadow-sm mt-2">
              <input id="maxSupply" v-model="maxSupply" type="text" name="maxSupply" autocomplete="maxSupply" class="rounded-md bg-white/5 border-0 shadow-sm ring-inset mt-2 w-full py-1.5 px-2 ring-1 ring-slate-300 block placeholder:text-slate-600 sm: sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-gray-700 " placeholder="" />
            </div>
          </div>
          <div class="border-b border-white/10 pb-12">
            <div mt-5 flex justify="between">
              <span font-bold> Total Valuation </span>
              <span> {{ maxSupply * basicPrice }} $BST </span>
            </div>
            <div mt-5 text-right text-gray-5 leading-5>
              10% of the sales revenue will be shared with these <br />
              share investors according to the corresponding proportion
            </div>
          </div>
          <div class="flex mt-6 gap-x-6 items-center justify-end">

            <button type="button" class="font-semibold leading-6" @click="currentStep = 'NFT Base Information'">Previous</button>
            <BsBtnIndigo :is-loading="isLoading" @click="currentStep = 'Tier Setup'"> Next </BsBtnIndigo>
          </div>
        </div>
      </template>
      <template v-if="currentStep === 'Tier Setup'">
        <div class="space-y-12">
          <div class="border-b border-white/10 pb-12">
            <h2 class="font-semibold text-base leading-7">Tier Step</h2>
            <p class="mt-1 text-gray-400 leading-6">Setup the tier your NFT passcard provide, you can update later.</p>

            <div class="rounded-lg border-gray-3 border-1 mt-6 mt-2 grid p-6 gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6" v-for="(item, index) in tierArr" :key="index">
              <div class="flex col-span-full items-center">
                <label :for="`tier${index}-name`" class="font-medium leading-6 w-30">Tier {{ index + 1 }} Name</label>
                <div class="flex-1">
                  <div class="rounded-md flex bg-white/5 ring-inset ring-1 ring-white/10 focus-within:ring-inset focus-within:ring-2 focus-within:ring-indigo-500">
                    <input :id="`tier${index}-name`" v-model="item.name" type="text" :name="`tier${index}-name`" autocomplete="tierName" class="bg-transparent border-0 flex-1 py-1.5 px-3 placeholder:text-slate-600 sm: sm:leading-6 focus:ring-0 " placeholder="Your Tier Name" />
                  </div>
                </div>
                <BsBtnDefault bg-red ml-4 @click="removeTier(index)" v-if="tierArr.length !== 1">Remove this Tier</BsBtnDefault>
              </div>

              <div class="col-span-full">
                <label :for="`tier${index}-desc`" class="font-medium leading-6 block">Tier {{ index + 1 }} Description</label>
                <div class="mt-2">
                  <textarea :id="`tier${index}-desc`" v-model="item.desc" :name="`tier${index}-desc`" rows="3" class="rounded-md bg-white/5 border-0 shadow-sm ring-inset w-full py-1.5 ring-1 ring-white/10 block sm: sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-500 " />
                </div>
                <p class="mt-3 text-gray-400 leading-6">Write a few sentences about this Tier.</p>
              </div>
              <div col-span-full space-y-6>
                <div class="flex col-span-full items-center" v-for="(_item, _index) in item.benefit" :key="`benefit-${index}-${_index}`">
                  <label :for="`tier${index}-benefit-${_index}`" class="font-medium leading-6 w-30 block">Benefit {{ _index + 1 }} </label>
                  <div class="flex-1">
                    <div class="rounded-md flex bg-white/5 ring-inset ring-1 ring-white/10 focus-within:ring-inset focus-within:ring-2 focus-within:ring-indigo-500">
                      <input :id="`tier${index}-benefit-${_index}`" v-model="item.benefit[_index]" type="text" :name="`tier${index}-benefit-${_index}`" autocomplete="benefitName" class="bg-transparent border-0 flex-1 py-1.5 px-3 placeholder:text-slate-600 sm: sm:leading-6 focus:ring-0 " placeholder="Benefit Name" />
                    </div>
                  </div>
                  <div flex pl-2 space-x-2>
                    <button text-xl i-material-symbols-add-circle-outline-rounded @click="addBenefit(item, _index)">Add Benefit</button>
                    <button text-red text-xl i-ic-round-remove-circle-outline @click="removeBenefit(item, _index)" v-if="item.benefit.length > 1">Remove Benefit</button>
                  </div>
                </div>
              </div>
            </div>
            <div flex justify-end mt-6>
              <BsBtnPlain @click="addTier">Add More Tier</BsBtnPlain>
            </div>
          </div>
        </div>

        <BsAlertError v-if="error" my-5>
          {{ error.message }}
        </BsAlertError>
        <div class="flex mt-6 gap-x-6 items-center justify-end">
          <button type="button" class="font-semibold leading-6" @click="currentStep = 'Valuation'">Previous</button>
          <BsBtnIndigo :is-loading="isLoading" @click="currentStep = 'Meta && Social Links'"> Next </BsBtnIndigo>
        </div>
      </template>
      <template v-if="currentStep === 'Meta && Social Links'">
        <div class="space-y-12">
          <div class="border-b border-white/10 pb-12">
            <h2 class="font-semibold text-base leading-7">Meta && Social Links</h2>
            <p class="mt-1 text-gray-400 leading-6">Setup Meta data and Link to your social link here.</p>

            <div class="mt-10 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
              <div col-span-full>
                <label for="category" class="font-medium mb-2 leading-6 block">Category</label>
                <div class="mt-2">
                  <BsFormSelect id="category" v-model="category" is-dark :list="categoryList" min-w-60 :has-add-new="true" />
                </div>
              </div>
              <div col-span-full>
                <label for="tags" class="font-medium leading-6 block">Tags</label>
                <div mt-2>
                  <input id="tags" v-model="tags" type="text" name="tags" autocomplete="tags" class="rounded-md flex bg-white/5 ring-inset w-full ring-1 ring-white/10 placeholder:text-slate-600 focus-within:ring-inset focus-within:ring-2 focus-within:ring-indigo-500" placeholder="Seperated by comma" />
                </div>
              </div>

              <div class="flex col-span-full items-center" v-for="(item, index) in links" :key="`link-${index}`">
                <div flex min-w-40 items-center justify-between pr-2>
                  <BsFormSelect :id="`link-${index}-icon`" v-model="item.icon" is-dark :list="linkIconList" :has-add-new="false" mr-2>
                    <template #option="slotProps">
                      <li class="cursor-pointer w-full py-2 pr-9 pl-3 relative select-none" :class="[slotProps.active ? 'bg-gray-700 text-white' : 'text-gray-900']">
                        <span class="block truncate" :class="[slotProps.selected ? 'font-semibold' : 'font-normal']">{{ slotProps.item }}</span>
                        <span v-if="slotProps.selected" class="flex pr-4 inset-y-0 right-0 absolute items-center" :class="[slotProps.active ? 'text-white' : 'text-gray-700']">
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </template>
                  </BsFormSelect>
                  <component :is="iconComponentMap[item.icon]" class="h-5 w-auto" />
                </div>
                <div class="rounded-md flex bg-white/5 flex-1 ring-inset ring-1 ring-white/10 focus-within:ring-inset focus-within:ring-2 focus-within:ring-indigo-500">
                  <input :id="`link-${index}`" v-model="item.link" type="text" :name="`link-${index}`" autocomplete="link" class="bg-transparent border-0 flex-1 py-1.5 px-3 placeholder:text-slate-600 sm: sm:leading-6 focus:ring-0 " placeholder="https://" />
                </div>
                <div flex pl-2 space-x-2>
                  <button text-xl i-material-symbols-add-circle-outline-rounded @click="addLink(index)">Add Link</button>
                  <button text-red text-xl i-ic-round-remove-circle-outline @click="removeLink(index)" v-if="links.length > 1">Remove Link</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex mt-6 gap-x-6 items-center justify-end">
          <button type="button" class="font-semibold leading-6" @click="currentStep = 'Tier Setup'">Previous</button>
          <BsBtnIndigo :is-loading="isLoading" @click="doSubmit"> Save </BsBtnIndigo>
        </div>
      </template>
    </div>
  </main>
</template>
