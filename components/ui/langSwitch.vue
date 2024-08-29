<template>
  <ClientOnly>
    <BDropdown
      v-model="showDropdownLanguague"
      size="sm"
      no-caret
      end
      variant="link"
      class="navbar-item dropdown-languagues"
    >
      <template #button-content>
        <div class="d-flex align-items-center">
          <img
            :src="currentLang.flag"
            :alt="`flag-of-${currentLang.label}`"
            class="flag-icon"
          />
          <div class="d-none d-sm-inline text-white-100">
            {{ currentLang.label_short.toUpperCase() }}
          </div>
          <b class="caret text-white-100"></b>
        </div>
      </template>
      <BDropdownItem
        v-for="lang in langs"
        :key="lang.label_short"
        @click="setLocale(lang.label_short)"
      >
        <div class="d-flex align-items-center">
          <img
            :src="lang.flag"
            :alt="`flag-of-${lang.label_short}`"
            class="flag-icon"
          />

          <div>
            {{ lang.label }}
          </div>
        </div>
      </BDropdownItem>
    </BDropdown>
  </ClientOnly>
</template>
<script setup>
import { ref, computed } from "vue";
const showDropdownLanguague = ref(false);
const { locale, setLocale } = useI18n();

const langs = ref([
  {
    label: "Español",
    label_short: "es",
    flag: "/es.svg",
  },
  {
    label: "English",
    label_short: "en",
    flag: "/gb.svg",
  },
]);

const currentLang = computed(() => {
  return langs.value.find((lang) => lang.label_short === locale.value);
});
</script>
<style lang="scss">
.dropdown-languagues {
  .btn-link {
    text-decoration: none;
  }
}
.flag-icon {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
</style>
