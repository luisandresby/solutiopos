import AuthService from "@/services/AuthService";
export default defineNuxtRouteMiddleware((to, from) => {
  if (!AuthService.loggedIn()) {
    return navigateTo("/auth/login");
  }
});
