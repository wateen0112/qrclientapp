<template>
  <NuxtLayout name="dynamic-code-layout">
    <Form
      :validation-schema="schema"
      ref="pdfForm"
      v-slot="value"
      :initial-values="{ ...pdfDynamicDto }"
    >
      <div>
        <div class="pdf-page">
          <!--Name Qr-->
          <div
            class="tw-flex tw-justify-between tw-items-center tw-gap-3 tw-mb-2"
          >
            <!-- <img src="@/assets/svg/qrTypes/BusinessDynamic.svg" /> -->
            <svg
              width="29"
              height="30"
              viewBox="0 0 29 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9759 5.60957C13.7963 10.0998 14.2682 19.4394 25.592 20.8763C26.1823 20.8763 28.5467 21.4858 25.5935 19.0802C22.6403 16.6745 10.2002 19.619 5.24608 25.3665C4.6563 26.5639 5.24646 28.3491 8.78477 25.3665C12.3231 22.3839 18.1637 8.66291 16.7483 6.50761C16.7463 5.60957 16.389 4.1727 14.9759 5.60957Z"
                stroke="black"
                stroke-width="2"
              />
              <rect />
            </svg>

            <v-text-field
              id="qrName"
              v-model="pdfDynamicDto.qrName"
              :placeholder="$t('dynamicQr.pdfDynamic.qrName')"
            ></v-text-field>
          </div>

          <!-- PDF -->

          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-my-4">
            <div class="header tw-bg-gray-100 tw-p-4 tw-flex">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0264 1.55415C8.95406 5.63616 9.383 14.1267 19.6774 15.433C20.214 15.433 22.3635 15.9871 19.6788 13.8002C16.994 11.6132 5.68488 14.29 1.1811 19.515C0.644933 20.6035 1.18144 22.2264 4.39808 19.515C7.61473 16.8035 12.9244 4.32992 11.6376 2.37056C11.6358 1.55415 11.311 0.247912 10.0264 1.55415Z"
                  stroke="#8D8D8D"
                  stroke-width="2"
                />
              </svg>

              <span class="tw-text-gray-600" style="margin-left: 12px"
                >PDF</span
              >
            </div>

            <div class="hidden tw-p-4 tw-bg-white tw-rounded-lg">
              <h3 class="tw-mb-5 tw-tracking-tight tw-text-gray-600">
                {{ $t("dynamicQr.pdfDynamic.pdfTitle") }}
              </h3>
              <form>
                <div class="form-group">
                  <label class="tw-text-gray-400 tw-text-sm"
                    >{{ $t("dynamicQr.pdfDynamic.pdfUpload") }}
                  </label>
                  <v-file-input
                    :label="$t('dynamicQr.pdfDynamic.pdfUploadTitle')"
                    @change="changeFile"
                  ></v-file-input>
                </div>
                <div class="tw-mt-2">
                  <label class="tw-text-gray-400 tw-text-sm"
                    >{{ $t("dynamicQr.pdfDynamic.pdfUploadCover") }}
                  </label>
                  <v-file-input
                    :label="$t('dynamicQr.pdfDynamic.pdfUploadCoverTitle')"
                    @change="changeCover"
                  ></v-file-input>
                </div>
              </form>
            </div>
          </div>

          <!-- Design -->

          <section>
            <div class="header tw-bg-gray-100 tw-p-4">
              <span class="tw-text-gray-600">Design</span>
            </div>

            <div class="hidden tw-pt-8 tw-bg-white tw-rounded-lg">
              <h3
                class="tw-mb-9 tw-text-center tw-text-lg tw-tracking-tight tw-text-gray-600"
              >
                {{ $t("dynamicQr.pdfDynamic.designTitle") }}
              </h3>
              <label class="tw-px-3 tw-text-gray-600"> Colors</label>
              <div
                class="tw-p-4 tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-gap-5 tw-cursor-pointer"
              >
                <div
                  v-for="(color, i) in colorsData"
                  :key="i"
                  class="tw-relative"
                  @click="pdfStore.setColor(color, i)"
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
                      v-model="pdfDynamicDto.primaryColor"
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
                        v-model="pdfDynamicDto.primaryColor"
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
                    @click="pdfStore.swap"
                  >
                  </v-btn>
                </div>

                <div class="tw-basis-full sm:tw-basis-48">
                  <label>Button</label>

                  <div class="tw-relative">
                    <input
                      v-model="pdfDynamicDto.buttonColor"
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
                        v-model="pdfDynamicDto.buttonColor"
                        class="tw-absolute tw-h-[50px] tw-scale-150"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

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

            <div class="hidden tw-p-4 tw-bg-white tw-rounded-lg">
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5"
              >
                <label class="tw-w-20 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.pdfDynamic.company") }}:</label
                >
                <v-text-field
                  v-model="pdfDynamicDto.company"
                  :label="$t('dynamicQr.pdfDynamic.company')"
                ></v-text-field>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-4"
              >
                <label class="tw-w-20 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.pdfDynamic.title") }}:</label
                >
                <v-text-field
                  v-model="pdfDynamicDto.title"
                  :label="$t('dynamicQr.pdfDynamic.title')"
                ></v-text-field>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-4"
              >
                <label class="tw-w-20 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.pdfDynamic.description") }}:</label
                >
                <v-text-field
                  v-model="pdfDynamicDto.description"
                  :label="$t('dynamicQr.pdfDynamic.description')"
                ></v-text-field>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5"
              >
                <label class="tw-w-20 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.pdfDynamic.website") }}:</label
                >
                <v-text-field
                  @keypress="
                    pdfDynamicDto.website = QrStore.httpsCheck(
                      $event.target.value
                    )
                  "
                  v-model="pdfDynamicDto.website"
                  :label="$t('dynamicQr.pdfDynamic.website')"
                ></v-text-field>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
    <template #mobile>
      <PdfDynamic :fetch-data="false"> </PdfDynamic>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import PdfDynamic from "@/pages/template/PdfDynamic/[id].vue";
