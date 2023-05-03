<template>
  <div class="contactUsMain">
    <!--background && title page-->
    <div
      class="tw-bg-amber-200 tw-absolute lg:tw-h-60 tw-h-96 tw-w-full -tw-z-10 tw-top-0 "
    >
      <div class="titlepage tw-flex tw-flex-col tw-justify-center tw-text-center">
        <v-container>
          <h1 class="tw-text-white lg:tw-mt-20 tw-mt-32">
            {{ $t("contact.title") }}
          </h1>
          <p class="tw-text-amber-900">
            {{ $t("contact.description") }}
          </p>
        </v-container>
      </div>
    </div>

    <div class="customer  tw-mt-96 lg:tw-mt-64 tw-overflow-hidden">
      <v-container>
        <div class="tw-grid lg:tw-grid-cols-12">
          <!--col form-->
          <div class="tw-col-span-6">
            <div data-aos="fade-right" data-aos-delay="200">
              <h2 class="text-head-animation">{{ $t("contact.form.title") }}</h2>
              <p class="tw-mt-5 tw-mb-4">{{ $t("contact.form.description") }}</p>
            </div>
            <Form :validation-schema="schema">
              <div>
                <div data-aos="fade-right" data-aos-delay="300" class="tw-pb-3 tw-flex">
                  <Field name="fullName" v-slot="{ field }">
                    <v-text-field
                      v-bind="field"
                      v-model="contactDto.senderName"
                      :label="$t('contact.form.fullName')"
                      variant="underlined"
                    ></v-text-field>
                  </Field>
                  <ErrorMessage name="fullName" v-slot="{ message }">
                    <span class="text-red-lighten-1">{{ message }}</span>
                  </ErrorMessage>
                </div>
                <div data-aos="fade-right" data-aos-delay="400" class="tw-pb-3 tw-flex">
                  <Field name="email" v-slot="{ field }">
                    <v-text-field
                      v-bind="field"
                      v-model="contactDto.senderEmail"
                      :label="$t('contact.form.email')"
                      variant="underlined"
                    ></v-text-field>
                  </Field>
                  <ErrorMessage name="email" v-slot="{ message }">
                    <span class="text-red-lighten-1">{{ message }}</span>
                  </ErrorMessage>
                </div>
                <div data-aos="fade-right" data-aos-delay="500" class="tw-pb-3 tw-flex">
                  <Field name="phoneNumber" v-slot="{ field }">
                    <v-text-field
                      v-bind="field"
                      v-model="contactDto.senderPhoneNumber"
                      :label="$t('contact.form.phoneNumber')"
                      variant="underlined"
                    ></v-text-field>
                  </Field>
                  <ErrorMessage name="phoneNumber" v-slot="{ message }">
                    <span class="text-red-lighten-1">{{ message }}</span>
                  </ErrorMessage>
                </div>
                <div data-aos="fade-right" data-aos-delay="200" class="tw-pb-3 tw-flex">
                  <Field name="title" v-slot="{ field }">
                    <v-text-field
                      v-bind="field"
                      v-model="contactDto.title"
                      :label="$t('contact.form.titleForm')"
                      variant="underlined"
                    ></v-text-field>
                  </Field>
                  <ErrorMessage name="title" v-slot="{ message }">
                    <span class="text-red-lighten-1">{{ message }}</span>
                  </ErrorMessage>
                </div>
                <div data-aos="fade-right" data-aos-delay="600" class="tw-pb-3 tw-flex">
                  <Field name="content" v-slot="{ field }">
                    <v-textarea
                      v-bind="field"
                      v-model="contactDto.content"
                      rows="3"
                      variant="underlined"
                      :label="$t('contact.form.message')"
                    ></v-textarea>
                  </Field>
                  <ErrorMessage name="content" v-slot="{ message }">
                    <span class="text-red-lighten-1">{{ message }}</span>
                  </ErrorMessage>
                </div>
              </div>
              <div class="tw-flex tw-justify-end">
                <v-btn
                  @click="craeteContact"
                  class="bg-dark"
                  size="large"
                  rounded
                  append-icon="mdi-arrow-right"
                >
                  {{ $t("contact.form.submit") }}
                </v-btn>
              </div>
            </Form>
          </div>
          <!--col customer-->
          <div class="tw-col-span-6">
            <div data-aos="fade-left" data-aos-delay="600">
              <h2>{{ $t("contact.socialMedia.title") }}</h2>

              <div class="tw-flex tw-mt-5 tw-gap-x-3 socialMedia">
                <v-btn color="dark" icon="mdi-facebook "> </v-btn>
                <v-btn color="dark" icon="mdi-instagram"> </v-btn>
                <v-btn icon color="dark"
                  ><svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.2647 1.42778C20.98 1.19091 20.6364 1.03567 20.2704 0.978584C19.9045 0.921494 19.5299 0.964688 19.1866 1.10357L1.26566 8.33892C0.88241 8.4966 0.556176 8.76711 0.33026 9.11454C0.104343 9.46196 -0.0105725 9.86988 0.000764965 10.2841C0.0121025 10.6984 0.149157 11.0994 0.393738 11.434C0.638319 11.7685 0.978859 12.0208 1.37016 12.1573L4.99516 13.418L7.01566 20.0997C7.04312 20.1889 7.08297 20.2739 7.13404 20.352C7.14179 20.364 7.15272 20.373 7.16096 20.3846C7.21996 20.467 7.29127 20.5397 7.37239 20.6004C7.39546 20.618 7.41755 20.6345 7.44221 20.6501C7.53714 20.7131 7.64228 20.7591 7.75294 20.7862L7.76478 20.7872L7.77149 20.7901C7.83802 20.8036 7.90574 20.8105 7.97364 20.8106C7.98017 20.8106 7.98597 20.8074 7.99244 20.8073C8.0949 20.8055 8.19647 20.7879 8.29353 20.755C8.31611 20.7473 8.33546 20.7345 8.35737 20.7252C8.42975 20.6952 8.49832 20.6567 8.56166 20.6106C8.61238 20.5679 8.66312 20.5251 8.71388 20.4824L11.416 17.4991L15.4463 20.6211C15.8011 20.8974 16.2379 21.0475 16.6875 21.0479C17.1587 21.0473 17.6154 20.8847 17.9809 20.5874C18.3465 20.2901 18.5987 19.8762 18.6954 19.4151L21.958 3.39849C22.032 3.03801 22.0065 2.66421 21.8844 2.31708C21.7623 1.96995 21.5481 1.66255 21.2647 1.42778ZM8.37016 13.7364C8.2315 13.8745 8.13672 14.0505 8.0977 14.2422L7.78819 15.7462L7.00413 13.1532L11.0694 11.0362L8.37016 13.7364ZM16.6719 19.0401L11.9092 15.3506C11.71 15.1966 11.46 15.1234 11.2092 15.1455C10.9583 15.1675 10.725 15.2833 10.5557 15.4697L9.69029 16.4249L9.99613 14.9385L17.0791 7.85549C17.2482 7.68665 17.3512 7.46285 17.3695 7.22461C17.3878 6.98638 17.3201 6.74947 17.1788 6.55681C17.0375 6.36414 16.8319 6.22845 16.5992 6.17433C16.3664 6.1202 16.122 6.15121 15.9102 6.26174L5.74491 11.5544L2.02055 10.1915L19.999 2.99905L16.6719 19.0401Z"
                      fill="white"
                    />
                  </svg>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MetaObject } from "@nuxt/schema";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import Aos from "aos";
