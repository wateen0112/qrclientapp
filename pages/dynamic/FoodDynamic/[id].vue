<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useFoodDynamic } from "~/store/qrCodes/dynamic/food";
import foodTemplate from "@/pages/template/FoodDynamic/[id].vue";
// import { FileUploader } from "@/components/FileUploader.vue";
import { FoodDynamicController } from "~/api/endpoints/foodDynamic";
import { useQrStore } from "@/store/qrCodes/qr";
import * as yup from "yup";
import { Field, ErrorMessage, Form } from "vee-validate";
import { useToast } from "vue-toastification";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useFile } from "@/composables/useFile";

const localePath = useLocalePath();
const route: any = useRoute();
const foodStore = useFoodDynamic();
const { download } = useFile();
const { changeColorDto, colorsData, foodDto, coinPrice } =
  storeToRefs(foodStore);

definePageMeta({ layout: false, middleware: ["create-qr"] });

//GetById foodDto

const { data } = await useCustomFetch<any>(
  `${FoodDynamicController.Get_Food_Dynamic}?id=${route.params.id}`
);
if (data.value) {
  foodDto.value = data.value;
}

const x = ref("visible");
const toast = useToast();
const foodForm = ref<InstanceType<typeof Form> | null>(null);
const QrStore = useQrStore();
const schema = computed(() => {
  return yup.object({
    qrName: yup.string().required("Qr name is required"),
  });
});
function setColor(color: Array<string>, i: number) {
  changeColorDto.value.primary = color[0];
  changeColorDto.value.button = color[1];
  foodDto.value.primaryColor = changeColorDto.value.primary;
  foodDto.value.buttonColor = changeColorDto.value.button;
  changeColorDto.value.isActiveIndex = i;
}
function swap() {
  [changeColorDto.value.primary, changeColorDto.value.button] = [
    changeColorDto.value.button,
    changeColorDto.value.primary,
  ];
  [foodDto.value.primaryColor, foodDto.value.buttonColor] = [
    foodDto.value.buttonColor,
    foodDto.value.primaryColor,
  ];
}

function addAllergene(item: string) {
  foodDto.value.allergene.push(item);
}
function deleteAllergene(index: number) {
  foodDto.value.allergene.splice(index, 1);
}
function addCompoments() {
  foodDto.value.productComponents.push({ component: "", isBold: false });
}
function deleteComponents(index: number) {
  foodDto.value.productComponents = foodDto.value.productComponents.filter(
    (ele, idx) => idx != index
  );
  // foodDto.value.productComponents.splice(index, 1);
}

function addProductFeatures(item: string) {
  foodDto.value.productFeatures.push(item);
}
function deleteProductFeatures(i: number) {
  foodDto.value.productFeatures = foodDto.value.productFeatures.filter(
    (ele, idx) => idx != i
  );
}

onMounted(() => {
  QrStore.emitter.on("dynamicQrDownload", () => {
    foodForm.value?.validate().then((valid) => {
      if (valid.valid) {
        if (route.params.id !== "0") {
          foodStore.modifyQrFood().then(() => {
            download(QrStore.qrPreview, foodDto.value.qrName);

            navigateTo(localePath("/dashboard/myQrs/all"));
          });
        } else {
          foodStore.addQrFood();
          download(QrStore.qrPreview, foodDto.value.qrName);
        }
      } else toast.error("qr Name is required");
    });
  });
});

onBeforeUnmount(() => {
  foodStore.resetDto();
});
</script>

