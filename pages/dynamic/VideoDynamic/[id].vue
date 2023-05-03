<template>
  <skeleton v-if="loading"> </skeleton>
  <div v-else>
    <NuxtLayout name="dynamic-code-layout">
      <template #default>
        <Form
          :validation-schema="schema"
          ref="myForm"
          class="tw-w-full tw-px-5"
        >
          <div class="tw-grid tw-grid-cols-12">
            <div class="nameQr tw-flex tw-items-center tw-col-span-12">
              <img :src="qrImageSvg" width="40" class="tw-mx-2" />
              <div class="tw-block tw-w-full">
                <Field
                  name="QrName"
                  v-slot="{ field }"
                  v-model="dynamicVideoDto.qrName"
                >
                  <v-text-field
                    id="qrName"
                    v-bind="field"
                    class="tw-text-gray-600 tw-my-5"
                    :label="$t('dynamicQr.imageDynamic.qrname')"
                    v-model="dynamicVideoDto.qrName"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="QrName" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
            </div>
          </div>

          <!-- PDF -->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-my-4">
            <div class="header tw-bg-gray-100 tw-p-4 tw-flex">
              <span class="tw-text-gray-600" style="margin-left: 12px">{{
                $t("dynamicQr.imageDynamic.design")
              }}</span>
            </div>

            <div class="hidden tw-p-4 tw-bg-white tw-rounded-lg">
              <h3
                class="tw-mb-5 tw-tracking-tight tw-text-gray-600 tw-text-center"
              >
                {{ $t("dynamicQr.imageDynamic.color") }}
              </h3>
              <div
                class="tw-text-gray-400 tw-text-lg tw-font-bold tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-gap-5 tw-cursor-pointer"
              >
                <div
                  v-for="(color, currentIndex) in colorsData"
                  :key="currentIndex"
                  class="tw-relative"
                  @click="setInnerIndex(currentIndex, color[0], color[1])"
                >
                  <div
                    class="tw-absolute"
                    style="top: -8px; left: -5px"
                    v-if="currentIndex == innerIndex"
                  >
                    <svg
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
                    class="tw-flex tw-justify-center tw-items-center tw-gap-1 tw-rounded"
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
                class="tw-flex lg:tw-justify-center tw-justify-start tw-mt-[80px] tw-items-center tw-w-[100%] lg:tw-gap-10 tw-gap-5 tw-flex-col lg:tw-flex-row tw-bg-gray-200 tw-py-3"
              >
                <div>
                  <span class="tw-text-center tw-w-[100%]">
                    {{ $t("dynamicQr.videoDynamic.primary") }}</span
                  >
                  <div class="tw-mt-5">
                    <div
                      class="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-7 tw-border-[2px] tw-bg-white tw-px-6 tw-rounded-2xl tw-py-[14px]"
                    >
                      <input
                        type="text"
                        class="tw-flex tw-w-[70px]"
                        v-model="dynamicVideoDto.primaryColor"
                      />
                      <div
                        class="tw-rounded-full tw-overflow-hidden tw-w-[50px] tw-h-[28px] tw-border-none"
                      >
                        <div
                          class="tw-relative tw-w-[30px] tw-h-[30px] tw-rounded-full"
                        >
                          <input
                            type="color"
                            class="tw-border-none tw-top-[-50%] tw-left-[-40px] tw-translate-x-[10px] tw-absolute tw-rounded-full tw-w-[140px] tw-h-[140px]"
                            dot-size="90"
                            v-model="dynamicVideoDto.primaryColor"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <v-btn
                  color="primary"
                  class="tw-mt-10"
                  icon="mdi-swap-horizontal"
                  @click="exchange"
                >
                </v-btn>

                <div>
                  <span class="tw-text-center tw-w-[100%]">
                    {{ $t("dynamicQr.videoDynamic.button") }}</span
                  >
                  <div class="tw-mt-5">
                    <div>
                      <div class="tw-mt-5">
                        <div
                          class="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-7 tw-border-[2px] tw-bg-white tw-px-6 tw-rounded-2xl tw-py-[14px]"
                        >
                          <input
                            type="text"
                            class="tw-flex tw-w-[70px]"
                            v-model="dynamicVideoDto.buttonColor"
                          />
                          <div
                            class="tw-rounded-full tw-overflow-hidden tw-w-[50px] tw-h-[28px] tw-border-none"
                          >
                            <div
                              class="tw-relative tw-w-[30px] tw-h-[30px] tw-rounded-full"
                            >
                              <input
                                type="color"
                                class="tw-border-none tw-top-[-50%] tw-left-[-40px] tw-translate-x-[10px] tw-absolute tw-rounded-full tw-w-[140px] tw-h-[140px]"
                                dot-size="90"
                                v-model="dynamicVideoDto.buttonColor"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="tw-flex tw-justify-around tw-gap-0 tw-items-center lg:tw-flex-row :tw-flex-col tw-px-40 tw-py-10"
              ></div>
            </div>
          </div>
          <!-- Design -->
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

              <span class="tw-text-gray-600" style="margin-left: 12px">
                {{ $t("dynamicQr.imageDynamic.basicInformation") }}</span
              >
            </div>

            <div class="tw-p-7 tw-bg-white tw-rounded-lg">
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-py-5"
              >
                <label class="tw-mb-3 tw-w-32">
                  {{ $t("dynamicQr.videoDynamic.company") }} :</label
                >
                <Field
                  name="Company"
                  v-slot="{ field }"
                  v-model="dynamicVideoDto.company"
                >
                  <v-text-field
                    label=""
                    v-model="dynamicVideoDto.company"
                    v-bind="field"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="Company" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-py-5"
              >
                <label class="tw-mb-3 tw-w-32"
                  >{{ $t("dynamicQr.videoDynamic.headline") }}* :</label
                >
                <Field
                  name="Headline"
                  v-slot="{ field }"
                  v-model="dynamicVideoDto.headline"
                >
                  <v-text-field
                    v-bind="field"
                    label=""
                    v-model="dynamicVideoDto.headline"
                  ></v-text-field>
                </Field>

                <ErrorMessage name="Headline" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-py-5"
              >
                <label class="tw-mb-3 tw-w-32"
                  >{{ $t("dynamicQr.videoDynamic.sammary") }}:</label
                >
                <Field
                  name="Summary"
                  v-slot="{ field }"
                  v-model="dynamicVideoDto.summary"
                >
                  <v-text-field
                    v-bind="field"
                    label=""
                    v-model="dynamicVideoDto.summary"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="Summary" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-py-5"
              >
                <label class="tw-mb-3 tw-w-32"
                  >{{ $t("dynamicQr.videoDynamic.button") }}:</label
                >
                <Field
                  name="ButtonName"
                  v-slot="{ field }"
                  v-model="dynamicVideoDto.button.name"
                >
                  <v-text-field
                    v-bind="field"
                    label="name"
                    v-model="dynamicVideoDto.button.name"
                  ></v-text-field
                ></Field>
                <v-text-field
                  label="url"
                  v-model="dynamicVideoDto.button.url"
                ></v-text-field>
              </div>
              <ErrorMessage name="ButtonName" v-slot="{ message }">
                <span class="text-red-lighten-1">{{ message }}</span>
              </ErrorMessage>
              <!-- <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-py-5"
              >
                <label class="tw-mb-3 tw-w-32"
                  >{{ $t("dynamicQr.videoDynamic.hasShareButton") }}:</label
                >
                <v-checkbox
                  v-model="dynamicVideoDto.hasShareButton"
                ></v-checkbox>
              </div> -->
            </div>
          </div>
          <!--Video-->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
            <div class="header tw-flex tw-bg-gray-100 tw-p-4">
              <v-icon color="#aaaaaa">mdi-play</v-icon>

              <span class="tw-text-gray-600" style="margin-left: 12px">
                {{ $t("dynamicQr.videoDynamic.video") }}
              </span>
            </div>

            <div
              class="hidden tw-p-7 tw-bg-white tw-rounded-lg tw-flex tw-flex-col tw-justify-center tw-items-center"
            >
              <img :src="Bro" alt="" class="tw-min-w-[360px]" />
              <p>{{ $t("dynamicQr.imageDynamic.personalize") }}</p>
              <v-file-input
                multiple
                type="file"
                :label="$t('dynamicQr.imageDynamic.personalize')"
                accept="video/*"
                v-model="dynamicVideoDto.files"
                @change="videoDynamicStore.previewMultiImage"
                class="form-control-file tw-min-w-[400px] tw-my-4"
                id="my-file"
                on-reset="reset"
              ></v-file-input>
              <p
                v-if="preview_list.length === 0"
                class="tw-text-red-400 tw-font-semibold"
              >
                {{ $t("dynamicQr.videoDynamic.required.video") }}
              </p>
            </div>
          </div>
          <!--Video-->
          <!--social media links-->

          <!-- new comoponent-->
          <v-card class="tw-mt-10">
            <VCardTitle class="tw-bg-gray-100">
              {{ $t("dynamicQr.videoDynamic.socialMediaChannels") }}
            </VCardTitle>

            <section class="tw-p-4">
              <label for="">icons</label>

              <SocialMediaInput
                v-model="dynamicVideoDto.socialMediaChannels"
              ></SocialMediaInput>
            </section>
          </v-card>
        </Form>
      </template>
      <template #mobile>
        <SocialMediaTemplate color="white" :fetchData="false">
        </SocialMediaTemplate>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// imports  . . .
