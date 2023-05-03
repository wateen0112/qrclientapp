<template>
  <div class="contactPage tw-grid">
    <!--name QR-->
    <Form :validation-schema="schema" ref="qrForm">
      <div class="tw-col-span-12 lg:tw-col-span-6">
        <div class="nameQr tw-flex tw-mt-5">
          <p class="tw-p-4 tw-font-bold">{{ $t("static.contact.name") }}</p>
          <Field name="QrName" v-slot="{ field }">
            <v-text-field
              v-bind="field"
              v-model="qrContactDto.qrName"
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
        <div class="titleContact tw-flex tw-text-center tw-items-center tw-p-4">
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_33883_124967)">
              <path
                d="M27 1.93184C27 0.939136 26.1927 0.131836 25.2 0.131836H1.8C0.8073 0.131836 0 0.939136 0 1.93184C0 2.76839 0.576 3.46679 1.35 3.66794V25.5181L2.7 24.1681L5.4 26.8681L8.1 24.1681L10.8 26.8681L13.5 24.1681L16.2 26.8681L18.9 24.1681L21.6 26.8681L24.3 24.1681L25.65 25.5181V3.66794C26.424 3.46679 27 2.76839 27 1.93184ZM24.75 23.3455L24.3 22.8955L21.6 25.5955L18.9 22.8955L16.2 25.5955L13.5 22.8955L10.8 25.5955L8.1 22.8955L5.4 25.5955L2.7 22.8955L2.25 23.3455V3.73184V2.38184H24.75V3.73184V23.3455ZM25.65 2.71079V1.48184H1.35V2.71079C1.08135 2.55554 0.9 2.26439 0.9 1.93184C0.9 1.43549 1.30365 1.03184 1.8 1.03184H25.2C25.6963 1.03184 26.1 1.43549 26.1 1.93184C26.1 2.26439 25.9186 2.55554 25.65 2.71079Z"
                fill="#263238"
              />
              <path d="M4.72498 15.1875H21.2625M10.125 19.9125H16.875" stroke="#263238" />
            </g>
            <g clip-path="url(#clip1_33883_124967)">
              <path
                d="M16.8574 12.8249H15.9683C15.9683 11.3249 14.7101 10.105 13.1625 10.105C11.615 10.105 10.3573 11.3253 10.3573 12.8249H9.46814C9.46814 10.8341 11.126 9.21582 13.163 9.21582C15.1996 9.21582 16.8574 10.8341 16.8574 12.8249Z"
                fill="#263238"
              />
              <path
                d="M13.163 8.92678C11.8191 8.92678 10.725 7.83224 10.725 6.48829C10.7245 5.1439 11.8186 4.0498 13.163 4.0498C14.5079 4.0498 15.602 5.14346 15.602 6.48829C15.602 7.83313 14.5079 8.92678 13.163 8.92678ZM13.163 4.93895C12.3085 4.93895 11.6137 5.63382 11.6137 6.48829C11.6137 7.34276 12.3085 8.03763 13.163 8.03763C14.0179 8.03763 14.7128 7.34276 14.7128 6.48829C14.7128 5.63382 14.017 4.93895 13.163 4.93895Z"
                fill="#263238"
              />
            </g>
            <defs>
              <clipPath id="clip0_33883_124967">
                <rect width="27" height="27" fill="white" />
              </clipPath>
              <clipPath id="clip1_33883_124967">
                <rect
                  width="8.775"
                  height="8.775"
                  fill="white"
                  transform="translate(8.77502 4.0498)"
                />
              </clipPath>
            </defs>
          </svg>

          <h1 class="tw-px-4">{{ $t("static.contact.title") }}</h1>
        </div>
      </div>
      <!--form-->
      <div class="tw-col-span-12 lg:tw-col-span-11">
        <div
          class="formEmail tw-rounded tw-p-5 tw-text-gray-400 tw-bg-white tw-flex tw-flex-col"
        >
          <!--title form-->
          <p class="tw-font-bold tw-text-sm">
            {{ $t("static.contact.description") }}
          </p>

          <!--input email-->
          <div class="tw-flex tw-mt-6">
            <p class="tw-px-2 tw-pt-6 tw-font-bold tw-text-sm tw-w-24">
              {{ $t("static.contact.yourName") }}
            </p>
            <Field name="firstName" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                v-model="qrContactDto.firstName"
                class="tw-p-2"
                label="First Name"
                variant="underlined"
              ></v-text-field>
            </Field>
            <ErrorMessage name="firstName" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>

            <Field name="lastName" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                v-model="qrContactDto.lastName"
                class="tw-p-2"
                label="Last Name"
                variant="underlined"
              ></v-text-field>
            </Field>
            <ErrorMessage name="lastName" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>

          <!--input Subject-->
          <div class="tw-flex">
            <p class="tw-px-2 tw-pt-4 tw-font-bold tw-text-sm tw-w-24">
              {{ $t("static.contact.number") }}
            </p>
              <v-text-field
                v-model="qrContactDto.phoneNumber"
                label="Mobile number"
                variant="underlined"
              ></v-text-field>
            
          </div>
          <div class="tw-flex tw-col-span-11">
            <p class="tw-px-2 tw-pt-4 tw-font-bold tw-text-sm tw-w-24"></p>
              <v-text-field
                v-model="qrContactDto.phone"
                class="tw-p-2"
                label="Phone"
                variant="underlined"
              ></v-text-field>
            

              <v-text-field
                class="tw-p-2"
                label="Fax"
                variant="underlined"
              ></v-text-field>
            
          </div>

          <!--input Message-->
          <div class="tw-flex tw-mt-2">
            <p class="tw-px-2 tw-pt-4 tw-font-bold tw-text-sm tw-w-24">
              {{ $t("static.contact.mail") }}
            </p>
            <Field name="mail" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                v-model="qrContactDto.mail"
                label="your@email.com"
                variant="underlined"
              >
              </v-text-field>
            </Field>
            <ErrorMessage name="mail" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>

          <div class="tw-flex tw-mt-6">
            <p class="tw-px-2 tw-pt-6 tw-font-bold tw-text-sm tw-w-24">
              {{ $t("static.contact.company") }}
            </p>
              <v-text-field
                v-model="qrContactDto.company"
                class="tw-p-2"
                label="Company"
                variant="underlined"
              ></v-text-field>
           

              <v-text-field
                v-model="qrContactDto.job"
                class="tw-p-2"
                label="Your Job"
                variant="underlined"
              ></v-text-field>
            
          </div>

          <div class="tw-flex tw-mt-6">
            <p class="tw-px-2 tw-pt-6 tw-font-bold tw-text-sm tw-w-24">
              {{ $t("static.contact.street") }}
            </p>
              <v-text-field
                v-model="qrContactDto.street"
                variant="underlined"
              ></v-text-field>
            
          </div>

          <div class="tw-flex tw-mt-6">
            <p class="tw-px-2 tw-pt-6 tw-font-bold tw-text-sm tw-w-24">
              {{ $t("static.contact.city") }}
            </p>
              <v-text-field
                v-model="qrContactDto.city"
                variant="underlined"
              ></v-text-field>
            
          </div>

          <div class="tw-flex tw-mt-6">
            <p class="tw-px-2 tw-pt-6 tw-font-bold tw-text-sm tw-w-24">
              {{ $t("static.contact.country") }}
            </p>
              <v-text-field
                v-model="qrContactDto.country"
                variant="underlined"
              ></v-text-field>
           
          </div>

          <div class="tw-flex tw-mt-6">
            <p class="tw-px-2 tw-pt-6 tw-font-bold tw-text-sm tw-w-24">
              {{ $t("static.contact.web") }}
            </p>
              <v-text-field
                v-model="qrContactDto.web"
                @keypress="qrContactDto.web=qrStore.httpsCheck($event.target.value)"
                variant="underlined"
              ></v-text-field>
            
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
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const { t } = useI18n();
const qrForm = ref<InstanceType<typeof Form> | null>(null);
const { download } = useFile();
const timer = ref();

