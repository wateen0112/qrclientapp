<template>
  <div>
    <slot name="header">
      <v-toolbar class="page-header align-items-center tw-z-50">

        <v-btn icon v-if="$route.meta.backBtn">
          <v-icon> mdi-arrow-left </v-icon>
        </v-btn>
        <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="w-50 d-flex align-center justify-end">
          <slot name="actions">
            <v-text-field
            class="tw-mx-2"
              type="text"
              v-if="search"
              variant="underlined"
              prepend-inner-icon="mdi-magnify"
              @update:model-value="$emit('search', $event)"
              :label="props.placeholder"
            >
            </v-text-field>
            <slot name="action-button">
              <client-only>
                <v-dialog
                  v-model="dialog"
                  scrollable
                  persistent
                  color="primary"
                  width="720"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      prepend-icon="mdi-plus"
                      v-bind="props"
                      class="ml-4 text-white"
                      variant="flat"
                      color="primary"
                    >
                      {{ buttonText }}
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="p-2">
                      <v-icon v-if="icon" size="small" color="primary">{{ icon }}</v-icon>
                      {{ dialogTitle }}
                    </v-card-title>
                    <v-divider></v-divider>

                    <slot name="dialog-form"> </slot>

                    <v-divider></v-divider>
                    <!-- <v-card-actions>
                  <v-btn variant="flat" @click="saveEvent"> حفظ </v-btn>
                  <v-btn variant="tonal" @click="dialog = false"> تراجع </v-btn>
                </v-card-actions> -->
                  </v-card>
                </v-dialog>
              </client-only>
            </slot>
          </slot>
        </div>
      </v-toolbar>
    </slot>

    <main>
      <slot> </slot>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "~/store/app";

const emit = defineEmits(["save", "click"]);
const props = defineProps({
  search: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: "Search",
  },
  add: {
    type: Boolean,
    default: true,
  },
  buttonText: {
    type: String,
    default: "Add",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: "Dialog Title",
  },
  icon: {
    type: String,
  },
});
// Composables
const route = useRoute();
const AppStore = useAppStore();
// REFS
const dialog = ref(false);

// Getters
const pageTitle = computed(() => route.meta.title);

// Functions
const openDialog = () => (dialog.value = true);
const closeDialog = () => (dialog.value = false);
const saveEvent = () => emit("save");
defineExpose({
  openDialog,
  closeDialog,
});
</script>

<style lang="scss">
.page-header {
  background-color: transparentize($color: #fff, $amount: 0.1) !important;
  padding: 1rem !important;
  backdrop-filter: blur(5px);
  position: sticky !important;
  top: 0 !important;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .left-side,
  .right-side {
    display: flex;
    align-items: center;
    gap: 2rem;

    .page-title {
      font-weight: bold;
    }
  }
}
</style>
