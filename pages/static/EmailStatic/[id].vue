<template>
  <div class="emailPage tw-grid">
    <!--name QR-->
    <Form :validation-schema="schema" ref="qrForm">
      <div class="tw-col-span-12 lg:tw-col-span-6">
        <div class="nameQr tw-flex tw-mt-5">
          <p class="tw-p-4 tw-font-bold">{{ $t("static.email.name") }}</p>
          <Field name="QrName" v-slot="{ field }">
            <v-text-field
              v-bind="field"
              v-model="qrEmailDto.qrName"
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
        <div class="titleEmail tw-flex tw-text-center tw-items-center tw-p-4">
          <svg
            width="28"
            height="29"
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.6925 28.1151C12.4553 28.1151 10.4666 27.8097 8.72656 27.1989C6.99361 26.5952 5.53054 25.7038 4.33736 24.5249C3.14418 23.353 2.23864 21.9219 1.62074 20.2315C1.00284 18.5412 0.690341 16.6094 0.683239 14.4361C0.690341 12.3125 1.00639 10.3984 1.63139 8.69389C2.25639 6.98224 3.16903 5.51918 4.36932 4.30469C5.5696 3.0831 7.03622 2.1456 8.76918 1.49219C10.5021 0.838778 12.473 0.512073 14.6818 0.512073C16.7628 0.512073 18.6058 0.828124 20.2109 1.46023C21.8232 2.09233 23.1832 2.97301 24.2912 4.10227C25.4063 5.22443 26.2479 6.53835 26.8161 8.04403C27.3913 9.54261 27.679 11.169 27.679 12.9233C27.679 14.1378 27.5866 15.2884 27.402 16.375C27.2173 17.4545 26.9013 18.4134 26.4538 19.2514C26.0135 20.0895 25.4134 20.7571 24.6534 21.2543C23.8935 21.7443 22.9418 22.0107 21.7983 22.0533C21.081 22.0888 20.4524 22.0213 19.9126 21.8509C19.3729 21.6804 18.9361 21.4141 18.6023 21.0518C18.2756 20.6825 18.0696 20.2315 17.9844 19.6989H17.8565C17.6932 20.125 17.3842 20.5156 16.9297 20.8707C16.4822 21.2187 15.9283 21.4922 15.2678 21.6911C14.6072 21.8828 13.8722 21.9609 13.0625 21.9254C12.196 21.8828 11.3935 21.6839 10.6548 21.3288C9.9233 20.9666 9.28409 20.4624 8.73722 19.8161C8.19744 19.1626 7.77841 18.3743 7.48011 17.451C7.18182 16.5277 7.03267 15.4801 7.03267 14.3082C7.03267 13.1648 7.19602 12.1562 7.52273 11.2827C7.84943 10.4091 8.28622 9.66335 8.8331 9.04545C9.38707 8.42756 10.0121 7.9446 10.7081 7.59659C11.4041 7.24148 12.1214 7.0142 12.8601 6.91477C13.6271 6.80824 14.348 6.81889 15.0227 6.94673C15.6974 7.07457 16.2585 7.26989 16.706 7.53267C17.1605 7.79545 17.4446 8.0831 17.5582 8.3956H17.7074V7.20241H20.6797V17.3445C20.6868 17.8771 20.8146 18.3068 21.0632 18.6335C21.3189 18.9602 21.674 19.1236 22.1286 19.1236C22.6967 19.1236 23.1548 18.8999 23.5028 18.4524C23.858 17.9979 24.1136 17.3018 24.2699 16.3643C24.4332 15.4197 24.5114 14.2124 24.5043 12.7422C24.5114 11.5348 24.3516 10.4411 24.0249 9.46094C23.7053 8.47372 23.2507 7.60724 22.6612 6.86151C22.0717 6.11577 21.3651 5.49432 20.5412 4.99716C19.7244 4.4929 18.8153 4.11293 17.8139 3.85724C16.8125 3.60156 15.7436 3.47372 14.6072 3.47372C12.8672 3.47372 11.3366 3.74006 10.0156 4.27273C8.6946 4.7983 7.58665 5.54759 6.69176 6.5206C5.80398 7.49361 5.13281 8.64773 4.67827 9.98295C4.23082 11.3111 4.0071 12.7812 4.0071 14.3935C4.0071 16.1193 4.24148 17.6499 4.71023 18.9851C5.18608 20.3132 5.8821 21.4318 6.7983 22.3409C7.71449 23.25 8.8473 23.9389 10.1967 24.4077C11.5533 24.8764 13.1122 25.1108 14.8736 25.1108C15.6832 25.1108 16.4751 25.0469 17.2493 24.919C18.0234 24.7912 18.7195 24.642 19.3374 24.4716C19.9553 24.3011 20.4311 24.152 20.7649 24.0241L21.6705 26.7301C21.2301 26.9574 20.6335 27.1776 19.8807 27.3906C19.1349 27.6037 18.3111 27.7777 17.4091 27.9126C16.5142 28.0476 15.6087 28.1151 14.6925 28.1151ZM13.9467 18.8679C14.8487 18.8679 15.5696 18.6939 16.1094 18.3459C16.6491 17.9908 17.0362 17.4652 17.2706 16.7692C17.505 16.0732 17.6186 15.2067 17.6115 14.1697C17.6115 13.2038 17.4908 12.4119 17.2493 11.794C17.0078 11.1761 16.6207 10.718 16.0881 10.4197C15.5554 10.1214 14.8487 9.9723 13.968 9.9723C13.1726 9.9723 12.4943 10.1534 11.9332 10.5156C11.3793 10.8778 10.9531 11.3786 10.6548 12.0178C10.3636 12.6499 10.218 13.3707 10.218 14.1804C10.218 14.9901 10.3352 15.7536 10.5696 16.4709C10.8111 17.1811 11.2017 17.7599 11.7415 18.2074C12.2884 18.6477 13.0234 18.8679 13.9467 18.8679Z"
              fill="black"
            />
          </svg>

          <h1 class="tw-px-4">{{ $t("static.email.title") }}</h1>
        </div>
      </div>
      <!--form-->
      <div class="tw-col-span-12 lg:tw-col-span-11">
        <div
          class="formEmail tw-rounded tw-p-5 tw-text-gray-400 tw-bg-white tw-flex tw-flex-col"
        >
          <!--title form-->
          <p class="tw-font-bold tw-text-sm">
            {{ $t("static.email.description") }}
          </p>

          <!--input email-->
          <div class="tw-flex tw-mt-6">
            <p class="tw-px-2 tw-pt-4 tw-font-bold tw-text-sm tw-w-20">
              {{ $t("static.email.email") }}
            </p>
            <Field name="email" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                v-model="qrEmailDto.email"
                label="test@gmail.com"
                variant="underlined"
              ></v-text-field>
            </Field>
            <ErrorMessage name="email" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>

          <!--input Subject-->
          <div class="tw-flex tw-mt-4">
            <p class="tw-px-2 tw-pt-4 tw-font-bold tw-text-sm tw-w-20">
              {{ $t("static.email.subject") }}
            </p>
            <Field name="subject" v-slot="{ field }">
              <v-textarea
                v-bind="field"
                v-model="qrEmailDto.subject"
                rows="3"
                label="Enter some subject..."
                variant="underlined"
              ></v-textarea>
            </Field>
            <ErrorMessage name="subject" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>

          <!--input Message-->
          <div class="tw-flex tw-mt-4">
            <p class="tw-px-2 tw-pt-4 tw-font-bold tw-text-sm tw-w-20">
              {{ $t("static.email.messageForm") }}
            </p>
            <Field name="message" v-slot="{ field }">
              <v-textarea
                v-bind="field"
                v-model="qrEmailDto.message"
                rows="3"
                label="Enter some text..."
                variant="underlined"
              ></v-textarea>
            </Field>
            <ErrorMessage name="message" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>
        </div>
      </div>
      <!--text bottom-->
      <div class="textCode tw-col-span-12 tw-flex tw-justify-center tw-mt-5">
        <p>{{ $t("static.email.message") }}</p>
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
const qrEmailDto = reactive({
  qrName: "",
  email: "",
  subject: "",
  message: "",
  saveChanges: true,
});
const schema = computed(() => {
  return yup.object({
    QrName: yup.string().required(t("static.email.validation.name")),
    subject: yup.string().required(t("static.email.validation.subject")),
    message: yup.string().required(t("static.email.validation.message")),
    email: yup
      .string()
      .required(t("static.email.validation.email"))
      .email(t("static.email.validation.emailTrue")),
  });
});
//store
const store = useQrStatic();
const qrStore = useQrStore();

//add QrWebsite
function craeteEmail(save = false) {
  store.addEmail({ ...qrEmailDto, qrStyle: qrStore.qrStyleDto, saveChanges: save });
}

// Watch the StyleQr Dto

watch(qrStore.qrStyleDto, (nv) => {
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    craeteEmail(false);
  }, 1500);
});

// Watch the StaticQR Dto
watch(qrEmailDto, () => {
  clearTimeout(timer.value);

  timer.value = setTimeout(() => {
    qrForm.value?.validate().then((e) => {
      if (e.valid) {
        craeteEmail();
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
    craeteEmail(true);
    download(qrStore.qrPreview, qrEmailDto.qrName);
  });

  // ? RESET THE PREVIEW
  qrStore.$patch({
    qrPreview: "",
  });
});
</script>
<style lang="scss">
.emailPage {
  .nameQr p {
    font-size: 13px;
  }

  .titleEmail h1 {
    font-size: 25px;
  }

  .textCode p {
    font-weight: bold;
  }
}
</style>
