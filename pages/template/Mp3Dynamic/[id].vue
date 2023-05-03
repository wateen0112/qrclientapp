<template>
  <div
    class="business tw-w-[100%] tw-min-h-[800px] tw-h-auto tw-py-5 tw-overflow-x-hidden tw-relative tw-bg-white tw-pb-3"
  >
    <div
      class="tw-w-[400px] tw-min-h-[1000px] z-50 tw-absolute tw-top-[-500px] tw-left-[0px] tw-rotate-60"
      :style="'background-color:' + dynamicMp3Dto.primaryColor"
    ></div>
    <div
      class="tw-absolute tw-top-0 tw-right-0 tw-w-[100%] tw-pt-8 h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-8"
    >
      <div>
        <h1
          :style="props.fetchData ? 'color:black' : ''"
          class="tw-text-white tw-text-center tw-text-3xl -tw-mb-4"
        >
          {{ dynamicMp3Dto.title }}
        </h1>
      </div>
      <template v-if="preview_list?.length !== 0">
        <div
          class="tw-flex tw-items-center tw-w-[100%] tw-ring-neutral-200 tw-h-[100%]"
        ></div>
        <!--    heeerreee-->
        <div
          v-for="(item, index) in preview_list"
          :key="index"
          class="tw-flex tw-items-center tw-w-[100%] tw-ring-neutral-200 tw-h-[100%]"
        >
          <div class="tw-relative tw-mb-3 tw-w-full">
            <div
              class="audio-player tw-w-full tw-flex tw-justify-center tw-items-center tw-flex-col"
            >
              <div class="tw-w-full">
               
              </div>
              <img
                :style="props.fetchData ? 'width:500px ; height:500px ' : ' '"
                :src="preview_list2[0]"
                class="tw-rounded-full tw-w-52 tw-h-52 tw-mb-5"
                alt=""
              />
              <audio controls :style="props.fetchData ? 'width:500px  ' : ' '">
                <source :src="preview_list[0]" type="audio/ogg" />
              </audio>
            </div>
          </div>
        </div>
        <!--   ends -->
      </template>
      <template v-if="dynamicMp3Dto.mp3Url !== ''">
        <div
          class="tw-flex tw-items-center tw-w-[100%] tw-ring-neutral-200 tw-h-[100%]"
        >
          <div
            class="tw-relative tw-mb-3 tw-w-full tw-hidden lg:tw-block"
            v-if="!preview_list"
          >
            <div
              class="audio-player tw-w-full tw-flex tw-justify-center tw-items-center tw-flex-col"
            >
              <div class="tw-w-full">
                <v-icon
                  v-if="!props.fetchData"
                  @click="resetDataFromServer"
                  class="tw-absolute twflex tw-justify-center tw-items-center tw-flex-col tw-w-full tw-top-0 tw-text-white tw-p-5 tw-bg-red-400 hover:tw-opacity-70"
                  >mdi-close</v-icon
                >
              </div>
              <img
                :style="props.fetchData ? 'width:500px ; height:500px ' : ' '"
                :src="getFileUrl(dynamicMp3Dto.imageUrl)"
                class="tw-rounded-full tw-w-52 tw-h-52 tw-mb-5"
                alt=""
              />
              <audio controls :style="props.fetchData ? 'width:500px  ' : ' '">
                <source
                  :src="getFileUrl(dynamicMp3Dto.mp3Url)"
                  type="audio/ogg"
                />
              </audio>
            </div>
          </div>
        </div>
      </template>
      <h1 class="tw-text-left tw-w-full tw-px-5 tw-text-xl">
        {{ dynamicMp3Dto.moreInfo }}
      </h1>
      <h1 class="tw-text-left tw-w-full tw-px-5 tw-text-lg tw-text-blue-500">
        {{ dynamicMp3Dto.website }}
      </h1>
      <div v-if="dynamicMp3Dto.button.name.length > 0">
        <v-btn :color="dynamicMp3Dto.buttonColor"
          ><a :href="dynamicMp3Dto.button.url">{{
            dynamicMp3Dto.button.name
          }}</a></v-btn
        >
      </div>
    </div>
    <div class="tw-absolute" style="right: 20px; bottom: 20px">
      <v-btn
        class="ma-2 text-white"
        :color="dynamicMp3Dto.buttonColor"
        icon="mdi-share-variant-outline"
        @click="shareData"
      ></v-btn>
      </div>
  </div>
</template>
<script setup lang="ts">
// imports  . . .
import { backgroundColorNames } from "chalk";
import { storeToRefs } from "pinia";
import { useMp3DynamicStore } from "@/store/qrCodes/dynamic/mp3";
import { DynamicMp3Dto } from "~/api/dto/website/DynamicMp3";
import { QrDynamicController } from "~/api/endpoints/qrDynamic";
import { MetaObject } from "@nuxt/schema";
const route = useRoute();
const { getFileUrl } = useFile();

//consts and refs  . . .
const store = useMp3DynamicStore();
const { dynamicMp3Dto, preview_list, preview_list2 } = storeToRefs(store);
const buttonEditToggle = ref(false);
const wrapperEditToggle = ref(true);
const buttonTextEditToggle = ref(false);
const buttonTempColor = ref("#f1faee");
const WrapperTempColor = ref("#e63946");
//  layout setup  . . .
definePageMeta({
  layout: "fullscreen",
});
const props = defineProps({
  fetchData: {
    type: Boolean,
    default: true,
  },
});
const shareData = async () => {
  try {
    await navigator.share({
      title: "Share",
      text: "",
      url: route.fullPath,
    });
  } catch (error) {}
};
const resetDataFromServer = () => {
  dynamicMp3Dto.value.imageUrl = "";
  dynamicMp3Dto.value.mp3Url = "";
};
if (props.fetchData) {
  const { data } = await useCustomFetch<DynamicMp3Dto>(
    QrDynamicController.GET_QR_MP3_BY_ID + `?id=${route.params.id}`
  );
  const { locale } = useI18n();
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

  useHead(headers[locale.value]);
  if (data.value) {
    dynamicMp3Dto.value = data.value;
  }
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
</style>
