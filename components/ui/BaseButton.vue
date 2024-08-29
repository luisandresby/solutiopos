<template>
  <BButton :variant="variant" pill @click="handleClick">
    <div class="d-flex justify-content-center align-items-center gap-2">
      <slot name="icon"></slot>
      <slot name="text"></slot>
    </div>
  </BButton>
</template>

<script setup>
// 1. Imports
import { BButton } from "bootstrap-vue-next";
// 2. Name
definePageMeta({
  name: "UIiBaseButton",
});

// 4. Props
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
});

// 5. Emits
const emits = defineEmits(["click"]);

// 10. Methods
const handleClick = () => {
  emits("click");
};
</script>

<style lang="scss"></style>
