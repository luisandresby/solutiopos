// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        "data-bs-theme": "dark",
      },
    },
  },
  ssr: false,
  compatibilityDate: "2024-04-03",
  devServer: {
    host: "solutiopos.local",
    port: 3000,
  },
  modules: [
    "@pinia/nuxt",
    [
      "@pinia-plugin-persistedstate/nuxt",
      {
        piniaPersistedstate: {
          storage: "localStorage",
        },
      },
    ],
    [
      "@nuxtjs/i18n",
      {
        vueI18n: "./i18n.config.js",
      },
    ],
    "@bootstrap-vue-next/nuxt",
    "@vueuse/nuxt",
  ],
  css: ["@/assets/scss/index.scss"],
  devtools: { enabled: false },
  vite: {
    resolve: {
      alias: {
        "@/components": "components",
        "@/composables": "composables",
        "@/stores": "stores",
        "@/helpers": "helpers",
        "@/services": "services",
        "@/validations": "validations",
        "@/assets": "assets",
      },
    },
  },
});
