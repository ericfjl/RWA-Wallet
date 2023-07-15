<script setup lang="ts">

</script>

<template>
  <main class="min-h-full relative isolate">
    <img src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75" alt="" class="h-full object-cover object-bottom w-full inset-0 -z-10 absolute">
    <div class=" h-screen mx-auto text-center max-w-7xl py-32 px-6 sm:py-40 lg:px-8">
      <p class="font-semibold text-white text-3xl leading-8">
        404
      </p>
      <h1 class="font-bold mt-4 text-white tracking-tight text-5xl sm:text-5xl">
        Page not found
      </h1>
      <p class="mt-4 text-base text-white/70 sm:mt-6">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div class="flex mt-10 justify-center">
        <button class="font-semibold text-xl text-white leading-7" @click="$router.go(-1)">
          <span aria-hidden="true">&larr;</span> Back
        </button>
      </div>
    </div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
