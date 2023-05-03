<template>
  <div class="login">
    <div class="tw-relative">
      <div class="tw-absolute -tw-z-100 rtl:-tw-scale-x-100">
        <img class="" :src="Logo" alt="" srcset="" />
      </div>
      <div class="tw-absolute -tw-z-100 rtl:-tw-scale-x-100">
        <img class="" src="~assets/svg/qr.svg" alt="" srcset="" />
      </div>
    </div>

    <div
      class="tw-grid tw-grid-cols-12 tw-h-screen tw-w-screen tw-overflow-hidden"
    >
      <div
        class="lg:tw-col-span-5 tw-relative tw-col-span-12 tw-hidden lg:tw-flex tw-justify-center tw-items-center tw-h-full"
      >
        <div class="image-control-system">
          <!-- <img
            class="tw-w-full"
            src="~assets/svg/register/control-system.svg"
            alt="Phone image"
          /> -->
          <AnimatedAuthControlSystem></AnimatedAuthControlSystem>
        </div>

        <ul
          class="tw-absolute -tw-right-8 rtl:-tw-left-8 tw-flex tw-flex-col tw-gap-10"
        >
          <li class="tw-bg-light tw-p-6">
            <nuxt-link :to="localePath('/signup')" variant="text">
              {{ $t("signup.signup") }}</nuxt-link
            >
          </li>
          <li
            class="tw-bg-dark tw-p-6 tw-shadow-xl tw-rounded-full tw-w-36 tw-text-light"
          >
            <nuxt-link :to="localePath('/login')" variant="text">
              {{ $t("login.login") }}</nuxt-link
            >
          </li>
        </ul>
      </div>
      <div
        class="tw-relative lg:tw-col-span-7 tw-col-span-12 tw-text-white tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full tw-bg-dark"
      >
        <nuxt-link
          class="tw-absolute tw-top-5 tw-cursor-pointer"
          style="right: 40px"
       :to="localePath('/')"
        >
          <!-- <img src="~assets/svg/arrow.svg" alt="" srcset="" /> -->
        </nuxt-link>
        <nuxt-link
          class="lg:tw-hidden tw-block tw-absolute tw-top-5 tw-cursor-pointer"
          style="left: 40px"
       
          :to="localePath('/signup')"
        >
          {{ $t("signup.signup") }}
        </nuxt-link>
        <h2 class="tw-text-3xl tw-text-primary tw-mb-10">
          {{ $t("login.login") }}
        </h2>
        <h2 class="tw-text-3xl tw-font-thin tw-text-white tw-mb-5">
          {{ $t("login.welcomeBack") }}
        </h2>
        <Form
          ref="loginForm"
          :validation-schema="schema"
          class="tw-w-full md:tw-px-28 tw-px-5"
        >
          <!-- Email input -->
          <div class="email tw-mb-6">
            <Field name="email" v-slot="{ field }">
              <v-text-field
                v-model="loginDto.email"
                v-bind="field"
                :label="$t('login.email')"
                variant="underlined"
                prepend-inner-icon="mdi-email-outline"
              ></v-text-field>
            </Field>
            <ErrorMessage name="email" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>

          <div class="password tw-mb-6">
            <Field name="password" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                v-model="loginDto.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                :label="$t('login.password')"
                hint="At least 8 characters"
                @click:append="show1 = !show1"
                variant="underlined"
              ></v-text-field>
            </Field>

            <ErrorMessage name="password" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-wrap tw-justify-between tw-items-center"
          >
            <v-checkbox :label="$t('login.rememberMe')"></v-checkbox>

            <nuxt-link
            :to="localePath('/forgetPassword')"
              
              class="md:tw-mx-0 tw-mx-3 tw-underline text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
            >
              {{ $t("login.forgetPassword") }}?</nuxt-link
            >
          </div>

          <!-- Submit button -->
          <div
            class="btn-login tw-w-full tw-flex-col tw-flex tw-justify-center tw-items-center"
          >
            <v-btn
              @click="Login"
              rounded
              variant="outlined"
              color="primary"
              class="tw-mt-5 tw-text-white tw-py-4 tw-px-8"
            >
              {{ $t("login.login") }}
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
//  #region imports
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { useAuthorization } from "@/store/auth";
import { reactive } from "vue";
import { gsap } from "gsap";
import { useToast } from "vue-toastification";
import { useAuth } from "~/composables/useAuth";
import { log } from "console";
import Logo from '@/assets/Logo.svg'
const { error } = useToast();
// #region variables
const store = useAuthorization();
const auth = computed(() => store.authDto);
const loginForm = ref<InstanceType<typeof Form> | null>(null);
const { EmailLogin } = useAuth();
const loginDto = reactive({
  email: "",
  password: "",
});
const show1 = ref(false);
const localePath = useLocalePath()
const route = useRoute();
const rules = {
  required: (value: number) => !!value || "Required.",
  min: (v: any) => v.length >= 4 || "Min 4 characters",
};
//store

//validation
const schema = computed(() => {
  return yup.object({
    email: yup
      .string()
      .required("email is required")
      .email("email is not valid"),
    password: yup.string().required("password is required").min(4),
  });
});

//layout

function Login() {
  loginForm.value?.validate().then(async (valid) => {
    if (valid.valid) {
      try {
        await EmailLogin({
          email: loginDto.email,
          password: loginDto.password,
        });
      } catch (er: any) {}
    }
  });
}
onMounted(() => {
  var t1 = gsap.timeline();
  if (process.client) {
    t1.from(".email", {
      opacity: 0,
      x: -400,
    });
    t1.from(".password", {
      opacity: 0,
      x: -400,
    });
    t1.from(".btn-login", {
      opacity: 0,
      y: -400,
    });
  }
});
definePageMeta({
  layout: "fullscreen",
});
</script>
<style lang="scss">
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px theme("colors.dark") inset !important;
  background-color: transparent;
}

.login {
  .image-control-system {
    width: 60% !important;
  }

  .v-input__details {
    display: none;
  }
}
</style>
