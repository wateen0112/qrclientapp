<template>
  <div>
    <!-- <template #content-Info> -->
    <div
      class="tw-w-full tw-text-gray-500 tw-rounded-lg tw-shadow-md tw-relative tw-flex tw-flex-col tw-justify-center tw-items-center"
    >
      <div class="tw-absolute">
        <div v-if="pdfDynamicDto.coverFile || pdfDynamicDto.coverUrl">
          <img
            class="tw-w-full md:tw-w-auto md:tw-h-[400px] md:tw-mx-auto tw-rounded-lg tw-object-contain tw-p-8"
            :src="getFileUrl(pdfDynamicDto.coverUrl)"
          />
        </div>
      </div>
      <div
        class="header tw-text-white tw-p-4 tw-flex tw-flex-col tw-h-72 tw-w-[100%]"
        :style="{ backgroundColor: pdfDynamicDto.primaryColor }"
      >
        <p class="tw-flex tw-justify-center tw-text-2xl">
          {{ pdfDynamicDto.company }}
        </p>
        <p>{{ pdfDynamicDto.title }}</p>
        <p>{{ pdfDynamicDto.description }}</p>
      </div>
      <div class="hidden tw-pb-5 tw-h-72 tw-w-[100%] tw-bg-white">
        <div class="tw-flex tw-justify-center"></div>
      </div>
      <div class="tw-absolute" style="display: flex; top: 91%">
        <a v-if="pdfDynamicDto.pdfFile" target="_blank" class="tw-text-dark tw-rounded tw-text-base" @click="go()">
          <v-btn
            class="text-white"
            :style="{ backgroundColor: pdfDynamicDto.buttonColor }"
          >
            View Pdf
          </v-btn></a
        >
        <a
          target="_blank"
          class="tw-text-dark tw-rounded tw-text-base tw-mx-2"
          :href="pdfDynamicDto.website"
        >
          <v-btn
            v-if="pdfDynamicDto.website"
            class="text-white"
            :style="{ backgroundColor: pdfDynamicDto.buttonColor }"
          >
            Website
          </v-btn></a
        >
      </div>
      <div class="tw-absolute" style="right: 20px; bottom: 30px">
      <v-btn
        class="ma-2 text-white"
        :color="pdfDynamicDto.buttonColor"
        icon="mdi-share-variant-outline"
        @click="shareData"
      ></v-btn>
      </div>
    </div>

    <!-- </template> -->
  </div>
</template>
<script setup lang="ts">
import { useQrPdfDynamic } from "@/store/qrCodes/dynamic/pdf";
import { AddPdfDto } from "~/api/dto/qrCodes/dynamic/Pdf";
import { pdfController } from "~/api/endpoints/pdfDynamic";
import { storeToRefs } from "pinia";
const { getFileUrl } = useFile();
const pdfStore = useQrPdfDynamic();
const { pdfDynamicDto } = storeToRefs(pdfStore);
const route = useRoute();
const props = defineProps({
  fetchData: {
    type: Boolean,
    default: true,
  },
});
//GetById PdfDto
if (props.fetchData) {
  const { data } = await useCustomFetch<AddPdfDto>(
    pdfController.GET_QR_PDF + `?id=${route.params.id}`
  );
  if (data.value) {
    pdfDynamicDto.value = data.value;
  }
}
function go() {
  window.open(getFileUrl(pdfDynamicDto.value.pdfUrl));
}
const shareData = async () => {
  try {
    await navigator.share({
      title: "Share",
      text: "",
      url: route.fullPath,
    });
  } catch (error) {}
};
definePageMeta({ layout: "fullscreen" });
</script>
<style>
hr {
  padding: 0.5px;
}
</style>
