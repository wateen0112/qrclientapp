<template>
  <!-- <skeleton v-if="loading"> </skeleton> -->
  <div>
    <NuxtLayout name="dynamic-code-layout">
      <template #default>
        <Form
          :validation-schema="schema"
          ref="coupnForm"
          class="tw-w-full tw-px-5"
        >
          <div class="tw-grid tw-grid-cols-12">
            <div
              class="nameQr tw-flex tw-items-center tw-flex-row tw-w-full tw-gap-5 tw-col-span-12"
            >
              <img :src="qrImageSvg" width="40" />
              <div class="tw-block tw-w-full">
                <Field
                  name="QrName"
                  v-slot="{ field }"
                  v-model="dynamicCauponDto.qrName"
                >
                  <v-text-field
                    id="qrName"
                    class="tw-text-gray-600 tw-my-5 tw-min-w-full tw-w-full ring-blue-500"
                    v-model="dynamicCauponDto.qrName"
                    :label="$t('dynamicQr.imageDynamic.qrNameContent')"
                    v-bind="field"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="QrName" v-slot="{ message }">
                  <span
                    class="tw-min-w-full tw-font-semibold text-red-lighten-1 lg:tw-text-left"
                    >{{ message }}</span
                  >
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
                {{ $t("dynamicQr.imageDynamic.personalize") }}
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
                class="tw-flex lg:tw-justify-center tw-justify-start tw-items-center tw-w-[100%] lg:tw-gap-10 tw-gap-5 tw-flex-col lg:tw-flex-row tw-bg-gray-200 tw-py-3 tw-mt-[80px]"
              >
                <!-- heerereeer-->

                <div>
                  <span class="tw-text-center tw-w-[100%] bg-red-500">
                    {{ $t("dynamicQr.mp3Dynamic.media") }}
                  </span>
                  <div class="tw-mt-5">
                    <div
                      class="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-7 tw-border-[2px] tw-bg-white tw-px-6 tw-rounded-2xl tw-py-[14px]"
                    >
                      <span> {{ dynamicCauponDto?.primaryColor }}</span>
                      <div
                        class="tw-rounded-full tw-overflow-hidden tw-w-[50px] tw-h-[28px] tw-border-none"
                      >
                        <div
                          class="tw-relative tw-w-[100px] tw-h-[100px] tw-rounded-full"
                        >
                          <input
                            type="color"
                            class="tw-absolute tw-translate-x-[-40px] tw-translate-y-[-40px] tw-h-[260px] tw-w-[260px]"
                            v-model="dynamicCauponDto.primaryColor"
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
                          <span> {{ dynamicCauponDto?.buttonColor }}</span>
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
                                v-model="dynamicCauponDto.buttonColor"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div
                class="tw-font-semibold tw-flex tw-justify-center tw-items-center tw-flex-col tw-px-40 tw-py-10"
              > -->
              <!-- <div class="tw-flex tw-justify-center tw-items-center tw-my-4">
                <img src="@/assets/img/image.png" alt="" srcset="" />
              </div> -->
              <v-file-input
                type="file"
                accept="image/*"
                v-model="image_list"
                @change="store.previewMultiImage"
                class="form-control-file tw-w-full"
                id="my-file"
                on-reset="reset"
                label=" Drag and Drop Your Image "
              ></v-file-input>
              <!-- </div> -->
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
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 -tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block">
                  {{ $t("dynamicQr.videoDynamic.company") }} :</label
                >
                <Field
                  name="Company"
                  v-slot="{ field }"
                  v-model="dynamicCauponDto.company"
                >
                  <v-text-field
                    v-model="dynamicCauponDto.company"
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    :label="$t('dynamicQr.videoDynamic.company')"
                    v-bind="field"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="Company" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 -tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.videoDynamic.headline") }}* :</label
                >
                <Field
                  name="Headline"
                  v-slot="{ field }"
                  v-model="dynamicCauponDto.headline"
                >
                  <v-text-field
                    v-model="dynamicCauponDto.headline"
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    :label="$t('dynamicQr.cauponDynamic.provideInformation')"
                    v-bind="field"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="Headline" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 -tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.imageDynamic.description") }}:</label
                >
                <Field
                  name="Description"
                  v-slot="{ field }"
                  v-model="dynamicCauponDto.description"
                >
                  <v-text-field
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    :label="t('dynamicQr.imageDynamic.description')"
                    v-model="dynamicCauponDto.description"
                    v-bind="field"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="Description" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.cauponDynamic.saleBudget") }}:</label
                >
                <Field
                  name="SaleBadge"
                  v-slot="{ field }"
                  v-model="dynamicCauponDto.saleBadge"
                >
                  <v-text-field
                    v-model="dynamicCauponDto.saleBadge"
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    type="number"
                    min="0"
                    max="100"
                    :label="$t('dynamicQr.cauponDynamic.saleBudget')"
                    v-bind="field"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="SaleBadge" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.cauponDynamic.buttonUrl") }}:</label
                >
                <v-text-field
                  v-model="dynamicCauponDto.button.url"
                  class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                  :label="$t('dynamicQr.cauponDynamic.buttonUrl')"
                ></v-text-field>
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
                    v-model="dynamicCauponDto.address.streetName"
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
                    v-model="dynamicCauponDto.address.storeNumber"
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
                    v-model="dynamicCauponDto.address.regionNumber"
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
                    v-model="dynamicCauponDto.address.city"
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
                    v-model="dynamicCauponDto.address.country"
                    placeholder="Deutschland"
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
          <!--Video-->
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
                {{ $t("dynamicQr.cauponDynamic.caopon") }}</span
              >
            </div>
            <p class="tw-px-8 tw-py-5 tw-font-semibold tw-text-lg">
              {{ $t("dynamicQr.cauponDynamic.provideInformation") }}
            </p>
            <div class="hidden tw-p-7 tw-bg-white tw-rounded-lg">
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block">
                  {{ $t("dynamicQr.cauponDynamic.cauponName") }} * :</label
                >
                <Field
                  name="CouponName"
                  v-slot="{ field }"
                  v-model="dynamicCauponDto.couponName"
                >
                  <v-text-field
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    v-model="dynamicCauponDto.couponName"
                    :label="$t('dynamicQr.cauponDynamic.cauponName')"
                    v-bind="field"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="CouponName" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>

              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block">
                  {{ $t("footer.terms") }}:</label
                >
                <Field
                  name="Terms"
                  v-slot="{ field }"
                  v-model="dynamicCauponDto.terms"
                >
                  <v-text-field
                    v-model="dynamicCauponDto.terms"
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    :label="$t('footer.terms')"
                    v-bind="field"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="Terms" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>

              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.cauponDynamic.validUntil") }}:</label
                >
                <Field name="ValidUntil" v-slot="{ field }" 3>
                  <v-text-field
                    v-model="dynamicCauponDto.validUntil"
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    label="Valid Until"
                    v-bind="field"
                    type="date"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="ValidUntil" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.imageDynamic.website") }} :</label
                >
                <Field
                  name="Website"
                  v-slot="{ field }"
                  v-model="dynamicCauponDto.website"
                >
                  <v-text-field
                    v-model="dynamicCauponDto.website"
                    @keypress="
                      dynamicCauponDto.website = qrStore.httpsCheck(
                        $event.target.value
                      )
                    "
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    :label="$t('dynamicQr.imageDynamic.website')"
                    v-bind="field"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="Website" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>

              <!-- <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.cauponDynamic.location") }} :</label
                >

                <Field
                  name="Location"
                  v-slot="{ field }"
                  v-model="dynamicCauponDto.location"
                >
                  <v-text-field
                    v-model="dynamicCauponDto.location"
                    @keypress="dynamicCauponDto.location"
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    :label="$t('dynamicQr.cauponDynamic.location')" v-bind="field"></v-text-field>
                </Field>
                <ErrorMessage name="Location" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div> -->
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-5 lg:tw-flex-row tw-flex-col"
              >
                <label class="tw-mb-3 tw-w-32 tw-hidden lg:tw-block"
                  >{{ $t("dynamicQr.cauponDynamic.mapUrl") }} :</label
                >

                <Field
                  name="MapUrl"
                  v-slot="{ field }"
                  v-model="dynamicCauponDto.mapUrl"
                >
                  <v-text-field
                    class="tw-text-gray-600 tw-my-5 tw-w-full lg:tw-w-80 ring-blue-500"
                    v-model="dynamicCauponDto.mapUrl"
                    @keypress="
                      dynamicCauponDto.mapUrl = qrStore.httpsCheck(
                        $event.target.value
                      )
                    "
                    :label="$t('dynamicQr.cauponDynamic.mapUrl')"
                    v-bind="field"
                  ></v-text-field
                ></Field>
                <ErrorMessage name="MapUrl" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
            </div>
          </div>
          <!-- Social Media channels -->
          <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-md tw-mt-6">
            <div class="header tw-bg-gray-100 tw-p-4">
              <span> {{ $t("dynamicQr.businessDynamic.channels") }} </span>
            </div>
            <div class="tw-p-5">
              <SocialMediaInput
                v-model="dynamicCauponDto.socialMediaChannels"
              />
            </div>
          </div>
          <!--Video-->
          <!--social media links-->
        </Form>
      </template>
      <template #mobile>
        <SocialMediaTemplate color="white" :fetch-data="false">
        </SocialMediaTemplate>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// imports  . . .
