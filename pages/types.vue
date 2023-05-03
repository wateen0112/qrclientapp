<template>
  <div class="types">
    <!-- Top Right yellow img -->
    <img
      class="tw-absolute -tw-z-10 tw-top-64 tw-left-0 rtl:-tw-scale-x-100"
      src="~assets/svg/shapes/create-qr-yellow-shap.svg"
    />
    <!-- img in create group qr -->
    <img
      class="tw-absolute -tw-z-10 tw-top-64 tw-left-0 rtl:-tw-scale-x-100"
      src="~assets/svg/group-qr.svg"
    />
    <!--Bottom left yellow img-->
    <img
      class="tw-absolute lg:tw-h-screen -tw-z-10 tw-bottom-0 tw-right-0 rtl:-tw-scale-x-100"
      src="~assets/svg/typeRight.svg"
    />
    <!-- img in create group qr -->
    <img
      class="tw-absolute -tw-z-10 tw-bottom-24 tw-right-0 rtl:-tw-scale-x-100"
      src="~assets/svg/group-qr.svg"
    />
    <!--img qrCopy-->
    <img
      class="tw-absolute lg:tw-h-screen -tw-z-10 tw-right-0 tw-top-15 tw-mx-24 rtl:-tw-scale-x-100 tw-hidden lg:tw-flex"
      src="~assets/svg/qrCopy.svg"
    />
    <!-- start hero -->
    <section class="hero">
      <div
        data-aos="fade-down"
        class="tw-flex tw-flex-col tw-justify-center tw-text-center tw-p-3"
      >
        <h2 class="tw-text-4xl">Create different types of QR codes</h2>
        <p class="tw-mt-4">
          QR codes can hold a large amount of content and at QRGER, we offer them all.
        </p>
      </div>
    </section>

    <section class="QrCard">
      <div
        class="cards lg:tw-container tw-mx-auto md:tw-px-0 tw-px-3 tw-grid lg:tw-grid-cols-3 tw-grid-cols-1"
      >
        <div v-for="item in qrStore.dynamicQrTypes">
          <div
            data-aos="fade-right"
            class="tw-cursor-pointer tw-text-center tw-bg-white tw-p-8 tw-my-5 tw-shadow-lg md:tw-mx-10 tw-mx-3 tw-rounded-xl"
          >
            <div class="tw-mb-5 tw-flex tw-justify-center tw-items-center tw-gap-2">
              <img :src="getImagePath(item.qrIndex)" />
              <h2 class="text-2xl" @click="goToPageDynamic(item.qrIndex)">
                {{ item.name }}
              </h2>
            </div>
            <div class="tw-overflow-x-hidden">
              <ReadMore :words-count="2" :text="item.description"></ReadMore>
            </div>
          </div>
        </div>
        <div v-for="item in qrStore.staticQrTypes">
          <div
            data-aos="fade-left"
            class="tw-cursor-pointer tw-text-center tw-bg-white tw-p-8 tw-shadow-xl tw-my-5 md:tw-mx-10 tw-mx-3 tw-rounded"
          >
            <div class="tw-mb-5 tw-flex tw-justify-center tw-items-center tw-gap-2">
              <img :src="getImagePath(item.qrIndex)" />
              <h2 @click="goToPageStatic(item.qrIndex)">{{ item.name }}</h2>
            </div>
            <div class="tw-overflow-x-hidden">
              <ReadMore :words-count="2" :text="item.description"></ReadMore>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end hero -->
  </div>
</template>

<script setup lang="ts">
import { useQrStore } from "../store/qrCodes/qr";
import { useAppStore } from "../store/app";
const isCardDetailsVisible = ref(false);
const appStore = useAppStore();
const dialog = computed(() => appStore.qrDialog);
const qrStore = useQrStore();
qrStore.GetAllQrTypes();
function go() {
  !isCardDetailsVisible;
}
function getImagePath(index: any) {
  return new URL(`../assets/svg/qrTypes/${index}.svg`, import.meta.url).href;
}
definePageMeta({
  title: "home.title",
});
function setQrDialog(is: boolean) {
  appStore.qrDialog = is;
}
//go to pages Qr Dynamic
function goToPageDynamic(target: any) {
  setQrDialog(false);
  navigateTo(`/dynamic/${target}/${0}`);
}
//go to pages Qr Static
function goToPageStatic(target: any) {
  setQrDialog(false);
  navigateTo(`/static/${target}/${0}`);
}
</script>
<style lang="scss">
.types {
  min-height: calc(100vh);
  padding-top: 100px;
  overflow-x: hidden;
  position: relative;
  .QrCard {
    padding-top: 50px;
  }
}
</style>
