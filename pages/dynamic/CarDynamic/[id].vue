<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useQrStore } from "~/store/qrCodes/qr";
import { useCarQrStore } from "~/store/qrCodes/dynamic/car";
import CarTemplate from "@/pages/template/CarDynamic/[id].vue";
import * as yup from "yup";
import { Field, Form } from "vee-validate";
import { AddCarDto } from "@/api/dto/qrCodes/dynamic/Car";
import { CarDynamicController } from "~/api/endpoints/carDynamic";
import carTypeSvg from "@/assets/svg/qrTypes/CarType.svg";
const route = useRoute();
const isModify = computed(() => route.params.id !== "0");
const carStore = useCarQrStore();
const qrStore = useQrStore();

const { carDto, colorsData, activeIndex } = storeToRefs(carStore);
const currency = ref("$");
definePageMeta({ layout: false, middleware: ["create-qr"] });
const phoneRegExp = /[00|+][1-9]{1,3}[1-9]{4,}/;
const schema = computed(() => {
  yup.object({
    qrName: yup.string().required(),
    carName: yup.string().required(),
    carModel: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().matches(phoneRegExp).required(),
    name: yup.string().required(),
  });
});

if (isModify.value) {
  const { data } = await useCustomFetch<AddCarDto>(
    CarDynamicController.GET_QR_CAR + `?id=${route.params.id}`
  );
  if (data.value) {
    carStore.$patch({
      carDto: data.value,
    });
  }
}
const item = ["$", "€"];

definePageMeta({ layout: false, middleware: ["create-qr"] });
onBeforeUnmount(() => {
  carStore.resetDTO();
});
function testCurrency() {
  if (
    !carDto.value.price.toString().includes("€") &&
    !carDto.value.price.toString().includes("$")
  ) {
    carDto.value.price = carDto.value.price.toString() + currency.value;
    console.log("includes ");
  } else if (carDto.value.price.toString().includes("$") && currency.value === "€") {
    carDto.value.price = carDto.value.price.toString().split("$")[0] + "€";
  } else if (carDto.value.price.toString().includes("€") && currency.value === "$") {
    carDto.value.price = carDto.value.price.toString().split("€")[0] + "$";
  }
}
const currnetPage = ref(0);
onMounted(() => {
  testCurrency();
});
function resize() {
  const textArea = document.querySelector("textArea");
  textArea.style.height = textArea?.scrollHeight + "px";
}
const featuresArray = [
  "trailer hitch",
  "parking assistance",
  "air conditioner",
  "radio/tuner",
  "speakerphone",
  "anti-lock braking system (ABS)",
  "alloy wheels",
  "Xenon_/LED_headlights",
  "sunroof/panoramic roof",
  "seat heating",
  "cruise control",
  "Freisprecheinrichtung",
  "Nichtraucher_Fahrzeug",
  "Checkbook maintained",
];
</script>

