<script setup lang="ts">
const posts = [
  {
    id: 6,
    title: "The future Of Web3: RWA Wallet",
    href: "#",
    description: `RWA Wallet, which stands for Real World Asset Wallet, is a game-changing innovation in the world of blockchain-based finance. It introduces a new dimension by bridging the gap between traditional financial assets and the emerging decentralized economy. By combining the best features of both worlds, RWA Wallet offers users a unique and powerful financial tool.`,
    imageUrl: "ipfs://bafkreif64ufq5qc67th2pzto2aprficdwg4f7hqz73vqop22hhqed2v2ze",
    date: "Jun 28, 2023",
    datetime: "2020-06-28",
    category: { title: "RWA Wallet", href: "#" },
  },
  {
    id: 5,
    title: "Value Flow: How NFT Artists Are Getting Paid via our RWA Protocol",
    href: "#",
    description: `We will be releasing an NFT project - a collection of 21,000 NFTs. Revenue from this release will flow to the vault of this NFT - an automatic 10% distribution of project earnings to holders of these NFTs.`,
    imageUrl: "ipfs://bafkreiexwiotllck3evtdkure2dmdmfjzcu247ojkdpilinafbpowdgmli",
    date: "Jun 24, 2023",
    datetime: "2020-06-24",
    category: { title: "Membership", href: "#" },
  },
  {
    id: 4,
    title: "How to build your own NFT membership card reading platform via RWA Wallet?",
    href: "#",
    description: `In fact, I have thought about developing this function a few months ago, but as a senior procrastination enthusiast, I have never implemented it.

After seeing the competition held by ETH-Global’s FEVM hackathon, there are only a few days left to develop at this time, so the nerves are tense, and the 2 days of full-body concentration have begun!`,
    imageUrl: "ipfs://bafkreib2di3auwwykb5v4rdtrcjyvbpt6eeqqyrovihj5le2pqekrgbxru",
    date: "Jun 17, 2023",
    datetime: "2020-06-17",
    category: { title: "Membership", href: "#" },
  },
  {
    id: 1,
    title: "Tens of thousands of chains into one",
    href: "#",
    description: `Because we believe that the value of web3 does not lie in any chain, but in the true value of the product. The world will have only one chain or some logic to form a chain.

You can think about our real world: a product in different countries has almost the same price (except taxes and transaction fees), but in different currencies.`,
    imageUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*CaggAi8cFuMRXd883vGkfw.jpeg",
    date: "Jun 16, 2023",
    datetime: "2023-06-16",
    category: { title: "Marketing", href: "#" },
  },
  {
    id: 2,
    title: "The latest technology stack updates related to Web3 development",
    href: "#",
    description: `This week, I started to sign up for the Polkadot Hackathon. This time I plan to make an NFT-Fi-Twitter browser plug-in, which allows Twitter users to post NFT-Gating twitter or comments, and users who want to view encrypted content need to Pay $BST to unlock (the corresponding NFT will be obtained as a payment certificate when you pay to unlock), and a series of technical expansions need to be studied in the process of doing it.`,
    imageUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*rsnO7n7bFBbrQnhCzu4CgQ.jpeg",
    date: "Jun 13, 2023",
    datetime: "2023-06-13",
    category: { title: "Tech", href: "#" },
  },
  {
    id: 1,
    title: "Sign up for Polkadot 2023 Summer Hackathon",
    href: "#",
    description: `Earlier CZ replied to Elon Musk on Twitter about how Web3 can help Twitter reduce bots etc.
In fact, I started thinking about this idea last year, but at that time Web3 technology was not yet mature, and I hadn’t figured out how to implement it.
In fact, the current Mask plug-in can also solve this problem. I’m not sure about the market share of Mask products though.`,
    imageUrl: "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*KyBjIidSQmDEWrfm.png",
    date: "Jun 02, 2023",
    datetime: "2023-06-02",
    category: { title: "Hackathon", href: "#" },
    source: "https://medium.com/@Web3HackerWorld/web3-tea-party-bs-craft-web3hacker-news-4f969f861cba",
  },
  // More posts...
];
</script>

<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto text-center max-w-2xl">
        <h2 class="font-bold tracking-tight text-3xl text-gray-900 sm:text-4xl">NFT Holder Only Content</h2>
        <p class="mt-2 text-lg text-gray-600 leading-8">Get fully access by NFT Holder or One-Time-Payment NFT buyer.</p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl grid gap-x-8 gap-y-20 grid-cols-1 lg:max-w-none lg:mx-0 lg:grid-cols-3">
        <article v-for="post in posts" :key="post.id" class="flex flex-col items-start justify-between">
          <div class="w-full relative">
            <BsBoxImg :src="post.imageUrl" alt="" class="object-cover bg-gray-100 rounded-2xl w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2]" />
            <div class="rounded-2xl ring-inset inset-0 ring-1 ring-gray-900/10 absolute" />
          </div>
          <div class="max-w-xl">
            <div class="flex mt-8 text-xs gap-x-4 items-center">
              <time :datetime="post.datetime" class="text-gray-500">{{ post.date }}</time>
              <a :href="post.category.href" class="rounded-full font-medium bg-gray-50 py-1.5 px-3 text-gray-600 z-10 relative hover:bg-gray-100">{{
                post.category.title
              }}</a>
            </div>
            <div class="group relative">
              <h3 class="font-semibold mt-3 text-lg text-gray-900 leading-6 group-hover:text-gray-600">
                <router-link :to="`/options/twitter/${post.tokenId}/${post.itemId}-${post.title}`">
                  <span class="inset-0 absolute" />
                  {{ post.title }}
                </router-link>
              </h3>
              <p class="mt-5 text-sm text-gray-600 leading-6 line-clamp-3">{{ post.description }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
