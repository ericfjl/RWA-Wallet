<script setup>
const people = [
  {
    name: "GutterMelo",
    email: "0.09 ETH",
    role: "Notable",
    imageUrl: "https://i.seadn.io/gcs/files/ca757e6e96ab0ba4501613714c4c2488.png?auto=format&dpr=1&h=500&fr=1",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Mutant Ape Yacht Club",
    email: "5.94 ETH",
    role: "Notable",
    imageUrl:
      "https://i.seadn.io/gae/5c-HcdLMinTg3LvEwXYZYC-u5nN22Pn5ivTPYA4pVEsWJHU1rCobhUlHSFjZgCHPGSmcGMQGCrDCQU8BfSfygmL7Uol9MRQZt6-gqA?auto=format&dpr=1&h=500&fr=1",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Azuki Elemental Beans",
    email: "1.68 ETH",
    role: "Notable",
    imageUrl: "https://i.seadn.io/gcs/files/f0613a60a26a9241b85456ad2b68673b.jpg?auto=format&dpr=1&h=500&fr=1",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
];
</script>

<template>
  <div p-5 min-h-screen>
    <ul role="list" class="divide-y divide-gray-800">
      <li v-for="person in people" :key="person.email" class="flex justify-between gap-x-6 py-5">
        <div class="flex gap-x-4">
          <img class="h-12 w-12 flex-none rounded-full bg-gray-800" :src="person.imageUrl" alt="" />
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-white">{{ person.name }}</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-400">{{ person.email }}</p>
          </div>
        </div>
        <div class="hidden sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-white">{{ person.role }}</p>
          <p v-if="person.lastSeen" class="mt-1 text-xs leading-5 text-gray-400">
            Last seen <time :datetime="person.lastSeenDateTime">{{ person.lastSeen }}</time>
          </p>
          <div v-else class="mt-1 flex items-center gap-x-1.5">
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
              <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p class="text-xs leading-5 text-gray-400">Online</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
