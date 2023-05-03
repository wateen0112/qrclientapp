<template>
  <NuxtLayout name="dynamic-code-layout">
    <div>
      <Form :initial-values="{ ...codeDto }" :validation-schema="schema">
        <div
          class="tw-flex tw-flex-row tw-items-center tw-gap-5 tw-w-full qr-name"
        >
          <img class="tw-w-[46px] tw-h-[46px]" :src="Facebooksvg" alt="" />
          <div class="tw-flex-col tw-w-full">
            <Field name="qrName" v-slot="{ field, errorMessage }">
              <v-text-field
                :error-messages="errorMessage"
                v-model="codeDto.qrName"
                v-bind="field"
                :label="$t('dynamicQr.facebookDynamic.nameQr')"
              ></v-text-field>
              <div>
                <small class="tw-text-red-500">{{ errorMessage }}</small>
              </div>
            </Field>
          </div>
        </div>
        <div class="facebook-page">
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
            <div class="header tw-bg-gray-100 tw-p-4">
              <span>{{ $t("dynamicQr.facebookDynamic.design") }}</span>
            </div>

            <div class="tw-p-4 tw-bg-white tw-rounded-lg">
              <h2
                class="tw-mb-5 tw-text-center tw-text-lg tw-tracking-tight tw-text-gray-900"
              >
                {{ $t("dynamicQr.facebookDynamic.text") }}
              </h2>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-gap-2 tw-mb-3 tw-mr-2"
              >
                <div
                  class="tw-flex tw-mb-5 tw-text-center tw-text-lg tw-tracking-tight tw-text-gray-900"
                >
                  <label class="tw-mt-[20px]">
                    {{ $t("dynamicQr.facebookDynamic.color") }}:</label
                  >
                  <div
                    class="tw-p-4 tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-gap-5 tw-cursor-pointer"
                  >
                    <div
                      v-for="(color, i) in Colors"
                      :key="i"
                      class="tw-relative"
                      @click="SetColor(color, i)"
                    >
                      <div
                        class="tw-absolute"
                        style="top: -8px; left: -5px"
                        v-if="index == i"
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
                </div>
              </div>
              <div
                class="tw-flex tw-flex-col tw-rounded-xl sm:tw-flex-row tw-bg-gray-100 py-5 tw-justify-center tw-flex-wrap tw-items-center mt-10 md:tw-gap-6 tw-gap-0"
              >
                <div>
                  <span class="tw-text-center tw-w-[100%] tw-font-semibold">{{
                    $t("dynamicQr.facebookDynamic.primary")
                  }}</span>
                  <div class="tw-relative">
                    <input
                      v-model="codeDto.primaryColor"
                      class="bg-white py-3 px-2 focus:tw-outline-primary"
                      style="border-radius: 10px"
                      variant="filled"
                    />
                    <div
                      class="tw-h-6 tw-w-10 border tw-overflow-hidden tw-flex tw-rounded-full tw-absolute tw-top-1/2 -tw-translate-y-1/2"
                      style="right: 10px"
                    >
                      <input
                        type="color"
                        v-model="codeDto.primaryColor"
                        class="tw-absolute tw-h-[50px] tw-scale-150"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="tw-basis-full md:tw-basis-12 tw-flex tw-justify-center"
                >
                  <v-btn
                    class="mt-12 text-white"
                    color="blue-grey darken-1"
                    icon="mdi-swap-horizontal"
                    @click="switchColor"
                  >
                  </v-btn>
                </div>
                <div class="tw-basis-full sm:tw-basis-48">
                  <span class="tw-text-center tw-w-[100%] tw-font-semibold">
                    {{ $t("dynamicQr.facebookDynamic.button") }}</span
                  >
                  <div class="tw-relative">
                    <input
                      v-model="codeDto.buttonColor"
                      class="bg-white py-3 px-2 focus:tw-outline-primary"
                      style="border-radius: 10px"
                      variant="filled"
                    />
                    <div
                      class="tw-h-6 tw-w-10 border tw-overflow-hidden tw-flex tw-rounded-full tw-absolute tw-top-1/2 -tw-translate-y-1/2"
                      style="right: 10px"
                    >
                      <input
                        type="color"
                        v-model="codeDto.buttonColor"
                        class="tw-absolute tw-h-[50px] tw-scale-150"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tw-flex tw-justify-center tw-p-4 tw-bg-white tw-rounded-lg tw-item-center"
              ></div>
              <div
                class="tw-flex tw-justify-center tw-mt-5 tw-flex-wrap tw-items-center md:tw-gap-6 tw-gap-0"
              >
                <FileUploader
                  v-model="codeDto.ImageFile"
                  v-model:url="codeDto.imageUrl"
                  class="tw-flex-grow tw-w-full tw-mx-auto"
                ></FileUploader>
              </div>
            </div>
          </div>
        </div>
        <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
          <div class="header tw-bg-gray-100 tw-p-4">
            <span>
              <v-icon dark>info</v-icon>
              {{ $t("dynamicQr.facebookDynamic.basicInfo") }}</span
            >
          </div>

          <div class="hidden tw-p-4 tw-bg-white tw-rounded-lg">
            <div
              class="tw-text-gray-600 tw-flex mb-5 tw-flex-col md:tw-flex-row"
            >
              <label class="tw-mb-3 tw-mr-5">{{
                $t("dynamicQr.facebookDynamic.faceBookUrl")
              }}</label>
              <div class="tw-flex-col tw-w-full tw-ml-2">
                <Field name="facebookUrl" v-slot="{ field, errorMessage }">
                  <v-text-field
                    type="url"
                    :errorMessage="errorMessage"
                    v-bind="field"
                    v-model="codeDto.facebookUrl"
                    @keypress="
                      codeDto.facebookUrl = qrStore.httpsCheck(
                        $event.target.value
                      )
                    "
                    :label="$t('dynamicQr.facebookDynamic.faceBookUrl')"
                  ></v-text-field>
                  <div>
                    <small class="tw-text-red-500">{{ errorMessage }}</small>
                  </div>
                </Field>
              </div>
            </div>

            <div
              class="tw-text-gray-600 tw-flex tw-flex-col md:tw-flex-row tw-gap-5 mb-5"
            >
              <label class="tw-mb-0 tw-mr-11"
                >{{ $t("dynamicQr.facebookDynamic.Name") }}:</label
              >
              <div class="tw-flex-col tw-w-[88%] tw-ml-2">
                <Field name="name" v-slot="{ field, errorMessage }">
                  <v-text-field
                    v-bind="field"
                    v-model="codeDto.name"
                    :label="$t('dynamicQr.facebookDynamic.Name')"
                  ></v-text-field>
                  <div>
                    <!-- <small class="tw-text-red-500">{{ errorMessage }}</small> -->
                  </div>
                </Field>
              </div>
            </div>

            <div
              class="tw-text-gray-600 tw-flex tw-flex-col md:tw-flex-row tw-gap-5 mb-5"
            >
              <label class="tw-mb-3 tw-mr-12"
                >{{ $t("dynamicQr.facebookDynamic.Title") }}:</label
              >
              <div class="tw-flex-col tw-w-[88%] tw-ml-2">
                <Field name="title" v-slot="{ field, errorMessage }">
                  <v-text-field
                    v-bind="field"
                    v-model="codeDto.title"
                    :label="$t('dynamicQr.facebookDynamic.Title')"
                  ></v-text-field>
                  <div>
                    <!-- <small class="tw-text-red-500">{{ errorMessage }}</small> -->
                  </div>
                </Field>
              </div>
            </div>

            <div
              class="tw-text-gray-600 tw-flex tw-flex-col md:tw-flex-row tw-gap-5 mb-5"
            >
              <label class="tw-mb-3 tw-mr-6"
                >{{ $t("dynamicQr.facebookDynamic.Website") }}:</label
              >
              <div class="tw-flex-col tw-w-[88%] tw-ml-2">
                <Field name="website" v-slot="{ field, errorMessage }">
                  <v-text-field
                    :errorMessage="errorMessage"
                    v-bind="field"
                    v-model="codeDto.website"
                    @keypress="
                      codeDto.website = qrStore.httpsCheck($event.target.value)
                    "
                    :label="$t('dynamicQr.facebookDynamic.Website')"
                  ></v-text-field>
                  <div>
                    <small class="tw-text-red-500">{{ errorMessage }}</small>
                  </div>
                </Field>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
    <template #mobile>
      <FacebookTemplate :fetchData="false"> </FacebookTemplate>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
