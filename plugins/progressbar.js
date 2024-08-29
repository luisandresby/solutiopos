import { defineNuxtPlugin } from "#app";
import Vue3ProgressBar from "@ctechhindi/vue3-progress-bar";
const options = {
  height: "0.1rem",
};
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3ProgressBar, options);
});
