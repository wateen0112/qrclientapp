<template>
  <div class="socialMedia">
    <!-- <template #content-Info> -->
    <div class="tw-w-full tw-text-gray-500 tw-relative tw-overflow-x-hidden">
      <div
        v-if="socialDynamicDto.socialMediaUrl"
        :style="{ backgroundColor: socialDynamicDto.primaryColor }"
      >
        <img
          class="tw-w-full md:tw-w-auto md:tw-mx-auto tw-object-contain tw-relative"
          :style="{ backgroundColor: socialDynamicDto.primaryColor }"
          :src="getFileUrl(socialDynamicDto.socialMediaUrl)"
        />
      </div>
      <div
        v-if="socialDynamicDto.imageUrl"
        :style="{ backgroundColor: socialDynamicDto.primaryColor }"
      >
        <img
          class="tw-w-full md:tw-w-auto md:tw-mx-auto tw-object-contain tw-relative"
          :src="getFileUrl(socialDynamicDto.imageUrl)"
        />
      </div>
      <div
        class="header tw-text-white tw-p-4 tw-flex tw-flex-col tw-h-36 tw-w-[100%]"
        :style="{ backgroundColor: socialDynamicDto.primaryColor }"
      >
        <div
          class="tw-text-white tw-h-36 tw-flex tw-flex-col lg:tw-items-center tw-items-start tw-gap-2"
          :style="{ backgroundColor: socialDynamicDto.primaryColor }"
        >
          <div
            class="tw-my-5 tw-mx-5 tw-flex tw-flex-col tw-justify-center tw-items-center"
          >
            <h2 class="tw-text-2xl">{{ socialDynamicDto.headLine }}</h2>
            <p>{{ socialDynamicDto.aboutUs }}</p>
          </div>
        </div>
      </div>
      <div class="tw-bg-white tw-p-4">
        <div class="social-media tw-mt-5 tw-mx-5 tw-mb-5">
          <h4 class="tw-mb-4 tw-text-lg tw-text-gray-700">
            {{ $t("dynamicQr.businessDynamic.channels") }}:
          </h4>

          <ul
            v-if="
              socialDynamicDto.socialMediaChannels &&
              socialDynamicDto.socialMediaChannels.length > 0
            "
            class="tw-flex tw-flex-wrap tw-gap-4 tw-mt-4"
          >
            <li
              v-for="item in socialDynamicDto.socialMediaChannels"
              :key="item.url"
              class="tw-flex tw-flex-row"
            >
              <v-icon size="x-large" class="tw-text-gray-600 tw-my-auto tw-mx-3">{{
                item.iconName
              }}</v-icon>
              <div class="tw-flex tw-flex-col ">
                <a variant="plain" :href="item.url" class="tw-font-bold tw-text-lg" >
                  {{ item.name }}
                </a>
                <span>{{ item.text }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="tw-absolute" style="right: 10px; bottom: 10px">
        <v-btn
          class="ma-2 text-white"
          :color="socialDynamicDto.buttonColor"
          icon="mdi-share-variant-outline"
          @click="shareData"
        ></v-btn>
      </div>
    </div>

    <!-- </template> -->
  </div>
</template>
<script setup lang="ts">
import { useQrSocialMediaDynamic } from "@/store/qrCodes/dynamic/socialMedia";
import { AddSocialMediaDto } from "~/api/dto/qrCodes/dynamic/SocialMedia";
import { storeToRefs } from "pinia";
import { socialMediaController } from "~/api/endpoints/socialMediaDynamic";
const { getFileUrl } = useFile();
const SocialMediaStore = useQrSocialMediaDynamic();
const { socialDynamicDto } = storeToRefs(SocialMediaStore);
const route = useRoute();
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
//GetById PdfDto
if (props.fetchData) {
  const { data } = await useCustomFetch<AddSocialMediaDto>(
    socialMediaController.GET_QR_SOCIAL_MEDIA + `?id=${route.params.id}`
  );
  if (data.value) {
    socialDynamicDto.value = data.value;
  }
}
definePageMeta({ layout: "fullscreen" });
</script>
