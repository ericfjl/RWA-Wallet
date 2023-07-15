<script setup lang="ts">
interface Props {
  tags: [string] | string;
}
const { tags } = defineProps<Props>();

const theTags = $computed(() => {
  if (typeof tags === 'string') return tags.split(',')
  return tags
})
const tagsWithCharCodeNumberSum = theTags.map((tag) => {
  const sum = tag.trim('').split("").reduce((acc, val) => acc + val.charCodeAt(0), 0) % 10;
  const lens = tag.length;
  return { tag, sum, lens };
});
</script>
<template>
  <div gap-x-2 flex>
    <span class="rounded-full font-medium text-xs py-1 px-2 inline-flex items-center" v-for="item in tagsWithCharCodeNumberSum" :class="{
      'text-red-500 bg-red-100': item.sum === 0,
      'text-amber-500 bg-amber-100': item.sum === 1,
      'text-lime-500 bg-lime-100': item.sum === 2,
      'text-green-500 bg-green-100': item.sum === 3,
      'text-cyan-500 bg-cyan-100': item.sum === 4,
      'text-sky-500 bg-sky-100': item.sum === 5,
      'text-violet-500 bg-violet-100': item.sum === 6,
      'text-fuchsia-500 bg-fuchsia-100': item.sum === 7,
      'text-pink-500 bg-pink-100': item.sum === 8,
      'text-rose-500 bg-rose-100': item.sum === 9,
    }">{{ item.tag }}</span>
  </div>
</template>
