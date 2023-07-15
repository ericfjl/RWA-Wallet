<script setup lang="ts">
interface Props {
  author: Object;
}
const { author } = defineProps<Props>();

const route = useRoute();
const tokenId = $computed(() => route.params.tokenId);
const { toggle, update } = $(tokenMintStore());

const showMintModal = () => {
  const amount = 1;
  update({
    tokenId,
    amount,
    metaType: "mint",
  });
  toggle();
};
</script>

<template>
  <div class="flex gap-x-4 relative items-center justify-between">
    <div flex>
      <BsBoxImg :src="author.avatar" alt="" class="rounded-full bg-gray-50 h-10 mr-4 w-10" />
      <div class="text-sm leading-6">
        <p class="font-semibold text-gray-900">
          <router-link :to="`/${author.address}`">
            {{ author.firstname }}
            {{ author.lastname }}
          </router-link>
        </p>
        <p class="text-gray-600">
          {{ author.bio }}
        </p>
      </div>
    </div>
    <BsBtnBlack @click="showMintModal">Hold It</BsBtnBlack>
  </div>
</template>
