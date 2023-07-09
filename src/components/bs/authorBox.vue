<script setup lang="ts">
interface Props {
  author: Object;
}
const { author } = defineProps<Props>();
const holdIt = async () => {
  console.log("====> holdIt :");
};
</script>

<template>
  <div class="flex gap-x-4 relative items-center justify-between">
    <div flex>
      <BsBoxImg :src="author.avatar" alt="" class="rounded-full bg-gray-50 h-10 w-10 mr-4" />
      <div class="text-sm leading-6">
        <p class="font-semibold text-gray-900">
          <router-link :to="`/${author.address}`">
            <span class="inset-0 absolute" />
            {{ author.firstname }}
            {{ author.lastname }}
          </router-link>
        </p>
        <p class="text-gray-600">
          {{ author.bio }}
        </p>
      </div>
    </div>
    <BsBtnIndigo @click="holdIt"> Hold It </BsBtnIndigo>
  </div>
</template>
