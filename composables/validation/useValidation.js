import { useVuelidate } from "@vuelidate/core";

export function useValidation(rules, form) {
  const v$ = useVuelidate(rules, form);

  const validateState = (name) => {
    const { $dirty, $invalid } = v$?.value[name];
    return $dirty ? $invalid : null;
  };

  const errorMessage = (name) => v$.value[name]?.$errors[0]?.$message;

  const formTouch = () => v$.value.$touch();

  const formValidation = () => v$.value.$validate();

  return {
    formTouch,
    formValidation,
    validateState,
    errorMessage,
  };
}
