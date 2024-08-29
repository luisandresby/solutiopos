import { helpers, required, email, sameAs } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";
import { lowercaseText } from "@/helpers/string";

export function useResetPasswordValidation(password) {
  const { t } = useI18n();

  const rules = computed(() => ({
    email: {
      required: helpers.withMessage(
        t("validation.required", { attribute: lowercaseText(t("auth.email")) }),
        required
      ),
      email: helpers.withMessage(
        t("validation.email", { attribute: lowercaseText(t("auth.email")) }),
        email
      ),
    },
    password: {
      required: helpers.withMessage(
        t("validation.required", {
          attribute: lowercaseText(t("auth.password")),
        }),
        required
      ),
    },
    password_confirmation: {
      required: helpers.withMessage(
        t("validation.required", {
          attribute: lowercaseText(t("auth.password_confirmation")),
        }),
        required
      ),
      sameAs: helpers.withMessage(
        t("validation.same", {
          attribute: lowercaseText(t("auth.password_confirmation")),
          other: lowercaseText(t("auth.password")),
        }),
        sameAs(password)
      ),
    },
  }));

  return { rules };
}
