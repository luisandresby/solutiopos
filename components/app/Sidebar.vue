<script setup>
import { onMounted } from "vue";
import { useAppOptionStore } from "@/stores/app-option";
import { useSidebar } from "@/composables/app/useSidebar";
import { useI18n } from "vue-i18n";
import { appSidebarMenu } from "@/helpers/sidebar-menu";
// appOption
const appOption = useAppOptionStore();
const sidebarMenu = appSidebarMenu();
const { t } = useI18n();

// sidebar
const {
  appSidebarMobileToggled,
  handleSidebarMinifyFloatMenu,
  handleSidebarMenuToggle,
} = useSidebar();

onMounted(() => {
  var targetSidebar = document.querySelector(
    ".app-sidebar:not(.app-sidebar-end)"
  );
  var expandTime =
    targetSidebar && targetSidebar.getAttribute("data-disable-slide-animation")
      ? 0
      : 250;
  var disableAutoCollapse =
    targetSidebar && targetSidebar.getAttribute("data-disable-auto-collapse")
      ? 1
      : 0;

  var menuBaseSelector = ".app-sidebar .menu > .menu-item.has-sub";
  var submenuBaseSelector = " > .menu-submenu > .menu-item.has-sub";

  // menu
  var menuLinkSelector = menuBaseSelector + " > .menu-link";
  var menus = [].slice.call(document.querySelectorAll(menuLinkSelector));
  handleSidebarMenuToggle(menus, expandTime);

  // submenu lvl 1
  var submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
  var submenusLvl1 = [].slice.call(
    document.querySelectorAll(submenuLvl1Selector + " > .menu-link")
  );
  handleSidebarMenuToggle(submenusLvl1, expandTime);

  // submenu lvl 2
  var submenuLvl2Selector =
    menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
  var submenusLvl2 = [].slice.call(
    document.querySelectorAll(submenuLvl2Selector + " > .menu-link")
  );
  handleSidebarMenuToggle(submenusLvl2, expandTime);

  handleSidebarMinifyFloatMenu();

  if (localStorage) {
    if (typeof localStorage.appSidebarMinified !== "undefined") {
      appOption.appSidebarMinified = localStorage.appSidebarMinified;
    }
  }
});
</script>
<template>
  <div id="sidebar" class="app-sidebar" data-bs-theme="dark">
    <perfect-scrollbar
      class="app-sidebar-content"
      :class="{ 'h-100': appOption.appSidebarFixed }"
    >
      <div class="menu">
        <template v-for="menu in sidebarMenu">
          <div class="menu-header" v-if="menu.is_header">
            {{ t(`menu.${menu.text}`) }}
          </div>
          <template v-else>
            <AppSidebarNav v-if="menu.title" :menu="menu" />
          </template>
        </template>
        <!-- END minify-button -->
      </div>
    </perfect-scrollbar>
  </div>
  <div class="app-sidebar-bg" data-bs-theme="dark"></div>
  <div class="app-sidebar-mobile-backdrop">
    <a href="#" @click="appSidebarMobileToggled" class="stretched-link"></a>
  </div>
</template>
