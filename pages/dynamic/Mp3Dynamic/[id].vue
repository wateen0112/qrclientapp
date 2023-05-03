<template>
  <skeleton v-if="loading"> </skeleton>
  <div v-else>
    <NuxtLayout name="dynamic-code-layout">
      <template #default>
        <Form
          ref="myform"
          :validation-schema="schema"
          class="tw-w-full tw-px-5"
        >
          <div class="tw-grid tw-grid-cols-12">
            <div class="nameQr tw-flex tw-items-center tw-mt-5 tw-col-span-12">
              <img :src="qrImageSvg" width="40" class="tw-mr-5" />
              <div class="tw-block tw-w-full">
                <Field
                  name="QrName"
                  v-slot="{ field }"
                  v-model="dynamicMp3Dto.qrName"
                >
                  <v-text-field
                    v-bind="field"
                    id="qrName"
                    v-model="dynamicMp3Dto.qrName"
                    class="tw-text-gray-600 tw-my-5"
                    :placeholder="$t('dynamicQr.pdfDynamic.qrName')"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="QrName" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
            </div>
          </div>

          <!-- PDF -->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-my-4">
            <div class="header tw-bg-gray-100 tw-p-4 tw-flex">
              <span class="tw-text-gray-600" style="margin-left: 12px">{{
                $t("dynamicQr.imageDynamic.design")
              }}</span>
            </div>

            <div class="hidden tw-p-4 tw-bg-white tw-rounded-lg">
              <h3
                class="tw-mb-5 tw-tracking-tight tw-text-gray-600 tw-text-center"
              >
                {{ $t("dynamicQr.imageDynamic.personalize") }}
              </h3>

              <div
                class="lg:tw-flex tw-justify-center tw-gap-0 tw-items-center tw-px-20 tw-py-10"
              >
                <div
                  class="tw-text-gray-400 tw-text-lg tw-font-bold tw-flex tw-justify-center tw-items-center tw-gap-5 tw-cursor-pointer"
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
              </div>
            </div>
            <div
              class="tw-flex lg:tw-justify-center tw-justify-start tw-items-center tw-w-[100%] lg:tw-gap-10 tw-gap-5 tw-flex-col lg:tw-flex-row tw-bg-gray-200 tw-py-3"
            >
              <!-- heerereeer-->

              <div>
                <span class="tw-text-center tw-w-[100%] bg-red-500">
                  {{ $t("dynamicQr.videoDynamic.primary") }}
                </span>
                <div class="tw-mt-5">
                  <div
                    class="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-7 tw-border-[2px] tw-bg-white tw-px-6 tw-rounded-2xl tw-py-[14px]"
                  >
                    <span> {{ dynamicMp3Dto?.primaryColor }}</span>
                    <div
                      class="tw-rounded-full tw-overflow-hidden tw-w-[50px] tw-h-[28px] tw-border-none"
                    >
                      <div
                        class="tw-relative tw-w-[100px] tw-h-[100px] tw-rounded-full"
                      >
                        <input
                          type="color"
                          class="tw-absolute tw-translate-x-[-40px] tw-translate-y-[-20px] tw-h-[260px] tw-w-[260px]"
                          v-model="dynamicMp3Dto.primaryColor"
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
                        class="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-7 tw-border-[2px] tw-bg-white tw-px-6 tw-rounded-2xl tw-py-3"
                      >
                        <span> {{ dynamicMp3Dto?.buttonColor }}</span>
                        <div
                          class="tw-rounded-full tw-overflow-hidden tw-w-[50px] tw-h-[28px] tw-border-none"
                        >
                          <div
                            class="tw-relative tw-w-[30px] tw-h-[30px] tw-rounded-full"
                          >
                            <input
                              type="color"
                              class="tw-border-none tw-top-[-50%] tw-translate-x-[-40px] tw-absolute tw-rounded-full tw-w-[140px] tw-h-[140px]"
                              dot-size="90"
                              v-model="dynamicMp3Dto.buttonColor"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

            <div class="hidden tw-p-7 tw-bg-white tw-rounded-lg">
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block">
                  {{ $t("dynamicQr.videoDynamic.title") }} :</label
                >
                <Field
                  name="Title"
                  v-slot="{ field }"
                  v-model="dynamicMp3Dto.title"
                >
                  <v-text-field
                    :label="$t('dynamicQr.videoDynamic.title')"
                    class="tw-flex-grow tw-w-full"
                    v-bind="field"
                    v-model="dynamicMp3Dto.title"
                  >
                  </v-text-field
                ></Field>
                <ErrorMessage name="Title" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.mp3Dynamic.moreInfo") }}* :</label
                >
                <Field
                  name="MoreInfo"
                  v-slot="{ field }"
                  v-model="dynamicMp3Dto.moreInfo"
                >
                  <v-text-field
                    :label="$t('dynamicQr.mp3Dynamic.moreInfo')"
                    v-model="dynamicMp3Dto.moreInfo"
                    v-bind="field"
                    class="tw-flex-grow tw-w-full"
                  ></v-text-field
                ></Field>
                <ErrorMessage name="MoreInfo" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.mp3Dynamic.website") }}:</label
                >
                <Field
                  name="Website"
                  v-slot="{ field }"
                  v-model="dynamicMp3Dto.website"
                >
                  <v-text-field
                    @keypress="
                      dynamicMp3Dto.website = qrStore.httpsCheck(
                        $event.target.value
                      )
                    "
                    v-bind="field"
                    v-model="dynamicMp3Dto.website"
                    :label="$t('dynamicQr.pdfDynamic.website')"
                    class="tw-flex-grow tw-w-full"
                  ></v-text-field
                ></Field>
                <ErrorMessage name="Website" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 lg:tw-gap-0 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.videoDynamic.button") }}:</label
                >
                <Field
                  name="ButtonName"
                  v-slot="{ field }"
                  v-model="dynamicMp3Dto.button.name"
                >
                  <v-text-field
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    v-bind="field"
                    v-model="dynamicMp3Dto.button.name"
                    :label="$t('dynamicQr.videoDynamic.button')"
                    ButtonName="tw-flex-grow tw-w-full   "
                  ></v-text-field
                ></Field>

                <ErrorMessage name="ButtonName" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 lg:tw-gap-0 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.videoDynamic.url") }}:</label
                >
                <Field
                  name="ButtonUrl"
                  v-slot="{ field }"
                  v-model="dynamicMp3Dto.button.url"
                >
                  <v-text-field
                    @keypress="
                      dynamicMp3Dto.button.url = qrStore.httpsCheck(
                        $event.target.value
                      )
                    "
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    v-bind="field"
                    v-model="dynamicMp3Dto.button.url"
                    :label="$t('dynamicQr.videoDynamic.url')"
                    ButtonName="tw-flex-grow tw-w-full   "
                  ></v-text-field
                ></Field>
                <ErrorMessage name="ButtonUrl" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
            </div>
          </div>
          <!--Video-->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
            <div class="header tw-flex tw-bg-gray-100 tw-p-4">
              <v-icon color="#aaaaaa">mdi-play</v-icon>

              <span class="tw-text-gray-600" style="margin-left: 12px"> </span>
            </div>

            <div
              class="hidden tw-p-7 tw-bg-white tw-rounded-lg tw-flex tw-flex-col tw-justify-center tw-items-center"
            >
              <p>{{ $t("dynamicQr.imageDynamic.personalize") }}</p>

              <v-file-input
                type="file"
                :label="$t('dynamicQr.mp3Dynamic.selectAudio')"
                accept="audio/*"
                @change="store.previewMp3"
                class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                id="my-file"
                on-reset="reset"
              ></v-file-input>
              <p
                v-if="preview_list.length == 0 && dynamicMp3Dto.mp3Url === ''"
                class="tw-text-red-400"
              >
                {{ $t("dynamicQr.mp3Dynamic.required.audioFile") }}
              </p>

              <ErrorMessage name="email" v-slot="{ message }">
                <span class="text-red-lighten-1">{{ message }}</span>
              </ErrorMessage>
              <v-file-input
                class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                :label="$t('dynamicQr.mp3Dynamic.selectImage')"
                type="file"
                accept="image/*"
                v-model="mp3ImageFile"
                @change="store.previewMp3Image"
                id="my-file"
                on-reset="reset2"
              ></v-file-input>
            </div>
          </div>
          <!--Video-->
          <!--social media links-->
        </Form>
      </template>
      <template #mobile>
        <SocialMediaTemplate :fetchData="false" color="white">
        </SocialMediaTemplate>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// imports  . . .
