<template>
  <NuxtLayout name="dynamic-code-layout">
    <Form
      :validation-schema="schema"
      ref="socialMediaForm"
      v-slot="value"
      :initial-values="{ ...socialDynamicDto }"
    >
      <div>
        <div class="socialMedia">
          <div
            class="tw-flex tw-justify-between tw-items-center tw-gap-3 tw-mb-2"
          >
            <!-- <img src="@/assets/svg/qrTypes/BusinessDynamic.svg" /> -->
            <svg
              width="30"
              height="27"
              viewBox="0 0 30 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.87966 5.689C5.9276 5.96238 4.45567 7.7153 4.45567 9.76649V10.7293H1.59367C0.739428 10.7293 0.046875 11.4499 0.046875 12.3387C0.046875 13.2275 0.739428 13.948 1.59367 13.948H4.45567V14.9109C4.45567 16.9621 5.9276 18.7148 7.87966 18.9882L8.28121 19.0444V25.3906C8.28121 26.2794 8.97376 27 9.82801 27C10.6823 27 11.3748 26.2794 11.3748 25.3906V19.4776L19.8414 20.6636C20.2142 22.9393 22.1213 24.6769 24.411 24.6769C26.9674 24.6769 29.0469 22.5112 29.0469 19.8488V4.8281C29.0469 2.16578 26.9674 0 24.411 0C22.1213 0 20.2142 1.73769 19.8414 4.01333L7.87966 5.689ZM19.7754 17.4067L8.29235 15.7982C7.86873 15.739 7.54926 15.3574 7.54926 14.9109V9.76649C7.54926 9.31973 7.86873 8.93842 8.29235 8.87898L19.7754 7.27047V17.4067ZM22.869 4.82831C22.869 3.9408 23.5607 3.21895 24.4112 3.21895C25.2618 3.21895 25.9535 3.9408 25.9535 4.82831V19.8491C25.9535 20.7366 25.2618 21.4584 24.4112 21.4584C23.5609 21.4584 22.869 20.7366 22.869 19.8491V4.82831Z"
                fill="black"
              />
            </svg>

            <v-text-field
              id="qrName"
              v-model="socialDynamicDto.qrName"
              :placeholder="$t('dynamicQr.socialMediaDynamic.qrName')"
            ></v-text-field>
          </div>

          <!-- Design -->
          <div class="tw-w-full tw-bg-white tw-rounded-lg">
            <div class="header tw-bg-gray-100 tw-p-4">
              <span class="tw-text-gray-600">Design</span>
            </div>

            <div class="hidden tw-pt-8 tw-bg-white tw-rounded-lg">
              <h3
                class="tw-mb-9 tw-text-center tw-text-lg tw-tracking-tight tw-text-gray-600"
              >
                {{ $t("dynamicQr.socialMediaDynamic.designTitle") }}
              </h3>
              <label class="tw-px-3 tw-text-gray-600"> Colors</label>

              <div
                class="tw-p-4 tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-gap-5 tw-cursor-pointer"
              >
                <div
                  v-for="(color, i) in colorsData"
                  :key="i"
                  class="tw-relative"
                  @click="SocialMediaStore.setColor(color, i)"
                >
                  <div
                    class="tw-absolute"
                    style="top: -8px; left: -5px"
                    v-if="activeIndex == i"
                  >
                    <svg
                      style="stroke-width: 2px"
                      width="117"
                      height="53"
                      viewBox="0 0 117 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="116"
                        height="46"
                        rx="9.5"
                        stroke="#EB262B"
                      />
                      <circle cx="110" cy="46" r="7" fill="#EB262B" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M108.507 46.8937L112.409 43.2534C112.771 42.9155 113.366 42.9155 113.728 43.2534C114.091 43.5913 114.091 44.1471 113.728 44.485C110.248 47.7439 112.654 45.4986 109.161 48.7466C108.799 49.0845 108.203 49.0845 107.841 48.7466V48.7575L105.272 46.3379C104.909 46 104.909 45.4441 105.272 45.1063C105.634 44.7684 106.229 44.7684 106.591 45.1063L108.507 46.8937Z"
                        fill="white"
                      />
                    </svg>
                  </div>

                  <div
                    class="tw-flex tw-justify-center tw-items-center tw-gap-1"
                  >
                    <div
                      class="tw-rounded-lg"
                      style="height: 30px; width: 50px"
                      :style="{ backgroundColor: color[0] }"
                    ></div>
                    <div
                      class="tw-rounded-lg"
                      style="height: 30px; width: 50px"
                      :style="{ backgroundColor: color[1] }"
                    ></div>
                  </div>
                </div>
              </div>

              <div
                class="tw-flex tw-flex-col sm:tw-flex-row tw-bg-gray-200 py-5 tw-justify-center tw-flex-wrap tw-items-center mt-10 md:tw-gap-6 tw-gap-0"
              >
                <div class="tw-basis-full sm:tw-basis-48">
                  <label>Primary</label>
                  <div class="tw-relative">
                    <input
                      v-model="socialDynamicDto.primaryColor"
                      class="bg-white py-3 px-2 focus:tw-outline-primary tw-w-full"
                      style="border-radius: 10px"
                      variant="filled"
                    />
                    <div
                      class="tw-h-6 tw-w-10 border tw-overflow-hidden tw-flex tw-rounded-full tw-absolute tw-top-1/2 -tw-translate-y-1/2"
                      style="right: 10px"
                    >
                      <input
                        type="color"
                        v-model="socialDynamicDto.primaryColor"
                        class="tw-absolute tw-h-[50px] tw-scale-150"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="tw-basis-full md:tw-basis-12 tw-flex tw-justify-center"
                >
                  <v-btn
                    class="ma-2 text-white"
                    color="primary"
                    icon="mdi-swap-horizontal"
                    @click="SocialMediaStore.swap"
                  >
                  </v-btn>
                </div>

                <div class="tw-basis-full sm:tw-basis-48">
                  <label>Button</label>

                  <div class="tw-relative">
                    <input
                      v-model="socialDynamicDto.buttonColor"
                      class="tw-w-full bg-white py-3 px-2 focus:tw-outline-primary"
                      style="border-radius: 10px; border: none"
                      variant="outlined"
                    />
                    <div
                      class="tw-h-6 tw-w-10 border tw-overflow-hidden tw-flex tw-rounded-full tw-absolute tw-top-1/2 -tw-translate-y-1/2"
                      style="right: 10px"
                    >
                      <input
                        type="color"
                        v-model="socialDynamicDto.buttonColor"
                        class="tw-absolute tw-h-[50px] tw-scale-150"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!--Swiper-->
              <div class="tw-mt-5 tw-p-4">
                <div class="tw-flex">
                  <p
                    class="tw-text-lg tw-tracking-tight tw-text-gray-600 tw-p-1"
                  >
                    {{ $t("dynamicQr.socialMediaDynamic.designImg") }}
                  </p>
                  <v-file-input
                    class="fileSocialMedia"
                    prepend-icon=""
                    :label="$t('dynamicQr.socialMediaDynamic.designImgUpload')"
                    variant="underlined"
                    @change="changeFile"
                    clearable
                  ></v-file-input>
                </div>
                <div class="tw-mt-5 tw-overflow-x-hidden tw-z-10">
                  <swiper :slides-per-view="3" :space-between="30">
                    <swiper-slide v-for="item in url" :key="item">
                      <div>
                        <img
                          @click="setActiveSlide(item)"
                          style="width: 300px; height: 200px"
                          class="rounded-lg object-cover"
                          :src="item"
                          :class="{
                            'rounded-lg p-0 m-0 flex items-center':
                              activeSlide == item,
                          }"
                        />
                      </div>
                    </swiper-slide>
                  </swiper>
                </div>
              </div>
            </div>
          </div>

          <!-- Basic information -->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
            <div class="header tw-flex tw-bg-gray-100 tw-p-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.79261 14V7.45455H10.3352V14H8.79261ZM9.56818 6.52557C9.32386 6.52557 9.11364 6.4446 8.9375 6.28267C8.76136 6.1179 8.6733 5.92045 8.6733 5.69034C8.6733 5.45739 8.76136 5.25994 8.9375 5.09801C9.11364 4.93324 9.32386 4.85085 9.56818 4.85085C9.81534 4.85085 10.0256 4.93324 10.1989 5.09801C10.375 5.25994 10.4631 5.45739 10.4631 5.69034C10.4631 5.92045 10.375 6.1179 10.1989 6.28267C10.0256 6.4446 9.81534 6.52557 9.56818 6.52557Z"
                  fill="black"
                />
                <circle cx="10" cy="10" r="9.5" stroke="black" />
              </svg>

              <span class="tw-text-gray-600" style="margin-left: 12px"
                >Basic information</span
              >
            </div>
            <!--Form-->
            <div class="hidden tw-p-4 tw-bg-white tw-rounded-lg">
              <div class="tw-text-gray-600 tw-flex tw-items-center tw-gap-5">
                <label class="tw-mt-6"
                  >{{ $t("dynamicQr.socialMediaDynamic.headline") }}:</label
                >
                <div class="tw-flex tw-flex-col tw-w-full">
                  <Field name="headLine" v-slot="{ field }">
                    <v-text-field
                      v-bind="field"
                      v-model="socialDynamicDto.headLine"
                      :label="$t('dynamicQr.socialMediaDynamic.headline')"
                    ></v-text-field>
                  </Field>
                  <ErrorMessage
                    name="headLine"
                    class="tw-text-secondary text-sm pt-1"
                  ></ErrorMessage>
                </div>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-4"
              >
                <label class="tw-mt-6"
                  >{{ $t("dynamicQr.socialMediaDynamic.aboutus") }}:</label
                >
                <v-text-field
                  v-model="socialDynamicDto.aboutUs"
                  :label="$t('dynamicQr.socialMediaDynamic.aboutus')"
                ></v-text-field>
              </div>
            </div>
          </div>

          <!-- Social Media channels -->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
            <div class="header tw-bg-gray-100 tw-p-4">
              <span> {{ $t("dynamicQr.businessDynamic.channels") }} </span>
            </div>
            <div class="tw-p-5">
              <SocialMediaInput
                v-model="socialDynamicDto.socialMediaChannels"
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
    <template #mobile>
      <SocialMediaTemplate :fetch-data="false"></SocialMediaTemplate>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import SocialMediaTemplate from "../../template/SocialMediaDynamic/[id].vue";
