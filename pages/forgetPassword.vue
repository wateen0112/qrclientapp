<template>
  <section class="password">
    <div class="tw-relative">
      <div class="tw-absolute">
        <img class="" src="~assets/Logo.svg" alt="" srcset="" />
      </div>
      <div class="tw-absolute">
        <img class="" src="~assets/svg/qr.svg" alt="" srcset="" />
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
            src="~assets/svg/register/thinking.svg"
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

        <Form
          ref="forgetPassword"
          :validation-schema="schema"
          class="tw-w-full md:tw-px-28 tw-px-5"
        >
          <!-- Email input -->
          <div class="tw-mb-6">
            <!-- {{ auth.email }} -->
            <Field name="email" v-slot="{ field }">
              <v-text-field
                v-model="auth.email"
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

          <!-- Submit button -->
          <div
            class="tw-w-full tw-flex-col tw-flex tw-justify-center tw-items-center"
          >
            <v-btn
              @click="onSubmit"
              color="primary"
              class="tw-mt-5 text-white tw-px-10 tw-py-3 rounded-pill"
            >
              {{ $t("forgetPassword.send") }}
            </v-btn>
            <div class="tw-mt-5">
              <nuxt-link
                :to="localePath('/login')"
                class="tw-decoration-danger tw-underline tw-text-danger-500"
                >{{ $t("forgetPassword.returnToLogin") }}</nuxt-link
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
import * as yup from "yup";
import { useAuthorization } from "@/store/auth";
const store = useAuthorization();
// const email = ref("");
const auth = computed(() => store.authDto);
const localePath = useLocalePath();
const forgetPassword = ref<InstanceType<typeof Form> | null>(null);
const schema = computed(() => {
  return yup.object({
    email: yup.string().required("email is required").email(),
  });
});
function onSubmit() {
  forgetPassword.value?.validate().then((valid) => {
    if (valid.valid) {
      store.forgetPassword({ email: store.authDto.email }).then(() => {});
    }
  });
}

definePageMeta({
  layout: "fullscreen",
});
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