import SocialMediaTemplate from "../../template/VideoDynamic/[id].vue";
import skeleton from "./components/skeleton.vue";
import { useVideoDynamicStore } from "@/store/qrCodes/dynamic/video";
import { onMounted } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { useFile } from "@/composables/useFile";
import { storeToRefs } from "pinia";
import { useQrStore } from "~/store/qrCodes/qr";
import Bro from "@/assets/svg/dynamic/Bro.svg";
import { QrDynamicController } from "~/api/endpoints/qrDynamic";
import { dynamicVideoDto } from "~/api/dto/website/Video";
import { MetaObject } from "@nuxt/schema";
import SocialMediaInput from "@/components/SocialMediaInput.vue";
import qrImageSvg from "~/assets/svg/qrTypes/VideoType.svg";
//. ON  Mounting
onMounted(() => {
  loading.value = false;
});
//consts and refs  . . .
const { download } = useFile();
const qrStore = useQrStore();
const loading = ref(true);
const index = ref(0);
const innerIndex = ref(0);

const videoDynamicStore = useVideoDynamicStore();
const { dynamicVideoDto, preview_list } = storeToRefs(videoDynamicStore);
const props = defineProps(["id"]);
const { locale } = useI18n();

const headers: { [x: string]: MetaObject } = {
  ar: {
    title: "توليد كود فيديو ديناميكي",
    htmlAttrs: {
      lang: locale,
      dir: "rtl",
    },
    meta: [{ name: "description", content: "قم بتوليد كود ديناميكي لفيديو" }],
  },
  en: {
    title: "Video Dynamic",
    htmlAttrs: {
      lang: locale,
      dir: "ltr",
    },
    meta: [
      { name: "description", content: "generate dynamic code for your Video" },
    ],
  },
  de: {
    title: "dynamisches Video",
    htmlAttrs: {
      lang: locale,
      dir: "ltr",
    },
    meta: [
      {
        name: "description",
        content: "Generieren Sie dynamischen Code für Ihre Video",
      },
    ],
  },
};

