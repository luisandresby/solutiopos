<template>
  <BContainer>
    <BRow class="mb-3">
      <BCol cols="3">
        <BFormInput
          ref="inputRef"
          :placeholder="`${$t('global.search')} ... `"
        />
      </BCol>
      <BCol cols="9" class="d-flex justify-content-end">
        <slot name="table-button" />
      </BCol>
    </BRow>
    <BRow>
      <BCol cols="12">
        <!-- progressBar -->
        <Vue3ProgressBar ref="progressBar" />
        <BTable
          :id="`table-${id}`"
          :ref="`table-${id}`"
          class="base-table"
          :sort-by="[{ key: 'first_name', order: 'desc' }]"
          :items="items"
          :fields="fields"
          hover
          striped
          responsive
          :current-page="currentPage"
          :per-page="perPage"
        >
          <template #cell(actions)="data">
            <BButtonGroup
              size="sm"
              class="button-group-actions"
              v-if="data.item.buttons"
            >
              <template v-for="action in data.item.buttons" :key="action.key">
                <BButton
                  ref="buttonRef"
                  v-if="can(action.permission)"
                  @click.stop="make(action)"
                >
                  <UiBaseIcon
                    :name="action.icon.name"
                    :color="action.icon.color"
                  />
                </BButton>
              </template>
              <ClientOnly>
                <BDropdown
                  size="sm"
                  no-caret
                  end
                  variant="link"
                  v-if="data.item.menu"
                >
                  <template #button-content>
                    <span class="d-none d-sm-inline text-white-100"> ... </span>
                  </template>
                  <template v-for="action in data.item.menu" :key="action.key">
                    <BDropdownItem
                      @click.stop="make(action)"
                      v-if="can(action.permission)"
                    >
                      <div class="d-flex align-items-center">
                        <div>
                          <UiBaseIcon
                            :name="action.icon.name"
                            :color="action.icon.color"
                          />
                        </div>
                        <div>
                          <span class="ms-2">
                            {{ action.name }}
                          </span>
                        </div>
                      </div>
                    </BDropdownItem>
                  </template>
                </BDropdown>
              </ClientOnly>
            </BButtonGroup>
          </template>
        </BTable>
      </BCol>
    </BRow>
    <BRow>
      <BCol cols="2">
        <BFormSelect
          id="per-page-select"
          v-model="perPage"
          :options="pageOptions"
          pills
          size="sm"
        />
      </BCol>
      <BCol cols="10" v-if="totalRows > perPage">
        <div class="d-flex justify-content-end">
          <BPagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            first-number
            last-number
            :align="'fill'"
            size="sm"
            class="my-0"
          />
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import {
  BRow,
  BCol,
  BTable,
  BButtonGroup,
  BButton,
  BDropdown,
} from "bootstrap-vue-next";
import { useAbility } from "@casl/vue";

// import { useProgressBarStore } from "@/stores/progressbar";
// const storeProgressBar = useProgressBarStore();
// const progressBar = ref(null);
const emit = defineEmits(["handleEdit", "handleDelete", "handleRestore"]);
const props = defineProps({
  id: {
    type: String,
    required: true,
    default: "",
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  fields: {
    type: Array,
    required: true,
    default: () => [],
  },
  perPage: {
    type: Number,
    required: false,
    default: 10,
  },
});

const { can } = useAbility();

const totalRows = computed(() => {
  return props.items.length;
});
const currentPage = ref(1);
const perPage = ref(props.perPage);
const pageOptions = ref([
  { value: 5, text: "5" },
  { value: 10, text: "10" },
  { value: 15, text: "15" },
  { value: 15, text: "20" },
  { value: 100, text: "All" },
]);

const make = (action) => {
  if (action.action && action.params) {
    emit(action.action, action.params);
  }
};

// onMounted(() => {
//   if (progressBar) {
//     storeProgressBar.setProgressBar(progressBar.value);
//   }
// });
</script>
<style lang="scss">
.base-table .table thead {
  background-color: #161a1d;
}
</style>
