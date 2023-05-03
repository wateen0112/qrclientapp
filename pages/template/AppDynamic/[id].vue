<template>
  <div class="facebook">
    <div
      class="div tw-h-auto tw-overflow-x-hidden tw-relative tw-bg-white"
      :style="{ background: `${appDto.primaryColor}` }"
    >
      <div
        class="header tw-text-white tw-flex tw-flex-col tw-item-center tw-justify-center"
      >
        <div
          class="tw-text-white tw-flex tw-item-center tw-justify-center tw-text-4xl tw-font-bold"
        >
          {{ appDto.name }}
        </div>
        <div class="tw-text-white tw-flex tw-item-center tw-justify-center tw-text-2xl tw-mt-2">
          {{ appDto.developer }}
        </div>
      </div>

      <div
        v-if="appDto.logoUrl"
        class="tw-flex tw-items-center tw-justify-center tw-item-center tw-m-4"
      >
        <img :src="getFileUrl(appDto.logoUrl)" />
      </div>
      <div class="hidden">
        <div
          class="tw-text-white tw-flex tw-item-center tw-justify-center  tw-text-3xl tw-font-bold"
        >
          {{ appDto.title }}
        </div>
        <div class="tw-text-white tw-flex tw-item-center tw-justify-center my-2 tw-text-2xl">
          {{ appDto.description }}
        </div>
        <div
          class="tw-text-white tw-flex tw-item-center tw-justify-center"
          v-if="appDto.button.name"
        >
          <a :href="appDto.button.url">
            <button class="btn btn-default" id="_button" outlined color="white">
              {{ appDto.button.name }}
            </button>
          </a>
        </div>
        <div class="tw-flex tw-flex-col tw-items-center tw-gap-4" v-if="appDto.logoUrl">
          <a :href="appDto.appStoreUrl" class="tw-w-max tw-mt-6">
            <img
              src="~assets/svg/appDynamic/SVG/Asset1.svg"
              alt="AppStore"
              class="tw-h-[75px]"
          /></a>
          <a :href="appDto.googleStoreUrl" class="tw-w-max"
            ><img
              class="tw-h-[75px]"
              src="~assets/svg/appDynamic/SVG/Asset2.svg"
              alt="GooglePlay"
          /></a>
        </div>
      </div>

      <div
        v-if="appDto.website"
        class="footer tw-flex tw-justify-center tw-items-end tw-text-white tw-mt-3 tw-p-2"
      >
        <a :href="appDto.website">
          <button class="btn btn-default" id="_button" outlined color="white">
            Website
          </button>
        </a>
      </div>
    </div>
    <div class="tw-absolute" style="right: 30px; bottom: 20px">
      <v-btn
        class="ma-2 text-white"
        :color="appDto.buttonColor"
        icon="mdi-share-variant-outline"
        @click="shareData"
      ></v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppQrStore } from "~/store/qrCodes/dynamic/appDynamic";
import { storeToRefs } from "pinia";
import { AppDynamicController } from "~/api/endpoints/AppDynamic";
import { AddAppDto } from "~/api/dto/website/DynamicAppDto";
const AppStore = useAppQrStore();
const { getFileUrl } = useFile();
const { appDto } = storeToRefs(AppStore);
const route = useRoute();
const props = defineProps({
  fetchData: {
    type: Boolean,
    default: true,
  },
});

if (props.fetchData) {
  const { data } = await useCustomFetch<AddAppDto>(
    AppDynamicController.GetAppId + `?id=${route.params.id}`
  );
  if (data.value) {
    appDto.value = data.value;
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
definePageMeta({
  layout: "fullscreen",
});
</script>
<style scoped>
#_button {
  border: 1px solid #fff;
  padding: 10px;
  background-color: transparent;
  color: #fff;
  border-radius: 20px;
  width: 150px;
}
/* .div {
  background-color: #b97465;
} */
.svg {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.header {
  height: 150px;
  margin-top: 0;
}
.footer {
  height: 200px;
  margin-bottom: 0;
}
.hidden {
  height: 200px;
}
</style>
