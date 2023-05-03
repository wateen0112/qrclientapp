<template>
  <div
    class="business tw-min-h-[100vh] tw-h-auto tw-py-5 tw-px-0 tw-overflow-x-hidden tw-relative tw-bg-white tw-pb-3 tw-flex tw-flex-col tw-justify-start tw-items-center"
    :style="'background-color:' + dynamicCauponDto.primaryColor"
  >
    <h1 class="tw-text-white tw-text-xl">{{ dynamicCauponDto.company }}</h1>
    <div
      class="tw-top-0 tw-right-0 tw-w-[100%] tw-pt-8 h-[100%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-8"
    >
      <div
        class="tw-w-[100%] tw-h-[300px] tw-mt-[-40px] tw-flex tw-justify-start tw-flex-col"
      >
        <p class="tw-text-white tw-font-semibold tw-px-5">
          {{ dynamicCauponDto.headline }}
        </p>
        <div class="tw-relative tw-mb-3" v-if="preview_list.length !== 0">
          <v-icon
            v-if="!props.fetchData"
            @click="store.unshiftImage(preview_list[0])"
            class="tw-bottom-[-40px] tw-text-white tw-p-5 tw-bg-red-400 hover:tw-opacity-70 tw-z-50"
            >mdi-close</v-icon
          >
          <img
            :src="preview_list[0]"
            alt="image"
            class="tw-min-w-[100%] tw-min-h-[260px] tw-max-h-[260px] tw-top-0"
            :style="props.fetchData ? 'min-height:600px' : ''"
          />
        </div>
        <div
          class="tw-relative tw-mb-3"
          v-else-if="dynamicCauponDto.imageUrl !== ''"
        >
          <v-icon
            v-if="!props.fetchData"
            @click="dynamicCauponDto.imageUrl = ''"
            class="tw-bottom-[-40px] tw-text-white tw-p-5 tw-bg-red-400 hover:tw-opacity-70 tw-z-50"
            >mdi-close</v-icon
          >

          <img
            :src="getFileUrl(dynamicCauponDto.imageUrl)"
            alt="image"
            class="tw-min-w-[100%] tw-min-h-[260px] tw-max-h-[260px] tw-top-0"
          />
          <button
            class="tw-z-50 tw-bg-white tw-px-5 tw-py-2 tw-rounded-md tw-shadow-lg tw-font-semibold tw-bottom-[0px] tw-mx-3"
            :style="'background-color:' + dynamicCauponDto.buttonColor"
          >
            {{ dynamicCauponDto.saleBadge }}%
            {{ $t("dynamicQr.cauponDynamic.off") }}
          </button>
        </div>
        <div
          v-else
          class="tw-min-w-[100%] tw-bg-white tw-min-h-[260px] tw-max-h-[260px]"
        ></div>
        <p
          class="tw-text-white tw-z-40 tw-px-4 tw-font-semibold tw-text-left tw-capitalize tw-text-xl tw-mb-4"
        >
          {{ dynamicCauponDto.couponName }}
        </p>
        <div class="tw-w-full tw-flex tw-justify-start">
          <button
            class="tw-z-50 tw-bg-white tw-px-5 tw-py-2 tw-rounded-md tw-shadow-lg tw-font-semibold tw-mx-3"
            :style="'background-color:' + dynamicCauponDto.buttonColor"
          >
            {{ dynamicCauponDto.saleBadge }}%
            {{ $t("dynamicQr.cauponDynamic.off") }}
          </button>
        </div>
        <p
          class="tw-text-white tw-z-40 tw-px-4 tw-font-semibold tw-text-left tw-capitalize"
        >
          {{ dynamicCauponDto.description }}
        </p>
        <h1 class="tw-text-white tw-px-5 tw-font-semibold tw-text-xl tw-py-5">
          {{ $t("footer.terms") }}
        </h1>
        <p
          class="tw-text-white tw-mt-[-20px] tw-z-40 tw-px-5 tw-text-sm tw-font-semibold tw-text-left tw-capitalize"
        >
          {{ dynamicCauponDto.terms }}
        </p>
        <div
          class="tw-min-w-[100%] tw-py-6 tw-flex tw-justify-center tw-items-center"
        >
          <a :href="dynamicCauponDto.button.url">
            <v-btn
              class="text-center"
              :color="dynamicCauponDto.buttonColor"
              large
              >{{ $t("dynamicQr.cauponDynamic.getCoupons") }}</v-btn
            ></a
          >
        </div>
        <div
          v-if="dynamicCauponDto.address.city"
          class="tw-flex tw-flex-col tw-gap-2 tw-mt-2 tw-text-white tw-pl-4 tw-pb-4"
        >
          <div class="tw-flex">
            <v-icon>mdi-map-marker-outline</v-icon>
            <h1 class="tw-mx-1">Address</h1>
          </div>
          <div class="tw-flex tw-flex-col tw-mx-6">
            <p
              v-if="dynamicCauponDto.address.streetName"
              class="tw-flex tw-gap-6"
            >
              <span>{{ dynamicCauponDto.address.streetName }} ,</span>
              <span>{{ dynamicCauponDto.address.storeNumber }}</span>
            </p>
            <p
              v-if="dynamicCauponDto.address.storeNumber"
              class="tw-flex tw-gap-6"
            >
              <span>{{ dynamicCauponDto.address.regionNumber }} ,</span>
              <span>{{ dynamicCauponDto.address.city }}</span>
            </p>

            <p v-if="dynamicCauponDto.address.country">
              {{ dynamicCauponDto.address.country }}
            </p>
          </div>
        </div>
        <p
          class="tw-f-fullt w-text-center tw-text-white"
          v-if="dynamicCauponDto.validUntil"
        >
          <v-icon class="mx-5">mdi-calendar</v-icon
          >{{ dynamicCauponDto.validUntil }}
        </p>
        <p
          class="tw-f-fullt w-text-center tw-text-white tw-mt-2"
          v-if="dynamicCauponDto.website"
        >
          <v-icon class="mx-5">mdi-near-me</v-icon
          >{{ dynamicCauponDto.website }}
        </p>
        <p
          class="tw-flex tw-f-fullt w-text-center tw-text-white tw-mt-2"
          v-if="dynamicCauponDto.location"
        >
          <v-icon class="mx-5">mdi-google-maps</v-icon
          >{{ dynamicCauponDto.location }}
        </p>
        <p
          class="tw-f-fullt w-text-center tw-text-white tw-mt-2 tw-pb-4"
          v-if="dynamicCauponDto.mapUrl"
        >
          <v-icon class="mx-5">mdi-link</v-icon>{{ dynamicCauponDto.mapUrl }}
        </p>
      </div>
    </div>
  </div>
  <div class="tw-absolute" style="right: 30px; bottom: 20px">
    <v-btn
      class="ma-2 text-white"
      :color="dynamicCauponDto.buttonColor"
      icon="mdi-share-variant-outline"
      @click="shareData"
    ></v-btn>
  </div>
