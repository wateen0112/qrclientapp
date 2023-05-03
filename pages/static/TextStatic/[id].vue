<template>
  <div class="textPage tw-grid">
    <!--name QR-->
    <Form :validation-schema="schema" ref="qrForm">
      <div class="tw-col-span-12 lg:tw-col-span-6">
        <div class="nameQr tw-flex tw-mt-5">
          <p class="tw-p-4 tw-font-bold">{{ $t("static.text.name") }}</p>
          <Field name="QrName" v-slot="{ field }">
            <v-text-field
              v-bind="field"
              v-model="qrTextDto.qrName"
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
        <div class="titleText tw-flex tw-text-center tw-items-center tw-p-4">
          <svg
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.555 16.0331V1.96686C21.8213 1.80571 22 1.5141 22 1.18003C22 0.671929 21.5881 0.26001 21.08 0.26001C20.7293 0.26001 20.4245 0.456311 20.2693 0.744962H1.73063C1.5754 0.456311 1.27068 0.26001 0.920017 0.26001C0.411919 0.26001 0 0.671929 0 1.18003C0 1.54652 0.214806 1.86198 0.52492 2.0099V15.9901C0.214806 16.138 0 16.4535 0 16.82C0 17.3281 0.411919 17.74 0.920017 17.74C1.28646 17.74 1.60197 17.5251 1.74989 17.215H20.2499C20.3979 17.5251 20.7134 17.74 21.0799 17.74C21.5881 17.74 21.9999 17.3281 21.9999 16.82C22 16.4859 21.8213 16.1943 21.555 16.0331ZM20.2932 16.3449H1.70679C1.62958 16.2174 1.52261 16.1103 1.39505 16.0332V1.9668C1.53589 1.88158 1.65243 1.76046 1.73063 1.61509H20.2693C20.3618 1.78714 20.5079 1.92555 20.6848 2.0099V15.9901C20.522 16.0678 20.386 16.1915 20.2932 16.3449Z"
              fill="black"
            />
            <path
              d="M3.53998 4.65372C3.78026 4.65372 3.97505 4.45892 3.97505 4.21865V3.98372H5.11492V8.65335H5.04339C4.80312 8.65335 4.60833 8.84814 4.60833 9.08842C4.60833 9.32869 4.80312 9.52348 5.04339 9.52348H6.05657C6.29684 9.52348 6.49164 9.32869 6.49164 9.08842C6.49164 8.84814 6.29684 8.65335 6.05657 8.65335H5.98505V3.98372H7.12492V4.21865C7.12492 4.45892 7.31971 4.65372 7.55998 4.65372C7.80025 4.65372 7.99505 4.45892 7.99505 4.21865V3.54865C7.99505 3.30838 7.80025 3.11359 7.55998 3.11359H3.53998C3.29971 3.11359 3.10492 3.30838 3.10492 3.54865V4.21865C3.10492 4.45892 3.29971 4.65372 3.53998 4.65372Z"
              fill="black"
            />
            <path
              d="M9.47022 9.22164C9.22995 9.22164 9.03516 9.41644 9.03516 9.65671C9.03516 9.89698 9.22995 10.0918 9.47022 10.0918H10.6898C10.9301 10.0918 11.1249 9.89698 11.1249 9.65671C11.1249 9.41644 10.9301 9.22164 10.6898 9.22164H10.515V3.37507H10.6898C10.9301 3.37507 11.1249 3.18028 11.1249 2.94001C11.1249 2.69974 10.9301 2.50494 10.6898 2.50494H9.47022C9.22995 2.50494 9.03516 2.69974 9.03516 2.94001C9.03516 3.18028 9.22995 3.37507 9.47022 3.37507H9.64494V9.2217H9.47022V9.22164Z"
              fill="black"
            />
            <path
              d="M18.3199 4.5249H13.24C12.9997 4.5249 12.8049 4.7197 12.8049 4.95997C12.8049 5.20024 12.9997 5.39503 13.24 5.39503H18.3199C18.5603 5.39503 18.755 5.20024 18.755 4.95997C18.755 4.7197 18.5602 4.5249 18.3199 4.5249Z"
              fill="black"
            />
            <path
              d="M18.3199 6.76489H13.24C12.9997 6.76489 12.8049 6.95969 12.8049 7.19996C12.8049 7.44023 12.9997 7.63502 13.24 7.63502H18.3199C18.5603 7.63502 18.755 7.44023 18.755 7.19996C18.755 6.95969 18.5602 6.76489 18.3199 6.76489Z"
              fill="black"
            />
            <path
              d="M18.3199 11.6449H3.53998C3.29971 11.6449 3.10492 11.8397 3.10492 12.08C3.10492 12.3202 3.29971 12.515 3.53998 12.515H18.3199C18.5602 12.515 18.7549 12.3202 18.7549 12.08C18.755 11.8397 18.5602 11.6449 18.3199 11.6449Z"
              fill="black"
            />
            <path
              d="M18.3199 13.8849H3.53998C3.29971 13.8849 3.10492 14.0797 3.10492 14.32C3.10492 14.5602 3.29971 14.755 3.53998 14.755H18.3199C18.5602 14.755 18.7549 14.5602 18.7549 14.32C18.755 14.0797 18.5602 13.8849 18.3199 13.8849Z"
              fill="black"
            />
          </svg>
          <h1 class="tw-px-4">{{ $t("static.text.title") }}</h1>
        </div>
      </div>
      <!--form-->
      <div class="tw-col-span-12 lg:tw-col-span-11">
        <div
          class="formText tw-rounded tw-p-5 tw-text-gray-400 tw-bg-white tw-flex tw-flex-col"
        >
          <!--title form-->
          <p class="tw-font-bold tw-text-sm">
            {{ $t("static.text.description") }}
          </p>

          <!--input message-->
          <div class="tw-flex tw-mt-4">
            <Field name="text" v-slot="{ field }">
              <v-textarea
                v-bind="field"
                v-model="qrTextDto.text"
                label="Enter some text..."
                variant="underlined"
              >
              </v-textarea>
            </Field>
            <ErrorMessage name="text" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>
        </div>
      </div>
      <!--text bottom-->
      <div class="textCode tw-col-span-12 tw-flex tw-justify-center tw-mt-5">
        <p>{{ $t("static.text.message") }}</p>
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
const qrTextDto = reactive({
  qrName: "",
  text: "",
  saveChanges: true,
});
const schema = computed(() => {
  return yup.object({
    QrName: yup.string().required(t("static.text.validation.name")),
    text: yup.string().required(t("static.text.validation.message")),
  });
});
//store
const store = useQrStatic();
const qrStore = useQrStore();

//add QrWebsite
function craeteText(save = false) {
  store.addText({ ...qrTextDto, qrStyle: qrStore.qrStyleDto, saveChanges: save });
}

// Watch the StyleQr Dto

watch(qrStore.qrStyleDto, (nv) => {
  clearTimeout(timer.value);
  if (nv && typeof nv === "object") {
    timer.value = setTimeout(() => {
      craeteText(false);
    }, 1500);
  }
});

// Watch the StaticQR Dto
watch(qrTextDto, () => {
  clearTimeout(timer.value);

  timer.value = setTimeout(() => {
    qrForm.value?.validate().then((e) => {
      if (e.valid) {
        craeteText();
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
    craeteText(true);
    download(qrStore.qrPreview, qrTextDto.qrName);
  });

  // ? RESET THE PREVIEW
  qrStore.$patch({
    qrPreview: "",
  });
});
</script>
<style lang="scss">
.textPage {
  .nameQr p {
    font-size: 13px;
  }

  .titleText h1 {
    font-size: 25px;
  }

  .textCode p {
    font-weight: bold;
  }
}
</style>
