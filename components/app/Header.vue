<script setup>
import { onMounted, ref } from "vue";
import { useHeader } from "~/composables/app/useHeader";
import { useAuth } from "@/composables/useAuth";

import { useAppOptionStore } from "@/stores/app-option";

const appOption = useAppOptionStore();
const notificationData = [
  {
    icon: "fa fa-bug media-object bg-gray-500",
    title:
      'Server Error Reports <i class="fa fa-exclamation-circle text-danger"></i>',
    time: "3 minutes ago",
  },
];

const {
  toggleAppSidebarMobileToggled,
  toggleAppSidebarEndMobileToggled,
  toggleAppTopMenuMobileToggled,
  handleWindowResize,
} = useHeader();

const showDropdownNotification = ref(false);
const showDropdownUser = ref(false);
const { logout } = useAuth();
onMounted(() => {
  handleWindowResize();
});

const handleLogout = () => {
  logout();
};
</script>

<template>
  <div id="header" class="app-header">
    <!-- BEGIN navbar-header -->
    <div class="navbar-header">
      <button
        type="button"
        class="navbar-mobile-toggler"
        v-if="appOption.appSidebarTwo"
        v-on:click="toggleAppSidebarEndMobileToggled"
      >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <NuxtLink to="/" class="navbar-brand">
        <span class="navbar-logo"></span>Solutio<b>POS</b>
      </NuxtLink>
      <button
        type="button"
        class="navbar-mobile-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#top-navbar"
        v-if="appOption.appMegaMenu && !appOption.appSidebarTwo"
      >
        <span class="fa-stack fa-lg">
          <i class="far fa-square fa-stack-2x"></i>
          <i class="fa fa-cog fa-stack-1x mt-1px"></i>
        </span>
      </button>
      <button
        type="button"
        class="navbar-mobile-toggler"
        v-if="
          appOption.appTopMenu &&
          !appOption.appSidebarHide &&
          !appOption.appSidebarTwo
        "
        v-on:click="toggleAppTopMenuMobileToggled"
      >
        <span class="fa-stack fa-lg">
          <i class="far fa-square fa-stack-2x"></i>
          <i class="fa fa-cog fa-stack-1x mt-1px"></i>
        </span>
      </button>
      <button
        type="button"
        class="navbar-mobile-toggler"
        v-if="
          appOption.appTopMenu &&
          appOption.appSidebarHide &&
          !appOption.appSidebarTwo
        "
        v-on:click="toggleAppTopMenuMobileToggled($event)"
      >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <button
        type="button"
        class="navbar-mobile-toggler"
        v-if="!appOption.appSidebarHide"
        v-on:click="toggleAppSidebarMobileToggled($event)"
      >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
    <!-- END navbar-header -->

    <!-- BEGIN header-nav -->
    <div class="navbar-nav">
      <!-- notifications -->
      <ClientOnly>
        <BDropdown
          v-model="showDropdownNotification"
          size="sm"
          no-caret
          end
          variant="link"
          class="navbar-item notification"
        >
          <template #button-content>
            <UiBaseIcon name="bell" size="1.2rem" />
            <span class="badge">{{ notificationData.length }}</span>
          </template>
          <BDropdownHeader>
            {{ $t("notifications").toUpperCase() }} ({{
              notificationData.length
            }})</BDropdownHeader
          >
          <template v-if="notificationData && notificationData.length > 0">
            <BDropdownItem
              v-for="(notification, index) in notificationData"
              v-bind:key="index"
              class="media"
            >
              <div class="media-left">
                <i
                  v-if="notification.icon"
                  v-bind:class="notification.icon"
                ></i>
                <i
                  v-if="notification.iconMedia"
                  v-bind:class="notification.iconMedia"
                ></i>
                <img
                  v-if="notification.img"
                  v-bind:src="notification.img"
                  class="media-object"
                  alt=""
                />
              </div>
              <div class="media-body">
                <h6 class="media-heading" v-html="notification.title"></h6>
                <p v-if="notification.desc" v-html="notification.desc"></p>
                <div class="text-muted fs-10px">{{ notification.time }}</div>
              </div>
            </BDropdownItem>
          </template>
          <template v-else>
            <BDropdownItem>
              <div class="text-center w-300px py-3">
                {{ $t("notifications-text") }}
              </div>
            </BDropdownItem>
          </template>
        </BDropdown>
      </ClientOnly>
      <!-- Idiomas -->
      <UiLangSwitch />
      <!-- user -->
      <ClientOnly>
        <BDropdown
          v-model="showDropdownUser"
          size="sm"
          end
          no-caret
          variant="link"
          class="navbar-item navbar-user me-3 dropdown-user"
        >
          <template #button-content>
            <div class="d-flex align-items-center">
              <div class="image image-icon bg-gray-800 text-gray-600">
                <UiBaseIcon name="person-circle" />
              </div>
              <span>
                <span class="d-none d-md-inline text-white-100"
                  >Adam Schwartz</span
                >
                <b class="caret text-white-100"></b>
              </span>
            </div>
          </template>
          <BDropdownItem>{{ $t("user-profile.edit") }}</BDropdownItem>
          <BDropdownItem>{{ $t("user-profile.settigs") }}</BDropdownItem>
          <BDropdownDivider />
          <BDropdownItem @click="handleLogout">{{
            $t("auth.log-out")
          }}</BDropdownItem>
        </BDropdown>
      </ClientOnly>
    </div>
    <!-- END header-nav -->
  </div>
</template>
<style class="scss">
.notification button .badge {
  position: absolute;
  top: 3px;
  display: block;
  background: var(--bs-app-theme);
  line-height: 12px;
  font-weight: 600;
  color: var(--bs-app-theme-color);
  padding: 3px 6px;
  font-size: 10.5px;
  border-radius: 30px;
  right: 5px;
}
.dropdown-user {
  .btn-link {
    text-decoration: none;
  }
}

.app-header .navbar-user .image.image-icon i {
  margin: 0 auto 0px;
}
</style>
