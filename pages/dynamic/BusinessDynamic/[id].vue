<script setup lang="ts">
import BusinessTemplate from "@/pages/template/BusinessDynamic/[id].vue";
import { useBusinessDynamic } from "~/store/qrCodes/dynamic/business";
import { storeToRefs } from "pinia";
import { useQrStore } from "@/store/qrCodes/qr";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { computed } from "vue";
import { BusinessDynamicController } from "~/api/endpoints/businessDynamic";
import { AddBussinessDto } from "@/api/dto/qrCodes/dynamic/Businnes";
import "flatpickr/dist/flatpickr.css";
import flatPickr from "vue-flatpickr-component";
import { useFile } from "@/composables/useFile";

const checked = ref(false);
const route = useRoute();
const flatConfig = ref({
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i:s",
});
const { download } = useFile();
const isModify = computed(() => route.params.id !== "0");
definePageMeta({
  layout: false,
  middleware: ["create-qr"],
});
const toast = useToast();
const localePath = useLocalePath();
const businessForm = ref<InstanceType<typeof Form> | null>(null);
const phoneRegExp = /[00|+][1-9]{1,3}[1-9]{4,}/;
const schema = computed(() => {
  return yup.object({
    headline: yup.string().required("headline is required"),
    qrName: yup.string().required("Qr name is required"),
    company: yup.string().required("company is required"),
    email: yup.string().email("email not support"),
    phoneNumber: yup.string().matches(phoneRegExp, "phone number not correct"),
  });
});
const buisnessStore = useBusinessDynamic();
const { changeColorDto, urlImage, businessDto } = storeToRefs(buisnessStore);
const isActiveIconIndex = ref<Array<number>>([]);
const QrStore = useQrStore();
const check = ref([]);
const iconsFeature = ref([
  "mdi-location",
  "mdi-wifi",
  "mdi-seat",
  "mdi-seat-passenger",
  "mdi-human-male-female",
  "mdi-baby-carriage",
  "mdi-car-brake-parking",
  "mdi-taxi",
  "mdi-bed",
  "mdi-coffee-outline",
  "mdi-glass-cocktail",
  "mdi-silverware-fork-knife",
]);
const colorsData = [
  ["#73b5e7", "#dd0ec1"],
  ["#EEA886", "#F07464"],
  ["#F9C2ED", "#E567F0"],
];
if (isModify.value) {
  const { data } = await useCustomFetch<AddBussinessDto>(
    BusinessDynamicController.GET_QR_Business + `?id=${route.params.id}`
  );
  if (data.value) {
    businessDto.value = data.value;
  }
}

// function delButtonPdf() {
//   businessDto.value.pdfName = "";
//   businessDto.value.pdfUrl = "";
// }
function addDay(item: any, i: number) {
  businessDto.value.openingHours.findIndex((ele, index) => {
    if (index === i && ele.times.length < 2) {
      ele.times.push({
        startTime: "07:00:00",
        endTime: "20:00:00",
      });
    }
  });
}

// function delButtonView() {
//   businessDto.value.button.name = "";
//   businessDto.value.button.url = "";
// }

function deleteDay(i: number) {
  businessDto.value.openingHours.forEach((ele) => {
    ele.times = ele.times.filter((item, index) => index != i);
  });
}

function setColor(color: Array<string>, i: number) {
  changeColorDto.value.primary = color[0];
  changeColorDto.value.button = color[1];
  businessDto.value.primaryColor = changeColorDto.value.primary;
  businessDto.value.buttonColor = changeColorDto.value.button;
  changeColorDto.value.isActiveIndex = i;
}

function swap() {
  [changeColorDto.value.primary, changeColorDto.value.button] = [
    changeColorDto.value.button,
    changeColorDto.value.primary,
  ];
  [businessDto.value.primaryColor, businessDto.value.buttonColor] = [
    businessDto.value.buttonColor,
    businessDto.value.primaryColor,
  ];
}

function setMediasIcons(item: string, i: number) {
  iconsFeature.value.forEach((ele) => {
    if (ele == item) {
      businessDto.value.featureIcons.push(ele);
      isActiveIconIndex.value.push(i);
    }
  });
}

