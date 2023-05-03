<template>
  <div class="tw-px-4 tw-py-8 nav">
    <ul
      class="tw-bg-white tw-rounded-full tw-flex tw-items-center tw-justify-evenly py-3 lg:tw-flex-col lg:tw-justify-between lg:tw-w-20 lg:tw-h-96">
      <li v-for="item in staticLinks" :key="item.id">
        <nuxt-link :to="localePath(`/static/${item.qrIndex.trim()}/0`)" v-slot="{ isActive }">
          <v-tooltip activator="parent" location="end"> {{ item.name }} </v-tooltip>

          <v-btn :icon="icons[item.qrIndex]" :elevation="isActive ? 12 : 0" :variant="isActive ? 'flat' : 'text'"
            :class="{ 'bg-dark': isActive }">
          </v-btn>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useQrStore } from "@/store/qrCodes/qr";
const qrStore = useQrStore();
const localePath = useLocalePath()
const icons = ref({
  EmailStatic: "mdi-email-fast-outline",

  TextStatic: "mdi-card-text-outline",

  SmsStatic: "mdi-text-box-multiple-outline",

  WebsiteStatic: "mdi-account-group-outline",

  ContactDataStatic: "mdi-phone-outline",

  WifiStatic: "mdi-wifi",
});
const staticLinks = computed(() => {
  return qrStore.staticQrTypes;
});
</script>
