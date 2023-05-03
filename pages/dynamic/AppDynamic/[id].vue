<template>
  <NuxtLayout name="dynamic-code-layout">
    <template #default>
      <Form
        ref="appFromRef"
        :validation-schema="schema"
        :initial-values="{ ...appDto }"
      >
        <div
          class="tw-flex tw-justify-between tw-items-center tw-gap-3 tw-mb-2"
        >
          <!-- <div class="tw-flex-col tw-w-full">
            <Field name="qrName" v-slot="{ field, errorMessage }">
              <v-text-field
                :error-messages="errorMessage"
                v-model="appDto.qrName"
                v-bind="field"
                  :placeholder="$t('dynamicQr.pdfDynamic.qrName')"
              ></v-text-field>
              <div>
                <small class="tw-text-red-500">{{ errorMessage }}</small>
              </div>
            </Field>
          </div> -->
        </div>
        <div
          class="tw-flex tw-justify-between tw-items-center tw-gap-3 tw-mb-2"
        >
          <svg
            width="29"
            height="30"
            fill="none"
            viewBox="0 0 29 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6797 24H8.58594L14.2188 8H17.7969L23.4375 24H20.3438L16.0703 11.2812H15.9453L11.6797 24ZM11.7813 17.7266H20.2188V20.0547H11.7813V17.7266Z"
              fill="#000"
              stroke="black"
              stroke-width="2"
            />
            <rect />
          </svg>

          <v-text-field
            id="qrName"
            v-model="appDto.qrName"
            :placeholder="$t('dynamicQr.pdfDynamic.qrName')"
          ></v-text-field>
        </div>
        <div>
          <v-card class="tw-my-4">
            <VCardTitle class="tw-bg-gray-100">
              {{ $t("dynamicQr.appDynamic.design") }}
            </VCardTitle>
            <VCardText>
              <p class="my-4">
                {{ $t("dynamicQr.appDynamic.text") }}
              </p>
            </VCardText>
            <section class="tw-p-4">
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
                class="tw-flex tw-flex-col tw-rounded-xl sm:tw-flex-row tw-bg-gray-200 py-5 tw-justify-center tw-flex-wrap tw-items-center mt-10 md:tw-gap-6 tw-gap-0"
              >
                <div class="tw-basis-full sm:tw-basis-48">
                  <label>{{ $t("dynamicQr.appDynamic.primary") }}</label>
                  <div class="tw-relative">
                    <input
                      v-model="appDto.primaryColor"
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
                        v-model="appDto.primaryColor"
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
                      v-model="appDto.buttonColor"
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
                        v-model="appDto.buttonColor"
                        class="tw-absolute tw-h-[50px] tw-scale-150"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </v-card>
        </div>

        <div>
          <v-card class="tw-my-4">
            <VCardTitle class="tw-bg-gray-100">
              <span>
                <v-icon dark>info</v-icon>
                {{ $t("dynamicQr.appDynamic.basicInfo") }}</span
              >
            </VCardTitle>
            <VCardText>
              <p class="my-4">
                {{ $t("dynamicQr.appDynamic.appInfo") }}
              </p>
            </VCardText>
            <section class="tw-p-4">
              <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-6 mt-8">
                <label class="tw-m-[10px]">
                  {{ $t("dynamicQr.appDynamic.AppName") }}:
                </label>

                <v-text-field
                  name="appName"
                  v-model="appDto.name"
                  :label="$t('dynamicQr.appDynamic.AppName')"
                >
                </v-text-field>
              </div>
              <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-6 mt-8">
                <label class="tw-m-[10px]"
                  >{{ $t("dynamicQr.appDynamic.Developer") }}:
                </label>

                <v-text-field
                  name="Developer"
                  v-model="appDto.developer"
                  :label="$t('dynamicQr.appDynamic.Developer')"
                >
                </v-text-field>
              </div>
              <div class="tw-flex tw-justify-center tw-items-center tw-my-5">
                <FileUploader
                  v-model="appDto.LogoFile"
                  v-model:url="appDto.logoUrl"
                  class="tw-flex-grow tw-max-w-[300px]"
                ></FileUploader>
              </div>
              <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-14 mt-8">
                <label class="tw-m-[10px]"
                  >{{ $t("dynamicQr.appDynamic.Title") }}:
                </label>

                <v-text-field
                  name="title"
                  v-model="appDto.title"
                  :label="$t('dynamicQr.appDynamic.Title')"
                >
                </v-text-field>
              </div>
              <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-14 mt-8">
                <label class="tw-mt-[20px] -tw-mr-9"
                  >{{ $t("dynamicQr.appDynamic.Description") }}:
                </label>

                <v-textarea
                  v-model="appDto.description"
                  :label="$t('dynamicQr.appDynamic.Description')"
                  class="tw-flex-grow tw-w-full"
                >
                </v-textarea>
              </div>
              <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-14 mt-8">
                <label class="tw-m-[5px] -tw-mr-4"
                  >{{ $t("dynamicQr.appDynamic.Website") }}:
                </label>

                <div class="tw-flex-col tw-w-[100%] tw-ml-2">
                  <Field name="website" v-slot="{ field, errorMessage }">
                    <v-text-field
                      :errorMessage="errorMessage"
                      v-bind="field"
                      @keypress="
                        appDto.website = store.httpsCheck($event.target.value)
                      "
                      v-model="appDto.website"
                      :label="$t('dynamicQr.appDynamic.Website')"
                    ></v-text-field>
                    <div>
                      <small class="tw-text-red-500">{{ errorMessage }}</small>
                    </div>
                  </Field>
                </div>
                <!-- <ErrorMessage name="website" class="text-red-lighten-1">
                </ErrorMessage> -->
                <!-- <ErrorMessage name="website" class="text-red-lighten-1">
                </ErrorMessage> -->
              </div>
              <div class="tw-flex tw-flex-col md:tw-flex-row mt-8">
                <label class="tw-m-[10px]"
                  >{{ $t("dynamicQr.appDynamic.buttonName") }}:
                </label>
                <v-text-field
                  v-model="appDto.button.name"
                  :placehlder="$t('dynamicQr.appDynamic.buttonName')"
                ></v-text-field>
                <div class="tw-flex-col tw-w-[50%]">
                  <Field name="buttonURl" v-slot="{ field, errorMessage }">
                    <v-text-field
                      v-bind="field"
                      @keypress="
                        appDto.button.url = store.httpsCheck(
                          $event.target.value
                        )
                      "
                      v-model="appDto.button.url"
                      :label="$t('dynamicQr.carDynamic.buttonUrl')"
                      class="tw-ml-9"
                    >
                    </v-text-field>
                    <div>
                      <small class="tw-text-red-500">{{ errorMessage }}</small>
                    </div>
                  </Field>
                </div>
              </div>
            </section>
          </v-card>
        </div>
        <div>
          <v-card class="tw-my-5">
            <VCardTitle class="tw-bg-gray-100">
              <v-icon>info</v-icon>
              {{ $t("dynamicQr.appDynamic.link") }}
            </VCardTitle>
            <VCardText>
              <p class="my-4">
                {{ $t("dynamicQr.appDynamic.linkInfo") }}
              </p>
            </VCardText>
            <section class="tw-p-4">
              <div class="tw-flex tw-flex-col">
                <div class="tw-flex tw-flex-col">
                  <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-1 mt-8">
                    <label class="tw-m-[10px] tw-mr-5"
                      >{{ $t("dynamicQr.appDynamic.AppStore") }}:
                    </label>
                    <div class="tw-flex-col tw-w-[88%] tw-ml-2">
                      <Field name="AppStorUrl" v-slot="{ field, errorMessage }">
                        <v-text-field
                          @keypress="
                            appDto.appStoreUrl = store.httpsCheck(
                              $event.target.value
                            )
                          "
                          v-bind="field"
                          v-model="appDto.appStoreUrl"
                          :label="$t('dynamicQr.appDynamic.AppStore')"
                        >
                        </v-text-field>
                        <div>
                          <small class="tw-text-red-500">{{
                            errorMessage
                          }}</small>
                        </div>
                      </Field>
                    </div>
                  </div>
                  <div class="tw-flex tw-flex-col">
                    <div class="tw-flex tw-flex-col md:tw-flex-row mt-4">
                      <label class="tw-m-[10px]"
                        >{{ $t("dynamicQr.appDynamic.GoogleStore") }}:
                      </label>
                      <div class="tw-flex-col tw-w-[88%] tw-ml-2">
                        <Field
                          name="googleStoreUrl"
                          v-slot="{ field, errorMessage }"
                        >
                          <v-text-field
                            v-bind="field"
                            @keypress="
                              appDto.googleStoreUrl = store.httpsCheck(
                                $event.target.value
                              )
                            "
                            v-model="appDto.googleStoreUrl"
                            :label="$t('dynamicQr.appDynamic.GoogleStore')"
                          >
                          </v-text-field>
                          <div>
                            <small class="tw-text-red-500">{{
                              errorMessage
                            }}</small>
                          </div>
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </v-card>
        </div>
      </Form>
    </template>
    <template #mobile>
      <MobileAppDynamic :fetchData="false"> </MobileAppDynamic>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useAppQrStore } from "@/store/qrCodes/dynamic/appDynamic";
