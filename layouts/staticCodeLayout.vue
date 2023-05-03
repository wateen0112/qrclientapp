<template>
  <div class="tw-bg-onDark tw-relative">
    <div class="tw-bg-white tw-px-10 tw-py-2">
      <v-btn icon="mdi-arrow-left" @click="goBack"></v-btn>
    </div>
    <v-layout>
      <div class="tw-grid tw-px-4 tw-grid-cols-12 tw-min-h-screen tw-bg-onDark tw-w-full">
        <div class="tw-order-3 lg:tw-order-1 tw-col-span-12 lg:tw-col-span-1">
          <codes-static-nav></codes-static-nav>
        </div>
        <div class="tw-order-2 lg:tw-order-2 tw-col-span-12 lg:tw-col-span-7 tw-rounded-xl tw-overflow-hidden">
          <v-main v-if="qrStyleRef">
            <slot></slot>
          </v-main>
        </div>
        <div class="tw-order-1 lg:tw-order-3 tw-col-span-12 lg:tw-col-span-4">
          <codes-qr-style ref="qrStyleRef"></codes-qr-style>
        </div>
      </div>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
const { IsLoggedIn } = useAuth();
const localePath = useLocalePath();
const router = useRouter();
const qrStyleRef = ref(null);
onMounted(() => {
});

function goBack() {
  if (IsLoggedIn()) {
    router.go(-1);
  } else navigateTo(localePath("/"));
}
// const store = useQrStore();
// const { data } = await useFetch(QrController.GET_MEDIA, {
//   baseURL: appConfig.API_DOMAIN,
// });
// store.$patch({ qrMedia: data.value as QrsMedia });
</script>
