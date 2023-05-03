<template>
  <Meta name="description" content="content" />

  <skeleton v-if="loading"> </skeleton>
  <div v-else>
    <NuxtLayout name="dynamic-code-layout">
      <template #default>
        <Form
          ref="imageform"
          :validation-schema="schema"
          class="tw-w-full tw-px-5"
        >
          <div class="tw-grid tw-grid-cols-12">
            <div class="nameQr tw-gap-5 tw-flex tw-items-center tw-col-span-12">
              <img :src="qrImageSvg" width="40" class="tw-mx-2" />
              <div class="tw-w-full tw-block">
                <Field
                  name="QrName"
                  v-model="dynamicImageDto.qrName"
                  v-slot="{ field }"
                >
                  <v-text-field
                    id="qrName"
                    v-bind="field"
                    v-model="dynamicImageDto.qrName"
                    class="tw-text-gray-600 tw-my-5 tw-w-full tw-text-[40px]"
                    :label="$t('dynamicQr.imageDynamic.qrname')"
                  ></v-text-field>
                </Field>
                <ErrorMessage
                  class="tw-mx-5"
                  name="QrName"
                  v-slot="{ message }"
                >
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

            <div class="tw-p-4 tw-bg-white tw-rounded-lg tw-overflow-hidden">
              <h3
                class="tw-mb-5 tw-tracking-tight tw-text-gray-600 tw-text-center"
              >
                {{ $t("dynamicQr.imageDynamic.personalize") }}
              </h3>
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
                          v-model="dynamicImageDto.color"
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
                              v-model="dynamicImageDto.color"
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
                              v-model="dynamicImageDto.buttonColor"
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
                                  v-model="dynamicImageDto.buttonColor"
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

              <!-- <div
                class="tw-font-semibold tw-flex tw-justify-around tw-gap-0 tw-items-center lg:tw-flex-row :tw-flex-col lg:tw-px-40 tw-py-10"
              >
                <span>{{ $t("dynamicQr.imageDynamic.whiteText") }}</span>

                <input type="checkbox" v-model="isWhiteText" />
              </div> -->
            </div>
          </div>
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md">
            <div class="header tw-bg-gray-100 tw-p-4 tw-flex">
              <span class="tw-text-gray-600" style="margin-left: 12px">{{
                $t("dynamicQr.imageDynamic.uplaodImages")
              }}</span>
            </div>

            <div class="hidden tw-p-4 tw-bg-white tw-rounded-lg">
              <h3
                class="tw-mb-5 tw-tracking-tight tw-text-gray-600 tw-text-center"
              >
                {{ $t("dynamicQr.imageDynamic.personalize") }}
              </h3>
              <form>
                <div class="form-group tw-px-5">
                  <label for="my-file" class="tw-my-5 tw-hidden lg:tw-block">
                    {{ $t("dynamicQr.imageDynamic.selectImage") }}</label
                  >

                  <v-file-input
                    @change="dynamicImageStore.previewMultiImage"
                    type="file"
                    accept="image/*"
                    multiple
                    v-model="dynamicImageDto.imageFiles"
                    :label="$t('dynamicQr.imageDynamic.selectImage')"
                    class="form-control-file tw-my-5"
                    id="my-file"
                    on-reset="reset"
                  ></v-file-input>
                  <!-- <FileUploader multiple  v-model="dynamicImageDto.ImageFiles"  
                v-model:url="dynamicImageDto.imagesUrls"
class="tw-flex-grow tw-w-full   tw-mx-auto"></FileUploader> -->
                </div>
                <p
                  v-if="
                    preview_list?.length === 0 &&
                    dynamicImageDto.imageUrls?.length === 0
                  "
                  class="tw-text-red-400 text-[22px] lg:tw-text-left tw-text-center"
                >
                  {{ $t("dynamicQr.imageDynamic.required.image") }}
                </p>
              </form>
            </div>
          </div>

          <!-- Design -->

          <!-- Basic information -->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-my-5">
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
                  {{ $t("dynamicQr.imageDynamic.title") }}:</label
                >
                <Field
                  name="Title"
                  v-model="dynamicImageDto.title"
                  v-slot="{ field }"
                >
                  <v-text-field
                    v-model="dynamicImageDto.title"
                    v-bind="field"
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80"
                    :label="$t('dynamicQr.imageDynamic.title')"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="Title" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.imageDynamic.description") }}:</label
                >
                <Field
                  name="Description"
                  v-model="dynamicImageDto.description"
                  v-slot="{ field }"
                >
                  <v-text-field
                    v-model="dynamicImageDto.description"
                    v-bind="field"
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80"
                    :label="$t('dynamicQr.imageDynamic.description')"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="Description" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              ></div>
              <!--button-->
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block">
                  Has A Button ?</label
                >
                <v-checkbox v-model="thereIsButton" />
              </div>
              <!--button-->
              <div
                v-if="thereIsButton"
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block">
                  {{ $t("dynamicQr.videoDynamic.button") }}:</label
                >
                <Field
                  name="ButtonName"
                  v-model="dynamicImageDto.button.name"
                  v-slot="{ field }"
                >
                  <v-text-field
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    v-bind="field"
                    v-model="dynamicImageDto.button.name"
                    :label="$t('dynamicQr.videoDynamic.button')"
                  ></v-text-field>
                </Field>

                <ErrorMessage name="ButtonName" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                v-if="thereIsButton"
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.imageDynamic.url") }}:</label
                >
                <Field
                  v-model="dynamicImageDto.button.url"
                  name="ButtonUrl"
                  v-slot="{ field }"
                >
                  <v-text-field
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    v-bind="field"
                    @keypress="
                      dynamicImageDto.button.url = qrStore.httpsCheck(
                        $event.target.value
                      )
                    "
                    :label="$t('dynamicQr.imageDynamic.url')"
                    v-model="dynamicImageDto.button.url"
                  ></v-text-field>
                </Field>

                <ErrorMessage name="ButtonUrl" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
            </div>
          </div>

          <!-- Social Media channels -->
        </Form>
      </template>
      <template #mobile>
        <SocialMediaTemplate
          :fetchData="false"
          @imageUpload="testFunctuion"
          color="white"
        >
        </SocialMediaTemplate>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// imports  . . .
