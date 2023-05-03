<template>
  <NuxtLayout name="dynamic-code-layout">
    <Form
      :validation-schema="schema"
      ref="eventForm"
      v-slot="value"
      :initial-values="{ ...eventDto }"
    >
      <div>
        <div class="event-page">
          <!--Name Qr-->
          <div
            class="tw-flex tw-justify-between tw-items-center tw-gap-3 tw-mb-2"
          >
            <!-- <img src="@/assets/svg/qrTypes/BusinessDynamic.svg" /> -->
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_34132_133707)">
                <path
                  d="M0.046875 6V11.1707V12.3127V12.992H1.38021C3.04154 12.992 4.38888 14.3393 4.38888 16C4.38888 17.662 3.04154 19.0087 1.38021 19.0087H0.046875V19.6887V20.8307V26H32.0469V20.8293V19.6947V19.008H30.7135C29.0522 19.008 27.7049 17.6613 27.7049 16C27.7049 14.3387 29.0522 12.992 30.7135 12.992H32.0469V12.056V11.1713V6H0.046875ZM25.6995 16C25.6995 18.3067 27.2589 20.2453 29.3802 20.83V23.3333H2.71354V20.8293C4.83421 20.2447 6.39421 18.3067 6.39421 15.9993C6.39421 13.6933 4.83488 11.7553 2.71354 11.1707V8.66667H29.3802V11.1707C27.2589 11.7553 25.6995 13.6933 25.6995 16Z"
                  fill="black"
                />
                <path
                  d="M14.8762 13.9393C14.8762 15.0313 14.6656 15.85 14.2429 16.3987C13.8202 16.9467 13.2016 17.2207 12.3862 17.2207C11.6022 17.2207 10.9982 16.9393 10.5709 16.3767C10.1436 15.814 9.93024 15.002 9.93024 13.9393C9.93024 11.7713 10.7489 10.6873 12.3862 10.6873C13.1882 10.6873 13.8022 10.9687 14.2329 11.5307C14.6616 12.0933 14.8762 12.896 14.8762 13.9393ZM11.7236 13.954C11.7236 14.5567 11.7776 15.0067 11.8836 15.3027C11.9909 15.5993 12.1622 15.748 12.3989 15.748C12.8549 15.748 13.0829 15.15 13.0829 13.954C13.0829 12.768 12.8542 12.1753 12.3989 12.1753C12.1622 12.1753 11.9909 12.3213 11.8836 12.6127C11.7776 12.9047 11.7236 13.3513 11.7236 13.954ZM19.7722 10.8367L14.0009 21.2407H12.2929L18.0636 10.8367H19.7722ZM22.1636 18.096C22.1636 19.1833 21.9529 19.9993 21.5302 20.548C21.1082 21.096 20.4889 21.37 19.6729 21.37C18.8896 21.37 18.2856 21.088 17.8582 20.5267C17.4316 19.964 17.2176 19.1533 17.2176 18.096C17.2176 15.928 18.0369 14.844 19.6729 14.844C20.4756 14.844 21.0916 15.1247 21.5209 15.6873C21.9502 16.2493 22.1636 17.052 22.1636 18.096ZM19.0102 18.11C19.0102 18.712 19.0642 19.162 19.1709 19.458C19.2769 19.7553 19.4496 19.9033 19.6869 19.9033C20.1416 19.9033 20.3689 19.3053 20.3689 18.11C20.3689 16.924 20.1409 16.3307 19.6869 16.3307C19.4496 16.3307 19.2769 16.4767 19.1709 16.768C19.0642 17.0613 19.0102 17.508 19.0102 18.11Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_34132_133707">
                  <rect
                    x="0.046875"
                    width="32"
                    height="32"
                    rx="16"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>

            <Field name="qrName" v-slot="{ field }">
              <v-text-field
                id="qrName"
                v-bind="field"
                v-model="eventDto.qrName"
                :placeholder="$t('dynamicQr.eventDynamic.qrName')"
              ></v-text-field>
            </Field>
          </div>
          <ErrorMessage
            name="qrName"
            class="tw-mx-12 tw-text-secondary text-sm pt-1"
          ></ErrorMessage>

          <!-- Design -->

          <div class="tw-w-full tw-bg-white tw-rounded-lg">
            <div class="header tw-bg-gray-100 tw-p-4">
              <span class="tw-text-gray-600">Design</span>
            </div>

            <div class="hidden tw-pt-8 tw-bg-white tw-rounded-lg">
              <h3
                class="tw-mb-9 tw-text-center tw-text-lg tw-tracking-tight tw-text-gray-600"
              >
                {{ $t("dynamicQr.eventDynamic.designTitle") }}
              </h3>
              <label class="tw-px-3 tw-text-gray-600"> Colors</label>

              <div
                class="tw-p-4 tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-gap-5 tw-cursor-pointer"
              >
                <div
                  v-for="(color, i) in colorsData"
                  :key="i"
                  class="tw-relative"
                  @click="eventStore.setColor(color, i)"
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
                      v-model="eventDto.primaryColor"
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
                        v-model="eventDto.primaryColor"
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
                    @click="eventStore.swap"
                  >
                  </v-btn>
                </div>

                <div class="tw-basis-full sm:tw-basis-48">
                  <label>Button</label>

                  <div class="tw-relative">
                    <input
                      v-model="eventDto.buttonColor"
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
                        v-model="eventDto.buttonColor"
                        class="tw-absolute tw-h-[50px] tw-scale-150"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <section class="tw-p-4">
                <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 mt-8">
                  <label class="tw-mt-6 tw-font-semibold tw-text-gray-600">{{
                    $t("dynamicQr.eventDynamic.image")
                  }}</label>
                  <v-file-input
                    :label="$t('dynamicQr.eventDynamic.image')"
                    @change="changeImg"
                  ></v-file-input>
                </div>
              </section>
            </div>
          </div>

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
                >Basic Information</span
              >
            </div>
            <div class="hidden tw-p-4 tw-bg-white tw-rounded-lg">
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-my-4 tw-items-center tw-gap-5"
              >
                <label class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{
                    $t("dynamicQr.eventDynamic.information.organizer")
                  }}:</label
                >
                <v-text-field
                  :label="$t('dynamicQr.eventDynamic.information.organizer')"
                  v-model="eventDto.organizer"
                ></v-text-field>
              </div>
              <div class="tw-text-gray-600 tw-flex tw-items-center tw-gap-5">
                <label class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.eventDynamic.information.title") }}:</label
                >
                <div class="tw-flex tw-flex-col tw-w-full">
                  <Field name="title" v-slot="{ field }">
                    <v-text-field
                      v-bind="field"
                      :label="$t('dynamicQr.eventDynamic.information.title')"
                      v-model="eventDto.title"
                    ></v-text-field
                  ></Field>
                  <ErrorMessage
                    name="title"
                    class="tw-text-secondary text-sm pt-1"
                  ></ErrorMessage>
                </div>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-4"
              >
                <label class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{
                    $t("dynamicQr.eventDynamic.information.summary")
                  }}:</label
                >
                <v-text-field
                  :label="$t('dynamicQr.eventDynamic.information.summary')"
                  v-model="eventDto.summary"
                ></v-text-field>
              </div>

              <div
                class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-justify-center tw-items-center tw-gap-6 tw-w-full tw-font-semibold tw-text-gray-600"
              >
                <label
                  >{{ $t("dynamicQr.eventDynamic.information.button") }}:</label
                >
                <v-text-field
                  label="name"
                  v-model="eventDto.button.name"
                ></v-text-field>
                <v-text-field
                  label="url"
                  v-model="eventDto.button.url"
                ></v-text-field>
              </div>

              <hr class="tw-my-3" />
              <div>
                <div
                  class="tw-text-gray-600 tw-flex tw-justify-start tw-items-center tw-gap-5 tw-mb-2"
                >
                  <label
                    class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                    >When:</label
                  >
                  <input type="date" v-model="eventDto.startDate" />
                  <input type="date" v-model="eventDto.endDate" />
                </div>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-4"
              >
                <label class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >Where:</label
                >
                <v-text-field
                  label="where"
                  v-model="eventDto.where"
                ></v-text-field>
              </div>
              <hr class="tw-my-5" />
              <div>
                <label
                  class="tw-mt-9 tw-font-semibold tw-text-gray-600 tw-text-lg"
                  >{{ $t("dynamicQr.businessDynamic.addressName") }}:</label
                >

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
                      v-model="eventDto.address.streetName"
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
                      v-model="eventDto.address.storeNumber"
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
                      v-model="eventDto.address.regionNumber"
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
                      v-model="eventDto.address.city"
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
                      class="tw-w-35 tw-mx-2 tw-mt-1 tw-font-semibold tw-text-gray-600"
                      >{{
                        $t("dynamicQr.eventDynamic.information.country")
                      }}
                      :</label
                    >
                    <v-text-field
                      class="tw-mx-2"
                      placeholder="Deutschland"
                      v-model="eventDto.address.country"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <hr class="tw-my-5" />

              <div class="tw-mt-5">
                <label class="tw-mx-3 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.businessDynamic.featuers") }}:</label
                >
                <p class="tw-text-gray-600 tw-text-center tw-mb-10">
                  {{ $t("dynamicQr.businessDynamic.chooseAmenities") }}
                </p>
                <div
                  class="tw-flex tw-justify-center tw-items-center tw-gap-x-10 tw-flex-wrap md:tw-flex-nowrap tw-mt-1"
                >
                  <!-- {{iconsFeature}} -->

                  <div
                    class="tw-cursor-pointer tw-relative"
                    v-for="(icon, i) in iconsFeature"
                    :key="i"
                  >
                    <div
                      class="tw-absolute -tw-top-6 -tw-right-2"
                      v-if="isActiveIconIndex.find((ele:any) => ele == i)"
                      @click="removeIconFeatures(icon, i)"
                    >
                      <v-icon
                        icon="mdi-close"
                        color="red"
                        size="0.8rem"
                      ></v-icon>
                    </div>
                    <v-icon
                      @click="setMediasIcons(icon, i)"
                      :color="
                        isActiveIconIndex.find((ele:any) => ele === i)
                          ? 'primary'
                          : '#5E5873'
                      "
                      >{{ icon }}</v-icon
                    >
                  </div>
                </div>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-4"
              >
                <label class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.eventDynamic.information.about") }}:</label
                >
                <v-text-field
                  :label="$t('dynamicQr.eventDynamic.information.about')"
                  v-model="eventDto.about"
                ></v-text-field>
              </div>
              <hr />
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-4"
              >
                <label class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{
                    $t("dynamicQr.eventDynamic.information.contact")
                  }}:</label
                >
                <v-text-field
                  :label="$t('dynamicQr.eventDynamic.information.contact')"
                  v-model="eventDto.contact"
                ></v-text-field>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-items-center tw-gap-5 tw-my-4"
              >
                <label class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.eventDynamic.information.phone") }}:</label
                >
                <div class="tw-flex tw-flex-col tw-w-full">
                  <Field name="phone" v-slot="{ field, errorMessage }">
                    <v-text-field
                      v-bind="field"
                      :error-messages="errorMessage"
                      :label="$t('dynamicQr.eventDynamic.information.phone')"
                      v-model="eventDto.phone"
                    ></v-text-field>
                  </Field>
                  <ErrorMessage
                    name="phone"
                    class="tw-text-secondary text-sm pt-1"
                  ></ErrorMessage>
                </div>
              </div>
              <div
                class="tw-text-gray-600 tw-flex tw-justify-center tw-items-center tw-gap-5 tw-my-4"
              >
                <label class="tw-w-16 tw-mt-6 tw-font-semibold tw-text-gray-600"
                  >{{ $t("dynamicQr.eventDynamic.information.email") }}:</label
                >
                <div class="tw-flex tw-flex-col tw-w-full">
                  <Field name="email" v-slot="{ field, errorMessage }">
                    <v-text-field
                      v-bind="field"
                      :error-messages="errorMessage"
                      :label="$t('dynamicQr.eventDynamic.information.email')"
                      v-model="eventDto.email"
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
                    $t("dynamicQr.eventDynamic.information.website")
                  }}:</label
                >
                <v-text-field
                  @keypress="
                    eventDto.website = QrStore.httpsCheck($event.target.value)
                  "
                  :label="$t('dynamicQr.eventDynamic.information.website')"
                  v-model="eventDto.website"
                ></v-text-field>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
    <template #mobile>
      <EventTemplate :fetch-data="false"> </EventTemplate>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import EventTemplate from "../../template/EventDynamic/[id].vue";