import SocialMediaTemplate from "../../template/CouponDynamic/[id].vue";
import skeleton from "./components/skeleton.vue";
import { useQrStore } from "~/store/qrCodes/qr";
import { onMounted } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { storeToRefs } from "pinia";
import { useCouponStore } from "@/store/qrCodes/dynamic/coupon";
import qrImageSvg from "@/assets/svg/qrTypes/CouponType.svg";
import "vue3-audio-player/dist/style.css";
import { QrDynamicController } from "~/api/endpoints/qrDynamic";
import { useFile } from "@/composables/useFile";

//. ON  Mounting

const props = defineProps(["id"]);
const { t } = useI18n();
const { download } = useFile();
//consts and refs  . . .
const schema = computed(() => {
  return yup.object({
    Company: yup
      .string()
      .required(t("dynamicQr.cauponDynamic.validation.company")),

    Headline: yup
      .string()
      .required(t("dynamicQr.cauponDynamic.validation.headline")),

    Description: yup
      .string()
      .required(t("dynamicQr.cauponDynamic.validation.Description")),

    SaleBadge: yup
      .string()
      .required(t("dynamicQr.cauponDynamic.validation.SaleBadge")),

    CouponName: yup
      .string()
      .required(t("dynamicQr.cauponDynamic.validation.CouponName")),

    ValidUntil: yup
      .string()
      .required(t("dynamicQr.cauponDynamic.validation.validUntil")),

    Terms: yup.string().required(t("dynamicQr.cauponDynamic.validation.terms")),
    MapUrl: yup
      .string()
      .required(t("dynamicQr.cauponDynamic.validation.mapUrl")),
    Location: yup
      .string()
      .required(t("dynamicQr.cauponDynamic.validation.locaiton")),

    //   ButtonName:yup.string().required() ,
    //   ButtonUrl :yup.string().required()
    //  ,

    Website: yup
      .string()
      .required(t("dynamicQr.cauponDynamic.validation.socialMedia.web")),

    QrName: yup
      .string()
      .required(t("dynamicQr.cauponDynamic.validation.qrName")),
  });
});
const store = useCouponStore();
const { dynamicCauponDto, preview_list, image_list } = storeToRefs(store);
const loading = ref(true);
const index = ref(0);
const innerIndex = ref(0);
const preview = ref(null);
const image = ref(null);