import SocialMediaTemplate from "../../template/Mp3Dynamic/[id].vue";
import skeleton from "./components/skeleton.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useMp3DynamicStore } from "@/store/qrCodes/dynamic/mp3";
import { useQrStore } from "~/store/qrCodes/qr";
import { useFile } from "@/composables/useFile";
import AudioPlayer from "vue3-audio-player";
import "vue3-audio-player/dist/style.css";
import { QrDynamicController } from "~/api/endpoints/qrDynamic";
import { DynamicMp3Dto } from "~/api/dto/website/DynamicMp3";
import qrImageSvg from "@/assets/svg/qrTypes/Mp3Type.svg";
const { getFileUrl, download } = useFile();
//. ON  Mounting
onMounted(() => {
  loading.value = false;
});
//consts and refs  . . .
const store = useMp3DynamicStore();
const qrStore = useQrStore();
const { dynamicMp3Dto, preview_list, mp3ImageFile } = storeToRefs(store);
const loading = ref(true);
const index = ref(0);
const innerIndex = ref(0);
const preview = ref(null);

const { t } = useI18n();

const props = defineProps(["id"]);
const socialMediaList = ref([
  {
    title: "youtube",
    icon: "mdi-youtube",
    color: "#ee4444",
    url: "",
    text: "",
  },
]);

