import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";

export function useNotification() {
  const { t } = useI18n();

  const successNotify = (text = "", timer = 2000) => {
    Swal.fire({
      text: t(text),
      icon: "success",
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
    });
  };
  const toasterNotify = (title = "", timer = 2000, icon = "success") => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
    });
    Toast.fire({
      icon,
      title: t(title),
    });
  };
  const errorNotify = (error) => {};
  const confirmNotify = async () => {
    const result = await Swal.fire({
      title: t("notification.confirm-title"),
      text: t("notification.confirm-text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#348fe2",
      cancelButtonColor: "#ff5b57",
      confirmButtonText: t("notification.confirm-buttom-text"),
      cancelButtonText: t("notification.confirm-cancel-buttom-text"),
      allowOutsideClick: false,
    });
    return {
      isConfirmed: result.isConfirmed,
    };
  };
  return {
    successNotify,
    toasterNotify,
    errorNotify,
    confirmNotify,
  };
}