const qrContactDto = reactive({
  qrName: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  phone: "",
  company: "",
  job: "",
  street: "",
  city: "",
  country: "",
  web: "",
  mail: "",
  saveChanges: true,
});
const schema = computed(() => {
  return yup.object({
    QrName: yup.string().required(t("static.contact.name")),
    firstName: yup.string().required(t("static.contact.yourName")),
    lastName: yup.string().required(t("static.contact.yourName")),
    mail: yup
      .string()
      .required(t("static.contact.mail"))
      .email("  البريد الإلكتروني غير صالح "),
    // company: yup.string().required(t("static.contact.company")),
    // job: yup.string().required(" الوظيفة  مطلوب"),
    // street: yup.string().required(t("static.contact.street")),
    // city: yup.string().required(t("static.contact.city")),
    // country: yup.string().required(t("static.contact.country")),
    // web: yup.string().required(t("static.contact.web")),
    // phoneNumber: yup
    //   .string()
    //   .matches(phoneRegExp, "رقم الهاتف غير صالح")
    //   .required("رقم الهاتف مطلوب"),
    // phone: yup
    //   .string()
    //   .matches(phoneRegExp, "رقم الهاتف غير صالح")
    //   .required("رقم الهاتف مطلوب"),
  });
});
//store
const store = useQrStatic();
const qrStore = useQrStore();

//add QrWebsite
function craeteContact(save = false) {
  // qrContactDto.web = "https://" + qrContactDto.web;
  store.addContactData({
    ...qrContactDto,
    qrStyle: qrStore.qrStyleDto,
    saveChanges: save,
  });
}

// Watch the StyleQr Dto

watch(qrStore.qrStyleDto, (nv) => {
  clearTimeout(timer.value);

  timer.value = setTimeout(() => {
    craeteContact(false);
  }, 2000);
});

// Watch the StaticQR Dto
watch(qrContactDto, () => {
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    qrForm.value?.validate().then((e) => {
      if (e.valid) {
        craeteContact();
      } else qrStore.$patch({ qrPreview: "" });
    });
  }, 2000);
});

//layout
definePageMeta({
  layout: "static-code-layout",
});
onMounted(() => {
  // ? Download On Click (Save & Download)
  qrStore.emitter.on("download", () => {
    craeteContact(true);
    download(qrStore.qrPreview, qrContactDto.qrName);
  });

  // ? RESET THE PREVIEW
  qrStore.$patch({
    qrPreview: "",
  });
});
</script>
<style lang="scss">
.contactPage {
  .nameQr p {
    font-size: 13px;
  }

  .titleContact h1 {
    font-size: 25px;
  }

  .textCode p {
    font-weight: bold;
  }
}
</style>
