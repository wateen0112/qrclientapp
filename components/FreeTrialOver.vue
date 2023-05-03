<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" dark @click="openDialog" v-bind="props">
          {{ dialogTitle }}
        </v-btn>
      </template>

      <v-card>
        <v-card-text>
          <div class="tw-mx-0 tw-p-4 tw-text-center">
            <h1>Your 14-day Trial is over</h1>
            <p>to continue , please upgrade your account to one our plans</p>
            <form>
              <div
                class="tw-flex tw-justify-center md:tw-flex-row tw-gap-2 mt-5"
              >
                <input
                  type="checkbox"
                  disabled
                  checked
                  color="primary"
                  class="tw-w-[25px] tw-bg-white"
                />
                <label>Reactivate all your expired QR codes</label>
              </div>
              <div
                class="tw-flex tw-justify-center md:tw-flex-row tw-gap-4 tw-mt-3 tw-mr-2"
              >
                <input
                  type="checkbox"
                  disabled
                  checked
                  color="primary"
                  class="tw-w-[25px] tw-bg-white tw-ml-0"
                />
                <label>Choose between 20+QR code type</label>
              </div>
              <div
                class="tw-flex tw-justify-center md:tw-flex-row tw-gap-4 tw-mt-3 tw-mr-3"
              >
                <input
                  type="checkbox"
                  disabled
                  checked
                  color="primary"
                  class="tw-w-[25px] tw-bg-white"
                />
                <label>create customizable mobile pages </label>
              </div>
              <div
                class="tw-flex tw-justify-center md:tw-flex-row tw-gap-4 tw-mt-3 tw-mr-7"
              >
                <input
                  type="checkbox"
                  disabled
                  checked
                  color="warning"
                  class="tw-w-[25px]"
                />
                <label>Measure your campaign success</label>
              </div>
            </form>
          </div>
          <div class="tw-flex tw-justify-center tw-items-center tw-mb-3">
            <button id="btn" @click="dialog = false">
              UPGRADE
              <v-icon light right> mdi-arrow-right </v-icon>
            </button>
          </div>
        </v-card-text>
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
<style scoped>
#btn {
  color: white;
  background-color: #fcd34d;
  padding: 10px;
  width: 200px;
  border-radius: 10px;
}
h1 {
  font-weight: bold;
  font-size: 25px;
  margin: 10px;
  margin-bottom: 20px;
}
</style>
