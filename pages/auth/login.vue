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
      <uiFormGroupInput
        v-model="form.password"
        :label="$t('auth.password')"
        :invalid-feedback="errorMessage('password')"
        :state="!validateState('password')"
        type="password"
      />
    </template>
    <template #form-buttons>
      <UiBaseButton @click="handleSubmit" block class="w-100">
        <template #text>
          {{ $t("auth.login") }}
        </template>
      </UiBaseButton>
    </template>
  </UiBaseContainerForm>
  <div class="mt-3 text-end">
    <b>
      <NuxtLink to="/auth/recoverpwd">
        {{ $t("auth.reset-password") }}</NuxtLink
      >
    </b>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useValidation } from "@/composables/validation/useValidation";
import { useLoginValidation } from "@/composables/validation/useLoginValidation";

definePageMeta({
  name: "auth/login",
  layout: "guest-layout",
});
useHead({
  title: "Login",
});
const form = reactive({
  email: "luisandresby@gmail.com",
  password: "lb12345678",
});

const { rules } = useLoginValidation();
const { formTouch, formValidation, validateState, errorMessage } =
  useValidation(rules, form);

const { login } = useAuth();

// 10. Methods
const handleSubmit = async () => {
  formTouch();

  const validate = await formValidation();
  if (!validate) return;
  login(form);
};
</script>
<style lang="scss"></style>
