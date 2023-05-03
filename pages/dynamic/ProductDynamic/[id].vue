<template>
  <NuxtLayout name="dynamic-code-layout">
    <template #default>
      <Form :validation-schema="schema" :initial-values="{ ...productDto }">
        <div class="tw-grid tw-grid-cols-2 qr-name">
          <div class="tw-flex tw-gap-3 tw-justify-center tw-items-center">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.66969 0.416687C7.34805 0.416748 7.0397 0.545015 6.81292 0.77309L1.12942 6.45658H16.8393L22.8792 0.416687H7.66969ZM24.5833 2.13023L18.5434 8.17013V23.88L24.2363 18.187C24.4609 17.9587 24.5857 17.6506 24.5833 17.3303L24.5833 2.13023ZM0.416626 8.87348V23.3796C0.419281 24.0433 0.956659 24.5807 1.62036 24.5833C6.45573 24.5833 11.2911 24.5833 16.1265 24.5833V8.87348H0.416626Z"
                fill="#000"
              />
            </svg>
            <div class="tw-flex-col tw-w-full">
              <Field name="qrName" v-slot="{ field, errorMessage }">
                <v-text-field
                  :error-messages="errorMessage"
                  v-model="productDto.qrName"
                  v-bind="field"
                  :placeholder="$t('dynamicQr.eventDynamic.qrName')"
                ></v-text-field>
                <div>
                  <!-- <small class="tw-text-red-500">{{ errorMessage }}</small> -->
                </div>
              </Field>
            </div>
          </div>
        </div>
        <div>
          <!-- <ErrorMessage name="qrName" class="text-red-lighten-1">
          </ErrorMessage> -->
          <v-card class="tw-my-9">
            <section>
              <VCardTitle class="tw-bg-gray-100">
                {{ $t("dynamicQr.appDynamic.design") }}
              </VCardTitle>
              <VCardText>
                <p class="my-4">
                  {{ $t("dynamicQr.appDynamic.text") }}
                </p>
              </VCardText>
              <div class="tw-m-5">
                <label class="tw-mt-[20px]">
                  {{ $t("dynamicQr.appDynamic.color") }} :</label
                >
                <div
                  class="tw-p-4 tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-gap-5 tw-cursor-pointer"
                >
                  <div
                    v-for="(color, i) in Colors"
                    :key="i"
                    class="tw-relative"
                    @click="store.SetColor(color, i)"
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

                <div
                  class="tw-flex tw-flex-col tw-rounded-xl sm:tw-flex-row tw-bg-gray-200 py-5 tw-justify-center tw-flex-wrap tw-items-center mt-10 md:tw-gap-6 tw-gap-0 tw-mb-12"
                >
                  <div class="tw-basis-full sm:tw-basis-48">
                    <label>{{ $t("dynamicQr.appDynamic.primary") }}</label>
                    <div class="tw-relative">
                      <input
                        v-model="productDto.primaryColor"
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
                          v-model="productDto.primaryColor"
                          class="tw-absolute tw-h-[50px] tw-scale-150"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="tw-basis-full md:tw-basis-12 tw-flex tw-justify-center tw-mt-4"
                  >
                    <v-btn
                      class="ma-2 text-white"
                      color="blue-grey darken-4"
                      icon="mdi-swap-horizontal"
                      @click="store.switchColor"
                    >
                    </v-btn>
                  </div>

                  <div class="tw-basis-full sm:tw-basis-48">
                    <label>{{ $t("dynamicQr.appDynamic.button") }}</label>

                    <div class="tw-relative">
                      <input
                        v-model="productDto.buttonColor"
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
                          v-model="productDto.buttonColor"
                          class="tw-absolute tw-h-[50px] tw-scale-150"
                        />
                      </div>
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
                  v-model="productDto.CompanyLogoFile"
                  v-model:url="productDto.companyLogoUrl"
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
                  v-model="productDto.ImageFile"
                  v-model:url="productDto.imageUrl"
                  class="tw-flex-grow tw-w-full tw-mx-auto"
                ></FileUploader>
                <!-- <v-file-input
              label="image"
              @change="changeImageFile"
            ></v-file-input> -->
              </div>

              <div
                class="tw-flex tw-justify-center tw-items-center tw-container tw-mt-6 tw-relative"
              >
                <label class="tw-w-32"
                  >{{ $t("dynamicQr.foodDynamic.productPrivate") }}
                </label>
                <FileUploader
                  multiple
                  v-model="productDto.ProductPrivateFile"
                  v-model:url="productDto.productPrivateUrl"
                  class="tw-flex-grow tw-w-full tw-mx-auto"
                ></FileUploader>
              </div>
            </section>
          </v-card>
          <v-card class="tw-mt-8">
            <VCardTitle class="tw-bg-gray-100">
              {{ $t("dynamicQr.foodDynamic.basicInfo") }}
            </VCardTitle>
            <section class="tw-p-4 interior">
              <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 mt-8">
                <label class="tw-w-32"
                  >{{ $t("dynamicQr.foodDynamic.productName") }}
                </label>
                <v-text-field
                  v-model="productDto.productName"
                  :label="$t('dynamicQr.foodDynamic.productName')"
                  class="tw-flex-grow tw-w-full"
                >
                </v-text-field>
              </div>
              <div
                v-for="(feature, i) in productDto.productFeatures"
                :key="i"
                class="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-gap-4 mt-8"
              >
                <label class="tw-w-32">{{
                  $t("dynamicQr.foodDynamic.productFeatures")
                }}</label>
                <v-text-field
                  v-model="productDto.productFeatures[i]"
                  :label="$t('dynamicQr.foodDynamic.productFeatures')"
                  class="tw-flex-grow tw-w-full tw-h-100"
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
                  v-model="productDto.simpleExplanation"
                  :label="$t('dynamicQr.foodDynamic.simpleExplanation')"
                  class="tw-flex-grow tw-w-full"
                >
                </v-text-field>
              </div>
              <hr class="tw-mt-10" />
              <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 mt-8">
                <label>{{ $t("dynamicQr.foodDynamic.productWheight") }}</label>
                <v-text-field
                  v-model="productDto.productWeight"
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
                    v-model="productDto.expirationDate"
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
                    v-model="productDto.price"
                    :label="$t('dynamicQr.foodDynamic.price')"
                    class="tw-flex-grow tw-w-full"
                  >
                  </v-text-field>
                </div>
              </div>

              <div
                class="tw-flex tw-flex-col md:tw-items-center tw-items-start md:tw-flex-row tw-gap-4 tw-w-full tw-mt-6"
              >
                <label class="tw-flex tw-justify-center tw-items-center">{{
                  $t("dynamicQr.foodDynamic.ProductInformation")
                }}</label>
                <v-text-field
                  v-model="productDto.productInformation"
                  :label="$t('dynamicQr.foodDynamic.ProductInformation')"
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
                  v-model="productDto.description"
                  :label="$t('dynamicQr.foodDynamic.description')"
                  class="tw-flex-grow tw-w-full"
                >
                </v-textarea>
              </div>

              <p class="tw-my-10 tw-text-center">
                {{ $t("dynamicQr.foodDynamic.textBtnLink") }}
              </p>
              <div class="tw-flex tw-justify-center tw-items-center tw-gap-3">
                <div
                  v-if="x === 'visible'"
                  class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-justify-center tw-items-center tw-gap-6 tw-w-full"
                >
                  <label>{{ $t("dynamicQr.foodDynamic.button") }}:</label>
                  <v-text-field
                    :label="$t('dynamicQr.foodDynamic.buttonName')"
                    v-model="productDto.button.name"
                  ></v-text-field>
                  <v-text-field
                    :label="$t('dynamicQr.foodDynamic.buttonLink')"
                    v-model="productDto.button.url"
                    @keypress="
                      productDto.button.url = useQrStore().httpsCheck(
                        $event.target.value
                      )
                    "
                  ></v-text-field>
                </div>

                <v-switch
                  :label="`${x}`"
                  v-model="x"
                  value="x"
                  true-value="hidde"
                  false-value="visible"
                ></v-switch>
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
              <div class="tw-p-4 tw-bg-white tw-rounded-lg">
                <label class="tw-mx-4"
                  >{{ $t("dynamicQr.foodDynamic.addressName") }}:</label
                >
                <div
                  class="tw-grid tw-grid-cols-12 tw-p-4 tw-bg-white tw-rounded-lg tw-text-gray-600 tw-gap-6"
                >
                  <div class="md:tw-col-span-6 tw-col-span-12">
                    <v-text-field
                      :label="$t('dynamicQr.foodDynamic.city')"
                      v-model="productDto.address.city"
                    ></v-text-field>
                  </div>
                  <div class="md:tw-col-span-6 tw-col-span-12">
                    <v-text-field
                      :label="$t('dynamicQr.foodDynamic.storeNumber')"
                      v-model="productDto.address.storeNumber"
                      min="0"
                    ></v-text-field>
                  </div>
                  <div class="md:tw-col-span-6 tw-col-span-12">
                    <v-text-field
                      :label="$t('dynamicQr.foodDynamic.regionNumber')"
                      v-model="productDto.address.regionNumber"
                      min="0"
                    ></v-text-field>
                  </div>
                  <div class="md:tw-col-span-6 tw-col-span-12">
                    <v-text-field
                      :label="$t('dynamicQr.foodDynamic.streetName')"
                      v-model="productDto.address.streetName"
                    ></v-text-field>
                  </div>
                  <div class="md:tw-col-span-6 tw-col-span-12">
                    <v-text-field
                      :label="$t('dynamicQr.foodDynamic.country')"
                      v-model="productDto.address.country"
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
                v-model="productDto.socialMediaChannels"
              ></SocialMediaInput>
            </section>
          </v-card>
        </div>
      </Form>
    </template>
    <template #mobile>
      <MobileProductDynamic> </MobileProductDynamic>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useProductQrStore } from "@/store/qrCodes/dynamic/ProductDynamic";
