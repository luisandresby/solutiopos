<template>
  <!-- BEGIN error -->
  <div class="error">
    <div class="error-code">404</div>
    <div class="error-content">
      <div class="error-message">{{ $t("page-error.404") }}</div>
      <div class="error-desc mb-4">
        <span v-html="$t('page-error.404-text')"></span>
      </div>
      <div>
        <NuxtLink to="/auth/login" class="btn btn-success px-3 rounded-pill">
          <span class="me-1">{{ $t("global.back") }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
  <!-- END error -->
</template>
