<script setup lang="ts">
import { CloudArrowUpIcon, ServerIcon } from "@heroicons/vue/20/solid";

// interface Props {
//   modelValue: string;
//   foo?: string;
// }
// let { modelValue, foo = "default-val" } = defineProps<Props>();
// const emit = defineEmits(["update:modelValue"]);
</script>
<template>
  <div>
    <h1 class="font-bold mt-2 tracking-tight text-4xl text-gray-900 sm:text-5xl">The future Of Web3: RWA Wallet</h1>
    <p class="mt-6 text-xl text-gray-700 leading-8">
      Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat
      egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend egestas fringilla sapien.
    </p>
    <div class="max-w-xl mt-10 text-base text-gray-700 leading-7 lg:max-w-none">
      <p>
        Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent
        donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
        enim. Mattis mauris semper sed amet vitae sed turpis id.
      </p>
      <ul role="list" class="space-y-8 mt-8 text-gray-600">
        <li class="flex gap-x-3">
          <CloudArrowUpIcon class="flex-none h-5 mt-1 text-indigo-600 w-5" aria-hidden="true" />
          <span><strong class="font-semibold text-gray-900">Push to deploy.</strong> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
            impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</span>
        </li>
        <li class="flex gap-x-3">
          <div i-ion-lock-closed class="flex-none h-5 mt-1 text-indigo-600 w-5" aria-hidden="true" />
          <span><strong class="font-semibold text-gray-900">SSL certificates.</strong> Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo.</span>
        </li>
        <li class="flex gap-x-3">
          <ServerIcon class="flex-none h-5 mt-1 text-indigo-600 w-5" aria-hidden="true" />
          <span><strong class="font-semibold text-gray-900">Database backups.</strong> Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et
            magna sit morbi lobortis.</span>
        </li>
      </ul>
      <p class="mt-8">
        Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor fermentum dignissim. Lacus diam
        tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel
        integer orci.
      </p>
      <h2 class="font-bold mt-16 tracking-tight text-2xl text-gray-900">No server? No problem.</h2>
      <p class="mt-6">
        Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum
        mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi.
        Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis diam.
      </p>
    </div>
  </div>
</template>
