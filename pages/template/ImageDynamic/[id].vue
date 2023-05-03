<template>
  <div
    class="business tw-z-10 tw-min-h-[1200px] tw-h-auto tw-py-5 tw-overflow-x-hidden tw-relative scrollbar-hidden tw-bg-white tw-pb-3 tw-w-full tw-flex tw-justify-center"
  >
    <div
      :class="
        fetchData
          ? ' lg:tw-w-[2600px] lg:tw-h-[2600px] lg:tw-top-[-2000px] lg:tw-left-[-860px]    tw-min-w-[800px] tw-min-h-[1400px] z-50 tw-absolute tw-top-[-800px] tw-left-[00px] tw-rotate-60'
          : 'tw-min-w-[400px] tw-min-h-[1000px] z-50 tw-absolute tw-top-[-500px] tw-left-[0px] tw-rotate-60'
      "
      :style="'background-color:' + dynamicImageDto.color"
    ></div>
    <div
      class="tw-absolute tw-right-0 tw-w-[100%] tw-pt-8 h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-8"
    >
      <p class="tw-text-center tw-text-2xl mt-14 tw-font-semibold">
        {{ dynamicImageDto.title }}
      </p>
      <button
        v-if="thereIsButton"
        class="tw-absolute tw-top-10 tw-bg-white tw-px-5 tw-py-2 tw-rounded-md tw-shadow-lg tw-font-semibold tw-z-50"
        :style="'background-color:' + dynamicImageDto.buttonColor"
      >
        <a
          v-if="!fetchData"
          :href="dynamicImageDto.button.url"
          :style="isWhiteText ? 'color:white' : 'color:black'"
        >
          {{ dynamicImageDto.button.name }}</a
        >
        <span v-else :style="isWhiteText ? 'color:white' : 'color:black'">
          {{ dynamicImageDto.button.name }}</span
        >
      </button>
      <p class="tw-text-center tw-text-xl">{{ dynamicImageDto.description }}</p>

      <div @click="!fetchData ? wapperEdit : null">
        <template v-if="preview_list">
          <div
            class="tw-flex tw-justify-center tw-flex-col tw-items-center tw-w-[100%] tw-ring-neutral-200"
          >
            <div
              v-for="(item, index) in preview_list"
              class="tw-relative tw-mb-3"
              :key="index"
            >
            
              <img
                :src="item"
                :class="
                  fetchData
                    ? '  tw-w-full bg-white border rounded max-w-sm  tw-object-fill  tw-min-h-[280px] lg:max-w-[60%] tw-max-w-5xl'
                    : ' p-1 bg-white border rounded max-w-sm  tw-min-h-[280px] lg:max-w-[80%]'
                "
              />
            </div>
          </div>
        </template>
        <div
          class="tw-flex tw-justify-center tw-flex-col tw-items-center  tw-ring-neutral-200"
        >
          <div
            v-for="(item, index) in dynamicImageDto.imageUrls"
            class="tw-relative tw-mb-3"
            :key="index"
          >
           
            <img
              :src="getFileUrl(item)"
              :class="
                fetchData
                  ? '-1 bg-white border rounded max-w-sm  tw-object-fill  tw-min-h-[280px] lg:max-w-[80%] tw-max-w-5xl'
                  : ' p-1 bg-white border rounded max-w-sm  tw-min-h-[280px] lg:max-w-[80%]'
              "
            />
          </div>
        </div>
      </div>
    </div>
    <div class="tw-absolute" style="right: 30px; bottom: 20px">
      <v-btn
        class="ma-2 text-white"
        :color="dynamicImageDto.buttonColor"
        icon="mdi-share-variant-outline"
        @click="shareData"
      ></v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
// imports  . . .
import { useDynamicImageStore } from "@/store/qrCodes/dynamic/image";
import { backgroundColorNames } from "chalk";
import { storeToRefs } from "pinia";
import { DynamicImageDto } from "~/api/dto/website/Image";
import { QrDynamicController } from "~/api/endpoints/qrDynamic";
import { MetaObject } from "@nuxt/schema";
//  layout setup  . . .
definePageMeta({
  layout: "fullscreen",
});
//consts and refs  . . .
const imgeDynamicStore = useDynamicImageStore();
const { dynamicImageDto, isWhiteText, preview_list, thereIsButton } = storeToRefs(
  imgeDynamicStore
);
const buttonEditToggle = ref(false);
const wrapperEditToggle = ref(true);
const buttonTextEditToggle = ref(false);
const buttonTempColor = ref("#f1faee");
const WrapperTempColor = ref("#e63946");
const dynamicImageStore = useDynamicImageStore();
const route = useRoute();
const { getFileUrl } = useFile();

const isModify = computed(() => route.params.id !== "0");
const props = defineProps({
  fetchData: {
    type: Boolean,
    default: true,
  },
});

if (props.fetchData) {
  const { data } = await useCustomFetch<DynamicImageDto>(
    QrDynamicController.GET_QR_IMAGE_BY_ID + `?id=${route.params.id}`
  );
  if (data.value) {
    dynamicImageDto.value = data.value;
  }
}
const mainStyle = ` tw-w-[400px] tw-min-h-[500px] tw-relative  tw-bg-[${dynamicImageDto.value.color}]`;
//methods and funcitons . . .
const editItemColor = () => {
  // e.target.style.backgroundColor =dynamicImageDto.value.Color;
  WrapperTempColor.value = dynamicImageDto.value.color;
  dynamicImageDto.value.color = buttonTempColor.value;
  wrapperEditToggle.value = false;
  buttonTextEditToggle.value = false;
  buttonEditToggle.value = true;
};
const wapperEdit = () => {
  buttonTempColor.value = dynamicImageDto.value.color;
  dynamicImageDto.value.color = WrapperTempColor.value;
  buttonTextEditToggle.value = false;
  wrapperEditToggle.value = true;
  buttonEditToggle.value = false;
};
const ButtonTextColorEdit = () => {
  wrapperEditToggle.value = false;
  buttonTextEditToggle.value = false;
  buttonTextEditToggle.value = true;
  dynamicImageDto.value.color = buttonTempColor.value;
  buttonTempColor.value = dynamicImageDto.value.color;
  WrapperTempColor.value = dynamicImageDto.value.color;
};
const { locale } = useI18n();
let imagesToDeleted: any[] = [];
const unshiftImageFromFiles = (item: any) => {
  if (preview_list.value?.length != 0 || dynamicImageDto.value.imageUrls?.length > 1) {
    dynamicImageDto.value.imageUrls = dynamicImageDto.value.imageUrls.filter((i: any) => {
      return i != item;
    });

    imagesToDeleted.push(item);
    dynamicImageDto.value.deleteImages = imagesToDeleted;
  }
};
dynamicImageStore.previewMultiImage();
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
const shareData = async () => {
  try {
    await navigator.share({
      title: "Share",
      text: "",
      url: route.fullPath,
    });
  } catch (error) {}
};
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

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>
