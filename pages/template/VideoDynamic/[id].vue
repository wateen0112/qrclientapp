<template>
  <div
    :class="
      fetchData
        ? 'business tw-min-h-[800px] tw-h-auto tw-overflow-x-hidden tw-relative tw-bg-white tw-pb-3'
        : 'business tw-min-h-[640px] tw-rounded-bl-2xl tw-rounded-br-2xl tw-h-auto tw-overflow-x-hidden tw-relative tw-bg-white tw-pb-3'
    "
  >
    <div
      class="tw-pb-5 tw-w-[100%] tw-min-h-[400px] z-50 wrapper tw-flex tw-flex-col tw-justify-start tw-items-center tw-gap-4 tw-relative"
      :style="'background-color:' + dynamicVideoDto.primaryColor"
    >
      <div
        class="tw-top-0 tw-right-0 tw-w-[100%] tw-pt-8 tw-flex tw-flex-col tw-justify-center tw-gap-8"
      >
        <h1 class="tw-text-white tw-flex tw-text-center tw-justify-center tw-text-2xl">
          {{ dynamicVideoDto.headline }}
        </h1>
        <div class="tw-overflow-hidden">
          <div class="tw-flex tw-justify-center tw-flex-col tw-items-center">
            <div v-for="(item, index) in preview_list" class="tw-relative" :key="index">
              <v-icon
                v-if="!props.fetchData"
                @click="videoDynamicStore.unshiftImage(index)"
                class="tw-absolute tw-top-10 tw-z-50 tw-cursor-pointer tw-text-white tw-p-5 tw-bg-red-400 hover:tw-opacity-70"
                >mdi-close</v-icon
              >

              <video
                controls
                :src="item"
                :class="
                  props.fetchData
                    ? 'lg:tw-min-h-[800px] tw-min-h-[380px] tw-w-auto'
                    : 'tw-max-h-[260px]'
                "
              >
                <source :src="item" type="video/mp4" />
              </video>
            </div>
          </div>
          <div
            class="tw-flex tw-flex-col tw-items-center tw-ring-neutral-200 tw-h-[100%]"
          >
            <div
              v-for="(item, index) in dynamicVideoDto.urls"
              class="tw-relative tw-mb-3"
              :key="index"
            >
              <v-icon
                v-if="!props.fetchData"
                @click="deleteVideo(item)"
                class="tw-absolute tw-top-10 tw-z-50 tw-cursor-pointer tw-text-white tw-p-5 tw-bg-red-400 hover:tw-opacity-70"
                >mdi-close</v-icon
              >
              <video
                controls
                :src="getFileUrl(item)"
                :class="props.fetchData ? 'tw-w-[1000px]' : 'tw-max-h-[260px]'"
              >
                <source :src="item" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <h1 class="tw-w-[10qrDto 0%] tw-px-5 tw-text-[24px] tw-text-white tw-text-left">
          {{ dynamicVideoDto.company }}
        </h1>
        <p class="tw-px-5 text-white tw-text-lg">
          {{ dynamicVideoDto.summary }}
        </p>
        <div class="tw-w-[100%] tw-px-5 tw-flex" v-if="dynamicVideoDto.button.name">
          <a
            target="_blank"
            class="tw-text-dark tw-rounded tw-text-base"
            :href="dynamicVideoDto.button.url"
          >
            <v-btn
              v-if="dynamicVideoDto.button.name"
              class="text-white"
              :style="{ backgroundColor: dynamicVideoDto.buttonColor }"
            >
              {{ dynamicVideoDto.button.name }}
            </v-btn></a
          >
        </div>
      </div>
    </div>
    <h1 class="tw-w-[100%] tw-px-5 tw-text-[20px] tw-text-black tw-text-left tw-mt-5">
      <v-icon color="" size="25">mdi-share-variant-outline</v-icon>
      {{ $t("dynamicQr.videoDynamic.socialMediaChannels") }}
    </h1>
    <ul
      v-if="
        dynamicVideoDto.socialMediaChannels &&
        dynamicVideoDto.socialMediaChannels.length > 0
      "
      class="tw-flex tw-flex-wrap tw-gap-4 tw-mt-4 tw-m-5"
    >
      <li
        v-for="item in dynamicVideoDto.socialMediaChannels"
        :key="item.url"
        class="tw-flex tw-flex-row"
      >
        <v-icon size="x-large" class="tw-text-gray-600 tw-my-auto tw-mx-3">{{
          item.iconName
        }}</v-icon>
        <div class="tw-flex tw-flex-col">
          <a variant="plain" :href="item.url" class="tw-font-bold tw-text-lg">
            {{ item.name }}
          </a>
          <span>{{ item.text }}</span>
        </div>
      </li>
    </ul>

    <div
      class="tw-absolute tw-bottom-[50px] tw-flex tw-justify-end tw-w-[95%]"
      v-if="dynamicVideoDto.hasShareButton"
    >
      <v-btn
        @click="shareApi"
        icon
        icon-color="white"
        light
        :color="dynamicVideoDto.buttonColor"
      >
        <v-icon color="white">mdi-share-variant-outline</v-icon></v-btn
      >
    </div>
  </div>
</template>
<script setup lang="ts">
// imports  . . .
import { useVideoDynamicStore } from "@/store/qrCodes/dynamic/video";
import { getIconColor } from "~/api/dto/website/iconsData";
import { storeToRefs } from "pinia";
import { QrDynamicController } from "~/api/endpoints/qrDynamic";
import { MetaObject } from "@nuxt/schema";
//  layout setup  . . .
definePageMeta({
  layout: "fullscreen",
});
//consts and refs  . . .
const videoDynamicStore = useVideoDynamicStore();
const { dynamicVideoDto, preview_list } = storeToRefs(videoDynamicStore);
const route = useRoute();
const isModify = computed(() => route.params.id !== "0");
const { getFileUrl } = useFile();

const props = defineProps({
  fetchData: {
    type: Boolean,
    default: true,
  },
});
if (props.fetchData) {
  const { data } = await useCustomFetch<DynamicVideoDto>(
    QrDynamicController.GET_QR_VIDEO_BY_ID + `?id=${route.params.id}`
  );
  if (data.value) {
    dynamicVideoDto.value = data.value;
  }
}
const urlImageDel = ref<Array<string>>([]);

const { locale } = useI18n();
//methods and funcitons . . .
//share api
const shareApi = async () => {
  try {
    await navigator.share({
      title: "Share",
      text: "",
      url: route.fullPath,
    });
  } catch (error) {}
};
const headers: { [x: string]: MetaObject } = {
  ar: {
    title: "المعاينة",
    htmlAttrs: {
      lang: locale,
      dir: "rtl",
    },
  },
  en: {
    title: "Preview",
    htmlAttrs: {
      lang: locale,
      dir: "ltr",
    },
  },
  de: {
    title: "  Vorschau",
    htmlAttrs: {
      lang: locale,
      dir: "ltr",
    },
  },
};
if (props.fetchData) {
  useHead(headers[locale.value]);
}
function deleteVideo(target: string) {
  console.log("test delete video", target);
  dynamicVideoDto.value.urls = dynamicVideoDto.value.urls.filter((el) => el !== target);
  urlImageDel.value.push(target);
  dynamicVideoDto.value.deletedFiles = urlImageDel;

}
</script>
<style scoped>
hr {
  padding: 0.5px;
}
.ss::after {
  content: "";
  width: 400px;
  height: 200px;
  display: flex;

  position: absolute;
  transform: rotate(110deg) !important;
}
img {
  z-index: 50;
}
.wapper {
  left: 0 !important;
}
</style>