import { storeToRefs } from "pinia";
import MobileAppDynamic from "@/pages/template/AppDynamic/[id].vue";
import { Form, Field } from "vee-validate";
import { useQrStore } from "@/store/qrCodes/qr";
import * as yup from "yup";
import { AppDynamicController } from "~/api/endpoints/AppDynamic";
import { AddAppDto } from "~/api/dto/website/DynamicAppDto";
import { useFile } from "@/composables/useFile";
//........
const route = useRoute();
const appFromRef = ref();
const { download } = useFile();
const { t } = useI18n();
const store = useAppQrStore();
const qrStore = useQrStore();
const { appDto, Colors, index } = storeToRefs(store);
const item = ["Learn more", "Learn more"];
const nameApp = ["appName", "appName", ""];
const Modify = computed(() => route.params.id !== "0");
if (Modify.value) {
  const { data } = await useCustomFetch<AddAppDto>(
    AppDynamicController.GetAppId + `?id=${route.params.id}`
  );
  if (data.value) {
    appDto.value = data.value;
  }
}
const URL =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

const schema = yup.object({
  qrName: yup.string().required(t("dynamicQr.appDynamic.validation.nameQr")),
  website: yup.string().required(),
  // required(t("dynamicQr.appDynamic.validation.Website")),
  AppStorUrl: yup.string().matches(URL, "Enter a valid AppStorUrl"),
  // required(t("dynamicQr.appDynamic.validation.AppStore")),
  googleStoreUrl: yup.string().matches(URL, "Enter a valid googleStoreUrl"),
  buttonURl: yup.string().matches(URL, "Enter a valid buttonURl"),
  // required(t("dynamicQr.appDynamic.validation.GoogleStore")),
});
definePageMeta({ layout: false, middleware: ["create-qr"] });

onBeforeUnmount(() => {
  store.resetDto();
});
onMounted(() => {
  appFromRef.value.validate().then((valid: any) => {
    if (valid.valid) {
      qrStore.emitter.on("dynamicQrDownload", () => {
        if (route.params.id !== "0") {
          // ModifyCar(route.params.id);
        } else {
          // addCar();
        }
      });
    }
  });
});
</script>
<style scoped>
.btn button {
  margin: 10px;
}
</style>
