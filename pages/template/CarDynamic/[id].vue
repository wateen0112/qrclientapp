<template>
  <div class="tw-relative">
    <header
      class="tw-items-center tw-px-4"
      :style="{ backgroundColor: carDto.primaryColor }"
    >
      <div class="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center">
        <h1 class="tw-text-3xl text-center">{{ carDto.companyName }}</h1>
        <img
          height="75"
          width="75"
          class="mt-6"
          alt="companyLogo"
          v-if="carDto.companyLogoFile"
          :src="getFileUrl(carDto.companyLogoUrl)"
        />
      </div>

      <Swiper class="tw-relative tw-translate-y-1/4">
        <SwiperSlide v-if="carDto.imagesUrls?.length === 0">
          <img
            class="tw-w-full md:tw-w-auto md:tw-h-max-[400px] md:tw-mx-auto tw-rounded-lg tw-object-contain tw-relative"
            src="/placeholders/s63Amg.jpg"
            alt="carImages"
          />
        </SwiperSlide>
        <SwiperSlide v-for="image in carDto.imagesUrls">
          <img
            class="tw-w-full md:tw-w-auto md:tw-max-h-[400px] md:tw-mx-auto tw-rounded-lg tw-object-contain tw-relative"
            :src="getFileUrl(image)"
            alt="carImages"
          />
        </SwiperSlide>
      </Swiper>
    </header>

    <section
      class="tw-pt-24 tw-flex tw-flex-col tw-items-center tw-gap-12"
      :style="{ backgroundColor: carDto.buttonColor }"
    >
      <div class="tw-container tw-mx-auto">
        <section class="tw-my-5">
          <div class="tw-flex tw-gap-24 tw-justify-center tw-overflow-clip">
            <h4 class="tw-text-xl">{{ carDto.carName }}</h4>
            <h4 class="tw-text-xl">{{ carDto.carModel }}</h4>
          </div>

          <div
            class="tw-flex tw-px-5 tw-resize-none tw-justify-center w-w-full tw-items-center tw-mt-4 tw-overflow-clip tw-flex-col"
          >
           
            <!-- <div class="tw-flex tw-justify-between tw-px-8 mt-4 tw-overflow-clip"> -->
            <div class="tw-flex  tw-items-center tw-gap-32 tw-mt-4">
              <h4 class="tw-text-2xl">
                {{ $t("dynamicQr.carDynamic.CarPrice") }}
              </h4>
              <span class="tw-font-bold tw-text-2xl"
                >{{ carDto.price }} {{ carDto.currency }}</span
              >
            </div>
            <textarea
              ref="simpleExplanationTa"
              class="tw-text-center t tw-my-3 tw-text-lg tw-w-full tw-overflow-hidden tw-resize-none text-area border-none tw-outline-none"
              readonly
              :no-resize="true"
              v-model="carDto.simpleExplanation"
            ></textarea>
          </div>
        </section>

        <section
          v-if="carDto.info && carDto.info.length"
          :class="route.meta.layout == 'fullscreen' ? 'md:tw-mx-40 tw-mx-10' : ''"
        >
          <div class="tw-w-full tw-px-4">
            <GridINput :readonly="true" v-model="carDto.info"></GridINput>
            <v-btn v-if="buttonShown" :color="carDto.primaryColor"
              ><a :href="carDto.button.url">{{ carDto.button.name }}</a></v-btn
            >
          </div>
        </section>
        <section :class="route.meta.layout == 'fullscreen' ? 'md:tw-mx-40 tw-mx-10' : ''">
          <section
            class="tw-px-4"
            v-if="carDto.interiorFeatures && carDto.interiorFeatures.length"
          >
            <h4>{{ $t("dynamicQr.carDynamic.INTERIORFEATURES") }}</h4>
            <ul class="tw-list-disc tw-px-8 mt-4" v-if="carDto.interiorFeatures">
              <li v-for="item in carDto.interiorFeatures" class="tw-text-md tw-font-bold">
                {{ item }}
              </li>
            </ul>
          </section>

          <section class="tw-mt-4 tw-px-4 tw-overflow-clip" v-if="carDto.description">
            <h4>
              {{ $t("dynamicQr.carDynamic.Description") }}
            </h4>
           <span>{{ carDto.description }}</span>
          </section>

          <section class="tw-mt-4 tw-px-3 tw-overflow-clip tw-flex" v-if="carDto.address">
            <div v-if="carDto.address.city" class="tw-flex tw-flex-col tw-gap-2 tw-mt-2">
              <div class="tw-flex">
                <v-icon>mdi-map-marker-outline</v-icon>
                <h1 class="tw-mx-1">Address</h1>
              </div>
              <div class="tw-flex tw-flex-col tw-mx-6">
                <p v-if="carDto.address.streetName" class="tw-flex tw-gap-6">
                  <span>{{ carDto.address.streetName }}</span>
                  <span>{{ carDto.address.storeNumber }}</span>
                </p>

                <p v-if="carDto.address.regionNumber" class="tw-flex tw-gap-6">
                  <span>{{ carDto.address.regionNumber }}</span>
                  <span>{{ carDto.address.city }}</span>
                </p>
                <p v-if="carDto.address.country">
                  {{ carDto.address.country }}
                </p>
              </div>
            </div>
          </section>
          <section>
            <div class="tw-px-5 tw-my-4">
              <h3 class="tw-my-2">{{ $t("dynamicQr.businessDynamic.aboutName") }}</h3>
              <p><v-icon>mdi-account</v-icon> {{ carDto.contactInformation.name }}</p>
              <p><v-icon>mdi-email</v-icon> {{ carDto.contactInformation.email }}</p>
              <p><v-icon>mdi-phone</v-icon> {{ carDto.contactInformation.phone }}</p>
            </div>
          </section>
          <section class="mt-8 px-4 tw-overflow-clip">
            <h4><v-icon>mdi-link</v-icon> {{ $t("dynamicQr.carDynamic.Social") }}</h4>

            <!-- <div
              class="tw-absolute tw-bottom-[70px] -tw-left-[15px] tw-flex tw-justify-end tw-w-[95%]"
            >
              <v-btn
                @click="shareData"
                icon
                icon-color="white"
                light
                :color="carDto.primaryColor"
              >
                <v-icon color="white">mdi-share-variant-outline</v-icon></v-btn
              >
            </div> -->
            <ul
              v-if="carDto.socialMediaChannels && carDto.socialMediaChannels.length > 0"
              class="tw-flex tw-flex-wrap tw-gap-4 tw-my-4"
            >
              <li
                v-for="item in carDto.socialMediaChannels"
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
            <div class="tw-absolute" style="right: 10px; bottom: 120px">
              <v-btn
                class="ma-2 text-white"
                :color="carDto.primaryColor"
                icon="mdi-share-variant-outline"
                @click="shareData"
              ></v-btn>
            </div>
          </section>
        </section>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useCarQrStore } from "~/store/qrCodes/dynamic/car";
