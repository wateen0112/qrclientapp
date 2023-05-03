<template>
  <div class="tw-min-h-screen" style="background-color: #e5e7eb">
    <v-layout class="tw-flex-col">
      <header class="tw-bg-dark tw-p-4">
        <div
          class="tw-container tw-mx-auto tw-flex tw-justify-between tw-items-center"
        >
          <Localizer class="tw-text-light"> </Localizer>

          <AppUserInfo v-if="IsLoggedIn()" class="tw-text-light"> </AppUserInfo>
        </div>
      </header>

      <div
        class="lg:tw-grid tw-grid-cols-12 tw-gap-5 tw-w-full tw-px-5 tw-py-10 md:tw-flex md:tw-flex-col-reverse tw-flex tw-flex-col-reverse"
      >
        <div class="tw-col-span-12 lg:tw-col-span-8">
          <v-main>
            <slot></slot>
          </v-main>
        </div>
        <div
          class="tw-col-span-12 tw-relative lg:tw-col-span-4 md:tw-col-span-5 md:tw-block"
        >
          <CodesDaynamicPreview
            class="tw-sticky tw-top-5 tw-w-full"
            style="right: 0"
            :is-dynamic="true"
          >
            <slot name="mobile"></slot>
          </CodesDaynamicPreview>
        </div>
      </div>
    </v-layout>
    <nav
      class="tw-z-20 tw-sticky tw-w-full tw-bottom-0 tw-bg-dark tw-flex tw-justify-between tw-place-items-center tw-px-8 tw-py-2"
    >
      <v-btn
        @click="$router.go(-1)"
        variant="text"
        color="white"
        size="x-large"
        prepend-icon="mdi-arrow-left"
      >
        Go Back
      </v-btn>

      <client-only>
        <v-dialog
          fullscreen
          :scrim="false"
          transition="dialog-bottom-transition"
          v-model="dialog"
          persistent
        >
          <template v-slot:activator="{ props }">
            <div
              class="tw-flex tw-justify-center tw-flex-col tw-items-center tw-gap-5"
            >
              <v-btn
                :disabled="qrPreview ? false : true"
                color="white"
                variant="outlined"
                v-bind="props"
                >Next
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </template>

          <v-card>
            <v-card-title class="tw-bg-gray-200">
              <div class="tw-w-full tw-flex tw-justify-between tw-items-center">
                <span class="text-xl">more options</span>
                <v-icon @click="dialog = false" class="tw-cursor-pointer"
                  >mdi-close</v-icon
                >
              </div>
            </v-card-title>
            <v-card-text class="tw-my-2">
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                  style="border-right: 1px solid gray"
                  class="tw-flex tw-justify-center tw-items-center tw-flex-col tw-gap-5"
                >
                  <div
                    class="tw-relative tw-h-[300px] tw-w-[300px] tw-flex tw-flex-col"
                  >
                    <img
                      v-if="qrPreview"
                      :src="qrPreview"
                      height="300"
                      width="300"
                    />

                    <!-- {{ qrPreview }} -->
                    <template v-if="!qrPreview && !qrLoader">
                      <img
                        src="~assets/svg/qrstyle/qr-hidden.svg"
                        height="300"
                        width="300"
                      />
                      <p
                        v-if="!qrLoader"
                        class="tw-absolute tw-top-28 tw-mx-4 tw-text-center"
                      >
                        Please fill in all required fields to preview your QR
                        Code
                      </p>
                    </template>
                    <codes-qr-loader v-if="qrLoader"></codes-qr-loader>

                    <v-btn
                      :disabled="qrStore.qrLoader"
                      variant="flat"
                      append-icon="mdi-download"
                      class="tw-mx-auto mt-4"
                      color="primary"
                      id="#qr-download-btn"
                      @click="downloadEvent"
                      >{{
                        !qrStore.qrLoader ? `Save & Download` : `Loading...`
                      }}</v-btn
                    >
                  </div>
                </v-col>
                <v-col cols="12" md="9">
                  <!--start frame -->
                  <div class="frame">
                    <div
                      class="tw-flex tw-justify-start tw-items-start tw-gap-3"
                    >
                      <h2 class="text-uppercase tw-mb-1">frame</h2>
                      <span>upload</span>
                    </div>
                    <div
                      class="tw-grid tw-grid-cols-12"
                      v-for="(item, i) in qrMedia.frame"
                      :key="i"
                    >
                      <div
                        style="height: 50px; width: 50px"
                        class="tw-bg-gray-100 tw-cursor-pointer md:tw-col-span-1 tw-col-span-12 tw-p-3 tw-rounded tw-flex tw-justify-center tw-items-center"
                      >
                        <svg
                          width="23"
                          height="23"
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="11.5" cy="11.5" r="11" stroke="black" />
                          <path
                            d="M3.48486 4.18176L18.4697 19.8636"
                            stroke="black"
                          />
                        </svg>
                      </div>
                      <div
                        style="height: 50px; width: 50px"
                        :class="{
                          'tw-border-2 tw-border-primary':
                            qrStyleDto.frameUrl == qrStyleDto.frameUrl,
                        }"
                        class="tw-bg-gray-100 tw-cursor-pointer md:tw-col-span-1 tw-col-span-12 tw-p-3 tw-rounded tw-flex tw-justify-center tw-items-center"
                      >
                        <img
                          height="20"
                          width="20"
                          :src="appConfig.DOMAIN_HOST + '/' + qrMedia.frame[i]"
                          alt=""
                          srcset=""
                        />
                      </div>
                    </div>
                    <div
                      class="tw-flex tw-justify-start tw-items-start tw-mt-5"
                    >
                      <div class="tw-w-36">
                        <v-text-field
                          label="frame color"
                          variant="underlined"
                          type="color"
                          style="width: 100px"
                        >
                        </v-text-field>
                      </div>
                      <div style="width: 200px">
                        <v-text-field
                          label="frame text"
                          type="text"
                          variant="underlined"
                        ></v-text-field>
                      </div>
                    </div>
                  </div>
                  <!--end frame -->

                  <!-- start qr code -->
                  <div class="qr-code tw-mt-4">
                    <h2 class="text-uppercase tw-mb-1">qr code</h2>
                    <div
                      class="tw-flex tw-justify-start tw-items-center tw-gap-5"
                    >
                      <div
                        @click="qrStyleDto.qrPatternStyle = 1"
                        style="height: 60px; width: 60px"
                        :class="{
                          'tw-border-2 tw-border-primary':
                            qrStyleDto.qrPatternStyle === 1,
                        }"
                        class="tw-bg-gray-100 tw-cursor-pointer tw-rounded tw-flex tw-justify-center tw-items-center"
                      >
                        <img
                          src="~assets/svg/qrstyle/circle.svg"
                          height="40"
                          width="40"
                        />
                      </div>

                      <div
                        style="height: 60px; width: 60px"
                        @click="qrStyleDto.qrPatternStyle = 0"
                        :class="{
                          'tw-border-2 tw-border-primary':
                            qrStyleDto.qrPatternStyle === 0,
                        }"
                        class="tw-bg-gray-100 tw-cursor-pointer tw-rounded tw-flex tw-justify-center tw-items-center"
                      >
                        <img
                          src="~assets/svg/qrstyle/sqare.svg"
                          height="40"
                          width="40"
                        />
                      </div>
                      <div class="tw-w-36">
                        <v-text-field
                          label="inner color"
                          variant="underlined"
                          type="color"
                          v-model="qrStyleDto.backgroundColor"
                        ></v-text-field>
                      </div>

                      <div class="tw-w-36">
                        <v-text-field
                          label="outer color"
                          variant="underlined"
                          type="color"
                          v-model="qrStyleDto.foregroundColor"
                        ></v-text-field>
                      </div>
                    </div>
                  </div>
                  <!-- end qr code -->

                  <!-- start edges -->
                  <div class="edges">
                    <!-- {{ qrStyleDto }} -->
                    <h2 class="text-uppercase tw-my-5">edges</h2>

                    <div class="tw-grid tw-grid-cols-12 tw-gap-10">
                      <div class="md:tw-col-span-3 tw-col-span-12">
                        <v-select
                          label="top left inner"
                          :items="qrMedia.inner"
                          variant="underlined"
                          v-model="qrStyleDto.topLeftInnerCorner.url"
                        >
                          <template v-slot:item="{ item, props }">
                            <v-list-item v-bind="props" title="">
                              <img
                                height="24"
                                width="24"
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                alt=""
                              />
                            </v-list-item>
                          </template>
                          <template v-slot:selection="{ props, item }">
                            <v-list-item
                              v-if="item.value"
                              v-bind="props"
                              title=""
                            >
                              <img
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                height="24"
                                width="24"
                              />
                            </v-list-item>
                          </template>
                        </v-select>
                        <v-select
                          label="top right inner"
                          :items="qrMedia.inner"
                          variant="underlined"
                          v-model="qrStyleDto.topRightInnerCorner.url"
                        >
                          <template v-slot:item="{ item, props }">
                            <v-list-item v-bind="props" title="">
                              <img
                                height="24"
                                width="24"
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                alt=""
                              />
                            </v-list-item>
                          </template>
                          <template v-slot:selection="{ props, item }">
                            <v-list-item
                              v-if="item.value"
                              v-bind="props"
                              title=""
                            >
                              <img
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                height="24"
                                width="24"
                              />
                            </v-list-item>
                          </template>
                        </v-select>
                        <v-select
                          label="bottom left inner"
                          :items="qrMedia.inner"
                          variant="underlined"
                          v-model="qrStyleDto.bottomLeftInnerCorner.url"
                        >
                          <template v-slot:item="{ item, props }">
                            <v-list-item v-bind="props" title="">
                              <img
                                height="24"
                                width="24"
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                alt=""
                              />
                            </v-list-item>
                          </template>
                          <template v-slot:selection="{ props, item }">
                            <v-list-item
                              v-if="item.value"
                              v-bind="props"
                              title=""
                            >
                              <img
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                height="24"
                                width="24"
                              />
                            </v-list-item>
                          </template>
                        </v-select>
                        <v-select
                          label="bottom right inner"
                          :items="qrMedia.inner"
                          variant="underlined"
                          v-model="qrStyleDto.bottomLeftInnerCorner.url"
                        >
                          <template v-slot:item="{ item, props }">
                            <v-list-item v-bind="props" title="">
                              <img
                                height="24"
                                width="24"
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                alt=""
                              />
                            </v-list-item>
                          </template>
                          <template v-slot:selection="{ props, item }">
                            <v-list-item
                              v-if="item.value"
                              v-bind="props"
                              title=""
                            >
                              <img
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                height="24"
                                width="24"
                              />
                            </v-list-item>
                          </template>
                        </v-select>
                      </div>
                      <div class="md:tw-col-span-3 tw-col-span-12">
                        <v-select
                          label="top left outer"
                          :items="qrMedia.outer"
                          variant="underlined"
                          v-model="qrStyleDto.topLeftOuterCorner.url"
                        >
                          <template v-slot:item="{ item, props }">
                            <v-list-item v-bind="props" title="">
                              <img
                                height="24"
                                width="24"
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                alt=""
                              />
                            </v-list-item>
                          </template>
                          <template v-slot:selection="{ props, item }">
                            <v-list-item
                              v-if="item.value"
                              v-bind="props"
                              title=""
                            >
                              <img
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                height="24"
                                width="24"
                              />
                            </v-list-item>
                          </template>
                        </v-select>
                        <v-select
                          label="top right outer"
                          :items="qrMedia.outer"
                          variant="underlined"
                          v-model="qrStyleDto.topRightOuterCorner.url"
                        >
                          <template v-slot:item="{ item, props }">
                            <v-list-item v-bind="props" title="">
                              <img
                                height="24"
                                width="24"
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                alt=""
                              />
                            </v-list-item>
                          </template>
                          <template v-slot:selection="{ props, item }">
                            <v-list-item
                              v-if="item.value"
                              v-bind="props"
                              title=""
                            >
                              <img
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                height="24"
                                width="24"
                              />
                            </v-list-item>
                          </template>
                        </v-select>
                        <v-select
                          label="bottom left outer"
                          :items="qrMedia.outer"
                          variant="underlined"
                          v-model="qrStyleDto.bottomLeftOuterCorner.url"
                        >
                          <template v-slot:item="{ item, props }">
                            <v-list-item v-bind="props" title="">
                              <img
                                height="24"
                                width="24"
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                alt=""
                              />
                            </v-list-item>
                          </template>
                          <template v-slot:selection="{ props, item }">
                            <v-list-item
                              v-if="item.value"
                              v-bind="props"
                              title=""
                            >
                              <img
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                height="24"
                                width="24"
                              />
                            </v-list-item>
                          </template>
                        </v-select>
                        <v-select
                          label="bottom right outer"
                          :items="qrMedia.outer"
                          variant="underlined"
                          v-model="qrStyleDto.bottomLeftOuterCorner.url"
                        >
                          <template v-slot:item="{ item, props }">
                            <v-list-item v-bind="props" title="">
                              <img
                                height="24"
                                width="24"
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                alt=""
                              />
                            </v-list-item>
                          </template>
                          <template v-slot:selection="{ props, item }">
                            <v-list-item
                              v-if="item.value"
                              v-bind="props"
                              title=""
                            >
                              <img
                                :src="appConfig.DOMAIN_HOST + '/' + item.value"
                                height="24"
                                width="24"
                              />
                            </v-list-item>
                          </template>
                        </v-select>
                      </div>
                      <div class="md:tw-col-span-3 tw-col-span-12">
                        <v-text-field
                          variant="underlined"
                          label="top left outer color"
                          type="color"
                          style="width: 150px"
                          v-model="qrStyleDto.topLeftOuterCorner.color"
                        >
                        </v-text-field>

                        <v-text-field
                          label="bottom left outer color"
                          variant="underlined"
                          type="color"
                          style="width: 150px"
                          v-model="qrStyleDto.bottomLeftOuterCorner.color"
                        ></v-text-field>
                        <v-text-field
                          label="bottom left inner color"
                          variant="underlined"
                          type="color"
                          style="width: 150px"
                          v-model="qrStyleDto.bottomLeftInnerCorner.color"
                        ></v-text-field>
                      </div>
                      <div class="md:tw-col-span-3 tw-col-span-12">
                        <v-text-field
                          label="top rigth outer color"
                          variant="underlined"
                          type="color"
                          style="width: 150px"
                          v-model="qrStyleDto.topRightOuterCorner.color"
                        ></v-text-field>
                        <v-text-field
                          variant="underlined"
                          label="top left inner color"
                          type="color"
                          style="width: 150px"
                          v-model="qrStyleDto.topLeftInnerCorner.color"
                        >
                        </v-text-field>
                        <v-text-field
                          label="top rigth inner color"
                          variant="underlined"
                          type="color"
                          style="width: 150px"
                          v-model="qrStyleDto.topRightInnerCorner.color"
                        ></v-text-field>
                      </div>
                    </div>
                  </div>

                  <!-- end edges -->

                  <!-- start logo -->
                  <div class="logo tw-mt-4">
                    <div
                      class="tw-flex tw-justify-start tw-items-start tw-gap-3"
                    >
                      <h2 class="text-uppercase tw-mb-1">logo</h2>
                      <span>upload</span>
                    </div>
                    <div
                      class="tw-grid tw-grid-cols-12"
                      v-for="(item, i) in qrMedia.logo"
                      :key="i"
                    >
                      <div
                        @click="qrStyleDto.logoUrl = qrMedia.logo[i]"
                        style="height: 50px; width: 50px"
                        :class="{
                          'tw-border-2 tw-border-primary':
                            qrStyleDto.logoUrl == qrStyleDto.logoUrl,
                        }"
                        class="tw-bg-gray-100 tw-cursor-pointer md:tw-col-span-1 tw-col-span-12 tw-p-3 tw-rounded tw-flex tw-justify-center tw-items-center"
                      >
                        <img
                          height="20"
                          width="20"
                          :src="appConfig.DOMAIN_HOST + '/' + qrMedia.logo[i]"
                          alt=""
                          srcset=""
                        />
                      </div>
                    </div>
                  </div>
                  <!-- end logo -->
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </client-only>
      <!-- <v-btn @click="downloadEvent" append-icon="mdi-download" color="primary" :disabled="qrStore.qrLoader" size="large">
        {{ !qrStore.qrLoader ? `Save & Download` : `Loading...` }}
      </v-btn> -->
    </nav>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQrStore } from "~/store/qrCodes/qr";
import appConfig from "~/app.config";
const dialog = ref(false);
const qrStore = useQrStore();
const timer = ref();
const { IsLoggedIn } = useAuth();
const qrMedia = computed(() => qrStore.qrMedia);
const { qrStyleDto, qrPreview, qrLoader } = storeToRefs(qrStore);

function downloadEvent() {
  qrStore.emitter.emit("dynamicQrDownload");
}
function emitEvent() {
  qrStore.emitter.emit("download");
  dialog.value = false;
}
watch(
  qrStyleDto,
  () => {
    clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      qrStore.GenerateStyle();
    }, 1500);
  },
  { deep: true }
);

qrStore.GenerateStyle();
</script>