useHead(headers[locale.value]);
const socialMediaList = ref([
  {
    title: "youtube",
    icon: "mdi-youtube",
    color: "#ee4444",
    url: "",
    text: "",
  },
]);
const { t } = useI18n();
const myForm = ref();
const schema = computed(() => {
  return yup.object({
    Company: yup
      .string()
      .required(t("dynamicQr.videoDynamic.required.company")),
    Summary: yup
      .string()
      .required(t("dynamicQr.videoDynamic.required.summary")),
    Headline: yup
      .string()
      .required(t("dynamicQr.cauponDynamic.required.headline")),

    QrName: yup.string().required(t("dynamicQr.videoDynamic.required.name")),
    ButtonName: yup
      .string()
      .required(t("dynamicQr.videoDynamic.required.buttonContent")),
  });
});
//social meida icons arary

const socialMediaPreviewist = ref();
const route = useRoute();
const isModify = computed(() => route.params.id !== "0");

if (isModify.value) {
  const { data } = await useCustomFetch<dynamicVideoDto>(
    QrDynamicController.GET_QR_VIDEO_BY_ID + `?id=${route.params.id}`
  );
  if (data.value) {
    dynamicVideoDto.value = data.value;
  }
}
// Colors Array  . . .
const colorsData = [
  ["#73b5e7", "#dd0ec1"],
  ["#EEA886", "#F07464"],
  ["#F9C2ED", "#E567F0"],
];
// methods and functions  . . .
const setColor = (val: any) => {
  dynamicVideoDto.value.primaryColor = val;
};
function applyFileDelete(item: any) {
  dynamicVideoDto.value.urls = dynamicVideoDto.value.urls.filter((i) => {
    return i !== item;
  });
  dynamicVideoDto.value.deletedFiles = item;
}
const incIndex = () => {
  index.value = index.value > colorsData.length - 2 ? 0 : index.value + 1;

  setInnerIndex(
    0,
    colorsData[index.value][0][0],
    colorsData[index.value][0][1]
  );
  // setColor(colorsData[index.value][0]);
};
const decIndex = () => {
  index.value = index.value <= 0 ? colorsData.length - 2 : index.value - 1;

  setInnerIndex(
    0,
    colorsData[index.value][0][0],
    colorsData[index.value][0][1]
  );
  // setColor(colorsData[index.value][0]);
};

