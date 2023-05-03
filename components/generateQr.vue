<template>
  <div>
    <div class="generateCode">
      <ClientOnly>
        <v-dialog v-model="dialog" persistent width="992">
          <v-card class="relative">
            <img class="tw-absolute -tw-z-10 tw-top-0 tw-left-0 rtl:-tw-scale-x-100"
              src="~assets/svg/shapes/index-generate-qr-yellow.svg" />
            <v-card-title class="tw-bg-white titleCard tw-flex tw-justify-between flex d-flex tw-items-center">
              <span> {{ $t("Dialog.CreateQR") }} </span>
              <v-btn variant="text" @click="setQrDialog(false)" icon="mdi-close"></v-btn>
            </v-card-title>
            <v-card-text class="tw-bg-gray-100 tw-relative">
              <!--img code yellow top left-->

              <v-container>
                <!--type Dynamic-->
                <div class="tw-grid tw-grid-cols-12">
                  <div class="tw-col-span-12">
                    <hr class="line" />
                  </div>

                  <div class="tw-col-span-12 tw-flex tw-justify-center tw-text-center">
                    <h1>{{ $t("Dialog.DynamicCode") }}</h1>
                  </div>

                  <div class="tw-col-span-12">
                    <hr class="line" />
                  </div>

                  <div v-for="dynamic in qrStore.dynamicQrTypes"
                    class="tw-col-span-12 md:tw-col-span-6 tw-flex tw-justify-center tw-my-4">
                    <div class="cardCode tw-gap-6 tw-flex tw-cursor-pointer" @click="goToPageDynamic(dynamic.qrIndex)">
                      <div class="tw-flex tw-items-center">
                        <img :src="getImagePath(dynamic.qrIndex)" />
                      </div>

                      <div class="tw-flex tw-items-center tw-overflow-x-hidden tw-w-[220px]">
                        <h2>{{ dynamic.name }}</h2>
                        <!-- <p class="tw-mt-2 tw-text-gray-500">
                          {{ dynamic.description }}
                        </p> -->
                      </div>
                    </div>
                  </div>
                </div>

                <!--type Static-->
                <div class="tw-grid tw-grid-cols-12">
                  <div class="tw-col-span-12">
                    <hr class="line" />
                  </div>

                  <div class="tw-col-span-12 tw-flex tw-justify-center tw-text-center">
                    <h1>{{ $t("Dialog.StaticCode") }}</h1>

                  </div>

                  <div class="tw-col-span-12">
                    <hr class="line" />
                  </div>

                  <div v-for="item in qrStore.staticQrTypes"
                    class="tw-col-span-12 md:tw-col-span-6 tw-flex tw-justify-center tw-my-4">
                    <div class="cardCode tw-gap-6 tw-flex tw-cursor-pointer" @click="goToPageStatic(item.qrIndex)">
                      <div class="tw-flex tw-items-center">
                        <img :src="getImagePath(item.qrIndex)" />
                      </div>

                      <div class="tw-flex tw-items-center tw-overflow-x-hidden tw-w-[220px]">
                        <h2>{{ item.name }}</h2>
                        <!-- <p class="tw-mt-2 tw-text-gray-500">
                          {{ dynamic.description }}
                        </p> -->
                      </div>
                    </div>
                  </div>
                </div>



              </v-container>
              <!--img code red bottom right-->
              <img class="tw-absolute tw-z-10 tw-bottom-0 tw-right-0 rtl:-tw-scale-x-100"
                src="~assets/svg/shapes/index-code-bottom.svg" />
            </v-card-text>
          </v-card>
        </v-dialog>
      </ClientOnly>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useQrStore } from "~/store/qrCodes/qr";
import { useRouter } from "vue-router";
import { useAppStore } from "../store/app";
const appStore = useAppStore();
const localePath = useLocalePath()
const router = useRouter();
const dialog = computed(() => appStore.qrDialog);
const qrStore = useQrStore();
//go to pages Qr Dynamic
function goToPageDynamic(target: any) {
  setQrDialog(false);
  navigateTo(localePath(`/dynamic/${target}/${0}`));
}
//go to pages Qr Static
function goToPageStatic(target: any) {
  setQrDialog(false);
  navigateTo(localePath(`/static/${target}/${0}`));
}
// icon
function getImagePath(index: any) {
  return new URL(`../assets/svg/qrTypes/${index}.svg`, import.meta.url).href;
}

function setQrDialog(is: boolean) {
  appStore.qrDialog = is;
}
</script>
<style lang="scss" scoped>
.generateCode {
  .titleCard {
    font-size: 15px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    z-index: 11;
  }

  .line {
    height: 4px;
    background-color: rgb(35, 35, 35);
  }
}

h1 {
  font-size: 24px;
}

.cardCode {
  border: 1px solid rgb(245, 209, 78);
  padding: 15px;
  width: 350px;
  border-radius: 0 30px 30px 0;
  box-shadow: 0 0 15px -10px #000;
  background-color: white;
}
</style>
