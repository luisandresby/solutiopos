import { useAppOptionStore } from "@/stores/app-option";
import { slideToggle } from "~/composables/app/slideToggle.js";
export function useHeader() {
  const appOption = useAppOptionStore();
  const toggleAppSidebarMobileToggled = () => {
    appOption.appSidebarMobileToggled = !appOption.appSidebarMobileToggled;
  };

  const toggleAppSidebarEndMobileToggled = () => {
    appOption.appSidebarEndMobileToggled =
      !appOption.appSidebarEndMobileToggled;
  };

  const toggleAppTopMenuMobileToggled = (event) => {
    event.preventDefault();
    slideToggle(document.querySelector(".app-top-menu"));
  };

  const handleWindowResize = () => {
    window.addEventListener("resize", function () {
      var elm = document.querySelector(".app-top-menu");
      if (elm) {
        elm.removeAttribute("style");
      }
    });
  };

  return {
    toggleAppSidebarMobileToggled,
    toggleAppSidebarEndMobileToggled,
    toggleAppTopMenuMobileToggled,
    handleWindowResize,
  };
}