import { Swiper, SwiperSlide } from "swiper/vue";
import { getIconColor } from "~/api/dto/website/iconsData";
import "swiper/css";
import { AddCarDto } from "~/api/dto/qrCodes/dynamic/Car";
import { CarDynamicController } from "~/api/endpoints/carDynamic";
const props = defineProps({
  fetchData: {
    type: Boolean,
    default: true,
  },
});
const { getFileUrl } = useFile();
const route = useRoute();
const { carDto } = storeToRefs(useCarQrStore());
if (props.fetchData) {
  const { data } = await useCustomFetch<AddCarDto>(
    CarDynamicController.GET_QR_CAR + `?id=${route.params.id}`
  );
  if (data.value) {
    carDto.value = data.value;
  }
}
const buttonShown = computed(() => carDto.value.button.name !== "");
const shareData = async () => {
  try {
    await navigator.share({
      title: "Share",
      text: "",
      url: route.fullPath,
    });
  } catch (error) {}
};
const simpleExplanation = computed(() => carDto.value.simpleExplanation);
const carDescription = computed(() => carDto.value.description);
const simpleExplanationTa = ref();
const carDescriptionTa = ref();

watch(simpleExplanation, () => {
  simpleExplanationTa.value.style.height = simpleExplanationTa.value.scrollHeight + "px";
});
watch(carDescription, () => {
  carDescriptionTa.value.style.height = carDescriptionTa.value.scrollHeight + "px";
});
definePageMeta({ layout: "fullscreen" });
</script>
