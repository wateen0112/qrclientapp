<template>
  <div
    class="tw-h-[100vh] tw-flex tw-justify-center tw-items-center tw-flex-col tw-overflow-x-hidden tw-relative tw-bg-white"
  >
    <div class="tw-flex tw-justify-center tw-items-center">
      <img
        src="~/assets/svg/webite.svg"
        alt=""
        class="tw-w-full md:tw-h-[300px] md:tw-mx-auto tw-rounded tw-object-cover tw-relative"
      />
      <h6 class="tw-hidden">{{ WebDto.website }}</h6>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWebsiteQrStore } from "@/store/qrCodes/dynamic/websiteDynamic";
import { storeToRefs } from "pinia";
import { websiteDto } from "~/api/dto/website/websiteDto";
import { WebsiteController } from "~/api/endpoints/websiteDynamic";
//..............
const store = useWebsiteQrStore();
const route = useRoute();
const { WebDto } = storeToRefs(store);
const props = defineProps({
  fetchData: {
    type: Boolean,
    default: true,
  },
});
if (props.fetchData) {
  const { data } = await useCustomFetch<websiteDto>(
    `${WebsiteController.GetWebsiteById}?id=${route.params.id}`
  );

  if (data.value) {
    WebDto.value = data.value;
  }
}
definePageMeta({
  layout: "fullscreen",
});
</script>
<style scoped></style>
