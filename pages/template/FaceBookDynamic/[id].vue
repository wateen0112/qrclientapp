<template>
  <div
    class="tw-relative tw-h-[100vh] tw-w-full "
    :style="{ background: `${codeDto.primaryColor}` }"
  >
    <div class="tw-text-white tw-p-4 tw-flex tw-justify-center tw-text-center">
      <p class="tw-mb-4 tw-text-2xl tw-font-bold">{{ codeDto.title }}</p>
    </div>

    <div
      class="tw-flex tw-flex-col tw-absolute tw-items-center tw-w-[100%] tw-ring-neutral-200 tw-justify-center -tw-top-[15px] tw-item-center"
    >
     
        <div
          v-if="codeDto.imageUrl.length"
          class="tw-items-center tw-justify-center tw-item-center tw-mt-20"
        >
          <img
            class="tw-w-full md:tw-w-auto md:tw-h-max-[350px] md:tw-mx-auto tw-rounded-lg tw-object-contain tw-relative"
            :src="getFileUrl(codeDto.imageUrl)"
          />
        </div>
        <div
          class="tw-flex tw-my-12 tw-p-2 tw-overflow-x-hidden tw-flex-grow tw-justify-center tw-items-center"
        >
          <span class="tw-text-center tw-font-bold tw-text-white tw-text-2xl"> {{ codeDto.name }}</span>
        </div>

      <a :href="codeDto.facebookUrl" v-if="codeDto.imageUrl.length > 0">
        <v-btn :color="codeDto.buttonColor" class="text-center" large>
          <p class="p-3 tw-text-white">Go to our facebook bage</p>
          <v-icon class="p-3 tw-text-white" dark right>
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </a>
      <div
        class="tw-flex tw-mt-[85px] tw-p-2 tw-overflow-x-hidden tw-flex-grow tw-justify-center tw-items-center"
      >
        <a :href="codeDto.website">
          <p class="p-3 tw-text-white">{{ codeDto.website }}</p>
        </a>
      </div>
    </div>
    <div class="tw-absolute" style="right: 10px; bottom: 30px">
      <v-btn
        class=" text-white"
        :color="codeDto.buttonColor"
        icon="mdi-share-variant-outline"
        @click="shareData"
      ></v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { facebookDto } from "@/api/dto/website/facebookDto";
import { useFacebookStore } from "@/store/qrCodes/dynamic/facebook";
import { storeToRefs } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { facebookController } from "~/api/endpoints/facebook";
const { getFileUrl } = useFile();
const route = useRoute();
const { codeDto } = storeToRefs(useFacebookStore());
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

if (props.fetchData) {
  const { data } = await useCustomFetch<facebookDto>(
    facebookController.GetFacebook + `?id=${route.params.id}`
  );

  if (data.value) {
    codeDto.value = data.value;
  }
}
// if (props.fetchData) {
//   const { data } = await useCustomFetch<QrStyle>(
//     QrController.GET_STYLE_QR + `?id=${route.params.id}`
//   );
//   if (data.value) {
//     qrStyleDto.value = data.value;
//   }
// }

definePageMeta({
  layout: "fullscreen",
  styleQr: "dynamicCodeLayout",
});
</script>
<style scoped>

/* .image {
  align-items: center;
  display: flex;
  position: relative;
  justify-content: center;
  height: 500px;
  width: 350px;
  position: absolute;
}
img {
  justify-content: center;
  height: 194px;
  width: 400px;
  margin: 0 0px;
} */
</style>
