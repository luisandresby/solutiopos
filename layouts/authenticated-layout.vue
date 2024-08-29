<template>
  <div>
    <AppHeader></AppHeader>
    <AppSidebar />
    <div class="app-content">
      <h2 class="page-header">{{ title }}</h2>
      <BootstrapPanel>
        <BCard>
          <slot />
        </BCard>
      </BootstrapPanel>
    </div>
  </div>
</template>
<script setup>
const layoutCustomProps = useAttrs();

const title = computed(() => {
  return layoutCustomProps.title;
});
</script>
