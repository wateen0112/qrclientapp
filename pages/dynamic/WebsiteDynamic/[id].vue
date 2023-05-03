<template>
  <NuxtLayout name="dynamic-code-layout">
    <div class="tw-h-[100vh]">
      <Form :initial-values="{ ...WebDto }" :validation-schema="schema">
        <div
          class="tw-flex tw-justify-between tw-items-center tw-gap-3 tw-mb-2"
        >
          <svg
            width="29"
            height="20"
            viewBox="0 0 29 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1.04688"
              y="1"
              width="26"
              height="18"
              rx="2"
              stroke="#000"
              stroke-width="2"
            />
            <path d="M1.54688 6.5H26.5469" stroke="#000" />
            <path d="M5.04688 9.5H22.0469" stroke="#000" />
            <path d="M7.54688 12H19.0469" stroke="#000" />
            <path d="M11.0469 15H15.0469" stroke="#000" />
            <rect x="4.04688" y="4" width="1" height="1" fill="#000" />
            <rect x="6.04688" y="4" width="1" height="1" fill="#000" />
            <rect x="8.04688" y="4" width="1" height="1" fill="#000" />
          </svg>

        <div class=" tw-flex tw-flex-col tw-w-full">
          <Field name="qrName" v-slot="{ field, errorMessage }">
            <v-text-field
              :error-messages="errorMessage"
              v-model="WebDto.qrName"
              v-bind="field"
              :placeholder="$t('dynamicQr.pdfDynamic.qrName')"
            ></v-text-field>
            <div>
              <small class="tw-text-red-500">{{ errorMessage }}</small>
            </div>
          </Field>
        </div>
        </div>

        <v-card class="tw-my-16">
          <VCardTitle class="tw-bg-gray-100">
            {{ $t("dynamicQr.websiteDynamic.title") }}
          </VCardTitle>
          <VCardText>
            <p class="my-4">{{ $t("dynamicQr.websiteDynamic.title") }}</p>
          </VCardText>
          <section class="tw-p-4">
            <div class="tw-flex tw-flex-row">
              <label class="tw-mt-3"
                >{{ $t("dynamicQr.websiteDynamic.Website") }}*
              </label>
              <div class="tw-w-full">
                <div class="">
                  <div class="tw-ml-4 tw-flex-col">
                    <Field name="Website" v-slot="{ field, errorMessage }">
                      <v-text-field
                        :v-bind="field"
                        :error-messages="errorMessage"
                        v-model="WebDto.website"
                        @keypress="WebDto.website=qrStore.httpsCheck($event.target.value)"
                        :label="$t('dynamicQr.websiteDynamic.Website')"
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
          </section>
        </v-card>
      </Form>
    </div>
    <template #mobile>
      <websiteDynamic> </websiteDynamic>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
import websiteDynamic from "@/pages/template/websiteDynamic/[id].vue";
import { useWebsiteQrStore } from "@/store/qrCodes/dynamic/websiteDynamic";
import { ErrorMessage, Field, Form } from "vee-validate";
import { storeToRefs } from "pinia";
import * as yup from "yup";
import { WebsiteController } from "~/api/endpoints/websiteDynamic";
import { websiteDto } from "~/api/dto/website/websiteDto";
import { useQrStore } from "~/store/qrCodes/qr";
//..............
const route = useRoute();
const Modify = computed(() => route.params.id !== "0");
const { t } = useI18n();
const store = useWebsiteQrStore();
const { WebDto } = storeToRefs(store);
const qrStore = useQrStore();
//GetById WebsiteDto
definePageMeta({
  layout: false,
  middleware: ["create-qr"],
});
if (Modify.value) {
  const { data } = await useCustomFetch<websiteDto>(
    `${WebsiteController.GetWebsiteById}?id=${route.params.id}`
  );

  if (data.value) {
    WebDto.value = data.value;
  }
}
onBeforeUnmount(() => {
  store.resetDto();
});
const URL =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

const schema = computed(() => {
  return yup.object({
    qrName: yup
      .string()
      .required(t("dynamicQr.websiteDynamic.validation.name")),
    Website: yup
      .string()
      .matches(URL, "Enter a valid website")
      .required(t("dynamicQr.websiteDynamic.validation.Website")),
  });
});
</script>