import FileUploader from "@/components/FileUploader.vue";
import { facebookDto } from "@/api/dto/website/facebookDto";
import { useFacebookStore } from "@/store/qrCodes/dynamic/facebook";
import { useQrStore } from "~/store/qrCodes/qr";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { storeToRefs } from "pinia";
import FacebookTemplate from "@/pages/template/FaceBookDynamic/[id].vue";
import { facebookController } from "~/api/endpoints/facebook";
import Facebooksvg from "@/assets/svg/qrTypes/FacebookType.svg";
const store = useFacebookStore();
const route = useRoute();
const qrStore = useQrStore();
const { codeDto } = storeToRefs(store);
const isModify = computed(() => route.params.id !== "0");

const index = ref(0);
const { t } = useI18n();

const Colors = [
  ["#73b5e7", "#dd0ec1"],
  ["#EEA886", "#F07464"],
  ["#F9C2ED", "#E567F0"],
];
function SetColor(color: Array<string>, i: number) {
  index.value = i;
  codeDto.value.primaryColor = color[0];
  codeDto.value.buttonColor = color[1];
}

function switchColor() {
  [codeDto.value.primaryColor, codeDto.value.buttonColor] = [
    codeDto.value.buttonColor,
    codeDto.value.primaryColor,
  ];
}

