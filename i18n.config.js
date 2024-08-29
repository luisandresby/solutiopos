import messages from "@/helpers/lang-messages";
export default defineI18nConfig(() => ({
  legacy: false,
  locale: window?.navigator?.language ?? "en",
  messages: messages,
}));
