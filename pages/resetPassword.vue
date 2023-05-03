<template>
  <section class="reset-password">
    <div class="tw-relative">
      <div class="tw-absolute">
        <img class="" :src="Logo" alt="" srcset="" />
      </div>
      <div class="tw-absolute">
        <img class="" :src="qrSvg" alt="" srcset="" />
      </div>
    </div>

    <div class="tw-grid tw-grid-cols-12 tw-h-screen tw-w-screen">
      <div
        class="tw-relative lg:tw-col-span-5 tw-col-span-12 tw-hidden lg:tw-flex tw-justify-center tw-items-center tw-h-full"
      >
        <div class="image-password">
          <img
            class="tw-w-full"
            src="~assets/svg/register/mobile-password.svg"
            alt="Phone image"
          />
        </div>
        <div class="image-thinking tw-absolute" style="right: 10px">
          <img
            class="tw-w-full"
            :src="Thinking"
            alt="Phone image"
          />
        </div>
        <div class="image-question tw-absolute" style="right: 10px; top: 11rem">
          <img
            class="tw-w-full"
            src="~assets/svg/register/question-marks.svg"
            alt="Phone image"
          />
        </div>
      </div>
      <div
        class="tw-relative lg:tw-col-span-7 tw-col-span-12 tw-text-gray-500 tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full"
      >
        <nuxt-link
          class="tw-absolute tw-top-5 tw-cursor-pointer"
          style="right: 40px"
       :to="localePath('/')"
        >
          <img src="~assets/svg/arrowBlack.svg" alt="" srcset="" />
        </nuxt-link>
        <div
          class="md:tw-px-28 tw-px-5 tw-w-full tw-flex tw-justify-start tw-items-start tw-flex-col tw-mb-10"
        >
          <h2 class="tw-text-5xl tw-text-gray-500 tw-mb-5">
            {{ $t("forgetPassword.forgetPassword") }}?
          </h2>

          <p class="tw-text-xl tw-text-gray-500">
            {{ $t("forgetPassword.messageForgetPassword") }}
          </p>
        </div>
        <!-- :initial-values="" -->
        <Form
          :validation-schema="schema"
          ref="resendForm"
          class="tw-w-full md:tw-px-28 tw-px-5"
        >
          <!-- {{ value }} -->
          <!-- Email input -->
          <!-- <div class="tw-mb-6">
            <Field name="email" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                label="email"
                variant="underlined"
                prepend-inner-icon="mdi-email-outline"
              ></v-text-field>
            </Field>
            <ErrorMessage name="email" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div> -->
          <div class="tw-mb-6">
            <Field name="code" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                :label="$t('resetPassword.code')"
                v-model="auth.code"
                variant="underlined"
                prepend-inner-icon="mdi-lock"
              ></v-text-field>
            </Field>
            <ErrorMessage name="code" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>
          <div class="tw-mb-6">
            <Field name="newPassword" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                :label="$t('resetPassword.email')"
                variant="underlined"
                v-model="auth.password"
                prepend-inner-icon="mdi-lock"
              ></v-text-field>
            </Field>
            <ErrorMessage name="newPassword" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>

          <!-- Submit button -->
          <div
            class="tw-w-full tw-flex-col tw-flex tw-justify-center tw-items-center"
          >
            <v-btn
              @click="onSubmit"
              color="primary"
              class="tw-mt-5 text-white tw-px-10 tw-py-3 rounded-pill"
            >
              {{ $t("resetPassword.send") }}
            </v-btn>

            <div class="tw-mt-5">
              <a
                @click="resend"
                class="tw-decoration-danger tw-cursor-pointer tw-underline tw-text-danger-500"
                >{{ $t("forgetPassword.emailCode") }}</a
              >
            </div>
          </div>
        </Form>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Form, ErrorMessage, Field } from "vee-validate";
import qrSvg from '@/assets/svg/qr.svg'
import { reactive, computed, watch } from "vue";
import { useAuthorization } from "@/store/auth";
import { useStorage } from "@vueuse/core";
import Thinking from '@/assets/svg/register/thinking.svg'
import { usRoute } from "vue-router";
import Logo from '@/assets/Logo.svg';
import * as yup from "yup";
const route = useRoute();
const store = useAuthorization();
const resendForm = ref<InstanceType<typeof Form> | null>(null);
const auth = computed(() => store.authDto);
const localePath = useLocalePath()

const schema = yup.object({
  code: yup.string().required("code is required").min(4, "code is not valid"),
  newPassword: yup.string().required("new password is required").min(4),
});

definePageMeta({
  layout: "fullscreen",
});

function resend() {
  store.resendConfirmMail({ email: route.query.email });
}
function onSubmit() {
  resendForm.value?.validate().then((valid) => {
    if (valid.valid) {

      store
        .resetPassword({
          code: auth.value.code,
          email: route.query.email,
          newPassword: auth.value.password,
        })
        .then(() => {
          resetForm();
        });
    }
  });
}
function resetForm() {
  auth.value.code = "";
  auth.value.email = "";
  auth.value.password = "";
  resendForm.value?.resetForm();
}
</script>
<style lang="scss">
.password {
  .image-password {
    width: 40% !important;
  }
  .image-thinking {
    right: 20px;
  }
  .image-question {
    right: 20px;
  }
}
</style>
