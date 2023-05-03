<template>
  <div>
    <client-only>
      <div class="tw-grid lg:tw-grid-cols-12 tw-grid-cols-3 tw-mt-5 tw-flex-row tw-gap-1 tw-overflow-x-hidden">
        <div class="tw-col-span-3 tw-flex tw-p-5 tw-m-5 tw-justify-center tw-bg-white tw-min-w-[300px]">
          <div class="tw-flex tw-ml-12">
            <v-btn color="success" icon="mdi-package-variant-closed" size="x-large" class="tw-ml-6"></v-btn>

            <div class="tw-flex tw-flex-col tw-mx-6">
              <p class="tw-text-2xl tw-items-end tw-min-w-[250px]">
                {{ store.homeList.subscriptionCount }}
              </p>
              <h1 class="tw-text-lg tw-w-[120px]">
                {{ $t("dashboardAdmin.subscriptions") }}
              </h1>
            </div>
          </div>
        </div>
        <div class="tw-col-span-3 tw-flex tw-p-5 tw-m-5 tw-justify-center tw-bg-white tw-min-w-[300px]">
          <div class="tw-flex tw-ml-14">
            <v-btn class="tw-ml-6" color="blue-grey" icon="mdi-credit-card-scan-outline" size="x-large"></v-btn>

            <div class="tw-flex tw-flex-col tw-mx-6">
              <p class="tw-text-2xl tw-items-end tw-min-w-[250px]">
                {{ store.homeList.scanCount }}
              </p>
              <h1 class="tw-text-lg tw-w-[120px]">
                {{ $t("dashboardAdmin.numberScans") }}
              </h1>
            </div>
          </div>
        </div>
        <div class="tw-col-span-3 tw-flex tw-p-5 tw-m-5 tw-justify-center tw-bg-white tw-min-w-[300px]">
          <div class="tw-flex tw-ml-14">
            <v-btn color="info" icon="mdi-qrcode-scan" size="x-large" class="tw-ml-6"></v-btn>

            <div class="tw-flex tw-flex-col tw-mx-6">
              <p class="tw-text-2xl tw-items-end tw-min-w-[250px]">
                {{ store.homeList.qrCount }}
              </p>
              <h1 class="tw-text-lg tw-w-[120px]">
                {{ $t("dashboardAdmin.dynamicCodes") }}
              </h1>
            </div>
          </div>
        </div>
        <div class="tw-col-span-3 tw-flex tw-p-5 tw-m-5 tw-justify-center tw-bg-white tw-min-w-[300px]">
          <div class="tw-flex tw-ml-14">
            <v-btn color="error" icon="mdi-qrcode" size="x-large" class="tw-ml-6"></v-btn>
            <div class="tw-flex tw-flex-col tw-mx-6">
              <p class="tw-text-2xl tw-items-end tw-min-w-[250px]">
                {{ store.homeList.qrDynamicCount }}
              </p>
              <h1 class="tw-text-lg tw-w-[120px]">
                {{ $t("dashboardAdmin.numberCodes") }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </client-only>

  </div>
</template>

<script lang="ts" setup>
import { useHomeStore } from "~/store/dashboard/home";
import Footer from "~/components/layout/AntherFooter.vue";

const store = useHomeStore();
store.GetAllHome();
definePageMeta({
  layout: "dashboard",
});
</script>
