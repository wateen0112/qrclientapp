<template>
  <div class="signup">
    <div class="tw-relative">
      <div class="tw-absolute -tw-z-100 rtl:-tw-scale-x-100">
        <img class="" :src="Logo" alt="" srcset="" />
      </div>
      <div class="tw-absolute -tw-z-100 rtl:-tw-scale-x-100">
        <img class="" src="~assets/svg/qr.svg" alt="" srcset="" />
      </div>
    </div>

    <div
      class="tw-grid tw-grid-cols-12 tw-h-screen tw-w-screen tw-overflow-hidden">
      <div
        class="lg:tw-col-span-5 tw-col-span-12 tw-relative tw-hidden lg:tw-flex tw-justify-center tw-items-center tw-h-full">
        <ul
          class="tw-absolute -tw-right-10 rtl:-tw-left-8 tw-flex tw-flex-col tw-gap-10">
          <!-- style="right: -40px" -->
          <li class="tw-bg-dark tw-p-6 tw-text-light tw-rounded-full">
            <nuxt-link :to="localePath('/signup')"  variant="text">{{
              $t("signup.signup")
            }}</nuxt-link>
          </li>
          <li
            class="tw-bg-light tw-p-6 tw-shadow-xl tw-rounded-full tw-w-36 tw-text-dark">
            <nuxt-link :to="localePath('/login')"  variant="text">{{
              $t("login.login")
            }}</nuxt-link>
          </li>
        </ul>
        <div class="width-image">
          <!-- <img
            class="tw-w-full"
            src="~assets/svg/register/fingerprint.svg"
            alt="Phone image"
          /> -->
          <AnimatedAuthFingerPrint></AnimatedAuthFingerPrint>
        </div>
      </div>

      <div
        class="tw-relative lg:tw-col-span-7 tw-col-span-12 tw-text-white tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full tw-bg-dark">
        <nuxt-link class="tw-absolute tw-top-5 tw-cursor-pointer"
          style="right: 40px" :to="localePath('/')">
          <!-- <img src="~assets/svg/arrow.svg" alt="" srcset="" /> -->
        </nuxt-link>
        <nuxt-link
          class="lg:tw-hidden tw-block tw-absolute tw-top-5 tw-cursor-pointer"
          style="left: 40px" :to="localePath('/login')">
          {{ $t("login.login") }}
        </nuxt-link>
        <h2 class="tw-text-3xl tw-text-primary tw-mb-5">
          {{ $t("signup.createAccount") }}
        </h2>
        <Form :validation-schema="schema" ref="signUpForm"
          class="tw-w-full md:tw-px-28 tw-px-5">

          <!-- Email input -->

          <div class="email field tw-mb-3">
            <Field name="email" v-slot="{ field }">
              <v-text-field v-bind="field" v-model="signUpDto.email"
                :label="$t('login.email')" variant="underlined"
                prepend-inner-icon="mdi-email-outline"></v-text-field>
            </Field>
            <ErrorMessage name="email" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>
          <div class="name field tw-mb-3">
            <Field name="name" v-slot="{ field }">
              <v-text-field v-bind="field" v-model="signUpDto.name"
                :label="$t('login.Name')" variant="underlined"
                prepend-inner-icon="mdi-account-outline"></v-text-field>
            </Field>
            <ErrorMessage name="name" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>

          <div class="password field tw-mb-3">
            <Field name="password" v-slot="{ field }">
              <v-text-field v-bind="field" v-model="signUpDto.password"
                :label="$t('login.password')" variant="underlined"
                prepend-inner-icon="mdi-lock"></v-text-field>
            </Field>
            <ErrorMessage name="password" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>

          <div class="tw-w-full tw-flex tw-justify-end tw-items-center">
            <v-checkbox :label="$t('login.rememberMe')"></v-checkbox>
          </div>
          <!-- Submit button -->
          <div
            class="btn-signup tw-w-full tw-flex-col tw-flex tw-justify-center tw-items-center">
            <v-btn rounded variant="outlined" @click="submit"
              color="primary"
              class="tw-mt-5 tw-text-white tw-py-4 tw-px-8">
              {{ $t("signup.signup") }}
            </v-btn>
            <div class="tw-mt-5 tw-w-1/5">
              <Localizer></Localizer>
            </div>
          </div>
        </Form>
      </div>


    </div>
  </div>
</template>
<script setup lang="ts">
import { MetaObject } from "@nuxt/schema";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { useAuthorization } from "@/store/auth";
import { useSettings } from "@/store/settings";
import { gsap } from "gsap";
import Logo from '@/assets/Logo.svg'
const signUpStore = useAuthorization();
const signUpForm = ref<InstanceType<typeof Form> | null>(null);
const settingStore = useSettings();
const { locale } = useI18n();

const schema = computed(() => {
  return yup.object({
    // industryId: yup.string().required("industry is required"),
    name: yup.string().required("name is required"),
    email: yup
      .string()
      .required("email is required")
      .email("email is not valid"),
    password: yup.string().required("password is required").min(3),
  });
});
const localePath = useLocalePath()
const signUpDto = reactive({
  // industryId: null,
  name: "",
  email: "",
  password: "",
});
const headers: { [x: string]: MetaObject } = {
  ar: {
    title: "الصفحة الرئيسية",
    htmlAttrs: {
      lang: locale.value,
      dir: "rtl",
    },
    meta: [{ name: "description", content: "وصف الصفحة الرئيسية" }],
  },
  en: {
    title: "Home Page",
    htmlAttrs: {
      lang: locale.value,
      dir: "ltr",
    },
    meta: [{ name: "description", content: "Description in English" }],
  },
  de: {
    title: "DeHome DePage",
    htmlAttrs: {
      lang: locale.value,
      dir: "ltr",
    },
    meta: [{ name: "description", content: "DE DE DE ED" }],
  },
};

useHead(headers[locale.value]);
definePageMeta({
  layout: "fullscreen",
});

function submit() {
  signUpForm.value?.validate().then((valid) => {
    if (valid.valid) {
      signUpStore.createAccount(signUpDto).then(() => {
        resetForm();
      });
    }
  });
}
function resetForm() {
  // signUpDto.industryId = "";
  signUpDto.name = "";
  signUpDto.password = "";
  signUpDto.email = "";
  signUpForm.value?.resetForm();
}

// settingStore.getIndustries();
onMounted(() => {
  var t1 = gsap.timeline();
  if (process.client) {
    t1.from(".field", {
      x: -1000,
      stagger: 0.1,
    });

    t1.from(".btn-signup", {
      opacity: 0,
      y: -400,
    });
  }
});
</script>
<style lang="scss">
.signup {
  .width-image {
    width: 65% !important;
  }
}

.v-input__details {
  display: none !important;
}

// .list-login {
//   left: -78px !important;
//   ul {
//     li {
//       border-top-left-radius: 70px !important;
//       border-bottom-left-radius: 70px !important;
//     }
//   }
// }
</style>
