<template>
  <BFormGroup
    ref="formGroupInput"
    class="mb-3"
    :label="label"
    :label-for="`${label}-input`"
    :invalid-feedback="invalidFeedback"
    :state="state"
  >
    <BFormInput
      :id="`${label}-input`"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :state="state"
      :disabled="disabled"
    />
  </BFormGroup>
</template>
<script setup>
import { ref, watch } from "vue";

definePageMeta({
  name: "uiFormGroupInput",
});

const props = defineProps({
  label: {
    type: [String],
    required: false,
    default: "",
  },
  invalidFeedback: {
    type: [String],
    required: false,
    default: "",
  },
  state: {
    type: [Boolean],
    required: false,
    default: false,
  },
  type: {
    type: [String],
    required: false,
    default: "text",
  },
  placeholder: {
    type: [String],
    required: false,
    default: "",
  },
  disabled: {
    type: [Boolean],
    required: false,
    default: false,
  },
});

const model = defineModel();
</script>
<style lang=""></style>