const qrStore = useQrStore();

const coupnForm = ref();
const { locale } = useI18n();
const headers: { [x: string]: MetaObject } = {
  ar: {
    title: "توليد كود قسيمة ديناميكي",
    htmlAttrs: {
      lang: locale,
      dir: "rtl",
    },
    meta: [{ name: "description", content: "قم بتوليد كود ديناميكي لكوبون" }],
  },
  en: {
    title: "Coupon Dynamic",
    htmlAttrs: {
      lang: locale,
      dir: "ltr",
    },
    meta: [
      { name: "description", content: "generate dynamic code for your Coupon" },
    ],
  },
  de: {
    title: "dynamisches Coupon",
    htmlAttrs: {
      lang: locale,
      dir: "ltr",
    },
    meta: [
      {
        name: "description",
        content: "Generieren Sie dynamischen Code für Ihre Coupon",
      },
    ],
  },
};

useHead(headers[locale.value]);
// Colors Array  . . .
const colorsData = [
  ["#73b5e7", "#dd0ec1"],
  ["#EEA886", "#F07464"],
  ["#F9C2ED", "#E567F0"],
];
const socialMediaPreviewist = ref();
const route = useRoute();
const isModify = computed(() => route.params.id !== "0");

if (isModify.value) {
  const { data } = useCustomFetch(
    QrDynamicController.GET_QR_COUPON_BY_ID + `?id=${route.params.id}`
  );
  if (data.value) {
    store.$patch({
      dynamicCauponDto: data.value,
    });
  }
}
// methods and functions  . . .
const testApi = () => {
  store.addCouponQR();
};
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

const setColor = (color: string) => {
  dynamicCauponDto.value.primaryColor = color;
};
const setInnerIndex = (index: any, color1: any, color2: any) => {
  innerIndex.value = index;
  dynamicCauponDto.value.primaryColor = color1;
  dynamicCauponDto.value.buttonColor = color2;
};

const exchange = () => {
  const tempColor = dynamicCauponDto.value?.primaryColor;
  dynamicCauponDto.value.primaryColor = dynamicCauponDto.value?.buttonColor;
  dynamicCauponDto.value.buttonColor = tempColor;
};
onMounted(() => {
  loading.value = false;

  qrStore.emitter.on("dynamicQrDownload", () => {
    coupnForm.value?.validate().then((valid: any) => {
      if (valid.valid) {
        if (isModify.value) {
          store.modify(route.params.id);
          download(qrStore.qrPreview, dynamicCauponDto.value.qrName);
        } else {
          store.addCouponQR();
          download(qrStore.qrPreview, dynamicCauponDto.value.qrName);
        }
      }
    });
  });
});
//removing an item from the list

// adding layout  . . .
definePageMeta({
  layout: false,
  middleware: ["create-qr"],
});
onBeforeUnmount(() => {
  if (!route.params.id) store.resetDto();
});
</script>
<style>
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