import SocialMediaTemplate from "../../template/ImageDynamic/[id].vue";
import skeleton from "./components/skeleton.vue";
import { useDynamicImageStore } from "@/store/qrCodes/dynamic/image";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useQrStore } from "@/store/qrCodes/qr";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { useFile } from "@/composables/useFile";
import { QrDynamicController } from "~/api/endpoints/qrDynamic";
import { DynamicImageDto } from "~/api/dto/website/Image";
import qrImageSvg from "@/assets/svg/qrTypes/ImageType.svg";
//. ON  Mounting
onMounted(() => {
  loading.value = false;
});
//consts and refs  . . .
const loading = ref(true);
const qrStore = useQrStore();
const index = ref(0);
const { download } = useFile();
const image = ref(null);

const dynamicImageStore = useDynamicImageStore();
const {
  dynamicImageDto,
  isWhiteText,
  preview_list,
  thereIsButton,
  image_list,
} = storeToRefs(dynamicImageStore);
const imageform = ref();
const props = defineProps(["id"]);
const { t } = useI18n();
const route = useRoute();

const isModify = computed(() => route.params.id !== "0");

if (isModify.value) {
  const { data } = await useCustomFetch<DynamicImageDto>(
    QrDynamicController.GET_QR_IMAGE_BY_ID + `?id=${route.params.id}`
  );
  if (data.value) {
    dynamicImageDto.value = data.value;
  }
}
const { locale } = useI18n();
const headers: { [x: string]: MetaObject } = {
  ar: {
    title: "توليد كود صورة ديناميكي",
    htmlAttrs: {
      lang: locale,
      dir: "rtl",
    },
    meta: [{ name: "description", content: "قم بتوليد كود ديناميكي لصورة" }],
  },
  en: {
    title: "Image Dynamic",
    htmlAttrs: {
      lang: locale,
      dir: "ltr",
    },
    meta: [
      { name: "description", content: "generate dynamic code for your images" },
    ],
  },
  de: {
    title: "dynamisches Bild",
    htmlAttrs: {
      lang: locale,
      dir: "ltr",
    },
    meta: [
      {
        name: "description",
        content: "Generieren Sie dynamischen Code für Ihre Bilder",
      },
    ],
  },
};

useHead(headers[locale.value]);
definePageMeta({
  title: "contact.title",
});
// Colors Array  . . .
const colorsData = [
  ["#73b5e7", "#dd0ec1"],
  ["#EEA886", "#F07464"],
  ["#F9C2ED", "#E567F0"],
];
//Use Fetch

if (isModify.value) {
  const { data } = await useCustomFetch<DynamicImageDto>(
    QrDynamicController.GET_QR_IMAGE_BY_ID + `?id=${route.params.id}`
  );
  if (data.value) {
    dynamicImageStore.$patch({
      dynamicImageDto: data.value,
    });
  }
}

const schema = computed(() => {
  return yup.object({
    Title: yup.string().required(t("dynamicQr.imageDynamic.required.title")),

    Description: yup
      .string()
      .required(t("dynamicQr.imageDynamic.required.description")),

    ButtonName: yup
      .string()
      .required(t("dynamicQr.imageDynamic.required.button")),

    ButtonUrl: yup.string().required(t("dynamicQr.imageDynamic.required.url")),

    QrName: yup.string().required(t("dynamicQr.imageDynamic.required.name")),
  });
});

// methods and functions  . . .
const setColor = (val: any) => {
  dynamicImageDto.value.color = val;
};
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
  dynamicImageDto.value.color = color1;
  dynamicImageDto.value.buttonColor = color2;
};

const c = ref([]);

const testFunctuion = () => {};

// sending data after mounting
onMounted(() => {
  qrStore.emitter.on("dynamicQrDownload", () => {
    imageform.value?.validate().then((valid: any) => {
      if (valid.valid) {
        if (isModify.value) {
          dynamicImageStore.modify(route.params.id);
          download(qrStore.qrPreview, dynamicImageDto.value.qrName);
        } else {
          dynamicImageStore.addImageQr();
          download(qrStore.qrPreview, dynamicImageDto.value.qrName);
        }
      }
    });
    // if(isModify.value){
    // dynamicImageStore.modify(route.params.id)
    //   }
    //   else {
    //     dynamicImageStore.addImageQr();
    //   }
  });
});
const innerIndex = ref(0);
// adding layout  . . .
definePageMeta({
  layout: false,
  title: "Dynamic Image",
  middleware: ["create-qr"],
});

onBeforeUnmount(() => {
  if (!route.params.id) dynamicImageStore.resetDto();
});
const exchange = () => {
  const tempColor = dynamicImageDto.value.color;
  dynamicImageDto.value.color = dynamicImageDto.value.buttonColor;
  dynamicImageDto.value.buttonColor = tempColor;
};
</script>
<style lang="scss">
input#qrName::placeholder {
  font-size: 20px;
}
</style>
