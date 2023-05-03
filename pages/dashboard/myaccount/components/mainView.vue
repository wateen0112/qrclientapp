<template>
  <v-card>
    <div class="tw-flex tw-justify-center">
      <v-btn @click="emailFlag = true" color="success" variant="plain">
        change email
      </v-btn>

      <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="tw-cursor-pointer px-10"
            color="error" variant="plain">
            {{ $t("myAccount.change") }}
          </v-btn>
        </template>

        <v-card>
          <v-card-title> {{ $t("myAccount.change") }} </v-card-title>
          <v-card-text>
            <div>
              <Field name="currPassword" type="password"
                v-slot="{ field }">
                <v-text-field v-bind="field" class="tw-py-2"
                  :label="$t('myAccount.currPassword')"
                  v-model="passwordDto.currentPassword"></v-text-field>
              </Field>
              <ErrorMessage as="div" class="mt-1 text-xs text-error"
                name="currPassword" v-slot="{ message }">{{ message }}
              </ErrorMessage>
              <Field name="newPassword" type="password" v-slot="{ field }">
                <v-text-field v-bind="field" class="tw-py-2"
                  :label="$t('myAccount.password')"
                  v-model="passwordDto.newPassword"></v-text-field>
              </Field>
              <ErrorMessage as="div" class="mt-1 text-xs text-error"
                name="newPassword" v-slot="{ message }">{{ message }}
              </ErrorMessage>
              <Field name="confirmNewPassword" type="password"
                v-slot="{ field }">
                <v-text-field v-bind="field" class="tw-py-2"
                  :label="$t('myAccount.confirmNewPasaword')"
                  v-model="passwordDto.confirmNewPassword"></v-text-field>
              </Field>
              <ErrorMessage as="div" class="mt-1 text-xs text-error"
                name="confirmNewPassword" v-slot="{ message }">{{
                  message
                }}</ErrorMessage>
            </div>
          </v-card-text>
          <hr />
          <v-card-actions>
            <div class="tw-p-2">
              <v-btn color="primary" variant="outlined"
                @click="changePass">
                {{ $t("myAccount.change") }}
              </v-btn>
              <v-btn color="error" variant="outlined"
                @click="dialog = false">
                {{ $t("myAccount.back") }}
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <Form :initial-values="profile" ref="formCustomer" lazy-validation
      :validation-schema="schema" v-slot="{ validate }">
      <div class="lg:tw-grid lg:tw-grid-cols-2 block">
        <div v-if="!emailFlag" class="tw-flex tw-items-center">
          <h1 class="tw-px-20 tw-py-5 tw-text-lg tw-font-bold">
            {{ profile.email }}
          </h1>
        </div>
        <div v-else>
          <Field name="email" v-slot="{ field }">
            <v-text-field v-model="emailDto" :counter="10"
              class="tw-px-20 tw-py-5" :label="$t('myAccount.email')"
              required></v-text-field>
          </Field>
          <div class="tw-text-left tw-px-20">
            <ErrorMessage class="pl-50" name="name" v-slot="{ message }">
              <span class="text-red-lighten-1 text-center">{{
                message
              }}</span>
            </ErrorMessage>
          </div>
        </div>
        <h1 class="tw-px-20 tw-py-5 tw-text-lg tw-font-bold">
          {{ $t("myAccount.dateCreated") }} : {{
            profile.dateCreated.split("T")[0]
          }}
        </h1>
        <div>
          <Field name="name" v-slot="{ field }">
            <v-text-field v-model="profile.name" v-bind="field"
              :counter="10" class="tw-px-20 tw-py-5"
              :label="$t('myAccount.name')" required></v-text-field>
          </Field>
          <div class="tw-text-left tw-px-20">
            <ErrorMessage class="pl-50" name="name" v-slot="{ message }">
              <span class="text-red-lighten-1 text-center">{{
                message
              }}</span>
            </ErrorMessage>
          </div>
        </div>

        <div>
          <Field name="street" v-slot="{ field }">
            <v-text-field class="tw-px-20 tw-py-5"
              :label="$t('myAccount.street')" v-model="profile.street"
              v-bind="field" required></v-text-field>
          </Field>

          <div class="tw-text-left tw-px-20">
            <ErrorMessage class="pl-50" name="street" v-slot="{ message }">
              <span class="text-red-lighten-1 text-center">{{
                message
              }}</span>
            </ErrorMessage>
          </div>
        </div>
        <div>
          <Field name="phoneNumber" v-slot="{ field }">
            <v-text-field class="tw-px-20 tw-py-5"
              :label="$t('myAccount.phone')" v-bind="field"
              v-model="profile.phoneNumber" required></v-text-field>
          </Field>
          <div class="tw-text-left tw-px-20">
            <ErrorMessage name="phoneNumber" v-slot="{ message }">
              <span class="text-red-lighten-1 text-center">{{
                message
              }}</span>
            </ErrorMessage>
          </div>
        </div>
        <div>
          <Field name="company" v-slot="{ field }">
            <v-text-field class="tw-px-20 tw-py-5"
              :label="$t('myAccount.company')" v-model="profile.company"
              v-bind="field" required></v-text-field>
          </Field>
          <div class="tw-text-left tw-px-20">
            <ErrorMessage class="pl-50" name="company"
              v-slot="{ message }">
              <span class="text-red-lighten-1 text-center">{{
                message
              }}</span>
            </ErrorMessage>
          </div>
        </div>
        <div>
          <v-select class="tw-px-20 tw-py-5"
            :label="$t('myAccount.country')" v-model="profile.countryId"
            :items="countries" item-title="country" required
            item-value="id"></v-select>
        </div>
        <div>
          <v-select class="tw-px-20 tw-py-5"
            :label="$t('myAccount.industry')" v-model="profile.industryId"
            :items="industries" item-title="name" item-value="id"
            required></v-select>
        </div>
        <div>
          <v-select class="tw-px-20 tw-py-5" :label="$t('myAccount.city')"
            v-model="profile.cityId" required
            :items="countries.find((el) => el.id == profile.countryId)?.cities"
            item-title="city" item-value="id"></v-select>
        </div>
        <div>
          <Field name="website" v-slot="{ field }">
            <v-text-field class="tw-px-20 tw-py-5"
              :label="$t('myAccount.website')" v-model="profile.website"
              v-bind="field" required></v-text-field>
          </Field>

          <div class="tw-text-left tw-px-20">
            <ErrorMessage class="pl-50" name="website"
              v-slot="{ message }">
              <span class="text-red-lighten-1 text-center">{{
                message
              }}</span>
            </ErrorMessage>
          </div>
        </div>
        <div>
          <label class="tw-mx-20 tw-text-sm">{{ $t("myAccount.zipCode") }}
            :</label>
          <v-text-field v-if="profile.cityId" class="tw-px-20 tw-py-2"
            disabled :value="
              countries
                .find((el) => el.id == profile.countryId)
                ?.cities.map((el) => el.zipCode)
            "></v-text-field>
        </div>
      </div>

      <div class="tw-justify-center tw-flex tw-items-center tw-p-6">
        <v-btn color="black" class="px-10" @click="submit">
          {{ $t("myAccount.edit") }}
        </v-btn>
      </div>
    </Form>
  </v-card>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/store/dashboard/user";
