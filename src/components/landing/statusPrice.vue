<template>
  <div class="bg-gray-900 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <dl class="text-center grid gap-x-8 gap-y-16 grid-cols-1 lg:grid-cols-3">
        <div v-for="stat in stats" :key="stat.id" class="flex flex-col mx-auto max-w-xs gap-y-4">
          <dt class="text-base text-gray-400 leading-7">{{ stat.name }}</dt>
          <dd class="order-first font-semibold text-white tracking-tight text-3xl sm:text-5xl">{{ stat.value }}</dd>
        </div>
      </dl>
      <div class="mx-auto max-w-md space-y-4 lg:space-y-0 lg:max-w-5xl lg:grid lg:gap-5 lg:grid-cols-2 mt-20">
        <div v-for="tier in tiers" :key="tier.name" class="rounded-lg flex flex-col shadow-lg overflow-hidden">
          <div class="bg-white py-8 px-6 sm:p-10 sm:pb-6">
            <div>
              <h3 class="rounded-full font-semibold bg-indigo-100 text-base py-1 px-4 text-indigo-600 inline-flex" id="tier-standard">
                {{ tier.name }}
              </h3>
            </div>
            <div class="flex font-bold mt-4 tracking-tight text-6xl items-baseline">
              {{ tier.priceMonthly }}
              <span class="font-medium ml-1 tracking-normal text-2xl text-gray-500">$BST</span>
            </div>
            <p class="mt-5 text-lg text-gray-500">{{ tier.description }}</p>
          </div>
          <div class="flex flex-col space-y-6 bg-gray-50 flex-1 px-6 pt-6 pb-8 justify-between sm:p-10 sm:pt-6">
            <ul role="list" class="space-y-4">
              <li v-for="feature in tier.features" :key="feature" class="flex items-start">
                <div class="flex-shrink-0">
                  <CheckIcon class="h-6 text-green-500 w-6" aria-hidden="true" />
                </div>
                <p class="text-base ml-3 text-gray-700">{{ feature }}</p>
              </li>
            </ul>
            <div class="rounded-md shadow">
              <a :href="tier.href" class="border border-transparent rounded-md flex font-medium bg-gray-800 text-base text-white py-3 px-5 items-center justify-center hover:bg-gray-900" aria-describedby="tier-standard">Mint Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/outline";

const stats = [
  { id: 1, name: "Sold / Max Supply", value: "2434 / 10K" },
  { id: 2, name: "OTP NFT income ($BST)", value: "84572" },
  { id: 3, name: "Total Value Sold ($BST)", value: "103298" },
];

const tiers = [
  {
    name: "Standard",
    href: "#",
    priceMonthly: 100,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    features: [
      "Pariatur quod similique",
      "Sapiente libero doloribus modi nostrum",
      "Vel ipsa esse repudiandae excepturi",
      "Itaque cupiditate adipisci quibusdam",
    ],
  },
  {
    name: "Super",
    href: "#",
    priceMonthly: 1000,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    features: [
      "Pariatur quod similique",
      "Sapiente libero doloribus modi nostrum",
      "Vel ipsa esse repudiandae excepturi",
      "Itaque cupiditate adipisci quibusdam",
    ],
  },
];
</script>
