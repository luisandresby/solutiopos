import { defineStore } from "pinia";

export const useProgressBarStore = defineStore({
  id: "progressBar",
  state: () => ({
    progressBar: {},
  }),
  actions: {
    setProgressBar(progress) {
      this.progressBar = progress;
    },
    loadingStart() {
      if (this.progressBar) {
        setTimeout(() => {
          this.progressBar.styleBar.display = "block";
        }, 100);
      }
    },
    loadingFinish() {
      if (this.progressBar) {
        this.progressBar.styleBar.display = "none";
      }
    },
  },
});