import { ErrorMessage, Form, Field } from "vee-validate";
import { storeToRefs } from "pinia";
import { useSettings } from "@/store/settings";
import { useCountryStore } from "~/store/dashboard/country";

import * as yup from "yup";
const localePath = useLocalePath()
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const userStore = useUserStore();
const industryStore = useSettings();
const countryStore = useCountryStore();
const dialog = ref();
industryStore.getIndustries();
countryStore.getAllCountries();
userStore.getUserProfile();
const { countries } = storeToRefs(countryStore);
const { profile } = storeToRefs(userStore);
const { industries } = storeToRefs(industryStore);
const { passwordDto } = storeToRefs(userStore);
const { t } = useI18n();
const formCustomer = ref<InstanceType<typeof Form> | null>(null);
const schema = yup.object().shape({
  name: yup.string().required(t("myAccount.errors.name")),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, t("myAccount.errors.phone2"))
    .nullable()
    .required(t("myAccount.errors.phone2"))
    .nullable(),
  company: yup.string().required(t("myAccount.errors.company")).nullable(),
  street: yup.string().required(t("myAccount.errors.street")).nullable(),
  website: yup.string().required(t("myAccount.errors.website")).nullable(),
  currPassword: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(4, "كلمة المرور يجب ان تتكون من 4 رموز او اكثر"),
  newPassword: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(4, "كلمة المرور يجب ان تتكون من 4 رموز او اكثر"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "كلمة السر يجب ان تكون متطابقة"),
});
const emailDto = ref("");
const emailFlag = ref(false);
definePageMeta({
  layout: "dashboard",
});
function changePass() {
  userStore.changePassword(passwordDto.value).then(() => {
    dialog.value = false;
    passwordDto.value.confirmNewPassword = "";
    passwordDto.value.currentPassword = "";
    passwordDto.value.newPassword = "";
  });
}

function submit() {
  const dto = reactive({
    name: profile.value.name ?? "",
    phoneNumber: profile.value.phoneNumber ?? "",
    company: profile.value.company ?? "",
    street: profile.value.street ?? "",
    website: profile.value.website ?? "",
    cityId: profile.value.cityId ?? "",
    countryId: profile.value.countryId ?? "",
    industryId: profile.value.industryId ?? "",
  });

  formCustomer.value?.validate().then((valid) => {
    if (valid.valid) {
      userStore.modifyProfile(dto);
    }
  });

  if (emailDto.value !== profile.value.email && emailFlag && emailDto.value !== "") {
    userStore.sendEmailConfirmCode({
      email: emailDto.value,
    });
    navigateTo(localePath("/gotMail"));
  }
}
</script>
<style scoped>
.my-input {
  @apply tw-bg-white tw-border-[2px] tw-border-solid tw-border-gray-300 tw-px-5 tw-py-1 tw-rounded-md tw-min-w-[215.5px];
}

.v-field,
.v-field--appended,
.v-field--variant-solo,
.v-theme--mainTheme {
  box-shadow: none !important;
}

.v-menu__content {
  box-shadow: none;
}
</style>