import { ref, reactive } from "vue";
import { useContactUs } from "@/store/contactUs/index";
const { locale } = useI18n();
const { t } = useI18n();
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = computed(() => {
  return yup.object({
    title: yup.string().required(t("contact.validation.title")),
    fullName: yup.string().required(t("contact.validation.fullName")),
    email: yup
      .string()
      .required(t("contact.validation.email"))
      .email(" email is not good"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, " phoneNumber is not good")
      .required(t("contact.validation.phoneNumber")),

    content: yup.string().required(t("contact.validation.message")),
  });
});
const headers: { [x: string]: MetaObject } = {
  ar: {
    title: "تواصل معنا",
    htmlAttrs: {
      lang: locale,
      dir: "rtl",
    },
    meta: [{ name: "description", content: " تواصل معنا في حال كان لديك استفسارات" }],
  },
  en: {
    title: "Contact Us",
    htmlAttrs: {
      lang: locale,
      dir: "ltr",
    },
    meta: [{ name: "description", content: "contact us if you have any questions" }],
  },
  de: {
    title: "Hilfe Center",
    htmlAttrs: {
      lang: locale,
      dir: "ltr",
    },
    meta: [{ name: "description", content: "DE DE DE ED" }],
  },
};

useHead(headers[locale.value]);
definePageMeta({
  title: "contact.title",
});
const contactDto = reactive({
  senderName: "",
  senderEmail: "",
  senderPhoneNumber: "",
  content: "",
  title: "",
});
function resetForm() {
  (contactDto.senderName = ""),
    (contactDto.senderEmail = ""),
    (contactDto.senderPhoneNumber = ""),
    (contactDto.content = ""),
    (contactDto.title = "");
}
//store
const store = useContactUs();
//add QrWebsite
function craeteContact() {
  store.contactUs(contactDto).then(() => resetForm());
}

onMounted(() => {
  Aos.init();
});
</script>
<style lang="scss" scoped>
.contactUsMain {
  min-height: calc(100vh - 88px);
  .titlepage h1 {
    font-size: 50px;
  }
  .customer {
    h1 {
      font-size: 40px;
    }
    h2 {
      font-size: 25px;
    }

    .detailsCustomer p {
      font-size: 12px;
    }
    .socialMedia p {
      font-size: 14px;
    }
    .btnSubmit button {
      position: absolute;
      right: 0px;
    }
  }
}
</style>
