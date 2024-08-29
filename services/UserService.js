import ApiService from "./ApiService";

const UserService = {
  url: "api/users",
  user: null,

  reset() {
    this.user = null;
  },
  async me() {
    if (this.user === null) {
      return ApiService.get("api/users/me").then(
        (result) => (this.user = result)
      );
    }
    return this.user;
  },

  async index(context) {
    return ApiService.get(this.url + "?" + ApiService.params(context));
  },

  async get(id) {
    return ApiService.get(this.url + "/" + id);
  },

  async create(data) {
    return ApiService.post(this.url, data);
  },

  async update(data) {
    return ApiService.put(this.url + "/" + data.id, data);
  },

  async delete(id) {
    return ApiService.delete(this.url + "/" + id);
  },

  async password_reset(id) {
    return ApiService.post(`${this.url}/password-reset`, { user_id: id });
  },

  async uploadLogo(id, data) {
    return ApiService.post(this.url + "/" + id + "/logo-upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async changePassword(data) {
    return ApiService.put(this.url + "/" + "change-password", data);
  },
  async updateProfile(data) {
    return ApiService.put(this.url + "/" + "update-profile", data);
  },
};

export default UserService;
