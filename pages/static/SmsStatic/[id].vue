<template>
  <div class="smsPage tw-grid">
    <!--name QR-->
    <Form :validation-schema="schema" ref="qrForm">
      <div class="tw-col-span-12 lg:tw-col-span-6">
        <div class="nameQr tw-flex tw-mt-5">
          <p class="tw-p-4 tw-font-bold">{{ $t("static.sms.name") }}</p>
          <Field name="QrName" v-slot="{ field }">
            <v-text-field
              v-bind="field"
              v-model="qrSmsDto.qrName"
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
        <div class="titleSms tw-flex tw-text-center tw-items-center tw-p-4">
          <svg
            width="35"
            height="27"
            viewBox="0 0 35 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_34132_133572" fill="white">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.70703 0C2.49789 0 0.707031 1.79086 0.707031 4V19.3167C0.707031 21.5259 2.49789 23.3167 4.70703 23.3167H6.75191V27L11.7152 23.3167H30.3867C32.5959 23.3167 34.3867 21.5259 34.3867 19.3167V4C34.3867 1.79086 32.5959 0 30.3867 0H4.70703Z"
              />
            </mask>
            <path
              d="M6.75191 23.3167H8.75191V21.3167H6.75191V23.3167ZM6.75191 27H4.75191V30.9748L7.94378 28.6061L6.75191 27ZM11.7152 23.3167V21.3167H11.0541L10.5233 21.7107L11.7152 23.3167ZM2.70703 4C2.70703 2.89543 3.60246 2 4.70703 2V-2C1.39332 -2 -1.29297 0.686293 -1.29297 4H2.70703ZM2.70703 19.3167V4H-1.29297V19.3167H2.70703ZM4.70703 21.3167C3.60246 21.3167 2.70703 20.4213 2.70703 19.3167H-1.29297C-1.29297 22.6304 1.39332 25.3167 4.70703 25.3167V21.3167ZM6.75191 21.3167H4.70703V25.3167H6.75191V21.3167ZM8.75191 27V23.3167H4.75191V27H8.75191ZM10.5233 21.7107L5.56004 25.3939L7.94378 28.6061L12.907 24.9228L10.5233 21.7107ZM30.3867 21.3167H11.7152V25.3167H30.3867V21.3167ZM32.3867 19.3167C32.3867 20.4213 31.4913 21.3167 30.3867 21.3167V25.3167C33.7005 25.3167 36.3867 22.6304 36.3867 19.3167H32.3867ZM32.3867 4V19.3167H36.3867V4H32.3867ZM30.3867 2C31.4913 2 32.3867 2.89543 32.3867 4H36.3867C36.3867 0.686291 33.7005 -2 30.3867 -2V2ZM4.70703 2H30.3867V-2H4.70703V2Z"
              fill="black"
              mask="url(#path-1-inside-1_34132_133572)"
            />
            <path
              d="M8.47925 10.363H24.4555M11.5018 14.6809H21.433"
              stroke="black"
              stroke-width="2"
            />
          </svg>

          <h1 class="tw-px-4">{{ $t("static.sms.title") }}</h1>
        </div>
      </div>
      <!--form-->
      <div class="tw-col-span-12 lg:tw-col-span-11">
        <div
          class="formSms tw-rounded tw-p-5 tw-text-gray-400 tw-bg-white tw-flex tw-flex-col"
        >
          <!--title form-->
          <p class="tw-font-bold tw-text-sm">
            {{ $t("static.sms.description") }}
          </p>

          <!--input number-->
          <div class="tw-flex tw-mt-6">
            <p class="tw-px-2 tw-pt-4 tw-font-bold tw-text-sm tw-w-24">
              {{ $t("static.sms.number") }}
            </p>
            <Field name="phoneNumber" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                v-model="qrSmsDto.phoneNumber"
                label="Phone number"
                variant="underlined"
              ></v-text-field>
            </Field>
            <ErrorMessage name="phoneNumber" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>

          <!--input message-->
          <div class="tw-flex tw-mt-4">
            <p class="tw-px-2 tw-pt-4 tw-font-bold tw-text-sm tw-w-24">
              {{ $t("static.sms.messageForm") }}
            </p>
            <Field name="message" v-slot="{ field }">
              <v-textarea
                v-bind="field"
                v-model="qrSmsDto.message"
                label="Enter some text..."
                variant="underlined"
              >
              </v-textarea>
            </Field>
            <ErrorMessage name="message" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>
        </div>
      </div>
      <!--text bottom-->
      <div class="textCode tw-col-span-12 tw-flex tw-justify-center tw-mt-5">
        <p>{{ $t("static.sms.message") }}</p>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { useQrStore } from "~/store/qrCodes/qr";
import * as yup from "yup";
import { useQrStatic } from "@/store/qrCodes/static/index";
const { t } = useI18n();
const qrForm = ref<InstanceType<typeof Form> | null>(null);
const { download } = useFile();
const timer = ref();
const phoneRegExp = /[00|+][1-9]{1,3}[1-9]{4,}/;
const qrSmsDto = reactive({
  qrName: "",
  phoneNumber: "",
  message: "",
  saveChanges: true,
});
const schema = computed(() => {
  return yup.object({
    QrName: yup.string().required(t("static.sms.validation.name")),
    message: yup.string().required(t("static.sms.validation.messageForm")),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, t("static.sms.validation.numberTrue"))
      .required(t("static.sms.validation.number")),
  });
});
//store
const store = useQrStatic();
const qrStore = useQrStore();

//add QrWebsite
function craeteSms(save = false) {
  store.addSms({ ...qrSmsDto, qrStyle: qrStore.qrStyleDto, saveChanges: save });
}

// Watch the StyleQr Dto

watch(qrStore.qrStyleDto, (nv) => {
  clearTimeout(timer.value);
  if (nv && typeof nv === "object") {
    timer.value = setTimeout(() => {
      craeteSms(false);
    }, 1500);
  }
});

// Watch the StaticQR Dto
watch(qrSmsDto, () => {
  clearTimeout(timer.value);

  timer.value = setTimeout(() => {
    qrForm.value?.validate().then((e) => {
      if (e.valid) {
        craeteSms();
      } else qrStore.$patch({ qrPreview: "" });
    });
  }, 1000);
});

//layout
definePageMeta({
  layout: "static-code-layout",
});

onMounted(() => {
  // ? Download On Click (Save & Download)
  qrStore.emitter.on("download", () => {
    craeteSms(true);
    download(qrStore.qrPreview, qrSmsDto.qrName);
  });

  // ? RESET THE PREVIEW
  qrStore.$patch({
    qrPreview: "",
  });
});
</script>

<style lang="scss">
.smsPage {
  .nameQr p {
    font-size: 13px;
  }

  .titleSms h1 {
    font-size: 25px;
  }

  .textCode p {
    font-weight: bold;
  }
}
</style>
