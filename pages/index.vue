<template>
  <NuxtLayout name="authenticated-layout"> </NuxtLayout>
</template>

<script setup>
// 1. Imports
import { createLogger } from "@/composables/useLogger";

// 2. Name
definePageMeta({
  name: "index",
  middleware: "auth",
});

// Head
useHead({
  title: "Index",
});

// 3. Composables
const logger = createLogger();
logger.debug("This is an debug message");

// 4. Props
const props = defineProps();

// 5. Emits
const emits = defineEmits();

// 6. Data

// 7. Computed

// 8. Watchers

// 9. Lifecycle hooks

// 10. Methods
</script>

<style lang="scss"></style>
