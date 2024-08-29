<template>
  <UiBaseContainerForm>
    <template #form-inputs>
      <uiFormGroupInput
        v-model="form.email"
        :label="$t('auth.email')"
        :invalid-feedback="errorMessage('email')"
        :state="!validateState('email')"
        type="email"
      />
    </template>
    <template #form-buttons>
      <UiBaseButton @click="handleForgotPassword" block class="w-100">
        <template #text>
          {{ $t("auth.reset-password") }}
        </template>
      </UiBaseButton>
    </template>
  </UiBaseContainerForm>
  <div class="mt-3 text-end">
    <NuxtLink to="/auth/login">
      <span class="me-1">{{ $t("global.back") }}</span>
      <b>{{ $t("auth.login") }} </b>
    </NuxtLink>
  </div>
</template>

<script setup>
// 1. Imports
import { reactive } from "vue";
import { useValidation } from "@/composables/validation/useValidation";
import { UseForgotPasswordValidation } from "@/composables/validation/UseForgotPasswordValidation";
import { useAuth } from "@/composables/useAuth";

// 2. Name
definePageMeta({
  name: "auth/recoverpwd",
  layout: "guest-layout",
});

// Head
useHead({
  title: "Reset Password",
});

// 4. Props
const props = defineProps();

// 5. Emits
const emits = defineEmits();

// 6. Data
const form = reactive({
  email: "luisandresby@gmail.com",
});
// 3. Composables
const { rules } = UseForgotPasswordValidation();
const { formTouch, formValidation, validateState, errorMessage } =
  useValidation(rules, form);

const { forgotPassword } = useAuth();
// 7. Computed

// 8. Watchers

// 9. Lifecycle hooks

// 10. Methods
const handleForgotPassword = async () => {
  formTouch();
  const validate = await formValidation();
  if (!validate) return;
  forgotPassword(form);
};
</script>

<style lang="scss"></style>
