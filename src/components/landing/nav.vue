<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import avatar from "~/assets/bruce.jpg";

const user = {
  avatar,
  address: "0xFd191B88C97e092222475E7163353d9e83036CD4",
  firstname: "Bruce",
  lastname: "Lai",
  bio: "A Full Stack Web3 Hacker",
}; 
</script>

<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
      <div class="flex h-16 relative items-center justify-between">
        <div class="flex px-2 items-center lg:px-0">
          <div class="flex-shrink-0">
            <img class="h-8 w-auto block lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            <img class="h-8 w-auto hidden lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
          </div>
          <div class="hidden lg:ml-6 lg:block">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <a href="#" class="rounded-md font-medium text-sm py-2 px-3 text-gray-300 hover:bg-gray-700 hover:text-white">Books</a>
              <a href="#" class="rounded-md font-medium bg-gray-900 text-sm text-white py-2 px-3">Twitter NFT</a>
              <a href="#" class="rounded-md font-medium text-sm py-2 px-3 text-gray-300 hover:bg-gray-700 hover:text-white">About</a>
            </div>
          </div>
        </div>
        <div class="flex flex-1 px-2 justify-center lg:ml-6 lg:justify-end">
          <div class="max-w-lg w-full lg:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div class="flex pl-3 inset-y-0 left-0 pointer-events-none absolute items-center">
                <MagnifyingGlassIcon class="h-5 text-gray-400 w-5" aria-hidden="true" />
              </div>
              <input id="search" name="search" class="rounded-md bg-gray-700 border-0 w-full py-1.5 pr-3 pl-10 text-gray-300 block placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:bg-white focus:ring-0 focus:text-gray-900" placeholder="Search" type="search" />
            </div>
          </div>
        </div>
        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton class="rounded-md p-2 text-gray-400 inline-flex items-center justify-center hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-inset focus:ring-white focus:ring-2">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="h-6 w-6 block" aria-hidden="true" />
            <XMarkIcon v-else class="h-6 w-6 block" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="hidden lg:ml-4 lg:block">
          <div class="flex items-center">
            <button type="button" class="rounded-full bg-gray-800 flex-shrink-0 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="flex-shrink-0 ml-4 relative">
              <div>
                <MenuButton class="rounded-full flex bg-gray-800 text-sm text-white focus:outline-none focus:ring-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span class="sr-only">Open user menu</span>
                  <img class="rounded-full h-8 w-8" :src="user.avatar" alt="" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="bg-white rounded-md shadow-lg ring-black mt-2 py-1 origin-top-right right-0 ring-1 ring-opacity-5 w-48 z-10 absolute focus:outline-none">
                  <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="lg:hidden" v-if="false">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <DisclosureButton as="a" href="#" class="rounded-md font-medium bg-gray-900 text-base text-white py-2 px-3 block">Dashboard</DisclosureButton>
        <DisclosureButton as="a" href="#" class="rounded-md font-medium text-base py-2 px-3 text-gray-300 block hover:bg-gray-700 hover:text-white">Team</DisclosureButton>
        <DisclosureButton as="a" href="#" class="rounded-md font-medium text-base py-2 px-3 text-gray-300 block hover:bg-gray-700 hover:text-white">Projects</DisclosureButton>
        <DisclosureButton as="a" href="#" class="rounded-md font-medium text-base py-2 px-3 text-gray-300 block hover:bg-gray-700 hover:text-white">Calendar</DisclosureButton>
      </div>
      <div class="border-t border-gray-700 pt-4 pb-3">
        <div class="flex px-5 items-center">
          <div class="flex-shrink-0">
            <img class="rounded-full h-10 w-10" :src="user.avatar" alt="" />
          </div>
          <div class="ml-3">
            <div class="font-medium text-base text-white">{{ user.firstname }} {{ user.lastname }}</div>
            <div class="font-medium text-sm text-gray-400">{{ user.address }}</div>
          </div>
          <button type="button" class="rounded-full ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="space-y-1 mt-3 px-2">
          <DisclosureButton as="a" href="#" class="rounded-md font-medium text-base py-2 px-3 text-gray-400 block hover:bg-gray-700 hover:text-white">Your Profile</DisclosureButton>
          <DisclosureButton as="a" href="#" class="rounded-md font-medium text-base py-2 px-3 text-gray-400 block hover:bg-gray-700 hover:text-white">Settings</DisclosureButton>
          <DisclosureButton as="a" href="#" class="rounded-md font-medium text-base py-2 px-3 text-gray-400 block hover:bg-gray-700 hover:text-white">Sign out</DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
