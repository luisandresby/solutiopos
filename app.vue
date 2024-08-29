<template>
  <div
    class="app"
    :class="{
      'app-sidebar-mobile-toggled': appOption.appSidebarMobileToggled,
    }"
  >
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
<script setup>
const appOption = useAppOptionStore();
</script>
<style></style>