if (isModify.value) {
  const { data } = await useCustomFetch<facebookDto>(
    `${facebookController.GetFacebook}?id=${route.params.id}`
  );
  if (data.value) {
    codeDto.value = data.value;
  }
}
definePageMeta({
  layout: false,
  middleware: ["create-qr"],
});
onBeforeUnmount(() => {
  store.resetDto();
});
const URL =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

const schema = yup.object({
  qrName: yup
    .string()
    .required(t("dynamicQr.facebookDynamic.validation.nameQr")),
  name: yup.string().required(t("dynamicQr.facebookDynamic.validation.Name")),
  facebookUrl: yup.string().matches(URL, "Enter a valid url"),
  // .required(t("dynamicQr.facebookDynamic.validation.faceBookUrl")),
  title: yup.string().required(t("dynamicQr.facebookDynamic.validation.Title")),
  website: yup.string().matches(URL, "Enter a valid website"),
  // .required(t("dynamicQr.facebookDynamic.validation.Website")),
});
onBeforeUnmount(() => {
  store.resetDto();
});
</script>
<style scoped>
.color {
  display: flex;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  margin-left: 20px;
  align-items: center;
  border: 1px solid;
  justify-content: center;
  position: relative;
}
#icon {
  right: 8px !important;
}

#_hex {
  height: 150px;
  width: 100%;
  background-color: #faf9f9;
  border-radius: 10px;
}
.footer {
  height: 80px;
  margin: 0 10px 0 0;
  background-color: #263238;
  color: #fff;
}
.btn button {
  margin: 10px;
}
.b_color input {
  width: 50px;
  height: 46px;
  justify-content: end;
  border-radius: 50%;
}
#_dev {
  margin-left: 19px;
  margin-right: 19px;
  height: 315px;
}
#text {
  margin-right: 15px;
  text-overflow: ellipsis;
}
#P {
  margin-right: 10px;
}
</style>