import { storeToRefs } from "pinia";
import MobileProductDynamic from "@/pages/template/ProductDynamic/[id].vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useQrStore } from "@/store/qrCodes/qr";
import { useFile } from "@/composables/useFile";
import * as yup from "yup";
import { ProductController } from "@/api/endpoints/ProductDynamic";
import { AddProductDto } from "@/api/dto/qrCodes/dynamic/Product";
import ProductTypeSvg from "@/assets/svg/qrTypes/productType.svg";
//-------------------
definePageMeta({ layout: false, middleware: ["create-qr"] });
const route = useRoute();
const { t } = useI18n();
const { download } = useFile();
const store = useProductQrStore();
const { productDto, Colors, index } = storeToRefs(store);
const Modify = computed(() => route.params.id !== "0");
console.log(Modify.value);

if (Modify.value) {
  console.log("in modify wtf");

  const { data } = await useCustomFetch<AddProductDto>(
    ProductController.GET_Product + `?id=${route.params.id}`
  );
  if (data.value) {
    productDto.value = data.value;
  }
}
const x = ref("visible");
function addAllergene(item: string) {
  // productDto.value.allergene.push(item);
}
function deleteAllergene(index: number) {
  // productDto.value.allergene.splice(index, 1);
}
function addCompoments() {
  // productDto.value.productComponents.push({ component: "", isBold: false });
}
function deleteComponents(index: number) {
  // productDto.value.productComponents.splice(index, 1);
}

function addProductFeatures(item: any) {
  productDto.value.productFeatures.push(item);
}
function deleteProductFeatures(i: number) {
  productDto.value.productFeatures = productDto.value.productFeatures.filter(
    (ele, idx) => idx != i
  );
}
const schema = yup.object({
  qrName: yup.string().required(t("dynamicQr.appDynamic.validation.nameQr")),
});
onBeforeUnmount(() => {
  store.resetDto();
});
</script>