function removeIconFeatures(icon: string, i: number) {
  isActiveIconIndex.value = isActiveIconIndex.value.filter((ele) => ele !== i);
  businessDto.value.featureIcons = businessDto.value.featureIcons.filter(
    (ele) => ele !== icon
  );
  console.log(icon + " " + i);
}

const colors = computed(() => colorsData.map((ele) => ele).map((item) => item));

onMounted(() => {
  QrStore.emitter.on("dynamicQrDownload", () => {
    businessForm.value?.validate().then((valid) => {
      if (valid.valid) {
        if (route.params.id !== "0") {
          buisnessStore.modifyQrBusiness();
          download(QrStore.qrPreview, businessDto.value.qrName);
        } else {
          buisnessStore.addQrBusiness();
          download(QrStore.qrPreview, businessDto.value.qrName);
        }
      } else toast.error("headline and qr Name is required");
    });
  });
});

//GetById businessDto
const { data, error } = await useCustomFetch<any>(
  `${BusinessDynamicController.GET_QR_Business}?id=${route.params.id}`
);
if (data.value) {
  businessDto.value = data.value;
}

onBeforeUnmount(() => {
  buisnessStore.resetDto();
});
</script>

<template>
  <NuxtLayout name="dynamic-code-layout">
    <template #default>
      <div class="business-page">
        <Form
          :initial-values="{ ...businessDto }"
          :validation-schema="schema"
          ref="businessForm"
        >
          <div class="tw-flex tw-flex-col qr-name">
            <div class="tw-flex tw-justify-between tw-items-center tw-gap-3">
              <!-- <img src="@/assets/svg/qrTypes/BusinessDynamic.svg" /> -->
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_43897_193058)">
                  <path
                    d="M32.6719 3.71875H1.32812C0.594543 3.71875 0 4.31329 0 5.04688V28.9531C0 29.6867 0.594543 30.2813 1.32812 30.2813H32.6719C33.4055 30.2813 34 29.6867 34 28.9531V5.04688C34 4.31329 33.4055 3.71875 32.6719 3.71875ZM31.3438 6.375V11.6875H2.65625V6.375H31.3438ZM2.65625 27.625V14.3438H31.3438V27.625H2.65625ZM20.5953 22.7016C21.1141 23.2201 21.1141 24.0611 20.5953 24.5797C20.0767 25.0985 19.2358 25.0985 18.7172 24.5797L15.6708 21.5335C15.6612 22.2588 15.0711 22.8438 14.3438 22.8438C13.6102 22.8438 13.0156 22.2492 13.0156 21.5156V18.3281C13.0156 17.5966 13.6128 17 14.3438 17H17.5312C18.2648 17 18.8594 17.5945 18.8594 18.3281C18.8594 19.0555 18.2744 19.6456 17.5491 19.6552L20.5953 22.7016ZM4.71484 9.03125C4.71484 8.11427 5.45802 7.37109 6.375 7.37109C7.29198 7.37109 8.03516 8.11427 8.03516 9.03125C8.03516 9.94823 7.29198 10.6914 6.375 10.6914C5.45802 10.6914 4.71484 9.94823 4.71484 9.03125ZM9.36328 9.03125C9.36328 8.11427 10.1065 7.37109 11.0234 7.37109C11.9404 7.37109 12.6836 8.11427 12.6836 9.03125C12.6836 9.94823 11.9404 10.6914 11.0234 10.6914C10.1065 10.6914 9.36328 9.94823 9.36328 9.03125Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_43897_193058">
                    <rect width="34" height="34" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <Field name="qrName" v-slot="{ field }">
                <v-text-field
                  id="qrName"
                  v-bind="field"
                  v-model="businessDto.qrName"
                  :placeholder="$t('dynamicQr.businessDynamic.qrName')"
                ></v-text-field>
              </Field>
            </div>
            <ErrorMessage
              name="qrName"
              class="tw-mx-12 tw-text-secondary text-sm pt-1"
            ></ErrorMessage>
          </div>

          <!-- Design -->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
            <div class="header tw-bg-gray-100 tw-p-4">
              <span>{{ $t("dynamicQr.businessDynamic.design") }}</span>
            </div>

            <!-- colors -->
            <div class="tw-p-4 tw-bg-white tw-rounded-lg">
              <h2
                class="tw-mb-5 tw-text-center tw-text-lg tw-tracking-tight tw-text-gray-900"
              >
                {{ $t("dynamicQr.businessDynamic.addFeatures") }}
              </h2>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-gap-5 tw-cursor-pointer"
              >
                <div
                  v-for="(color, i) in colors"
                  :key="i"
                  class="tw-relative"
                  @click="setColor(color, i)"
                >
                  <div
                    class="tw-absolute"
                    style="top: -8px; left: -5px"
                    v-if="changeColorDto.isActiveIndex == i"
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
                <div>
                  <label>{{ $t("dynamicQr.businessDynamic.primary") }}</label>
                  <div class="tw-relative">
                    <input
                      v-model="businessDto.primaryColor"
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
                        v-model="businessDto.primaryColor"
                        class="tw-absolute tw-h-[50px] tw-scale-150"
                      />
                    </div>
                  </div>
                </div>
                <v-btn
                  class="ma-2 text-white"
                  color="primary"
                  icon="mdi-swap-horizontal"
                  @click="swap"
                ></v-btn>

                <div>
                  <label>{{ $t("dynamicQr.businessDynamic.button") }}</label>
                  <div class="tw-relative">
                    <input
                      v-model="businessDto.buttonColor"
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
                        v-model="businessDto.buttonColor"
                        class="tw-absolute tw-h-[50px] tw-scale-150"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="tw-flex tw-justify-center tw-items-center tw-container tw-gap-3 tw-mt-14"
              >
                <label>Image:</label>
                <FileUploader
                  v-model="businessDto.imageFile"
                  v-model:url="businessDto.imageUrl"
                  class="tw-flex-grow tw-w-full tw-mx-auto"
                ></FileUploader>
              </div>
            </div>
          </div>

          <!-- Basic information -->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
            <div class="header tw-bg-gray-100 tw-p-4">
              <span>{{ $t("dynamicQr.businessDynamic.basicInfo") }}</span>
            </div>

            <div
              class="tw-grid tw-grid-cols-12 tw-gap-5 tw-p-4 tw-bg-white tw-rounded-lg tw-text-gray-600"
            >
              <div
                class="md:tw-col-span-6 tw-col-span-12 tw-flex md:tw-flex-row tw-flex-col tw-justify-center md:tw-items-center tw-items-start tw-gap-3"
              >
                <label>{{ $t("dynamicQr.businessDynamic.company") }}:</label>
                <div class="tw-flex tw-flex-col tw-w-full">
                  <Field name="company" v-slot="{ field }">
                    <v-text-field
                      v-bind="field"
                      v-model="businessDto.company"
                      :label="$t('dynamicQr.businessDynamic.company')"
                    ></v-text-field>
                  </Field>
                  <ErrorMessage
                    name="company"
                    class="tw-text-secondary text-sm pt-1"
                  ></ErrorMessage>
                </div>
              </div>

              <div
                class="md:tw-col-span-6 tw-col-span-12 tw-flex md:tw-flex-row tw-flex-col tw-justify-center md:tw-items-center tw-items-start tw-gap-3"
              >
                <label>{{ $t("dynamicQr.businessDynamic.headline") }}*:</label>
                <div class="tw-flex tw-flex-col tw-w-full">
                  <Field name="headline" v-slot="{ field }">
                    <v-text-field
                      v-bind="field"
                      v-model="businessDto.headline"
                      :label="$t('dynamicQr.businessDynamic.headline')"
                    ></v-text-field>
                  </Field>
                  <ErrorMessage
                    name="headline"
                    class="tw-text-secondary text-sm pt-1"
                  ></ErrorMessage>
                </div>
              </div>

              <div
                class="tw-col-span-12 tw-flex md:tw-flex-row tw-flex-col tw-justify-center md:tw-items-center tw-items-start tw-gap-3"
              >
                <label class="tw-w-[236px]"
                  >{{ $t("dynamicQr.businessDynamic.button") }}:</label
                >
                <v-text-field
                  class="tw-w-full"
                  :label="$t('dynamicQr.businessDynamic.nameButton')"
                  v-model="businessDto.button.name"
                ></v-text-field>
                <label class="tw-ml-6"
                  >{{ $t("dynamicQr.businessDynamic.button") }}:</label
                >

                <v-text-field
                  class="tw-w-full"
                  @keypress="
                    businessDto.button.url = QrStore.httpsCheck(
                      $event.target.value
                    )
                  "
                  :label="$t('dynamicQr.businessDynamic.linkButton')"
                  v-model="businessDto.button.url"
                ></v-text-field>
                <!-- <v-btn
                  class="tw-absolute tw-mx-2"
                  icon="mdi-close"
                  color="red"
                  variant="tonal"
                  size="x-small"
                  @click="delButtonView"
                >
                </v-btn> -->
              </div>

              <!-- <div
                class="tw-col-span-12 tw-flex md:tw-flex-row tw-flex-col tw-justify-center md:tw-items-center tw-items-start tw-gap-3">
                <label>{{
                  $t("dynamicQr.businessDynamic.sammary")
                }}:</label>
                <v-text-field class="tw-w-full"
                  :label="$t('dynamicQr.businessDynamic.sammary')"
                  v-model="businessDto.summary"></v-text-field>
              </div> -->
              <div
                class="tw-col-span-12 tw-flex md:tw-flex-row tw-flex-col tw-justify-center md:tw-items-center tw-items-start tw-gap-3"
              >
                <label>Button Pdf Name:</label>
                <v-text-field
                  v-model="businessDto.pdfName"
                  label="pdf name"
                ></v-text-field>
                <!-- <v-btn
                  class="tw-absolute tw-mx-2"
                  icon="mdi-close"
                  color="red"
                  variant="tonal"
                  size="x-small"
                  @click="delButtonPdf"
                >
                </v-btn> -->
              </div>
              <div
                v-if="businessDto.pdfName"
                class="tw-col-span-12 tw-flex md:tw-flex-row tw-flex-col tw-justify-center md:tw-items-center tw-items-start tw-gap-3"
              >
                <label>Download Pdf:</label>
                <FileUploader
                  class="tw-flex-grow tw-w-full tw-mx-auto"
                  v-model="businessDto.pdfFile"
                  v-model:url="businessDto.pdfUrl"
                ></FileUploader>
              </div>
            </div>
          </div>

          <!-- Opening Hours -->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
            <div class="header tw-bg-gray-100 tw-p-4">
              <span>{{ $t("dynamicQr.businessDynamic.openingHour") }}</span>
              <!-- <v-btn
                  icon="mdi-plus"
                  color="green"
                  variant="tonal"
                  size="x-small"
                  @click="addDay(hour, i)"
                >
                </v-btn> -->
            </div>

            <div class="tw-p-4 tw-bg-white tw-rounded-lg">
              <div
                v-for="(hour, i) in businessDto.openingHours"
                :key="i"
                class="tw-text-gray-600 tw-flex tw-justify-start tw-items-center tw-flex-wrap md:tw-flex-nowrap tw-gap-x-4"
              >
                <div style="width: 200px">
                  <v-checkbox
                    v-model="hour.checked"
                    :label="hour.day"
                  ></v-checkbox>
                </div>

                <div
                  v-for="(time, index) in hour.times"
                  :key="index"
                  class="tw-flex md:tw-flex-wrap tw-flex-nowrap tw-justify-center tw-my-2 tw-items-center tw-gap-3 tw-ml-5 md:tw-ml-0"
                >
                  <!-- :style="{
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto, auto)`,
                  }" -->
                  <!-- class="tw-flex md:tw-flex-wrap tw-flex-nowrap tw-items-center tw-gap-3 tw-ml-5 md:tw-ml-0" -->

                  <div>
                    <div
                      class="tw-flex tw-justify-center tw-items-center tw-gap-3"
                    >
                      <span>open : </span>
                      <flatPickr
                        class="tw-bg-gray-100 tw-p-1 tw-rounded-md"
                        :config="flatConfig"
                        v-model="time.startTime"
                        step="2"
                      />
                    </div>
                    <div
                      class="tw-flex tw-justify-center my-4 tw-items-center tw-gap-3"
                    >
                      <span>close :</span>
                      <flatPickr
                        class="tw-bg-gray-100 tw-p-1 tw-rounded-md"
                        :config="flatConfig"
                        v-model="time.endTime"
                        step="2"
                      />
                    </div>
                  </div>
                  <v-btn
                    icon="mdi-plus"
                    color="green"
                    variant="tonal"
                    size="x-small"
                    v-if="index == 0"
                    @click="addDay(hour, i)"
                  >
                  </v-btn>
                  <v-btn
                    v-if="index >= 1"
                    class="tw-absolute tw-mx-2"
                    icon="mdi-close"
                    color="red"
                    variant="tonal"
                    size="x-small"
                    @click="deleteDay(index)"
                  >
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
          <!-- Address&Location -->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
            <div class="header tw-bg-gray-100 tw-p-4">
              <span>{{ $t("dynamicQr.businessDynamic.addressName") }}</span>
            </div>

            <div class="tw-p-4 tw-bg-white tw-rounded-lg">
              <div
                class="tw-grid tw-grid-cols-12 tw-p-4 tw-bg-white tw-rounded-lg tw-text-gray-600 tw-gap-6"
              >
                <!-- <div class="md:tw-col-span-6 tw-col-span-12">
                  <v-text-field
                    v-model="businessDto.address.company"
                    :label="$t('dynamicQr.businessDynamic.company')"
                  ></v-text-field>
                </div> -->
                <div
                  class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-justify-between tw-items-center tw-gap-3"
                >
                  <label class="tw-w-[124px]"
                    >{{ $t("dynamicQr.businessDynamic.streetName") }} :</label
                  >
                  <v-text-field
                    v-model="businessDto.address.streetName"
                    placeholder="Bruckelstr"
                  ></v-text-field>
                </div>
                <div
                  class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-justify-between tw-items-center tw-gap-3"
                >
                  <label class="tw-w-[124px]"
                    >{{ $t("dynamicQr.businessDynamic.storeNumber") }} :</label
                  >
                  <v-text-field
                    v-model="businessDto.address.storeNumber"
                    placeholder="66a"
                    min="0"
                  ></v-text-field>
                </div>
                <div
                  class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-justify-between tw-items-center tw-gap-3"
                >
                  <label
                    >{{ $t("dynamicQr.businessDynamic.regionNumber") }} :</label
                  >
                  <v-text-field
                    v-model="businessDto.address.regionNumber"
                    placeholder="47137"
                    min="0"
                  ></v-text-field>
                </div>
                <div
                  class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-justify-between tw-items-center tw-gap-3"
                >
                  <label class="tw-w-[124px]"
                    >{{ $t("dynamicQr.businessDynamic.city") }} :</label
                  >
                  <v-text-field
                    v-model="businessDto.address.city"
                    placeholder="Duisburg"
                  ></v-text-field>
                </div>

                <div
                  class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-justify-between tw-items-center tw-gap-3"
                >
                  <label class="tw-w-[124px]"
                    >{{ $t("dynamicQr.businessDynamic.country") }} :</label
                  >
                  <v-text-field
                    v-model="businessDto.address.country"
                    placeholder="Deutschland"
                  ></v-text-field>
                </div>
              </div>
              <hr class="mt-10" />
              <div class="tw-mt-5">
                <label class="tw-mx-3"
                  >{{ $t("dynamicQr.businessDynamic.featuers") }}:</label
                >
                <p class="tw-text-gray-600 tw-text-center tw-mb-10">
                  {{ $t("dynamicQr.businessDynamic.chooseAmenities") }}
                </p>
                <div
                  class="tw-flex tw-justify-center tw-items-center tw-gap-x-10 tw-flex-wrap md:tw-flex-nowrap tw-mt-6"
                >
                  <!-- {{ isActiveIconIndex }} -->
                  <div
                    class="tw-cursor-pointer tw-relative"
                    v-for="(icon, i) in iconsFeature"
                    :key="i"
                  >
                    <div
                      class="tw-absolute -tw-top-6 -tw-right-2"
                      v-if="isActiveIconIndex.find((ele: number) => ele == i)"
                      @click="removeIconFeatures(icon, i)"
                    >
                      <v-icon
                        icon="mdi-close"
                        color="red"
                        size="0.8rem"
                      ></v-icon>
                    </div>
                    <!-- {{ isActiveIconIndex.find((ele: number) => ele == i) }} -->
                    <v-icon
                      @click="setMediasIcons(icon, i)"
                      :color="
                      isActiveIconIndex.find((ele: number) => ele == i)
                        ? 'primary'
                        : '#5E5873'
                    "
                      >{{ icon }}</v-icon
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- About & Contact information -->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
            <div class="header tw-bg-gray-100 tw-p-4">
              <span> {{ $t("dynamicQr.businessDynamic.aboutName") }}</span>
            </div>

            <div
              class="tw-grid tw-grid-cols-12 tw-p-4 tw-bg-white tw-rounded-lg tw-gap-4"
            >
              <!-- <div
                class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-justify-center tw-items-center tw-gap-4"
              >
                <label class="tw-mt-3 tw-mr-6"
                  >{{ $t("dynamicQr.businessDynamic.about") }}:</label
                >
                <v-text-field
                  :label="$t('dynamicQr.businessDynamic.about')"
                  v-model="businessDto.about"
                ></v-text-field>
              </div> -->
              <div
                class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-justify-center tw-items-center tw-gap-4"
              >
                <label class="tw-mt-3"
                  >{{ $t("dynamicQr.businessDynamic.name") }}:</label
                >
                <v-text-field
                  :label="$t('dynamicQr.businessDynamic.name')"
                  v-model="businessDto.name"
                ></v-text-field>
              </div>

              <div
                class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-justify-center tw-items-center"
              >
                <label>{{ $t("dynamicQr.businessDynamic.phone") }}:</label>

                <div class="tw-flex tw-flex-col tw-w-full">
                  <div class="tw-flex-col">
                    <Field
                      name="phoneNumber"
                      v-model="businessDto.phone"
                      v-slot="{ field }"
                    >
                      <v-text-field
                        v-bind="field"
                        v-model="businessDto.phone"
                        :label="$t('dynamicQr.businessDynamic.phone')"
                      ></v-text-field>
                    </Field>
                    <ErrorMessage name="phoneNumber" v-slot="{ message }">
                      <span class="text-red-lighten-1">{{ message }}</span>
                    </ErrorMessage>
                    <!-- <Field name="phoneNumber" v-slot="{ field }">
                      {{ businessDto.phone }}
                      <v-text-field
                        v-bind="field"
                        :label="$t('dynamicQr.businessDynamic.phone')"
                        v-model="businessDto.phone"
                      ></v-text-field>
                    </Field>
                    <ErrorMessage
                      name="phoneNumber"
                      class="tw-text-secondary text-sm pt-1"
                    >
                    </ErrorMessage> -->
                  </div>
                </div>
              </div>
              <div
                class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-justify-center tw-items-center tw-gap-4"
              >
                <label>{{ $t("dynamicQr.businessDynamic.email") }}</label>
                <div class="tw-flex tw-flex-col tw-w-full">
                  <Field name="email" v-slot="{ field }">
                    <v-text-field
                      v-bind="field"
                      :label="$t('dynamicQr.businessDynamic.email')"
                      v-model="businessDto.email"
                    ></v-text-field>
                  </Field>
                  <ErrorMessage
                    name="email"
                    class="tw-text-secondary text-sm pt-1"
                  ></ErrorMessage>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media channels -->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
            <div class="header tw-bg-gray-100 tw-p-4">
              <span> {{ $t("dynamicQr.businessDynamic.channels") }} </span>
            </div>
            <div class="tw-p-5">
              <SocialMediaInput v-model="businessDto.socialMediaChannels" />
            </div>
          </div>
        </Form>
      </div>

      <div>
        <p class="tw-mt-5">
          {{ $t("dynamicQr.businessDynamic.contactLink") }}
          <nuxt-link
            :to="localePath('/contact')"
            class="tw-text-danger tw-border-b-2 tw-border-danger"
            >contact us</nuxt-link
          >
        </p>
      </div>
    </template>

    <template #mobile>
      <BusinessTemplate></BusinessTemplate>
    </template>
  </NuxtLayout>
</template>

<style lang="scss">
.business-page {
  input.native {
    color: gray;
    border: 1px solid #4e4e4e;
    padding: 4px;
    border-radius: 10px;
    outline: none;
  }
  input#qrName::placeholder {
    font-size: 20px;
  }
}
</style>
