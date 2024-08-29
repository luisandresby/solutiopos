<template>
  <UiBaseContainerForm>
    <template #form-inputs>
      <uiFormGroupInput
        v-model="form.email"
        :label="$t('auth.email')"
        type="email"
        :invalid-feedback="errorMessage('email')"
        :state="!validateState('email')"
        :disabled="true"
      />
      <uiFormGroupInput
        v-model="form.password"
        :label="$t('auth.password')"
        type="password"
        :invalid-feedback="errorMessage('password')"
        :state="!validateState('password')"
      />
      <uiFormGroupInput
        v-model="form.password_confirmation"
        :label="$t('auth.password_confirmation')"
        type="password"
        :invalid-feedback="errorMessage('password_confirmation')"
        :state="!validateState('password_confirmation')"
      />
    </template>
    <template #form-buttons>
      <UiBaseButton @click="handleResetPassword" block class="w-100">
        <template #text>
          {{ $t("auth.login") }}
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
import { useRoute } from "vue-router";
import { useValidation } from "@/composables/validation/useValidation";
import { useResetPasswordValidation } from "@/composables/validation/useResetPasswordValidation";

// 2. Name
definePageMeta({
  name: "auth-reset-password",
  layout: "guest-layout",
});

// Head
useHead({
  title: "Reset Password",
});
const route = useRoute();

// 4. Props
const props = defineProps();

// 5. Emits
const emits = defineEmits();

// 6. Data
const email = ref(route.params.email.replace(/@@/g, "."));
const token = ref(route.params.token);
const form = reactive({
  email: email.value,
  token: token.value,
  password: "",
  password_confirmation: "",
});

// 3. Composables
// para usar en la validación en el sameAs
const passwordComputed = computed(() => form.password);
const { rules } = useResetPasswordValidation(passwordComputed);
const { formTouch, formValidation, validateState, errorMessage } =
  useValidation(rules, form);
// 7. Computed

// 8. Watchers

// 9. Lifecycle hooks

// 10. Methods
const handleResetPassword = async () => {
  formTouch();

  const validate = await formValidation();
  if (!validate) return;
};
</script>

<style lang="scss"></style>
