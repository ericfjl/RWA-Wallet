<script setup lang="ts">
const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    tokenId: "0",
    price: "48 $BST",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    tokenId: "1",
    price: "35 $BST",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt: "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    tokenId: "2",
    price: "89 $BST",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt: "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    tokenId: "3",
    price: "35 $BST",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt: "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  // More products...
];
</script>

<template>
  <div class="main">
    <h2 class="sr-only">Products</h2>

    <div class="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 xl:grid-cols-4">
      <router-link v-for="product in products" :key="product.id" :to="`/options/book/${product.tokenId}`" class="group">
        <div class="rounded-lg bg-gray-200 w-full overflow-hidden aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7">
          <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full object-cover object-center w-full group-hover:opacity-75" />
        </div>
        <h3 class="mt-4 text-sm text-gray-400">{{ product.name }}</h3>
        <p class="font-medium mt-1 text-lg text-white">{{ product.price }}</p>
      </router-link>
    </div>
  </div>
</template>
