<template>
  <NuxtLayout name="dynamic-code-layout">
    <Form
      :validation-schema="schema"
      ref="vCardForm"
      v-slot="value"
      :initial-values="{ ...vCardPlusDto }"
    >
      <div>
        <div class="pdf-page">
          <!--Name Qr-->
          <div
            class="tw-flex tw-justify-between tw-items-center tw-gap-3 tw-mb-2"
          >
            <!-- <img src="@/assets/svg/qrTypes/BusinessDynamic.svg" /> -->
            <svg
              width="28"
              height="27"
              viewBox="0 0 28 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_34132_133563)">
                <path
                  d="M27.0469 1.93184C27.0469 0.939136 26.2396 0.131836 25.2469 0.131836H1.84687C0.854175 0.131836 0.046875 0.939136 0.046875 1.93184C0.046875 2.76839 0.622875 3.46679 1.39687 3.66794V25.5181L2.74687 24.1681L5.44687 26.8681L8.14687 24.1681L10.8469 26.8681L13.5469 24.1681L16.2469 26.8681L18.9469 24.1681L21.6469 26.8681L24.3469 24.1681L25.6969 25.5181V3.66794C26.4709 3.46679 27.0469 2.76839 27.0469 1.93184ZM24.7969 23.3455L24.3469 22.8955L21.6469 25.5955L18.9469 22.8955L16.2469 25.5955L13.5469 22.8955L10.8469 25.5955L8.14687 22.8955L5.44687 25.5955L2.74687 22.8955L2.29688 23.3455V3.73184V2.38184H24.7969V3.73184V23.3455ZM25.6969 2.71079V1.48184H1.39687V2.71079C1.12822 2.55554 0.946875 2.26439 0.946875 1.93184C0.946875 1.43549 1.35052 1.03184 1.84687 1.03184H25.2469C25.7432 1.03184 26.1469 1.43549 26.1469 1.93184C26.1469 2.26439 25.9655 2.55554 25.6969 2.71079Z"
                  fill="black"
                />
                <path
                  d="M4.77185 15.1875H21.3094M10.1719 19.9125H16.9219"
                  stroke="black"
                />
              </g>
              <g clip-path="url(#clip1_34132_133563)">
                <path
                  d="M16.9043 12.825H16.0151C16.0151 11.325 14.757 10.1051 13.2094 10.1051C11.6619 10.1051 10.4042 11.3254 10.4042 12.825H9.51501C9.51501 10.8342 11.1728 9.21594 13.2099 9.21594C15.2465 9.21594 16.9043 10.8342 16.9043 12.825Z"
                  fill="black"
                />
                <path
                  d="M13.2099 8.92696C11.8659 8.92696 10.7719 7.83242 10.7719 6.48848C10.7714 5.14408 11.8655 4.04999 13.2099 4.04999C14.5547 4.04999 15.6488 5.14364 15.6488 6.48848C15.6488 7.83331 14.5547 8.92696 13.2099 8.92696ZM13.2099 4.93914C12.3554 4.93914 11.6606 5.634 11.6606 6.48848C11.6606 7.34295 12.3554 8.03782 13.2099 8.03782C14.0648 8.03782 14.7597 7.34295 14.7597 6.48848C14.7597 5.634 14.0639 4.93914 13.2099 4.93914Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_34132_133563">
                  <rect
                    x="0.046875"
                    width="27"
                    height="27"
                    rx="13.5"
                    fill="white"
                  />
                </clipPath>
                <clipPath id="clip1_34132_133563">
                  <rect
                    x="8.8219"
                    y="4.04999"
                    width="8.775"
                    height="8.775"
                    rx="4.3875"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>

            <v-text-field
              id="qrName"
              v-model="vCardPlusDto.qrName"
              :placeholder="$t('dynamicQr.vCardPlusDynamic.qrName')"
            ></v-text-field>
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
                {{ $t("dynamicQr.vCardPlusDynamic.designTitle") }}
              </h3>
              <label class="tw-px-3 tw-text-gray-600"> Colors</label>
              <div
                class="tw-p-4 tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-gap-5 tw-cursor-pointer"
              >
                <div
                  v-for="(color, i) in colorsData"
                  :key="i"
                  class="tw-relative"
                  @click="vCardPlusStore.setColor(color, i)"
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
                      v-model="vCardPlusDto.primaryColor"
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
                        v-model="vCardPlusDto.primaryColor"
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
                    @click="vCardPlusStore.swap"
                  >
                  </v-btn>
                </div>

                <div class="tw-basis-full sm:tw-basis-48">
                  <label>Button</label>

                  <div class="tw-relative">
                    <input
                      v-model="vCardPlusDto.buttonColor"
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
                        v-model="vCardPlusDto.buttonColor"
                        class="tw-absolute tw-h-[50px] tw-scale-150"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- your information -->
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
                >Your Information</span
              >
            </div>

            <div class="hidden tw-p-4 tw-bg-white tw-rounded-lg">
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5"
              >
                <label
                  class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                >
                  {{
                    $t("dynamicQr.vCardPlusDynamic.information.image")
                  }}:</label
                >
                <v-file-input
                  class="fileSocialMedia"
                  prepend-icon=""
                  :label="$t('dynamicQr.vCardPlusDynamic.information.image')"
                  @change="changeFile"
                  clearable
                ></v-file-input>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-my-4 tw-items-center tw-gap-5"
              >
                <label class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{
                    $t("dynamicQr.vCardPlusDynamic.information.name")
                  }}:</label
                >
                <Field name="firstName" v-slot="{ field }">
                  <v-text-field
                    :label="
                      $t('dynamicQr.vCardPlusDynamic.information.firstName')
                    "
                    v-model="vCardPlusDto.firstName"
                  ></v-text-field>
                </Field>
                <ErrorMessage
                  name="firstName"
                  class="tw-text-secondary text-sm pt-1"
                ></ErrorMessage>
                <v-text-field
                  :label="$t('dynamicQr.vCardPlusDynamic.information.lastName')"
                  v-model="vCardPlusDto.lastName"
                ></v-text-field>
              </div>
              <div>
                <div class="tw-text-gray-600 tw-flex tw-items-center tw-gap-5">
                  <label
                    class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >
                    {{
                      $t("dynamicQr.vCardPlusDynamic.information.numbers")
                    }}:</label
                  >
                  <div class="tw-flex tw-flex-col tw-w-full">
                    <Field name="number" v-slot="{ field, errorMessage }">
                      <v-text-field
                        v-bind="field"
                        :label="
                          $t('dynamicQr.vCardPlusDynamic.information.mobile')
                        "
                        v-model="vCardPlusDto.number"
                      ></v-text-field>
                    </Field>
                    <ErrorMessage
                      name="number"
                      class="tw-text-secondary text-sm pt-1"
                    ></ErrorMessage>
                  </div>
                </div>
                <div class="tw-flex tw-my-4">
                  <label
                    class="tw-w-20 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  ></label>
                  <div class="tw-flex tw-flex-col tw-w-60">
                    <Field name="phone" v-slot="{ field, errorMessage }">
                      <v-text-field
                        v-bind="field"
                        :label="
                          $t('dynamicQr.vCardPlusDynamic.information.phone')
                        "
                        v-model="vCardPlusDto.phone"
                      ></v-text-field>
                    </Field>
                    <ErrorMessage
                      name="phone"
                      class="tw-text-secondary text-sm pt-1"
                    ></ErrorMessage>
                  </div>
                  <v-text-field
                    :label="$t('dynamicQr.vCardPlusDynamic.information.fax')"
                    class="tw-mx-2"
                    v-model="vCardPlusDto.fax"
                  ></v-text-field>
                </div>
              </div>
              <div class="tw-text-gray-600 tw-flex tw-items-center tw-gap-5">
                <label class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{
                    $t("dynamicQr.vCardPlusDynamic.information.email")
                  }}:</label
                >
                <div class="tw-flex tw-flex-col tw-w-full">
                  <Field name="email" v-slot="{ field, errorMessage }">
                    <v-text-field
                      v-bind="field"
                      :label="
                        $t('dynamicQr.vCardPlusDynamic.information.email')
                      "
                      v-model="vCardPlusDto.email"
                    ></v-text-field>
                  </Field>
                  <ErrorMessage
                    name="email"
                    class="tw-text-secondary text-sm pt-1"
                  ></ErrorMessage>
                </div>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-4"
              >
                <label class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{
                    $t("dynamicQr.vCardPlusDynamic.information.company")
                  }}:</label
                >
                <v-text-field
                  :label="$t('dynamicQr.vCardPlusDynamic.information.company')"
                  v-model="vCardPlusDto.company"
                ></v-text-field>
                <v-text-field
                  :label="$t('dynamicQr.vCardPlusDynamic.information.job')"
                  class="tw-mx-2"
                  v-model="vCardPlusDto.job"
                ></v-text-field>
              </div>
              <hr class="tw-my-5" />
              <!-- <div>
                <label class="tw-mt-8 tw-font-semibold tw-text-gray-600 tw-text-lg"
                  >{{ $t("dynamicQr.businessDynamic.addressName") }}:</label
                >
                <div class="tw-flex tw-my-4">
                  <label class="tw-w-35 tw-mx-2 tw-mt-6 tw-font-semibold tw-text-gray-600"
                    >{{ $t("dynamicQr.businessDynamic.streetName") }} :</label
                  >
                  <v-text-field
                  class="tw-mx-2"
                    v-model="vCardPlusDto.address.streetName"
                    placeholder="Bruckelstr"
                  ></v-text-field>
                  <label class="tw-w-35 tw-mx-2 tw-mt-6 tw-font-semibold tw-text-gray-600"
                    >{{  $t("dynamicQr.businessDynamic.storeNumber") }} :</label
                  >
                  <v-text-field
                    class="tw-mx-2"
                    v-model="vCardPlusDto.address.storeNumber"
                    placeholder="66 a"
                  ></v-text-field>
                </div>
                <div class="tw-flex tw-my-4">
                  <label
                    class="tw-w-35 tw-mx-2 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >
                    {{ $t("dynamicQr.eventDynamic.information.regionNumber") }} :</label
                  >
                  <v-text-field
                    v-model="vCardPlusDto.address.regionNumber"
                    placeholder="47137"
                  ></v-text-field>
                  <label class="tw-w-35 tw-mx-2 tw-mt-6 tw-font-semibold tw-text-gray-600"
                    >{{ $t("dynamicQr.eventDynamic.information.regionName") }} :</label
                  >
                  <v-text-field
                    class="tw-mx-2"
                    v-model="vCardPlusDto.address.city"
                    placeholder="Duisburg"
                  ></v-text-field>
                </div>
                <div class="tw-flex tw-my-4">
                  <label class="tw-w-35 tw-mx-7 tw-mt-6 tw-font-semibold tw-text-gray-600"
                    >{{ $t("dynamicQr.eventDynamic.information.country") }} :</label
                  >
                  <v-text-field
                    class="tw-mx-2"
                    placeholder="Deutschland"
                    v-model="vCardPlusDto.address.country"
                  ></v-text-field>
                </div>
              </div> -->

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
                      v-model="vCardPlusDto.address.streetName"
                      placeholder="Bruckelstr"
                    ></v-text-field>
                  </div>
                  <div
                    class="tw-flex md:tw-my-4 tw-justify-start tw-items-center tw-w-full md:tw-col-span-6 tw-col-span-12"
                  >
                    <label
                      class="md:tw-w-[100px] tw-mx-1 tw-mt-1 tw-font-semibold tw-text-gray-600"
                      >{{
                        $t("dynamicQr.businessDynamic.storeNumber")
                      }}
                      :</label
                    >
                    <v-text-field
                      class="tw-mx-2"
                      v-model="vCardPlusDto.address.storeNumber"
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
                      {{
                        $t("dynamicQr.eventDynamic.information.regionNumber")
                      }}
                      :</label
                    >
                    <v-text-field
                      v-model="vCardPlusDto.address.regionNumber"
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
                      v-model="vCardPlusDto.address.city"
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
                      v-model="vCardPlusDto.address.country"
                    ></v-text-field>
                  </div>
                </div>
              </div>

              <hr class="tw-my-5" />

              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-4"
              >
                <label class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.vCardPlusDynamic.website") }}:</label
                >
                <v-text-field
                  :label="$t('dynamicQr.vCardPlusDynamic.website')"
                  v-model="vCardPlusDto.website"
                  @keypress="
                    vCardPlusDto.website = QrStore.httpsCheck(
                      $event.target.value
                    )
                  "
                ></v-text-field>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5"
              >
                <label class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.vCardPlusDynamic.summary") }}:</label
                >
                <v-text-field
                  :label="$t('dynamicQr.vCardPlusDynamic.summary')"
                  v-model="vCardPlusDto.summary"
                ></v-text-field>
              </div>
            </div>
          </div>

          <!-- Social Media channels -->

          <v-card class="tw-mt-8">
            <p class="tw-bg-gray-100 tw-text-gray-600 tw-flex tw-p-4">
              {{ $t("dynamicQr.vCardPlusDynamic.SocialMediaTitle") }}
            </p>
            <p class="tw-text-lg tw-p-4">
              {{ $t("dynamicQr.socialMediaDynamic.socialMediaIcon") }}
            </p>
            <section class="tw-p-4">
              <SocialMediaInput
                v-model="vCardPlusDto.socialMediaChannels"
              ></SocialMediaInput>
            </section>
          </v-card>

          <!-- Advanced Option -->

          <!-- <v-card class="tw-mt-8">
            <p class="tw-bg-gray-100 tw-text-gray-600 tw-flex tw-p-4">Advanced Option</p>
            <div class="tw-flex tw-p-5">
              <p class="tw-my-4 tw-mx-4 tw-text-lg tw-font-bold">Share</p>
              <v-checkbox
                label="Add Share button to the page"
                v-model="vCardPlusDto.hasShareButton"
              ></v-checkbox>
            </div>
          </v-card> -->
        </div>
      </div>
    </Form>
    <template #mobile>
      <VCardPlusTemplate :fetch-data="false"> </VCardPlusTemplate>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import VCardPlusTemplate from "../../template/VCardPlusDynamic/[id].vue";
