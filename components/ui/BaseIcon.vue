<template lang="">
  <i :class="`bi bi-${name} icon-bootstrap`"></i>
</template>
<script setup>
const props = defineProps({
  name: {
    type: String,
    required: false,
    default: "person-circle",
  },
  size: {
    type: String,
    required: false,
    default: ".8rem",
  },
  color: {
    type: String,
    required: false,
    default: "var(--bs-app-sidebar-menu-link-color)",
  },
});
</script>
<style lang="scss">
.icon-bootstrap {
  font-size: v-bind(size);
  color: v-bind(color);
}
</style>
