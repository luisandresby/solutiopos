<template>
  <BModal
    v-model="show"
    :size="size"
    :hide-header-close="true"
    :hide-backdrop="true"
  >
    <template #title>
      <slot name="title"></slot>
    </template>
    <slot name="body"> </slot>
    <template #footer>
      <div class="d-flex justify-content-center align-items-center gap-2">
        <UiBaseButton @click="handleSave">
          <template #text> Guardar </template>
        </UiBaseButton>
        <slot name="button"></slot>
        <UiBaseButton variant="danger" @click="handleClose">
          <template #text> Cancelar </template>
        </UiBaseButton>
      </div>
    </template>
  </BModal>
</template>

<script setup>
// Imports
import { ref, watch } from "vue";
import { BModal } from "bootstrap-vue-next";
// Name
definePageMeta({
  name: "UiBaseModal",
});

// Props
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
  },
});

// Emits
const emits = defineEmits(["save", "close"]);

// Data
const show = ref(props.showModal);

// Watchers
watch(
  () => props.showModal,
  (newVal) => {
    show.value = newVal;
  }
);

// Methods
const handleSave = () => {
  emits("save");
};
const handleClose = () => {
  emits("cancel");
};
</script>

<style lang="scss"></style>
