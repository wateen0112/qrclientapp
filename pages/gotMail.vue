<template>
  <section class="get-mail">
    <div class="tw-relative">
      <div class="tw-absolute">
        <img class="" :src="Logo" alt="" srcset="" />
      </div>
      <div class="tw-absolute">
        <img class="" src="~assets/svg/qr.svg" alt="" srcset="" />
      </div>
    </div>

    <div class="tw-grid tw-grid-cols-12 tw-h-screen tw-w-screen">
      <div
        class="tw-relative lg:tw-col-span-5 tw-col-span-12 tw-hidden lg:tw-flex tw-justify-center tw-items-center tw-h-full"
      >
        <div class="image-mobile-mail">
          <img
            class="tw-w-full"
            src="~assets/svg/register/mobile-mail.svg"
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
            {{ $t("gotMail.gotMail") }}
          </h2>

          <p class="tw-text-xl tw-text-gray-500">
            {{ $t("gotMail.messageGotMail") }}
          </p>
        </div>

        <Form
          :validation-schema="schema"
          ref="confirmeEmail"
          class="tw-w-full md:tw-px-28 tw-px-5"
        >
          <!-- Email input -->
          <!-- <div class="tw-mb-6">
            <Field name="email" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                v-model="authDto.email"
                label="your email"
                variant="underlined"
                prepend-inner-icon="mdi-email-outline"
              ></v-text-field>
            </Field>
            <ErrorMessage name="email" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div> -->
          <div class="tw-mb-6">
            <!-- code input -->
            <Field name="code" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                v-model="authDto.code"
                :label="$t('gotMail.code')"
                variant="underlined"
                prepend-inner-icon="mdi-lock"
              ></v-text-field>
              <ErrorMessage name="code" v-slot="{ message }">
                <span class="text-red-lighten-1">{{ message }}</span>
              </ErrorMessage>
            </Field>
          </div>

          <!-- Submit button -->
          <div
            class="tw-w-full tw-flex-col tw-flex tw-justify-center tw-items-center"
          >
            <v-btn
              @click="send"
              color="primary"
              class="tw-mt-5 text-white tw-px-10 tw-py-3 rounded-pill"
            >
              {{ $t("gotMail.send") }}
            </v-btn>
            <div class="tw-mt-5">
              <a
                @click="resend"
                class="tw-decoration-danger tw-cursor-pointer tw-underline tw-text-danger-500"
              >
                {{ $t("gotMail.Confirm") }}</a
              >
            </div>
          </div>
        </Form>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import Logo from '@/assets/Logo.svg'
import { reactive, computed } from "vue";
import { Form, Field, ErrorMessage, useResetForm } from "vee-validate";
import * as yup from "yup";
import { useAuthorization } from "@/store/auth";
import auth from "~/middleware/auth";
import { useRoute } from "vue-router";
const route = useRoute();
const signStore = useAuthorization();
const confirmeEmail = ref<InstanceType<typeof Form> | null>(null);
const authDto = computed(() => signStore.authDto);
const localePath = useLocalePath()
const schema = computed(() => {
  return yup.object({
    code: yup.string().required("code is required").min(4, "code is not valid"),
  });
});

// const checkDto = reactive({
//   code: "",
//   email: "",
// });

definePageMeta({
  layout: "fullscreen",
});
function send() {
  confirmeEmail.value?.validate().then((valid) => {
    if (valid.valid) {
      signStore
        .confirmMail({
          email: route.query.email,
          code: authDto.value.code,
        })
        .then(() => {
          resetForm();
        });
    }
  });
}
function resetForm() {
  authDto.value.code = "";
  confirmeEmail.value?.resetForm();
}

function resend() {
  signStore.resendConfirmMail({ email: route.query.email });
}
// function loadMail() {
//   if (process.client) {
//     checkDto.email = localStorage.getItem("emailInit");
//   }
// }
// loadMail();
</script>
<style lang="scss">
.get-mail {
  .mobile-mail {
    width: 65% !important;
  }
}
</style>