const setInnerIndex = (index: any, color1: any, color2: any) => {
  innerIndex.value = index;
  dynamicVideoDto.value.primaryColor = color1;
  dynamicVideoDto.value.buttonColor = color2;
};

const exchange = () => {
  const tempColor = dynamicVideoDto.value.primaryColor;
  dynamicVideoDto.value.primaryColor = dynamicVideoDto.value.buttonColor;
  dynamicVideoDto.value.buttonColor = tempColor;
};

//adding new social media item

const addItemsToPreview = () => {
  socialMediaPreviewist.value = socialMediaList.value;
  dynamicVideoDto.value.socialMediaChannels = socialMediaPreviewist.value;
};
//removing an item from the list
const removeItem = (index: any) => {
  socialMediaList.value = socialMediaList.value.filter((item, i) => {
    return i !== index;
  });
  const tempArr = socialMediaList.value;
  socialMediaList.value = [];
  socialMediaList.value = tempArr;
};
//my event

onMounted(() => {
  qrStore.emitter.on("dynamicQrDownload", () => {
    myForm.value?.validate().then((valid: any) => {
      if (valid.valid) {
        if (isModify.value) {
          if (preview_list.value.length != 0) {
            dynamicVideoDto.value.deletedFiles = dynamicVideoDto.value.files;
          }
          videoDynamicStore.modify(route.params.id);
          download(qrStore.qrPreview, dynamicVideoDto.value.qrName);
        } else {
          videoDynamicStore.addVideoQr();
          download(qrStore.qrPreview, dynamicVideoDto.value.qrName);
        }
      } else {
      }
    });
  });
});

// adding layout  . . .
definePageMeta({
  layout: false,
  middleware: ["create-qr"],
});
onBeforeUnmount(() => {
  if (!route.params.id) videoDynamicStore.resetDto();
});
if (isModify.value) {
  const { data } = await useCustomFetch<DynamicVideoDto>(
    QrDynamicController.GET_QR_VIDEO_BY_ID + `?id=${route.params.id}`
  );
  if (data.value) {
    dynamicVideoDto.value = data.value;
  }
}
</script>
<style scoped>
.dropdown {
  animation: dropdown 0.8s ease-out;
}

@keyframes dropdown {
  0% {
    opacity: 0;
  }
}

input#qrName::placeholder {
  font-size: 20px;
}
</style>
