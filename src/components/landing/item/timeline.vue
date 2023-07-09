<script setup lang="ts">
import { ChatBubbleLeftEllipsisIcon, TagIcon, UserCircleIcon } from "@heroicons/vue/20/solid";

const activity = [
  {
    id: 1,
    type: "comment",
    person: { name: "Eduardo Benz", href: "#" },
    imageUrl:
      "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    comment: `How are you calculating 'real' rates - e.g. "DAI Savings Rate (DSR), which was providing ~7% subsidised via high interest rates, the “real” DAI yield was between 1%-2%."? The yield after inflation, if so where are you getting the inflation data?`,
    date: "6d ago",
  },
  {
    id: 2,
    type: "assignment",
    person: { name: "Hilary Mahy", href: "#" },
    assigned: { name: "Kristin Watson", href: "#" },
    date: "2d ago",
  },
  {
    id: 3,
    type: "tags",
    person: { name: "Hilary Mahy", href: "#" },
    tags: [
      { name: "Bug", href: "#", color: "fill-red-500" },
      { name: "Accessibility", href: "#", color: "fill-indigo-500" },
    ],
    date: "6h ago",
  },
  {
    id: 4,
    type: "comment",
    person: { name: "Jason Meyers", href: "#" },
    imageUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    comment: `Fantastic article - simple message, eloquently delivered. Hadn’t considered the cyclical nature of DeFi yields, especially in relation to stablecoins.

It’s true that new hype cycles will spawn a new bull market to drive up yields and increase activity across DeFi platforms.

Quick question related to the Yearn images above - why is it that USDC yields less than the ‘risk-free rate’. Given it’s a USDC product, shouldn’t we expect yields matching those of traditional deposit accounts? Am I missing something here?

Thanks again for sharing!`,
    date: "2h ago",
  },
];
</script>
<template>
  <div class="border-t border-gray-900/10 mt-10 flow-root">
    <h3 my-4 text-gray-4>4 Activities</h3>
    <ul role="list" class="-mb-8">
      <li v-for="(activityItem, activityItemIdx) in activity" :key="activityItem.id">
        <div class="pb-8 relative">
          <span v-if="activityItemIdx !== activity.length - 1" class="h-full -ml-px bg-gray-200 top-5 left-5 w-0.5 absolute" aria-hidden="true" />
          <div class="flex space-x-3 relative items-start">
            <template v-if="activityItem.type === 'comment'">
              <div class="relative">
                <img class="rounded-full flex bg-gray-400 h-10 ring-white ring-8 w-10 items-center justify-center" :src="activityItem.imageUrl" alt="" />

                <span class="bg-white rounded-tl py-px px-0.5 -right-1 -bottom-0.5 absolute">
                  <ChatBubbleLeftEllipsisIcon class="h-5 text-gray-400 w-5" aria-hidden="true" />
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <div>
                  <div class="text-sm">
                    <a :href="activityItem.person.href" class="font-medium text-gray-900">{{ activityItem.person.name }}</a>
                  </div>
                  <p class="mt-0.5 text-sm text-gray-500">Commented {{ activityItem.date }}</p>
                </div>
                <div class="mt-2 text-sm text-gray-700">
                  <p>{{ activityItem.comment }}</p>
                </div>
              </div>
            </template>
            <template v-else-if="activityItem.type === 'assignment'" condition="activityItem.type === 'assignment'">
              <div>
                <div class="px-1 relative">
                  <div class="rounded-full flex bg-gray-100 h-8 ring-white ring-8 w-8 items-center justify-center">
                    <UserCircleIcon class="h-5 text-gray-500 w-5" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div class="flex-1 min-w-0 py-1.5">
                <div class="text-sm text-gray-500">
                  <a :href="activityItem.person.href" class="font-medium text-gray-900">{{ activityItem.person.name }}</a>
                  {{ " " }}
                  assigned
                  {{ " " }}
                  <a :href="activityItem.assigned.href" class="font-medium text-gray-900">{{ activityItem.assigned.name }}</a>
                  {{ " " }}
                  <span class="whitespace-nowrap">{{ activityItem.date }}</span>
                </div>
              </div>
            </template>
            <template v-else-if="activityItem.type === 'tags'" condition="activityItem.type === 'tags'">
              <div>
                <div class="px-1 relative">
                  <div class="rounded-full flex bg-gray-100 h-8 ring-white ring-8 w-8 items-center justify-center">
                    <TagIcon class="h-5 text-gray-500 w-5" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div class="flex-1 min-w-0 py-0">
                <div class="text-sm text-gray-500 leading-8">
                  <span class="mr-0.5">
                    <a :href="activityItem.person.href" class="font-medium text-gray-900">{{ activityItem.person.name }}</a>
                    {{ " " }}
                    added tags
                  </span>
                  {{ " " }}
                  <span class="mr-0.5">
                    <template v-for="tag in activityItem.tags" :key="tag.name">
                      <a :href="tag.href" class="rounded-full font-medium ring-inset text-xs py-1 px-2 ring-1 ring-gray-200 text-gray-900 gap-x-1.5 inline-flex items-center">
                        <svg :class="[tag.color, 'h-1.5 w-1.5']" viewBox="0 0 6 6" aria-hidden="true">
                          <circle cx="3" cy="3" r="3" />
                        </svg>
                        {{ tag.name }}
                      </a>
                      {{ " " }}
                    </template>
                  </span>
                  <span class="whitespace-nowrap">{{ activityItem.date }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
