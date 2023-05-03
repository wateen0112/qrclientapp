<template>
  <div class="wifiPage tw-grid">
    <!--name QR-->
    <Form :validation-schema="schema" ref="qrForm" v-slot="{ meta }">
      <div class="tw-col-span-12 lg:tw-col-span-6">
        <div class="nameQr tw-flex tw-mt-5">
          <p class="tw-p-4 tw-font-bold">{{ $t("static.wifi.name") }}</p>
          <Field name="QrName" v-slot="{ field }">
            <v-text-field
              v-bind="field"
              v-model="qrWifiDto.qrName"
              class="tw-text-gray-600"
              label="Name Your QR code"
              variant="underlined"
            ></v-text-field>
          </Field>
          <ErrorMessage name="QrName" v-slot="{ message }">
            <span class="text-red-lighten-1">{{ message }}</span>
          </ErrorMessage>
        </div>
      </div>

      <!--title type static Qr & icon-->
      <div class="tw-col-span-12 lg:tw-col-span-8">
        <div class="titleWifi tw-flex tw-text-center tw-items-center tw-p-4">
          <svg
            width="23"
            height="17"
            viewBox="0 0 23 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5639 14.2831C10.8106 14.2831 10.1986 14.8924 10.1986 15.6416C10.1986 16.3922 10.8099 17 11.5639 17C12.318 17 12.9286 16.3914 12.9286 15.6416C12.9286 14.8917 12.318 14.2831 11.5639 14.2831ZM22.0681 4.07816C19.2607 1.4482 15.5286 0 11.5599 0C7.5912 0 3.85905 1.4482 1.05164 4.07953C0.555948 4.54388 0.555948 5.29589 1.05164 5.76101C1.29914 5.99284 1.62415 6.10914 1.94847 6.10914C2.2728 6.10914 2.5978 5.99284 2.84599 5.76101C5.17338 3.57912 8.26838 2.50552 11.5592 2.50552C14.8514 2.50552 17.9458 3.57912 20.2731 5.75964C20.7688 6.22399 21.5718 6.22399 22.0681 5.75964C22.563 5.29521 22.5637 4.54251 22.0681 4.07816ZM11.549 4.75533C8.61582 4.75533 5.85808 5.88947 3.78367 7.94822C3.26623 8.46224 3.26623 9.29518 3.78367 9.8092C4.04273 10.0669 4.38197 10.1954 4.72127 10.1954C5.06058 10.1954 5.39981 10.0668 5.65819 9.8092C7.23151 8.24744 9.32433 7.30162 11.549 7.30162C13.7731 7.30162 15.8666 8.24805 17.4392 9.8092C17.9573 10.3232 18.7963 10.3232 19.3137 9.8092C19.8318 9.29518 19.8318 8.46224 19.3137 7.94822C17.2393 5.88947 14.4808 4.75533 11.549 4.75533ZM11.5606 9.51279C9.90155 9.51279 8.34253 10.1784 7.16899 11.3866C6.68281 11.887 6.68281 12.7003 7.16899 13.2007C7.41102 13.4502 7.72994 13.5753 8.04879 13.5753C8.36703 13.5753 8.68519 13.4502 8.9279 13.2007C9.63093 12.4759 10.5659 12.0346 11.5606 12.0346C12.554 12.0346 13.4889 12.4752 14.1933 13.1993C14.6795 13.6997 15.4661 13.6997 15.953 13.1993C16.4378 12.6989 16.4378 11.887 15.953 11.3866C14.7793 10.1784 13.2196 9.51279 11.5606 9.51279Z"
              fill="black"
            />
          </svg>
          <h1 class="tw-px-4">{{ $t("static.wifi.title") }}</h1>
        </div>
      </div>
      <!--form-->
      <div class="tw-col-span-12 lg:tw-col-span-11">
        <div
          class="formWifi tw-rounded tw-p-5 tw-text-gray-400 tw-bg-white tw-flex tw-flex-col"
        >
          <!--title form-->
          <p class="tw-font-bold tw-text-sm">
            {{ $t("static.wifi.description") }}
          </p>

          <!--input network name-->
          <div>
            <div class="tw-flex tw-mt-4">
              <label class="tw-px-2 tw-pt-4 tw-font-bold tw-text-sm tw-w-32">
                {{ $t("static.wifi.network") }}
              </label>
              <Field name="name" v-slot="{ field }">
                <v-text-field
                  v-bind="field"
                  label="network name"
                  variant="underlined"
                  v-model="qrWifiDto.name"
                >
                </v-text-field>
              </Field>
              <ErrorMessage name="name" v-slot="{ message }">
                <span class="text-red-lighten-1">{{ message }}</span>
              </ErrorMessage>
            </div>

            <!--input encryption-->
            <div class="tw-flex tw-mt-4">
              <label class="tw-px-2 tw-pt-2 tw-font-bold tw-text-sm tw-w-32">
                {{ $t("static.wifi.encryptin") }}
              </label>
              <v-radio-group inline>
                <v-radio
                  v-model="authentication"
                  label=" WPA/WPA2"
                  :value="0"
                  color="#FFCE00"
                ></v-radio>
                <v-radio
                  v-model="authentication"
                  label="WEP"
                  :value="1"
                  color="#FFCE00"
                ></v-radio>
                <v-radio
                  v-model="authentication"
                  label="None"
                  :value="2"
                  color="#FFCE00"
                ></v-radio>
              </v-radio-group>
            </div>

            <!--input password-->
            <div class="tw-flex tw-mt-4">
              <label class="tw-px-2 tw-pt-4 tw-font-bold tw-text-sm tw-w-32">
                {{ $t("static.wifi.password") }}
              </label>
              <Field name="Paassword" v-slot="{ field }">
                <v-text-field
                  v-bind="field"
                  label="passward of your wireless network"
                  variant="underlined"
                  v-model="qrWifiDto.Paassword"
                ></v-text-field>
              </Field>
              <ErrorMessage name="Paassword" v-slot="{ message }">
                <span class="text-red-lighten-1">{{ message }}</span>
              </ErrorMessage>
            </div>
          </div>
        </div>
      </div>
      <!--text bottom-->
      <div class="textCode tw-col-span-12 tw-flex tw-justify-center tw-mt-5">
        <p>{{ $t("static.wifi.message") }}</p>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ErrorMessage, Field, Form, useForm } from "vee-validate";
