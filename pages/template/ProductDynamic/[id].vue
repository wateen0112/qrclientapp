<template>
  <div class="tw-relative">
    <header
      class="tw-flex tw-justify-content-center tw-flex-col tw-items-center"
      :style="{ backgroundColor: productDto.primaryColor }"
    >
      <div class="tw-flex tw-justify-center">
        <img
          :src="getFileUrl(productDto.companyLogoUrl)"
          height="150"
          width="150"
          class="tw-mt-3 tw-object-cover"
          v-if="productDto.companyLogoUrl"
        />
      </div>

      <h4 class="tw-text-center tw-mt-3">{{ productDto.productName }}</h4>
      <h4 class="tw-text-center">{{ productDto.productFeatures.join(",") }}</h4>
      <p class="tw-mb-3">{{ productDto.simpleExplanation }}</p>
    </header>
    <section class="tw-flex tw-flex-col tw-gap-12 tw-p-4 tw-bg-white">
      <div
        :class="
          route.meta.layout == 'fullscreen'
            ? 'tw-flex tw-flex-col tw-items-center tw-justify-center'
            : ''
        "
      >
        <div>
          <img v-if="productDto.imageUrl" :src="getFileUrl(productDto.imageUrl)" />
        </div>
        <div class="tw-flex tw-gap-4 tw-justify-center tw-items-center tw-mt-4">
          <h2 class="tw-text-xl">{{ productDto.price }}</h2>
          <span>{{ productDto.productWeight }}</span>
        </div>
        <div class="tw-mt-4">
          <span>{{ productDto.productInformation }}</span>
        </div>
        <div class="tw-mt-4">
          <h2>{{ $t("dynamicQr.foodDynamic.expiration") }}:</h2>
          <span>{{ productDto.expirationDate }}</span>
        </div>
        <div class="tw-mt-4" v-if="productDto.productPrivateUrl.length > 0">
          <h2>{{ $t("dynamicQr.foodDynamic.productPrivate") }}:</h2>
          <div
            v-if="productDto.productPrivateUrl.length > 0"
            class="tw-mt-5 tw-flex tw-justify-center tw-items-center tw-gap-3 tw-overflow-auto"
          >
            <img
              v-for="(productImg, i) in productDto.productPrivateUrl"
              :key="i"
              :src="getFileUrl(productDto.productPrivateUrl[i])"
              class="tw-object-cover"
              height="100"
              width="100"
            />
          </div>
        </div>
      </div>
      <div
        class="description tw-flex tw-gap-2 tw-justify-center tw-flex-col tw-items-center"
      >
        <h2>{{ $t("dynamicQr.foodDynamic.description") }}</h2>
        <p class="tw-w[100px] tw-overflow-clip">{{ productDto.description }}</p>
      </div>
      <div
        :class="
          route.meta.layout == 'fullscreen'
            ? 'tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center'
            : 'location tw-flex tw-gap-2 tw-justify-start tw-flex-col tw-items-start'
        "
        class="location"
      >
        <h2>
          <v-icon>mdi-map-marker-outline</v-icon
          >{{ $t("dynamicQr.foodDynamic.addressName") }}
        </h2>
        <div class="tw-flex tw-flex-col tw-mx-6">
          <p v-if="productDto.address.streetName" class="tw-flex tw-gap-6">
            <span>{{ productDto.address.streetName }}</span>
            <span>{{ productDto.address.storeNumber }}</span>
          </p>
          <p v-if="productDto.address.storeNumber" class="tw-flex tw-gap-6">
            <span>{{ productDto.address.regionNumber }}</span>
            <span>{{ productDto.address.city }}</span>
          </p>

          <p v-if="productDto.address.country">
            {{ productDto.address.country }}
          </p>
        </div>
      </div>

      <div
        class="mt-8"
        :class="route.meta.layout == 'fullscreen' ? 'tw-flex tw-justify-center' : ''"
      >
        <h4>
          <v-icon>mdi-link</v-icon>
          {{ $t("dynamicQr.foodDynamic.socialMedias") }}
        </h4>

        <ul
          v-if="
            productDto.socialMediaChannels && productDto.socialMediaChannels.length > 0
          "
          class="tw-flex tw-flex-wrap tw-gap-4 tw-mt-4"
        >
          <li
            v-for="item in productDto.socialMediaChannels"
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
      </div>
    </section>
    <div class="tw-absolute" style="right: 10px; bottom: 10px">
      <v-btn
        class="ma-2 text-white"
        :color="productDto.buttonColor"
        icon="mdi-share-variant-outline"
        @click="shareData"
      ></v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useProductQrStore } from "@/store/qrCodes/dynamic/ProductDynamic";
import { storeToRefs } from "pinia";
import MobileProductDynamic from "@/pages/template/ProductDynamic/[id].vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useQrStore } from "@/store/qrCodes/qr";
import * as yup from "yup";
import { ProductController } from "@/api/endpoints/ProductDynamic";
import { AddProductDto } from "@/api/dto/qrCodes/dynamic/Product";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
//-------------------
const { getFileUrl } = useFile();
definePageMeta({
  layout: "fullscreen",
  styleQr: "dynamicCodeLayout",
});
const props = defineProps({
  fetchData: {
    type: Boolean,
    default: true,
  },
});
const route = useRoute();
const { t } = useI18n();
const store = useProductQrStore();
const { productDto } = storeToRefs(store);
if (props.fetchData) {
  const { data } = await useCustomFetch<AddProductDto>(
    ProductController.GET_Product + `?id=${route.params.id}`
  );
  if (data.value) {
    productDto.value = data.value;
  }
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