<template>
  <NuxtLayout name="dynamic-code-layout">
    <div>
      <Form :initial-values="{ ...carDto }" :validation-schema="schema">
        <div class="tw-flex tw-gap-5 tw-flex-row tw-w-full qr-name">
          <img :src="carTypeSvg" alt="" />
          <div class="tw-flex-col tw-col-span-2 tw-w-full">
            <Field name="qrName" v-slot="{ field, errorMessage }" v-model="carDto.qrName">
              <v-text-field
                :error-messages="errorMessage"
                v-model="carDto.qrName"
                v-bind="field"
                :label="$t('dynamicQr.carDynamic.nameQr')"
              ></v-text-field>
              <div>
                <small class="tw-text-red-500">{{ errorMessage }}</small>
              </div>
            </Field>
          </div>
        </div>

        <v-card class="tw-mt-8">
          <VCardTitle class="tw-bg-gray-100">
            {{ $t("dynamicQr.carDynamic.Design") }}
          </VCardTitle>
          <VCardText>
            <p class="my-4">
              {{ $t("dynamicQr.carDynamic.text") }}
            </p>
          </VCardText>

          <label class="tw-m-4"> {{ $t("dynamicQr.carDynamic.color") }}:</label>
          <div
            class="tw-p-4 tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-gap-5 tw-cursor-pointer"
          >
            <div
              v-for="(color, i) in colorsData"
              :key="i"
              class="tw-relative"
              @click="carStore.setColor(color, i)"
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
              <div class="tw-flex tw-justify-center tw-items-center tw-gap-1">
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
              <label>{{ $t("dynamicQr.carDynamic.primary") }}</label>
              <div class="tw-relative">
                <input
                  v-model="carDto.buttonColor"
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
                    v-model="carDto.buttonColor"
                    class="tw-absolute tw-h-[50px] tw-scale-150"
                  />
                </div>
              </div>
            </div>
            <div class="tw-basis-full md:tw-basis-12 tw-flex tw-justify-center tw-mt-4">
              <v-btn
                class="ma-2 text-white"
                color="primary"
                icon="mdi-swap-horizontal"
                @click="carStore.swap"
              >
              </v-btn>
            </div>

            <div class="tw-basis-full sm:tw-basis-48">
              <label>{{ $t("dynamicQr.carDynamic.button") }}</label>

              <div class="tw-relative">
                <input
                  v-model="carDto.primaryColor"
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
                    v-model="carDto.primaryColor"
                    class="tw-absolute tw-h-[50px] tw-scale-150"
                  />
                </div>
              </div>
            </div>
          </div>

          <section class="tw-p-4">
            <label class="md:tw-basis-40 tw-text-xl">
              <label>{{ $t("dynamicQr.carDynamic.images") }}</label></label
            >
            <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 mt-8">
              <label class="md:tw-basis-40 tw-text-lg">
                <label>{{ $t("dynamicQr.carDynamic.CarImage") }}</label></label
              >
              <div
                class="tw-w-full tw-flex-col tw-flex tw-justify-center tw-items-center"
              >
                <FileUploader
                  :is-carousel="true"
                  multiple
                  v-model="carDto.imageFiles"
                  v-model:url="carDto.imagesUrls"
                  class="tw-flex-grow tw-w-full tw-mx-auto tw-max-w-[70%]"
                >
                </FileUploader>
                <v-carousel
                  v-if="carDto.imageFiles.length === 0"
                  :hide-delimiters="true"
                  class="tw-flex tw-justify-center tw-max-w-[70%]"
                  v-model="currnetPage"
                >
                  <v-carousel-item class="vue-file-uploader-preview-item tw-relative">
                    <img
                      class="rounded-lg m-1 tw-object-fill"
                      src="/placeholders/s63Amg.jpg"
                      alt=""
                    />

                    <v-row class="fill-height" align="center" justify="center">
                      <div class="text-h2"></div>
                    </v-row>
                  </v-carousel-item>
                  <v-carousel-item class="vue-file-uploader-preview-item tw-relative">
                    <img
                      class="rounded-lg m-1 tw-object-fill"
                      src="/placeholders/s63Amg.jpg"
                      alt=""
                    />

                    <v-row class="fill-height" align="center" justify="center">
                      <div class="text-h2"></div>
                    </v-row>
                  </v-carousel-item>
                  <v-carousel-item class="vue-file-uploader-preview-item tw-relative">
                    <img
                      class="rounded-lg m-1 tw-object-fill"
                      src="/placeholders/s63Amg.jpg"
                      alt=""
                    />

                    <v-row class="fill-height" align="center" justify="center">
                      <div class="text-h2"></div>
                    </v-row>
                  </v-carousel-item>
                </v-carousel>
              </div>
            </div>
            <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 mt-8">
              <label class="md:tw-basis-40 tw-text-lg">
                <label>{{ $t("dynamicQr.carDynamic.CompanyImage") }}</label></label
              >
              <FileUploader
                v-model="carDto.companyLogoFile"
                v-model:url="carDto.companyLogoUrl"
                class="tw-flex-grow tw-w-full tw-mx-auto"
              >
              </FileUploader>
            </div>
            <div>
              <p
                class="tw-flex-grow tw-text-center tw-w-full tw-justify-center tw-items-center tw-my-5"
              >
                {{ $t("dynamicQr.carDynamic.noLogo") }}
              </p>
            </div>
            <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 mt-8">
              <label class="md:tw-basis-40 tw-text-lg">
                <label>{{ $t("pricing.dialog.companyName").split("*")[0] }}</label></label
              >
              <v-text-field
                :label="$t('pricing.dialog.companyName').split('*')[0]"
                class="tw-flex-grow tw-w-full"
                v-model="carDto.companyName"
              ></v-text-field>
            </div>
          </section>
        </v-card>

        <!-- ? Information Card -->
        <v-card class="tw-mt-8">
          <VCardTitle class="tw-bg-gray-100">
            <label>{{ $t("dynamicQr.carDynamic.info") }}</label>
          </VCardTitle>
          <!-- ? Information Card -->

          <section class="tw-p-4">
            <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 mt-8">
              <label class="md:tw-basis-40 tw-text-lg">
                <label>{{ $t("dynamicQr.carDynamic.CarName") }}</label></label
              >
              <v-text-field
                v-model="carDto.carName"
                :label="$t('dynamicQr.carDynamic.CarName')"
                class="tw-flex-grow tw-w-full"
              >
              </v-text-field>
            </div>
            <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 mt-8">
              <label class="md:tw-basis-40 tw-text-lg">{{
                $t("dynamicQr.carDynamic.CarModel")
              }}</label>
              <v-text-field
                v-model="carDto.carModel"
                :label="$t('dynamicQr.carDynamic.CarModel')"
                class="tw-flex-grow tw-w-full"
              >
              </v-text-field>
            </div>
            <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 mt-8">
              <label class="md:tw-basis-40 tw-text-lg">{{
                $t("dynamicQr.carDynamic.CarDescription")
              }}</label>
              <VTextarea
                @input="resize"
                v-model="carDto.simpleExplanation"
                :label="$t('dynamicQr.carDynamic.CarDescription')"
                class="tw-flex-grow textArea tw-w-full"
              >
              </VTextarea>
            </div>
          </section>

          <hr class="my-6" />

          <section class="tw-px-4 info-grid">
            <GridINput v-model="carDto.info"></GridINput>
          </section>

          <hr class="my-6" />

          <!-- INTERIOR FEATURES FORM REPEATER -->
          <ClientOnly>
            <section class="tw-p-4 interior" v-if="carDto.interiorFeatures">
              <div
                class="tw-flex tw-items-start tw-justify-between tw-flex-wrap md:tw-flex-nowrap"
              >
                <label class="tw-basis-40 tw-flex-grow text-no-wrap tw-w-32">
                  <!-- {{ $t("dynamicQr.carDynamic.INTERIORFEATURES") }} -->
                  Ausstattung
                </label>

                <!-- <v-btn
                  v-if="i === carDto.interiorFeatures.length - 1"
                  variant="tonal"
                  class="tw-order-2 md:tw-order-3 tw-my-2"
                  color="primary"
                  icon="mdi-plus"
                  @click="carDto.interiorFeatures.push('')"
                ></v-btn>
                <v-text-field
                  v-model="carDto.interiorFeatures[i]"
                  class="md:tw-mx-4 tw-w-full tw-order-3 md:tw-order-2"
                >
                </v-text-field> -->
                <div class="tw-grid tw-grid-cols-2 tw-w-full">
                  <div v-for="(item, index) in featuresArray">
                    <v-checkbox
                      :label="item"
                      color="primary"
                      v-model="carDto.interiorFeatures"
                      :value="item"
                    ></v-checkbox>
                  </div>
                </div>
              </div>
            </section>
          </ClientOnly>

          <section class="tw-p-4 price">
            <div
              class="tw-flex tw-items-center tw-justify-center tw-flex-col md:tw-flex-row"
            >
              <label class="md:tw-basis-40 tw-flex-grow text-no-wrap">
                {{ $t("dynamicQr.carDynamic.CarPrice") }}
              </label>
              <v-text-field
                v-model="carDto.price"
                type="number"
                class="tw-flex-grow tw-w-full tw-m-2 sm:tw-m-12"
              >
              </v-text-field>
              <v-select
                v-model="carDto.currency"
                :items="item"
                class="tw-w-[280px] tw-m-2"
              />
            </div>
          </section>

          <section class="tw-p-4 price tw-mt-4">
            <p class="tw-mb-6 tw-text-center">
              {{ $t("dynamicQr.carDynamic.Text") }}
            </p>
            <div class="tw-flex">
              <label class="md:tw-mt-3 tw-mr-2"
                >{{ $t("dynamicQr.carDynamic.button1") }}:
              </label>
              <div
                class="tw-flex md:tw-flex-row tw-flex-col tw-justify-center gap-4 tw-w-full"
              >
                <v-text-field
                  class="md:tw-ml-12 tw-mb-2"
                  v-model="carDto.button.name"
                  :label="$t('dynamicQr.carDynamic.buttonName')"
                >
                </v-text-field>

                <v-text-field
                  v-model="carDto.button.url"
                  class="md:tw-ml-12 tw-mb-2"
                  @keypress="carDto.button.url = qrStore.httpsCheck($event.target.value)"
                  :label="$t('dynamicQr.carDynamic.buttonUrl')"
                >
                </v-text-field>
              </div>
            </div>
          </section>

          <hr class="my-6" />

          <section class="tw-p-4">
            <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4">
              <label class="md:tw-basis-40 tw-text-lg">{{
                $t("dynamicQr.carDynamic.Description")
              }}</label>
              <VTextarea
                @input="resize"
                class="tw-flex-grow tw-w-full textArea"
                v-model="carDto.description"
                :label="$t('dynamicQr.carDynamic.Description')"
              >
              </VTextarea>
            </div>
          </section>
        </v-card>

        <!-- ? Company Address & Location Card -->

        <v-card class="tw-mt-8">
          <VCardTitle class="tw-bg-gray-100">
            {{ $t("dynamicQr.carDynamic.Company") }}
          </VCardTitle>
          <h2 class="tw-my-4 tw-mx-3">
            {{ $t("dynamicQr.carDynamic.locationAndAddress") }}
          </h2>

          <section class="tw-flex tw-p-4">
            <div
              class="tw-grid tw-mx-4 tw-grid-cols-2 tw-gap-4 tw-flex-grow"
              v-if="carDto.address"
            >
              <div class="tw-flex tw-items-center tw-justify-center">
                <label class="tw-w-[124px]"
                  >{{ $t("dynamicQr.businessDynamic.streetName") }} :</label
                >
                <VTextField v-model="carDto.address.streetName" placeholder="Bruckelstr">
                </VTextField>
              </div>
              <div class="tw-flex tw-items-center tw-justify-center">
                <label class="tw-w-[124px]"
                  >{{ $t("dynamicQr.businessDynamic.storeNumber") }} :</label
                >
                <VTextField v-model="carDto.address.storeNumber" placeholder="66a">
                </VTextField>
              </div>
              <div class="tw-flex tw-items-center tw-justify-center">
                <label>{{ $t("dynamicQr.businessDynamic.regionNumber") }} :</label>
                <VTextField
                  v-model="carDto.address.regionNumber"
                  placeholder="47137"
                ></VTextField>
              </div>

              <div class="tw-flex tw-items-center tw-justify-center">
                <label class="tw-w-[124px]"
                  >{{ $t("dynamicQr.businessDynamic.city") }} :</label
                >
                <VTextField v-model="carDto.address.city" placeholder="Duisburg">
                </VTextField>
              </div>

              <div class="tw-flex tw-items-center tw-justify-center">
                <label class="tw-w-[124px]"
                  >{{ $t("dynamicQr.businessDynamic.country") }} :</label
                >
                <VTextField v-model="carDto.address.country" placeholder="Deutschland">
                </VTextField>
              </div>
            </div>
          </section>
        </v-card>
        <!-- ?  Contact information -->
        <v-card class="tw-mt-8">
          <VCardTitle class="tw-bg-gray-100">
            <!-- {{ $t("dynamicQr.carDynamic.Company") }} -->
            {{ $t("dynamicQr.businessDynamic.aboutName") }}
          </VCardTitle>

          <section class="tw-p-4">
            <div class="tw-flex tw-flex-col tw-items-center md:tw-flex-row tw-gap-4 mt-8">
              <label class="md:tw-basis-40 tw-text-lg">
                <label>{{ $t("contact.form.fullName") }}</label></label
              >

              <v-text-field
                v-model="carDto.contactInformation.name"
                class="tw-flex-grow tw-w-full"
                :label="$t('contact.form.fullName')"
              >
              </v-text-field>
            </div>

            <div class="tw-flex tw-flex-col tw-items-center md:tw-flex-row tw-gap-4 mt-8">
              <label class="md:tw-basis-40 tw-text-lg">
                {{ $t("contact.form.email") }}</label
              >
              <v-text-field
                type="text"
                v-model="carDto.contactInformation.email"
                class="tw-flex-grow tw-w-full"
                :label="$t('contact.form.email')"
              >
              </v-text-field>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center md:tw-flex-row tw-gap-4 mt-8">
              <label class="md:tw-basis-40 tw-text-lg">
                {{ $t("contact.form.phoneNumber") }}</label
              >
              <v-text-field
                type="number"
                v-model="carDto.contactInformation.phone"
                class="tw-flex-grow tw-w-full"
                :label="$t('contact.form.phoneNumber')"
              >
              </v-text-field>
            </div>
          </section>
        </v-card>
        <!-- ? Social Media Card -->

        <v-card class="tw-mt-8">
          <VCardTitle class="tw-bg-gray-100">
            {{ $t("dynamicQr.carDynamic.Social") }}
          </VCardTitle>

          <section class="tw-p-4">
            <label>{{ $t("dynamicQr.carDynamic.icons") }}</label>

            <SocialMediaInput v-model="carDto.socialMediaChannels"> </SocialMediaInput>
          </section>
        </v-card>
      </Form>
    </div>
    <template #mobile>
      <div>
        <CarTemplate :fetch-data="false"></CarTemplate>
      </div>
    </template>
  </NuxtLayout>
</template>
