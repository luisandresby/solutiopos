import ApiService from "./ApiService";
import UserService from "./UserService";

const AuthService = {
  token_type: null,
  access_token: null,

  async login(credentials) {
    this.clearParams();
    return ApiService.post("/api/auth/login", credentials).then((res) => {
      this.setParams(res.data);
      return res;
    });
  },

  async logout() {
    try {
      try {
        return await ApiService.delete("/api/auth/logout");
      } catch (err) {
        return err;
      }
    } finally {
      this.clearParams();
    }
  },

  async forgotPassword(form) {
    try {
      return await ApiService.post("/api/forgot-password", form);
    } catch (err) {
      return err;
    }
  },

  async resetPassword(form) {
    try {
      return await ApiService.post("/api/reset", form);
    } catch (err) {
      return err;
    }
  },

  clearParams() {
    localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE);
    this.token_type = null;
    this.access_token = null;
    if (this.renewer_timer !== null) {
      clearTimeout(this.renewer_timer);
      this.renewer_timer = null;
    }
    ApiService.clearCredentials();
    UserService.reset();
  },

  setParams(data) {
    this.token_type = data.token_type;
    this.access_token = data.access_token;
    ApiService.setCredentials(data.token_type, data.access_token);
    this.storeParams();

    if (this.renewer_timer !== null) {
      clearTimeout(this.renewer_timer);
      this.renewer_timer = null;
    }
    if (this.expires_in > 0) {
      // this.renewer_timer = setTimeout(() => { this.refresh(); }, data.expires_in);
    }
  },

  getParams() {
    return {
      token_type: this.token_type,
      access_token: this.access_token,
    };
  },

  storeParams() {
    const params = this.getParams();
    localStorage.setItem(
      import.meta.env.VITE_LOCAL_STORAGE,
      this.crypt(JSON.stringify(params), import.meta.env.VITE_LOCAL_STORAGE)
    );
  },

  loadParams() {
    const params = localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE);
    if (params !== null) {
      const k = this.crypt(params, import.meta.env.VITE_LOCAL_STORAGE);
      this.setParams(JSON.parse(k));
    }
  },

  crypt(input, key) {
    var output = [];
    var charCode;
    for (var i = 0; i < input.length; i++) {
      charCode = input.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
      output.push(String.fromCharCode(charCode));
    }
    return output.join("");
  },

  loggedIn() {
    if (this.access_token == null) {
      this.loadParams();
    }
    return !!this.access_token;
  },
};

export default AuthService;