import { useQrSocialMediaDynamic } from "@/store/qrCodes/dynamic/socialMedia";
import { storeToRefs } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Field, ErrorMessage, Form } from "vee-validate";
import * as yup from "yup";
import { useQrStore } from "@/store/qrCodes/qr";
import { useFile } from "@/composables/useFile";
import { useToast } from "vue-toastification";
import { AddSocialMediaDto } from "@/api/dto/qrCodes/dynamic/SocialMedia";
import { socialMediaController } from "~/api/endpoints/socialMediaDynamic";
const isModify = computed(() => route.params.id !== "0");
const route = useRoute();
const toast = useToast();
const QrStore = useQrStore();
const socialMediaForm = ref<InstanceType<typeof Form> | null>(null);
const schema = computed(() => {
  return yup.object({
    headLine: yup.string().required("headLine is required"),
    socialMediaDynamic: yup.string().required("socialMediaDynamic is required"),
  });
});
const { download } = useFile();
const SocialMediaStore = useQrSocialMediaDynamic();
const { activeIndex, url, socialDynamicDto } = storeToRefs(SocialMediaStore);
const activeSwiper = computed(() => SocialMediaStore.activeSwiper);
const colors = computed(() => colorsData.map((ele) => ele).map((item) => item));
const colorsData = [
  ["#73b5e7", "#dd0ec1"],
  ["#EEA886", "#F07464"],
  ["#F9C2ED", "#E567F0"],
];
const activeSlide = ref("");
function setActiveSlide(i: string) {
  socialDynamicDto.value.imageFile = "";
  socialDynamicDto.value.socialMediaUrl = "";
  socialDynamicDto.value.imageUrl = i;
}

