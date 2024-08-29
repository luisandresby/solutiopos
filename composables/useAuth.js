import { authStore } from "@/stores/authStore";
import AuthService from "@/services/AuthService";
import { createLogger } from "@/composables/useLogger";
import { useNotification } from "@/composables/useNotification";
import { useLoadingOverLayStore } from "@/stores/loading-overlay";
import { useI18n } from "vue-i18n";

export function useAuth() {
  const store = authStore();
  const logger = createLogger();
  const { t } = useI18n();
  const { toasterNotify } = useNotification();
  const loadingOverlay = useLoadingOverLayStore();

  const login = (form) => {
    AuthService.login(form)
      .then((response) => {
        const res = response.data;
        logger.debug("login");
        store.setUser(res.user);
        navigateTo("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    AuthService.logout().then(() => {
      store.reset();
      navigateTo("/auth/login");
    });
  };

  const forgotPassword = (form) => {
    loadingOverlay.loadingStart();
    AuthService.forgotPassword(form)
      .then(() => {
        toasterNotify(t("auth.sent-email-reset-password"));
        navigateTo("/auth/login");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loadingOverlay.loadingFinish();
      });
  };

  return {
    login,
    logout,
    forgotPassword,
  };
}