import { useQrvCardPlusDynamic } from "@/store/qrCodes/dynamic/vCardPlus";
import { storeToRefs } from "pinia";
import { Field, ErrorMessage, Form } from "vee-validate";
import * as yup from "yup";
import { useFile } from "@/composables/useFile";
import { useQrStore } from "@/store/qrCodes/qr";
import { useToast } from "vue-toastification";
import { AddVCardPlusDto } from "@/api/dto/qrCodes/dynamic/VcardPlus";
import { vCardPlusController } from "~/api/endpoints/vCardPlusDynamic";
const isModify = computed(() => route.params.id !== "0");
const phoneRegExp = /[00|+][1-9]{1,3}[1-9]{4,}/;
const route = useRoute();
const toast = useToast();
const { download } = useFile();
const QrStore = useQrStore();
const vCardForm = ref<InstanceType<typeof Form> | null>(null);
const schema = computed(() => {
  return yup.object({
    firstName: yup.string().required("Name is required"),
    // phone: yup
    //   .string()
    //   .matches(phoneRegExp, "phoneNumber is unSupportPhone")
    //   .required("phoneNumber is phoneNumberError")
    //   .nullable(),
    // number: yup
    //   .string()
    //   .matches(phoneRegExp, "Number is unSupportPhone")
    //   .required("Number is Error")
    //   .nullable(),
    email: yup
      .string()
      .required("emailError")
      .email("email is unSupportEmail")
      .nullable(),
  });
});
const vCardPlusStore = useQrvCardPlusDynamic();
const { activeIndex, vCardPlusDto } = storeToRefs(vCardPlusStore);
const colors = computed(() => colorsData.map((ele) => ele).map((item) => item));
const colorsData = [
  ["#73b5e7", "#dd0ec1"],
  ["#EEA886", "#F07464"],
  ["#F9C2ED", "#E567F0"],
];
function changeFile(e: any) {
  const input = e.target.files[0];
  if (input) {
    vCardPlusDto.value.imageFile = input;
    vCardPlusDto.value.imageUrl = URL.createObjectURL(input);
  }
}
if (isModify.value) {
  const { data } = await useCustomFetch<AddVCardPlusDto>(
    vCardPlusController.GET_QR_VCARD_PLUS + `?id=${route.params.id}`
  );
  if (data.value) {
    vCardPlusDto.value = data.value;
  }
}
onMounted(() => {
  QrStore.emitter.on("dynamicQrDownload", () => {
    vCardForm.value?.validate().then((valid) => {
      if (vCardPlusDto.value.firstName != "") {
        if (!isModify.value) {
          vCardPlusDto.value.id = route.params.id as string;

          vCardPlusStore.addVcadPlus();
          download(QrStore.qrPreview, vCardPlusDto.value.qrName);
        } else {
          vCardPlusStore.modifyVcardPlus();
          download(QrStore.qrPreview, vCardPlusDto.value.qrName);
        }
      } else toast.error(" First Name is required");
    });
  });
});
// onBeforeUnmount(() => {
//   vCardPlusStore.resetDto();
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
