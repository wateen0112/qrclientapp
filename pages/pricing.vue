<template>
  <div class="pricingMain tw-min-h-screen">
    <!-- Top left Red Shape -->

    <!--title page-->
    <div
      class="titlePage tw-justify-center tw-text-center tw-flex-wrap tw-mt-12">
      <v-container>
        <h1 class="tw-text-2xl" data-aos="fade-up" data-aos-delay="200">
          {{ $t("pricing.title") }}
        </h1>
        <p class="tw-mt-3 tw-text-2xl" data-aos="fade-up"
          data-aos-delay="300">
          {{ $t("pricing.description") }}
        </p>
      </v-container>
    </div>

    <!--card pricing-->
    <div class="cardPricing">
      <pricing-price-card></pricing-price-card>
    </div>
    <div>
      <v-container data-aos="fade-up" data-aos-delay="450">
        <p class="tw-text-lg"><span class="tw-text-2xl tw-mx-1">*</span>{{ $t("pricing.desPricing") }}</p>
      </v-container>
    </div>

    <client-only>
      <div class="openLink tw-text-center tw-pt-5">
        <p>
          {{ $t("pricing.message") }}
          <!--open Dialog-->
          <v-dialog v-model="dialog" fullscreen :scrim="false"
            transition="dialog-bottom-transition">
            <template v-slot:activator="{ props }">
              <v-btn class="btnDialog" variant="text" color="secondary"
                v-bind="props">
                <span>{{ $t("pricing.click") }}</span>
              </v-btn>
            </template>
            <v-card class="form">
              <v-card-title class="tw-bg-amber-100" :style="`
              font-size: 15px;
              font-weight: bold;
              display: flex;
              justify-content: space-between;
              z-index: 11`">
                <span> {{ $t("pricing.dialog.header") }}</span>
                <v-icon @click="dialog = false"
                  size="small">mdi-close</v-icon>
              </v-card-title>
              <!-- Top left yellow code -->
              <img class="tw-absolute tw-top-11 tw-left-0 yellowCode"
                src="~assets/svg/shapes/index-code.svg" />
              <v-container>
                <!--title & description-->
                <div
                  class="titleCard tw-flex tw-flex-col tw-justify-center tw-text-center tw-mt-5">
                  <h1 style="font-size: 25px">
                    {{ $t("pricing.dialog.title") }}
                  </h1>

                  <p class="tw-m-4" style="line-height: 2">
                    {{ $t("pricing.dialog.description") }}
                  </p>
                </div>
                <Form :validation-schema="schema"
                  class="tw-w-full md:tw-px-28 tw-px-5">
                  <div class="tw-mt-5">
                    <!-- company name -->
                    <Field name="companyName" v-slot="{ field }">
                      <v-text-field v-bind="field"
                        v-model="contactInterpriseDto.companyName"
                        class="tw-mt-4" type="input" variant="underlined"
                        :label="$t('pricing.dialog.companyName')"></v-text-field>
                    </Field>
                    <ErrorMessage name="companyName" v-slot="{ message }">
                      <span class="text-red-lighten-1">{{ message }}</span>
                    </ErrorMessage>

                    <!-- name-->
                    <Field name="name" v-slot="{ field }">
                      <v-text-field v-bind="field"
                        v-model="contactInterpriseDto.name" class="tw-mt-4"
                        type="input" variant="underlined"
                        :label="$t('pricing.dialog.name')"></v-text-field>
                    </Field>
                    <ErrorMessage name="name" v-slot="{ message }">
                      <span class="text-red-lighten-1">{{ message }}</span>
                    </ErrorMessage>

                    <!-- email-->
                    <Field name="email" v-slot="{ field }">
                      <v-text-field v-bind="field"
                        v-model="contactInterpriseDto.email"
                        class="tw-mt-4" type="input" variant="underlined"
                        :label="$t('pricing.dialog.email')">
                      </v-text-field>
                    </Field>
                    <ErrorMessage name="email" v-slot="{ message }">
                      <span class="text-red-lighten-1">{{ message }}</span>
                    </ErrorMessage>

                    <h1 class="tw-mb-5 tw-mt-5">
                      {{ $t("pricing.dialog.type") }}
                    </h1>

                    <!--select possible consulting-->
                    <v-col cols="12" lg="4" class="tw-mt-2 selectType">
                      <ClientOnly>
                        <Field name="industryId" v-slot="{ field }">
                          <v-select v-bind="field"
                            v-model="contactInterpriseDto.industryId"
                            itemValue="id" itemTitle="name"
                            :label="$t('pricing.dialog.business')"
                            :items="settingStore.industries"
                            variant="underlined"></v-select>
                        </Field>
                        <ErrorMessage name="industryId"
                          v-slot="{ message }">
                          <span class="text-red-lighten-1">{{
                            message
                          }}</span>
                        </ErrorMessage>
                      </ClientOnly>
                    </v-col>

                    <!--Telephone Number-->
                    <Field name="phoneNumber" v-slot="{ field }">
                      <v-text-field v-bind="field"
                        v-model="contactInterpriseDto.phoneNumber"
                        class="tw-mt-4" type="input" variant="underlined"
                        :label="$t('pricing.dialog.telephone')"></v-text-field>
                    </Field>
                    <ErrorMessage name="phoneNumber" v-slot="{ message }">
                      <span class="text-red-lighten-1">{{ message }}</span>
                    </ErrorMessage>

                    <h2 class="tw-mt-4">
                      {{ $t("pricing.dialog.countQr") }}
                    </h2>
                    <p class="tw-mt-4">
                      {{ $t("pricing.dialog.QrDetails") }}
                    </p>

                    <!--QR Codes size-->
                    <div>
                      <v-checkbox v-model="qrCount" value="1.000"
                        label=">1.000"></v-checkbox>
                      <v-checkbox v-model="qrCount" value=">2.000"
                        label=">2.000"></v-checkbox>
                      <v-checkbox v-model="qrCount" value=">3.000"
                        label=">3.000"></v-checkbox>
                      <v-checkbox v-model="qrCount" value=">4.000"
                        label=">4.000"></v-checkbox>
                      <v-checkbox v-model="qrCount" value=">5.000"
                        label=">5.000"></v-checkbox>
                    </div>

                    <h2>{{ $t("pricing.dialog.typeQr") }}</h2>

                    <!-- QR Codes Type-->
                    <div class="tw-flex tw-flex-col">
                      <v-checkbox
                        value="Dynamic QR Codes (manage, track and editable)"
                        v-model="qrType"
                        :label="$t('pricing.dialog.firstType')"></v-checkbox>
                      <v-checkbox v-model="qrType" value="Static QR Codes"
                        :label="$t('pricing.dialog.secondType')"></v-checkbox>
                      <v-checkbox value="Both types (more Dynamic)"
                        v-model="qrType"
                        :label="$t('pricing.dialog.thrType')">
                      </v-checkbox>
                      <v-checkbox value="Both types (more Static)"
                        v-model="qrType"
                        :label="$t('pricing.dialog.fourType')">
                      </v-checkbox>
                    </div>

                    <!-- note-->
                    <h1>{{ $t("pricing.dialog.message") }}</h1>
                    <p class="mt-4 mb-3">
                      {{ $t("pricing.dialog.help") }}
                    </p>
                    <Field name="description" v-slot="{ field }">
                      <v-textarea v-bind="field"
                        v-model="contactInterpriseDto.description"
                        variant="underlined" rows="8"
                        :label="$t('pricing.dialog.inputMessage')"></v-textarea>
                    </Field>
                    <ErrorMessage name="description" v-slot="{ message }">
                      <span class="text-red-lighten-1">{{ message }}</span>
                    </ErrorMessage>
                  </div>

                  <!--btn submit & img code-->
                  <div class="tw-flex tw-justify-center">
                    <!--img code pink bottom left page-->
                    <img
                      class="tw-absolute -tw-z-10 tw-right-0 rtl:-tw-scale-x-100"
                      src="~assets/svg/shapes/index-code-bottom.svg" />
                    <v-btn @click="craeteContact" class="bg-dark tw-mt-2"
                      size="large" rounded>
                      {{ $t("pricing.dialog.submit") }}
                    </v-btn>
                  </div>
                </Form>
              </v-container>
            </v-card>
          </v-dialog>
        </p>
      </div>
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import Aos from "aos";
import { MetaObject } from "@nuxt/schema";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { useContactUs } from "@/store/contactUs/index";
import { GetAllSubscription } from "~/api/dto/website/subscription.dto";
import { SubscriptionController } from "~/api/endpoints/Subscription";
import appConfig from "~/app.config";
import { useSubStore } from "~/store/subscription";
import { useSettings } from "~/store/settings";
import { useRouter } from "vue-router";
const router = useRouter();

const { t } = useI18n();
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = computed(() => {
  return yup.object({
    companyName: yup.string().required(t("pricing.validation.companyName")),
    name: yup.string().required(t("pricing.validation.name")),
    industryId: yup.string().required(t("pricing.validation.industry")),
    email: yup
      .string()
      .required(t("pricing.validation.email"))
      .email("البريد الإلكتروني غير صالح"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "رقم الهاتف غير صالح")
      .required(t("pricing.validation.phoneNumber")),

    description: yup.string().required(t("pricing.validation.inputMessage")),
  });
});
const settingStore = useSettings();
const { locale } = useI18n();
const dialog = ref(false);
const qrType = ref();
const qrCount = ref(0);
const headers: { [x: string]: MetaObject } = {
  ar: {
    title: " التسعير",
    htmlAttrs: {
      lang: locale,
      dir: "rtl",
    },
    meta: [{ name: "description", content: " التسعير" }],
  },
  en: {
    title: " Pricing",
    htmlAttrs: {
      lang: locale,
      dir: "ltr",
    },
    meta: [{ name: "description", content: "Pricing" }],
  },
  de: {
    title: "Preise",
    htmlAttrs: {
      lang: locale,
      dir: "ltr",
    },
    meta: [{ name: "description", content: "DE DE DE ED" }],
  },
};
const subStore = useSubStore();
useHead(headers[locale.value]);
const { data } = await useFetch(SubscriptionController.PRICING, {
  baseURL: appConfig.API_DOMAIN,
});
subStore.$patch({ subscriptionList: data.value as GetAllSubscription[] });

settingStore.getIndustries();
//ContactUs Interpise
const contactInterpriseDto = reactive({
  companyName: "",
  name: "",
  email: "",
  phoneNumber: "",
  qrCount: qrCount,
  qrType: qrType,
  description: "",
  industryId: "",
});
//store
const store = useContactUs();

//add QrWebsite
function craeteContact() {
  store.contactUsEnterprise(contactInterpriseDto).then(() => (dialog.value = false));
}
onMounted(() => {
  Aos.init();
});
</script>
<style lang="scss" scoped>
.pricingMain {
  min-height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 35px;

  .titlePage h1 {
    font-size: 35px;
  }

  .btnDialog {
    font-weight: bolder;
    font-size: 18px;
    text-transform: capitalize;
  }
}

.selectType {
  padding: 0px;
}

.yellowCode {
  z-index: -1;
}
</style>