<template>
  <NuxtLayout name="dynamic-code-layout">
    <!-- {{ foodDto }} -->

    <Form
      class="food-page"
      :initial-values="{ ...foodDto }"
      :validation-schema="schema"
      ref="foodForm"
      v-slot="value"
    >
      <div class="tw-flex tw-flex-col qr-name">
        <div class="tw-flex tw-justify-between tw-items-center tw-gap-3">
          <svg
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.9121 26.6243C29.666 26.0255 28.983 25.7391 28.3845 25.985C28.3626 25.9939 27.1763 26.4602 24.714 26.898C25.3951 26.1974 26.0197 25.4125 26.5828 24.5432C26.9343 24 26.7792 23.2744 26.236 22.9226C25.6929 22.571 24.9673 22.7262 24.6155 23.2694C23.4345 25.0932 21.9502 26.475 20.2036 27.3766C20.1494 27.4046 20.0992 27.4373 20.0514 27.4721C18.5742 27.5849 16.8928 27.6564 14.9991 27.6564C13.1307 27.6564 11.4711 27.587 10.0122 27.4767C9.95841 27.4371 9.90165 27.4007 9.83985 27.3698C5.60005 25.2507 3.65272 21.1413 2.84546 16.9579C3.34739 17.0181 3.82782 17.1918 4.23706 17.4708C5.02532 18.0087 5.83122 18.2813 6.63207 18.2813C7.43316 18.2813 8.23905 18.0087 9.02732 17.4708C10.0802 16.7528 11.551 16.7525 12.6041 17.4708C13.3923 18.0087 14.1982 18.2813 14.9991 18.2813C15.8002 18.2813 16.6058 18.0087 17.3943 17.4708C18.4474 16.7525 19.918 16.7525 20.9711 17.4708C21.7593 18.0087 22.5652 18.2813 23.3661 18.2813C24.1672 18.2813 24.973 18.0087 25.7613 17.4708C26.1545 17.2025 26.6139 17.0316 27.095 16.9652C26.9572 17.6207 26.7945 18.2589 26.6063 18.8785C26.4184 19.4977 26.7679 20.1523 27.3873 20.3402C28.0064 20.5281 28.6608 20.1786 28.8489 19.5592C29.6113 17.0467 29.9981 14.2709 29.9981 11.3088C29.9981 10.6617 29.4735 10.137 28.8263 10.137H25.513L29.8118 1.70437C30.1057 1.12778 29.8766 0.422104 29.3001 0.128204C28.7237 -0.165925 28.0179 0.063198 27.7237 0.640011L22.8824 10.137H1.17187C0.524597 10.137 0 10.6617 0 11.3088C0 15.5966 0.696029 19.2965 2.0684 22.3057C2.88139 24.0881 3.92509 25.6149 5.18806 26.8761C2.84065 26.4478 1.7102 26.0003 1.6777 25.9873C1.08124 25.7407 0.397338 26.0232 0.148773 26.6197C-0.10025 27.2171 0.18219 27.9031 0.7798 28.1521C0.960845 28.2274 5.32585 30 14.9991 30C24.6695 30 29.0883 28.2297 29.2719 28.1542C29.8704 27.9084 30.1579 27.2228 29.9121 26.6243ZM27.6324 12.4807C27.6052 13.1985 27.5525 13.9024 27.4749 14.5911C26.3901 14.606 25.3246 14.9317 24.4407 15.5348C24.0486 15.8022 23.6872 15.9377 23.3661 15.9377C23.1463 15.9377 22.9074 15.8727 22.6531 15.747L24.3182 12.4807H27.6324ZM21.6877 12.4807L20.5298 14.752C20.0947 14.6453 19.6431 14.5899 19.1826 14.5899C18.0546 14.5899 16.9796 14.9166 16.0737 15.5348C15.6816 15.8022 15.3202 15.9377 14.9991 15.9377C14.6779 15.9377 14.3165 15.8022 13.9245 15.5348C13.0183 14.9166 11.9433 14.5899 10.8156 14.5899C9.68764 14.5899 8.61259 14.9166 7.70667 15.5348C7.3146 15.8022 6.95297 15.9377 6.63184 15.9377C6.31095 15.9377 5.94932 15.8022 5.55725 15.5348C4.66781 14.9278 3.59436 14.6019 2.50236 14.5909C2.43026 13.8756 2.38563 13.169 2.36275 12.4807H21.6877ZM4.45289 6.44545C4.45289 5.22933 5.29449 4.47971 5.97061 3.87726C6.63825 3.28259 7.01614 2.91796 7.01614 2.34413C7.01614 1.69681 7.54073 1.17219 8.18801 1.17219C8.83506 1.17219 9.35989 1.69681 9.35989 2.34413C9.35989 3.99697 8.30177 4.93932 7.52952 5.62738C7.22007 5.90297 6.79641 6.28041 6.79641 6.44545C6.79641 7.09276 6.27181 7.61738 5.62477 7.61738C4.97749 7.61738 4.45289 7.09276 4.45289 6.44545ZM10.6634 6.43377C10.6634 5.02241 11.6389 4.1533 12.4995 3.38674C13.3999 2.58469 13.9517 2.04839 13.9517 1.17219C13.9517 0.524877 14.4763 0.000252127 15.1236 0.000252127C15.7709 0.000252127 16.2955 0.524877 16.2955 1.17219C16.2955 3.14411 15.0025 4.2959 14.0581 5.13686C13.5177 5.61845 13.0071 6.07326 13.0071 6.43377C13.0071 7.08108 12.4823 7.60571 11.8352 7.60571C11.188 7.60571 10.6634 7.08108 10.6634 6.43377ZM17.0389 6.44545C17.0389 5.22933 17.8802 4.47971 18.5566 3.87726C19.2242 3.28259 19.6021 2.91796 19.6021 2.34413C19.6021 1.69681 20.1267 1.17219 20.774 1.17219C21.421 1.17219 21.9456 1.69681 21.9456 2.34413C21.9456 3.99697 20.8877 4.93932 20.1153 5.62738C19.806 5.90297 19.3824 6.28041 19.3824 6.44545C19.3824 7.09276 18.8578 7.61738 18.2105 7.61738C17.5635 7.61738 17.0389 7.09276 17.0389 6.44545Z"
              fill="black"
            />
          </svg>
          <Field name="qrName" v-slot="{ field }">
            <v-text-field
              id="qrName"
              v-bind="field"
              v-model="foodDto.qrName"
              placeholder="Name Your QR code the title"
            ></v-text-field>
            <!-- :placeholder="$t('dynamicQr.foodDynamic.qrName')" -->
          </Field>
        </div>
        <ErrorMessage
          name="qrName"
          class="tw-mx-12 tw-text-secondary text-sm pt-1"
        ></ErrorMessage>
      </div>

      <!-- ? Design Card -->
      <v-card class="tw-mt-8">
        <VCardTitle class="tw-bg-gray-100">
          {{ $t("dynamicQr.foodDynamic.design") }}
        </VCardTitle>
        <VCardText>
          <p class="my-4">
            {{ $t("dynamicQr.foodDynamic.personalize") }}
          </p>
        </VCardText>
        <section class="tw-p-4">
          <label> {{ $t("dynamicQr.foodDynamic.color") }} </label>
          <div
            class="tw-p-4 tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-gap-5 tw-cursor-pointer"
          >
            <div
              v-for="(color, i) in colorsData"
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
              <label>{{ $t("dynamicQr.foodDynamic.primary") }} </label>
              <div class="tw-relative">
                <input
                  v-model="foodDto.primaryColor"
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
                    v-model="foodDto.primaryColor"
                    class="tw-absolute tw-h-[50px] tw-scale-150"
                  />
                </div>
              </div>
            </div>
            <div class="tw-basis-full md:tw-basis-12 tw-flex tw-justify-center">
              <v-btn
                class="ma-2 text-white"
                color="primary"
                icon="mdi-swap-horizontal"
                @click="swap"
              >
              </v-btn>
            </div>

            <div class="tw-basis-full sm:tw-basis-48">
              <label>{{ $t("dynamicQr.foodDynamic.button") }} </label>

              <div class="tw-relative">
                <input
                  v-model="foodDto.buttonColor"
                  class="tw-w-full bg-white py-3 px-2 focus:tw-outline-primary"
                  style="border-radius: 10px; border: none"
                />
                <div
                  class="tw-h-6 tw-w-10 border tw-overflow-hidden tw-flex tw-rounded-full tw-absolute tw-top-1/2 -tw-translate-y-1/2"
                  style="right: 10px"
                >
                  <input
                    type="color"
                    v-model="foodDto.buttonColor"
                    class="tw-absolute tw-h-[50px] tw-scale-150"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="tw-p-4">
          <!-- {{ urlImage }} -->
          <div
            class="tw-flex tw-justify-center tw-items-center tw-gap-7 tw-mt-14"
          >
            <label>{{ $t("dynamicQr.foodDynamic.companyLogo") }} </label>
            <FileUploader
              v-model="foodDto.companyLogoFile"
              v-model:url="foodDto.companyLogoUrl"
              class="tw-flex-grow tw-w-full tw-mx-auto"
            ></FileUploader>
          </div>
          <div
            class="tw-flex tw-justify-center tw-items-center tw-container tw-mt-6"
          >
            <label class="tw-w-32"
              >{{ $t("dynamicQr.foodDynamic.image") }}
            </label>
            <FileUploader
              v-model="foodDto.imageFile"
              v-model:url="foodDto.imageUrl"
              class="tw-flex-grow tw-w-full tw-mx-auto"
            ></FileUploader>
            <!-- <v-file-input
                label="image"
                @change="changeImageFile"
              ></v-file-input> -->
          </div>

          <!-- <div
            class="tw-flex tw-justify-center tw-items-center tw-container tw-mt-6 tw-relative"
          >
            <label class="tw-w-32"
              >{{ $t("dynamicQr.foodDynamic.productPrivate") }}
            </label>
            <FileUploader
              v-model="foodDto.productPrivateFile"
              v-model:url="foodDto.productPrivateUrl"
              multiple
              class="tw-flex-grow tw-w-full tw-mx-auto"
            ></FileUploader>
          </div> -->
        </section>
      </v-card>

      <!-- ? Information Card -->
      <v-card class="tw-mt-8">
        <VCardTitle class="tw-bg-gray-100">
          {{ $t("dynamicQr.foodDynamic.basicInfo") }}
        </VCardTitle>
        <section class="tw-p-4">
          <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 mt-8">
            <label class="tw-w-32"
              >{{ $t("dynamicQr.foodDynamic.productName") }}
            </label>
            <v-text-field
              v-model="foodDto.productName"
              :label="$t('dynamicQr.foodDynamic.productName')"
              class="tw-flex-grow tw-w-full"
            >
            </v-text-field>
          </div>
          <div
            v-for="(feature, i) in foodDto.productFeatures"
            :key="i"
            class="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-gap-4 mt-8"
          >
            <label class="tw-w-32">{{
              $t("dynamicQr.foodDynamic.productFeatures")
            }}</label>
            <!-- {{ foodDto.productFeatures[i] }} -->
            <v-text-field
              v-model="foodDto.productFeatures[i]"
              :label="$t('dynamicQr.foodDynamic.productFeatures')"
              class="tw-flex-grow tw-w-full"
            >
            </v-text-field>
            <v-btn
              v-if="i == 0"
              icon="mdi-plus"
              color="primary"
              variant="tonal"
              size="x-small"
              @click="addProductFeatures(feature)"
            >
            </v-btn>

            <v-btn
              v-if="i >= 1"
              class="tw-absolute tw-mx-2"
              icon="mdi-close"
              color="red"
              variant="tonal"
              size="x-small"
              @click="deleteProductFeatures(i)"
            >
            </v-btn>
          </div>
          <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 mt-8">
            <label class="tw-w-32">{{
              $t("dynamicQr.foodDynamic.simpleExplanation")
            }}</label>
            <v-text-field
              v-model="foodDto.simpleExplanation"
              :label="$t('dynamicQr.foodDynamic.simpleExplanation')"
              class="tw-flex-grow tw-w-full"
            >
            </v-text-field>
          </div>
          <hr class="tw-mt-10" />
          <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 mt-8">
            <label>{{ $t("dynamicQr.foodDynamic.productWheight") }}</label>
            <v-text-field
              v-model="foodDto.productWeight"
              :label="$t('dynamicQr.foodDynamic.productWheight')"
              class="tw-flex-grow tw-w-full"
            >
            </v-text-field>
          </div>
          <div
            class="tw-flex tw-justify-start tw-items-center md:tw-flex-row md:tw-flex-nowrap tw-flex-wrap md:tw-gap-20 tw-gap-5 mt-8"
          >
            <div
              class="tw-flex tw-flex-col md:tw-items-center tw-items-start md:tw-flex-row tw-gap-4 tw-w-full"
            >
              <label class="tw-w-32">{{
                $t("dynamicQr.foodDynamic.expiration")
              }}</label>
              <v-text-field
                v-model="foodDto.expirationDate"
                :label="$t('dynamicQr.foodDynamic.expiration')"
                type="date"
                class="tw-flex-grow tw-w-full"
              >
              </v-text-field>
            </div>
            <div
              class="tw-flex tw-flex-col md:tw-items-center tw-items-start md:tw-flex-row tw-gap-4 tw-w-full"
            >
              <label>{{ $t("dynamicQr.foodDynamic.price") }}</label>
              <v-text-field
                v-model="foodDto.price"
                :label="$t('dynamicQr.foodDynamic.price')"
                class="tw-flex-grow tw-w-full"
                :prefix="coinPrice"
              >
              </v-text-field>
              <v-select
                :items="['€', '$', '£', '¥']"
                v-model="coinPrice"
                :value="coinPrice"
                class="tw-w-[135px]"
              ></v-select>
            </div>
          </div>
          <div
            v-for="(item, i) in foodDto.allergene"
            :key="i"
            class="allergene tw-flex tw-flex-col md:tw-items-center tw-items-start md:tw-flex-row tw-gap-4 mt-8 tw-w-full"
          >
            <label>{{ $t("dynamicQr.foodDynamic.allergene") }}</label>
            <v-text-field
              class="tw-flex-grow tw-w-full"
              v-model="foodDto.allergene[i]"
              :label="$t('dynamicQr.foodDynamic.allergene')"
            >
            </v-text-field>
            <v-btn
              v-if="i == 0"
              icon="mdi-plus"
              color="primary"
              variant="tonal"
              size="x-small"
              @click="addAllergene(item)"
            >
            </v-btn>

            <v-btn
              v-if="i >= 1"
              class="tw-absolute tw-mx-2"
              icon="mdi-close"
              color="red"
              variant="tonal"
              size="x-small"
              @click="deleteAllergene(i)"
            >
            </v-btn>
          </div>
          <div
            v-for="(product, i) in foodDto.productComponents"
            :key="i"
            class="tw-flex tw-justify-start tw-items-center md:tw-flex-row md:tw-flex-nowrap tw-flex-wrap md:tw-gap-20 tw-gap-5 mt-8"
          >
            <div
              class="tw-relative tw-flex tw-flex-col md:tw-items-center tw-items-start md:tw-flex-row tw-gap-4 tw-w-full"
            >
              <label class="tw-w-32">{{
                $t("dynamicQr.foodDynamic.productComponents")
              }}</label>
              <!-- <Field name="prodComponent" v-slot="{ field }"> -->
              <v-text-field
                v-model="foodDto.productComponents[i].component"
                class="tw-flex-grow tw-w-full"
              >
              </v-text-field>
              <!-- </Field> -->
              <!-- <ErrorMessage
                  name="prodComponent"
                  class="tw-text-secondary text-sm pt-1"
                ></ErrorMessage> -->
              <div class="tw-absolute" style="right: 20px">
                <button
                  class="tw-bg-primary tw-py-1 tw-px-2 tw-font-bold tw-rounded-lg"
                  @click="
                    foodDto.productComponents[i].isBold =
                      !foodDto.productComponents[i].isBold
                  "
                >
                  {{ $t("dynamicQr.foodDynamic.boldText") }}
                </button>
              </div>
            </div>

            <v-btn
              v-if="i == 0"
              icon="mdi-plus"
              color="primary"
              variant="tonal"
              size="x-small"
              @click="addCompoments"
            >
            </v-btn>

            <v-btn
              v-if="i >= 1"
              class="tw-absolute tw-mx-2"
              icon="mdi-close"
              color="red"
              variant="tonal"
              size="x-small"
              @click="deleteComponents(i)"
            >
            </v-btn>
          </div>
          <div class="tw-p-4 info-grid tw-mt-10">
            <label class="tw-flex tw-justify-center tw-items-center">{{
              $t("dynamicQr.foodDynamic.nutritional")
            }}</label>
            <GridINput
              class="tw-mt-8"
              v-model="foodDto.nutritionalValues"
            ></GridINput>
          </div>
          <div
            class="tw-flex tw-flex-col md:tw-items-center tw-items-start md:tw-flex-row tw-gap-4 mt-8 tw-w-full"
          >
            <label class="tw-w-32">{{
              $t("dynamicQr.foodDynamic.referenceQuantity")
            }}</label>

            <v-text-field
              :label="$t('dynamicQr.foodDynamic.referenceQuantity')"
              v-model="foodDto.referenceQuantity"
              class="tw-flex-grow tw-w-full"
            >
            </v-text-field>
          </div>
        </section>
        <hr class="mb-12" />

        <section class="tw-p-4 interior">
          <div
            class="tw-flex tw-justify-start tw-items-center tw-gap-3 tw-w-full"
          >
            <label>{{ $t("dynamicQr.foodDynamic.description") }}:</label>
            <v-textarea
              v-model="foodDto.description"
              :label="$t('dynamicQr.foodDynamic.description')"
              class="tw-flex-grow tw-w-full"
            >
            </v-textarea>
          </div>
          <div
            class="product-grad tw-flex tw-justify-start tw-items-center tw-gap-3 tw-w-full tw-mt-10"
          >
            <label> {{ $t("dynamicQr.foodDynamic.productQuality") }}</label>
            <v-radio-group
              inline
              color="primary"
              v-model="foodDto.productQualityGrade"
            >
              <v-radio label="A" value="A"></v-radio>
              <v-radio label="B" value="B"></v-radio>
              <v-radio label="C" value="C"></v-radio>
              <v-radio label="D" value="D"></v-radio>
              <v-radio label="E" value="E"></v-radio>
            </v-radio-group>
          </div>
          <p class="tw-my-10 tw-text-center">
            {{ $t("dynamicQr.foodDynamic.textBtnLink") }}
          </p>

          <div
            class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-justify-center tw-items-center tw-gap-6 tw-w-full"
          >
            <label>{{ $t("dynamicQr.foodDynamic.button") }}:</label>
            <v-text-field
              :label="$t('dynamicQr.foodDynamic.buttonName')"
              v-model="foodDto.button.name"
            ></v-text-field>
            <v-text-field
              :label="$t('dynamicQr.foodDynamic.buttonLink')"
              v-model="foodDto.button.url"
              @keypress="
                foodDto.button.url = QrStore.httpsCheck($event.target.value)
              "
            ></v-text-field>
          </div>
        </section>
      </v-card>

      <!-- ? Company Address & Location Card -->
      <v-card class="tw-mt-8">
        <VCardTitle class="tw-bg-gray-100">
          {{ $t("dynamicQr.foodDynamic.address") }}
        </VCardTitle>

        <section
          class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6"
        >
          <div>
            <div
              class="tw-grid tw-grid-cols-12 tw-bg-white tw-rounded-lg tw-text-gray-600 tw-gap-2"
            >
              <div
                class="tw-flex tw-my-2 md:tw-my-4 tw-justify-start tw-items-center tw-w-full md:tw-col-span-6 tw-col-span-12"
              >
                <label
                  class="md:tw-w-35 tw-mx-4 tw-mt-1 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.businessDynamic.streetName") }} :</label
                >
                <v-text-field
                  class="tw-mx-2"
                  v-model="foodDto.address.streetName"
                  placeholder="Bruckelstr"
                ></v-text-field>
              </div>
              <div
                class="tw-flex md:tw-my-4 tw-justify-start tw-items-center tw-w-full md:tw-col-span-6 tw-col-span-12"
              >
                <label
                  class="md:tw-w-[100px] tw-mx-1 tw-mt-1 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.businessDynamic.storeNumber") }} :</label
                >
                <v-text-field
                  class="tw-mx-2"
                  v-model="foodDto.address.storeNumber"
                  placeholder="66 a"
                ></v-text-field>
              </div>
            </div>
            <div
              class="tw-grid tw-grid-cols-12 tw-bg-white tw-rounded-lg tw-text-gray-600 tw-gap-2"
            >
              <div
                class="tw-flex md:tw-my-4 tw-justify-start tw-items-center tw-w-full md:tw-col-span-6 tw-col-span-12"
              >
                <label
                  class="tw-w-35 tw-mx-2 tw-mt-2 tw-font-semibold tw-text-gray-600"
                >
                  {{ $t("dynamicQr.eventDynamic.information.regionNumber") }}
                  :</label
                >
                <v-text-field
                  v-model="foodDto.address.regionNumber"
                  placeholder="47137"
                ></v-text-field>
              </div>
              <div
                class="tw-flex md:tw-my-4 tw-justify-start tw-items-center tw-w-full md:tw-col-span-6 tw-col-span-12"
              >
                <label
                  class="md:tw-w-[100px] tw-w-[150px] tw-mt-1 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.eventDynamic.regionName") }} :</label
                >
                <v-text-field
                  class="tw-mx-2"
                  v-model="foodDto.address.city"
                  placeholder="Duisburg"
                ></v-text-field>
              </div>
            </div>
            <div
              class="tw-grid tw-grid-cols-12 tw-bg-white tw-rounded-lg tw-text-gray-600 tw-gap-2"
            >
              <div
                class="tw-flex tw-my-4 tw-justify-start tw-items-center tw-w-full md:tw-col-span-6 tw-col-span-12"
              >
                <label
                  class="md:tw-w-[100px] tw-w-[150px] tw-mx-6 tw-mt-1 tw-font-semibold tw-text-gray-600"
                  >{{
                    $t("dynamicQr.eventDynamic.information.country")
                  }}
                  :</label
                >
                <v-text-field
                  class="tw-mx-2"
                  placeholder="Deutschland"
                  v-model="foodDto.address.country"
                ></v-text-field>
              </div>
            </div>
          </div>
        </section>
      </v-card>

      <!-- ? Social Media Card -->
      <v-card class="tw-mt-8">
        <VCardTitle class="tw-bg-gray-100">
          {{ $t("dynamicQr.foodDynamic.socialMedias") }}
        </VCardTitle>

        <section class="tw-p-4">
          <label>icons</label>

          <SocialMediaInput
            v-model="foodDto.socialMediaChannels"
          ></SocialMediaInput>
        </section>
      </v-card>
    </Form>

    <template #mobile>
      <div>
        <foodTemplate></foodTemplate>
      </div>
    </template>
  </NuxtLayout>
</template>
<style lang="scss">
.food-page {
  input#qrName::placeholder {
    font-size: 20px !important;
  }
  .allergene .v-field__field input[type="text"] {
    font-weight: bold !important;
    font-size: 30px;
    // font-weight: 500 !important;
  }
}
</style>
