import { helpers, required, email } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";
import { lowercaseText } from "@/helpers/string";

export function useLoginValidation() {
  const { t } = useI18n();

  const rules = computed(() => ({
    email: {
      required: helpers.withMessage(
        t("validation.required", { attribute: lowercaseText(t("auth.email")) }),
        required
      ),
      email: helpers.withMessage(
        t("validation.email", {
          attribute: lowercaseText(t("auth.email")),
        }),
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
  }));

  return { rules };
}
