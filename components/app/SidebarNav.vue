<script setup>
const { t } = useI18n();
defineProps({
  menu: {
    type: Object,
    required: false,
    default: () => {},
  },
});
</script>
<template>
  <!-- menu with submenu -->
  <div v-if="menu.children" class="menu-item has-sub">
    <a class="menu-link">
      <span class="menu-icon" v-if="menu.icon">
        <UiBaseIcon :name="menu.icon" />
      </span>
      <span class="menu-text">
        {{ t(`menu.${menu.title}`) }}
      </span>
      <span class="caret" v-if="menu.children"></span>
    </a>
    <div class="menu-submenu">
      <template v-for="submenu in menu.children">
        <AppSidebarNav :menu="submenu" />
      </template>
    </div>
  </div>

  <!-- menu without submenu -->
  <NuxtLink v-else :to="menu.to">
    <div class="menu-item">
      <span class="menu-link">
        <span class="menu-icon" v-if="menu.icon">
          <UiBaseIcon :name="menu.icon" />
        </span>
        <span class="menu-text">
          {{ t(`menu.${menu.title}`) }}
        </span>
      </span>
    </div>
  </NuxtLink>
</template>
