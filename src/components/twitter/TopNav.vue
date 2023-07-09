<script setup lang="ts">
const route = useRoute();

const path = $computed(() => route.path);

const secondaryNavigation = [
  { name: "Overview", href: "/options/book", current: path === "/options/book" },
  { name: "Activity", href: "#", current: false },
  { name: "Settings", href: "#", current: false },
  { name: "Collaborators", href: "#", current: false },
  { name: "Notifications", href: "#", current: false },
];
</script>

<template>
  <nav class="border-b flex border-white/10 h-18 py-4 overflow-x-auto">
    <ul role="list" class="flex flex-none font-semibold text-sm px-4 text-gray-400 leading-6 gap-x-6 items-center sm:px-6 lg:px-8">
      <li v-for="item in secondaryNavigation" :key="item.name">
        <router-link :to="item.href" :class="item.current ? 'text-indigo-400' : ''">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <div flex-1 space-x-2 flex justify="end" pr-8>
      <router-link v-if="path !== '/options/book/new'" to="/options/book/new" class="rounded-md font-semibold bg-indigo-600 shadow-sm text-sm text-white py-2 px-3 inline-flex items-center hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
        New Book
      </router-link>
    </div>
  </nav>
</template>
