import { defineStore } from "pinia";

export const authStore = defineStore({
  id: "authStore",
  state: () => ({
    user: {},
    logged: false,
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  actions: {
    setUser(user) {
      this.user = user;
      if (this.user) {
        this.logged = true;
      }
    },
    reset() {
      this.user = {};
      this.logged = false;
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
});