import { useQrEventDynamic } from "@/store/qrCodes/dynamic/event";
import { storeToRefs } from "pinia";
import { Field, ErrorMessage, Form } from "vee-validate";
import * as yup from "yup";
import { useQrStore } from "@/store/qrCodes/qr";
import { useToast } from "vue-toastification";
import { useFile } from "@/composables/useFile";
import { AddEvent } from "~/api/dto/qrCodes/dynamic/Event";
import { eventController } from "~/api/endpoints/eventDynamic";
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
const { download } = useFile();
const isModify = computed(() => route.params.id !== "0");
const toast = useToast();
const QrStore = useQrStore();
const eventForm = ref<InstanceType<typeof Form> | null>(null);
const phoneRegExp = /[00|+][1-9]{1,3}[1-9]{4,}/;
const schema = computed(() => {
  return yup.object({
    title: yup.string().required("Title is required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "phoneNumber is unSupportPhone")
      .required("phoneNumber is phoneNumberError")
      .nullable(),
    email: yup
      .string()
      .required("emailError")
      .email("email is unSupportEmail")
      .nullable(),
  });
});
const isActiveIconIndex = ref([0]);
const route = useRoute();
const eventStore = useQrEventDynamic();
const { activeIndex, eventDto } = storeToRefs(eventStore);
const colors = computed(() => colorsData.map((ele) => ele).map((item) => item));
const colorsData = [
  ["#73b5e7", "#dd0ec1"],
  ["#EEA886", "#F07464"],
  ["#F9C2ED", "#E567F0"],
];
function removeIconFeatures(icon: string, i: number) {
  isActiveIconIndex.value = isActiveIconIndex.value.filter(
    (ele) => ele != i && ele != 0
  );

  eventDto.value.featureIcons = eventDto.value.featureIcons.filter(
    (ele) => ele != icon
  );
}

function changeImg(e: any) {
  const input = e.target.files[0];
  if (input) {
    eventDto.value.imageFile = input;
    eventDto.value.imageUrl = URL.createObjectURL(input);
  }
}
function setMediasIcons(item: string, i: number) {
  iconsFeature.value.forEach((ele) => {
    if (ele == item) {
      eventDto.value.featureIcons.push(ele);
    }
  });
  isActiveIconIndex.value.push(i);
}
if (isModify.value) {
  const { data } = await useCustomFetch<AddEvent>(
    eventController.GET_QR_EVENT + `?id=${route.params.id}`
  );
  if (data.value) {
    eventDto.value = data.value;
  }
}

onMounted(() => {
  QrStore.emitter.on("dynamicQrDownload", () => {
    eventForm.value?.validate().then((valid) => {
      if (eventDto.value.title != "") {
        if (route.params.id !== "0") {
          eventStore.modifyEvent();
          download(QrStore.qrPreview, eventDto.value.qrName);
        } else {
          eventStore.addEvent();
          download(QrStore.qrPreview, eventDto.value.qrName);
        }
      } else toast.error("Title is required");
    });
  });
});

// onBeforeUnmount(() => {
//   eventStore.resetDto();
// });

definePageMeta({
  layout: false,
  middleware: ["create-qr"],
});
</script>
