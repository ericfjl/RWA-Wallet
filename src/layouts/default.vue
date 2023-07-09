<script setup lang="ts">
import { ref } from "vue";
import { sendMessage } from "webext-bridge/options";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import IcBaselineMenuBook from "~icons/ic/baseline-menu-book";
import MdiTwitter from "~icons/mdi/twitter";

const route = useRoute();

const path = $computed(() => route.path);

const navigation = $computed(() => {
  return [
    // { name: 'Home', href: '#', icon: HomeIcon, current: true },
    { name: "NFTFi Twitter", href: "/options/twitter", icon: MdiTwitter, current: path.startsWith("/options/twitter") },
    // { name: "Book", href: "/options/book", icon: IcBaselineMenuBook, current: path.startsWith("/options/book") },
    // { name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
    // { name: 'Usage', href: '#', icon: ChartBarSquareIcon, current: false },
    // { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
  ];
});
const teams = [
  { id: 1, name: "Planetaria", href: "#", initial: "P", current: false },
  { id: 2, name: "Protocol", href: "#", initial: "P", current: false },
  { id: 3, name: "Tailwind Labs", href: "#", initial: "T", current: false },
];
const sidebarOpen = ref(false);

const router = useRouter();

const doLogout = async () => {
  await sendMessage("storeInMemory", { mnemonicStr: "" }, "background");
  router.push("/options/onboarding/");
};
</script>

<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="z-50 relative xl:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="bg-gray-900/80 inset-0 fixed" />
        </TransitionChild>
        <div class="flex inset-0 fixed">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="flex max-w-xs flex-1 mr-16 w-full relative">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="flex left-full pt-5 top-0 w-16 absolute justify-center">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 text-white w-6" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex flex-col bg-gray-900 px-6 ring-1 ring-white/10 gap-y-5 grow overflow-y-auto">
                <div class="flex h-16 items-center shrink-0">
                  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                </div>
                <nav class="flex flex-col flex-1">
                  <ul role="list" class="flex flex-col flex-1 gap-y-7">
                    <li>
                      <ul role="list" class="space-y-1 -mx-2">
                        <li v-for="item in navigation" :key="item.name">
                          <a :href="item.href" class="rounded-md flex font-semibold text-sm p-2 leading-6 gap-x-3 group" :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800']">
                            <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div class="font-semibold text-xs text-gray-400 leading-6">Your teams</div>
                      <ul role="list" class="space-y-1 -mx-2 mt-2">
                        <li v-for="team in teams" :key="team.name">
                          <a :href="team.href" class="rounded-md flex font-semibold text-sm p-2 leading-6 gap-x-3 group" :class="[team.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800']">
                            <span class="border rounded-lg flex font-medium bg-gray-800 border-gray-700 h-6 text-[0.625rem] text-gray-400 w-6 items-center justify-center shrink-0 group-hover:text-white">{{ team.initial }}</span>
                            <span class="truncate">{{ team.name }}</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto -mx-6">
                      <a href="#" class="flex font-semibold text-sm text-white py-3 px-6 leading-6 gap-x-4 items-center hover:bg-gray-800">
                        <img class="rounded-full bg-gray-800 h-8 w-8" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <span class="sr-only">Your profile</span>
                        <span aria-hidden="true">Tom Cook</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden xl:flex xl:flex-col xl:inset-y-0 xl:w-45 xl:z-50 xl:fixed">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col bg-black/10 px-6 ring-1 ring-white/5 gap-y-5 grow overflow-y-auto">
        <div class="flex h-16 items-center shrink-0">
          <router-link to="/options/">
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="RWA Wallet" />
          </router-link>
        </div>
        <nav class="flex flex-col flex-1">
          <ul role="list" class="flex flex-col flex-1 gap-y-7">
            <li>
              <ul role="list" class="space-y-1 -mx-2">
                <li v-for="item in navigation" :key="item.name">
                  <router-link :to="item.href" class="rounded-md flex font-semibold text-sm p-2 leading-6 gap-x-3 group" :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800']">
                    <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="-mx-6 mt-auto">
              <a @click="doLogout" class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800 cursor-pointer">
                <div i-lucide-log-out class="h-6 w-6 shrink-0" aria-hidden="true" />
                <span class="sr-only">Logout</span>
                <span aria-hidden="true">Logout</span>
              </a>
            </li>
            <!-- <li class="-mx-6 mt-auto">
              <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800">
                <img class="h-8 w-8 rounded-full bg-gray-800" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <span class="sr-only">Your profile</span>
                <span aria-hidden="true">Tom Cook</span>
              </a>
              <Menu as="div" class="relative">
                <MenuButton class="-m-1.5 flex items-center p-1.5">
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span class="hidden lg:flex lg:items-center">
                    <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">Tom Cook</span>
                    <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </MenuButton>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                  >
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <a :href="item.href" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">{{
                        item.name
                      }}</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </li> -->
          </ul>
        </nav>
      </div>
    </div>

    <div class="xl:pl-45">
      <!-- Sticky search header -->
      <!-- <div class="border-b flex bg-gray-900 border-white/5 h-16 shadow-sm px-4 top-0 z-40 gap-x-6 sticky items-center shrink-0 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 text-white p-2.5 xl:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-5 w-5" aria-hidden="true" />
        </button>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form class="flex flex-1" action="#" method="GET">
            <label for="search-field" class="sr-only">Search</label>
            <div class="w-full relative">
              <MagnifyingGlassIcon class="h-full inset-y-0 left-0 text-gray-500 w-5 pointer-events-none absolute" aria-hidden="true" />
              <input id="search-field" class="bg-transparent h-full border-0 text-white w-full py-0 pr-0 pl-8 block sm:text-sm focus:ring-0" placeholder="Search..." type="search" name="search">
            </div>
          </form>
        </div>
      </div> -->

      <RouterView />
    </div>
    <TxPreview />
    <BsNotification />
  </div>
</template>