</template>
<script setup lang="ts">
// imports  . . .
import { useCouponStore } from "@/store/qrCodes/dynamic/coupon";
import { number } from "@intlify/core-base";
import { backgroundColorNames } from "chalk";
import { storeToRefs } from "pinia";
import { CauponDto } from "~/api/dto/website/Caupon";
import { MetaObject } from "@nuxt/schema";
import { QrDynamicController } from "~/api/endpoints/qrDynamic";

const shareData = async () => {
  try {
    await navigator.share({
      title: "Share",
      text: "",
      url: route.fullPath,
    });
  } catch (error) {}
};
//  layout setup  . . .
definePageMeta({
  layout: "fullscreen",
});
//consts and refs  . . .

const store = useCouponStore();
const { dynamicCauponDto, preview_list, image_list } = storeToRefs(store);
const buttonEditToggle = ref(false);
const wrapperEditToggle = ref(true);
const buttonTextEditToggle = ref(false);
const route = useRoute();
const { locale } = useI18n();
const { getFileUrl, downloadFile } = useFile();
const props = defineProps({
  fetchData: {
    type: Boolean,
    default: true,
  },
});

if (props.fetchData) {
  const { data } = await useCustomFetch<CauponDto>(
    QrDynamicController.GET_QR_IMAGE_BY_ID + `?id=${route.params.id}`
  );
  if (data.value) {
    dynamicCauponDto.value = data.value;
  }
}
//methods and funcitons . . .
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
