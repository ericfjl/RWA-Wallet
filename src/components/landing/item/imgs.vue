<script setup lang="ts">
import avatar from "~/assets/bruce.jpg";
const author = {
  avatar,
  address: "0xFd191B88C97e092222475E7163353d9e83036CD4",
  firstname: "Bruce",
  lastname: "Lai",
  bio: "A Full Stack Web3 Hacker",
};

const tags = ["Wallet", "RWA", "NFT", "Web3", "Twitter", "PFP"];
</script>
``

<template>
  <div class="bg-white relative pb-5">
    <div class="mx-auto max-w-7xl lg:flex lg:justify-between xl:justify-end">
      <div class="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:inset-y-0 xl:right-1/2 xl:w-1/2 xl:absolute">
        <div class="relative xl:ml-0 h-80" lg="-ml-8 w-full grow h-[calc(100vh-184px)]">
          <img class="h-full object-cover bg-gray-50 w-full inset-0 absolute" src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80" alt="" />
        </div>
      </div>
      <div class="pt-6 lg:contents">
        <div class="mx-auto px-12 xl:w-1/2" lg="flex-none mr-0 w-full h-[calc(100vh-184px)] overflow-y-scroll">
          <BsAuthorBox :author="author" sticky top-0 bg-white />
          <BsTags pt-lg :tags="tags" />

          <LandingItemContent />
          <LandingItemTimeline mb-10 />

          <LandingItemCommentbox sticky bottom-0 bg-white />
        </div>
      </div>
    </div>
  </div>
</template>