if (isModify.value) {
  const { data } = await useCustomFetch<AddSocialMediaDto>(
    socialMediaController.GET_QR_SOCIAL_MEDIA + `?id=${route.params.id}`
  );
  if (data.value) {
    socialDynamicDto.value = data.value;
  }
}

function changeFile(e: any) {
  const input = e.target.files[0];
  if (input) {
    socialDynamicDto.value.imageUrl = "";
    socialDynamicDto.value.imageFile = input;
    socialDynamicDto.value.socialMediaUrl = URL.createObjectURL(input);
  }
}
onMounted(() => {
  QrStore.emitter.on("dynamicQrDownload", () => {
    socialMediaForm.value?.validate().then((valid) => {
      if (socialDynamicDto.value.headLine != "") {
        if (route.params.id !== "0") {
          SocialMediaStore.modifySocialMedia();
          download(QrStore.qrPreview, socialDynamicDto.value.qrName);
        } else {
          SocialMediaStore.addSocialMedia();
          download(QrStore.qrPreview, socialDynamicDto.value.qrName);
        }
      } else toast.error("headLine & socialMediaDynamic are required ");
    });
  });
});
// onBeforeUnmount(() => {
//   SocialMediaStore.resetDto();
// });

definePageMeta({
  layout: false,
  middleware: ["create-qr"],
});
</script>
<style lang="scss">
.socialMedia {
  .fileSocialMedia {
    position: relative;
    bottom: 8px;
    color: rgb(0, 128, 255);
    font-weight: bolder;
  }
}
</style>
