<template>
  <div>
    <NuxtLoadingIndicator color="#DD0000" :height="4" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <GenerateQr></GenerateQr>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "./store/app";
import { useQrStore } from "./store/qrCodes/qr";

const qrStore = useQrStore();
const store = useAppStore();
// middleware(context) {
//   log();
// }
onMounted(() => {
  qrStore.GetAllQrTypes();
});

// qrStore.$patch({
//   qrTypes: data.value.qrTypes,
// });
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