const myform = ref();
const schema = computed(() => {
  return yup.object({
    Title: yup.string().required(t("dynamicQr.imageDynamic.required.title")),
    Website: yup
      .string()
      .url(t("dynamicQr.global.invalidUrl"))
      .required(t("dynamicQr.imageDynamic.required.website")),
    MoreInfo: yup
      .string()
      .required(t("dynamicQr.cauponDynamic.required.button")),

    ButtonName: yup
      .string()
      .required(t("dynamicQr.cauponDynamic.required.button")),
    ButtonUrl: yup
      .string()
      .url(t("dynamicQr.global.invalidUrl"))
      .required(t("dynamicQr.imageDynamic.required.url")),

    QrName: yup.string().required(),
  });
});
//Use Fetch
const route = useRoute();
const isModify = computed(() => route.params.id !== "0");

if (isModify.value) {
  const { data } = await useCustomFetch(
    QrDynamicController.GET_QR_MP3_BY_ID + `?id=${route.params.id}`
  );
  if (data.value) {
    store.$patch({
      dynamicMp3Dto: data.value,
    });
  }
}

// Colors Array  . . .
const colorsData = [
  ["#73b5e7", "#dd0ec1"],
  ["#EEA886", "#F07464"],
  ["#F9C2ED", "#E567F0"],
];
// methods and functions  . . .

//my dto  . . .

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
  dynamicMp3Dto.value.primaryColor = color1;
  dynamicMp3Dto.value.buttonColor = color2;
};

const exchange = () => {
  const tempColor = dynamicMp3Dto.value?.primaryColor;
  dynamicMp3Dto.value.primaryColor = dynamicMp3Dto.value?.buttonColor;
  dynamicMp3Dto.value.buttonColor = tempColor;
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
// adding layout  . . .
definePageMeta({
  layout: false,
  middleware: ["create-qr"],
});

// generating qr option  . . .

qrStore.emitter.on("dynamicQrDownload", () => {
  myform.value?.validate().then((valid: any) => {
    if (valid.valid) {
      if (isModify.value) {
        store.modify(route.params.id);
        download(qrStore.qrPreview, dynamicMp3Dto.value.qrName);
      } else {
        if (preview_list.value.length > 0) store.addMp3Qr();
        download(qrStore.qrPreview, dynamicMp3Dto.value.qrName);
      }
    }
  });
});

onBeforeUnmount(() => {
  if (!route.params.id) store.resetDto();
});
</script>
<style>
/* * {
  transition: 0.4s;
} */
.dropdown {
  animation: dropdown 0.8s ease-out;
}
@keyframes dropdown {
  0% {
    opacity: 0;
  }
}
.audio__player {
  width: 100% !important;
  margin-top: 200px !important;
  display: flex !important;
  justify-content: center !important;
  min-width: 400px;
}
.audio__player-play-icon {
  position: absolute !important;
  margin-top: 40px;
}
input#qrName::placeholder {
  font-size: 20px;
}
</style>
