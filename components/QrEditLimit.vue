<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ props }">
        <button
          @click="openDialog"
          v-bind="props"
          class="tw-bg-amber-300 p-3 tw-w-[200px] tw-rounded-2xl tw-mx-4 tw-text-gray-50 tw-p-2"
        >
          {{ dialogTitle }}
        </button>
      </template>

      <v-card>
        <v-card-text>
          <div class="tw-flex tw-mx-0 tw-p-4">
            <img src="~/assets/svg/cach.svg" alt="" class="tw-w-[100px]" />
            <p class="tw-text-right tw-w-[400px]">
              استهلكت تعديلان من 3 <br />بقي لديك تعديل مجاني واحد من
              <br />الاشتراك الشهري الذي قيمته
              <span><b>$575</b></span>
            </p>
          </div>
          <div
            class="tw-flex tw-justify-center tw-items-center tw-mb-3 tw-text-gray-50"
          >
            <button
              class="tw-bg-amber-300 p-3 tw-w-[100px] tw-rounded-2xl tw-mx-4 tw-text-gray-50 tw-p-2"
              color="primary"
              @click="dialog = false"
            >
              متابعة
            </button>
          </div>
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  dialogTitle: {
    type: String,
    default: "Dialog Title",
  },
});
const dialog = ref(false);
const openDialog = () => (dialog.value = true);
const closeDialog = () => (dialog.value = false);

defineExpose({
  openDialog,
  closeDialog,
});
</script>
