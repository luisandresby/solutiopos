import { defineStore } from "pinia";
import { useLoading } from "vue-loading-overlay";
const $loading = useLoading({
  loader: "bars",
  color: "#00acac",
  opacity: 0.1,
  height: 25,
});

export const useLoadingOverLayStore = defineStore({
  id: "loadingOverlay",
  state: () => ({
    loader: null,
  }),
  actions: {
    loadingStart() {
      this.loader = $loading.show();
    },
    loadingFinish() {
      this.loader.hide();
    },
  },
});
