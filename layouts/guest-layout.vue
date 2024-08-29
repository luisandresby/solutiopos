<script setup></script>

<template>
  <div class="login login-v1">
    <div class="login-container">
      <div class="login-header">
        <div class="brand">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <span class="logo"></span>Solutio<b>POS</b>
            </div>
            <UiLangSwitch />
          </div>
        </div>
        <div class="icon">
          <i class="fa fa-lock"></i>
        </div>
      </div>
      <div class="login-body">
        <div class="login-content fs-13px">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