import { useQrPdfDynamic } from "@/store/qrCodes/dynamic/pdf";
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import * as yup from "yup";
import { useQrStore } from "@/store/qrCodes/qr";
import { useToast } from "vue-toastification";
import { AddPdfDto } from "@/api/dto/qrCodes/dynamic/Pdf";
import { pdfController } from "~/api/endpoints/pdfDynamic";
import { useFile } from "@/composables/useFile";
const route = useRoute();
const toast = useToast();
const QrStore = useQrStore();
const pdfForm = ref<InstanceType<typeof Form> | null>(null);
const isModify = computed(() => route.params.id !== "0");
const schema = computed(() => {
  return yup.object({
    pdfFile: yup.string().required("Qr File is required"),
    pdfCover: yup.string().required("Qr Cover is required"),
  });
});
const { download } = useFile();
const pdfStore = useQrPdfDynamic();
const { activeIndex, pdfDynamicDto } = storeToRefs(pdfStore);
const colors = computed(() => colorsData.map((ele) => ele).map((item) => item));
const colorsData = [
  ["#73b5e7", "#dd0ec1"],
  ["#EEA886", "#F07464"],
  ["#F9C2ED", "#E567F0"],
];
const { qrNameToDownload } = storeToRefs(QrStore);

if (isModify.value) {
  const { data } = await useCustomFetch<AddPdfDto>(
    pdfController.GET_QR_PDF + `?id=${route.params.id}`
  );
  if (data.value) {
    pdfDynamicDto.value = data.value;
  }
}
function changeFile(e: any) {
  const input = e.target.files[0];
  if (input) {
    pdfDynamicDto.value.pdfFile = input;
  }
}
function changeCover(e: any) {
  const input = e.target.files[0];
  if (input) {
    pdfDynamicDto.value.coverFile = input;
    pdfDynamicDto.value.coverUrl = URL.createObjectURL(input);
  }
}
onMounted(() => {
  qrNameToDownload.value = pdfDynamicDto.value.qrName;
  QrStore.emitter.on("dynamicQrDownload", () => {
    pdfForm.value?.validate().then((valid) => {
      if (
        pdfDynamicDto.value.coverFile != "" &&
        pdfDynamicDto.value.pdfFile != ""
      ) {
        if (route.params.id !== "0") {
          pdfDynamicDto.value.id = route.params.id as string;
          pdfStore.modifyPdf();
          download(QrStore.qrPreview, pdfDynamicDto.value.qrName);
        } else {
          pdfStore.addPdf();
          download(QrStore.qrPreview, pdfDynamicDto.value.qrName);
        }
      } else toast.error("pdf file is required");
    });
  });
});
// onBeforeUnmount(() => {
//   pdfStore.resetDto();
// });
definePageMeta({
  layout: false,
  middleware: ["create-qr"],
});
</script>
<style lang="scss">
.pdf-page {
  .native {
    color: gray;
    border: 1px solid #ccc;
    padding: 4px;
    border-radius: 10px;
    outline: none;
  }
}
</style>