import * as yup from "yup";
import { useQrStatic } from "@/store/qrCodes/static/index";
import { useQrStore } from "~/store/qrCodes/qr";
const { t } = useI18n();
const qrForm = ref<InstanceType<typeof Form> | null>(null);
const authentication = ref(0);
const { download } = useFile();
const timer = ref();

const qrWifiDto = reactive({
  qrName: "",
  name: "",
  Paassword: "",
  authentication: authentication,
  saveChanges: true,
});
const schema = yup.object({
  QrName: yup.string().required(t("static.wifi.validation.name")),
  name: yup.string().required(t("static.wifi.validation.network")),
  Paassword: yup.string().required(t("static.wifi.validation.password")).min(4),
});

const qrStore = useQrStore();
//store
const store = useQrStatic();
//add QrWebsite
function craeteWifi(save = false) {
  store.addWifi({ ...qrWifiDto, qrStyle: qrStore.qrStyleDto, saveChanges: save });
}

// Watch the StyleQr Dto

watch(qrStore.qrStyleDto, (nv) => {
  clearTimeout(timer.value);
  if (nv)
    timer.value = setTimeout(() => {
      craeteWifi(false);
    }, 1500);
});

// Watch the StaticQR Dto
watch(qrWifiDto, () => {
  clearTimeout(timer.value);

  timer.value = setTimeout(() => {
    qrForm.value?.validate().then((e) => {
      if (e.valid) {
        craeteWifi();
      } else qrStore.$patch({ qrPreview: "" });
    });
  }, 1500);
});

//layout
definePageMeta({
  layout: "static-code-layout",
});
onMounted(() => {
  // ? Download On Click (Save & Download)
  qrStore.emitter.on("download", () => {
    craeteWifi(true);
    download(qrStore.qrPreview, qrWifiDto.qrName);
  });

  // ? RESET THE PREVIEW
  qrStore.$patch({
    qrPreview: "",
  });
});
</script>
<style lang="scss">
.wifiPage {
  .nameQr p {
    font-size: 13px;
    color: #7b7b7b;
  }

  .titleWifi h1 {
    font-size: 25px;
  }

  .textCode p {
    font-weight: bold;
  }
}
</style>
