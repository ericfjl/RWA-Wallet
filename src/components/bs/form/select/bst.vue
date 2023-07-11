<script setup lang="ts">
import { formatUnits } from "viem";
interface Props {
  modelValue: string | Object | BigInt;
  balanceEnough: boolean;
}
const { modelValue } = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "update:balanceEnough"]);

const { payTokenList, bstBalance, payBy } = $(appStore());

watchEffect(() => {
  if (bstBalance < BigInt(modelValue.toString())) emit("update:balanceEnough", false);
  else emit("update:balanceEnough", true);
});
</script>

<template>
  <div v-bind="$attrs">
    <div flex-bc>
      <div>Pay By</div>
      <div flex justify="end" items-center>
        <BsFormSelect id="payBy" v-model="payBy" :list="payTokenList" />
      </div>
    </div>
    <div flex-bc>
      <div>Your balance</div>
      <div>{{ formatUnits(bstBalance, 18) }} {{ payBy }}</div>
    </div>
    <div flex-bc>
      <div>
        <slot />
      </div>
      <div flex justify="end" items-center>{{ formatUnits(modelValue.toString(), 18) }} {{ payBy }}</div>
    </div>
  </div>
</template>
