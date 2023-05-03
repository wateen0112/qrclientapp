<template>
  <Form class="p-2" :validation-schema="schema" ref="formContact">
    <v-form>
      <v-container>
        <v-col>
          <Field v-slot="{ field }" name="name">
            <v-text-field
              v-model="contactDto.title"
              v-bind="field"
              variant="underlined"
              label=" Title"
            ></v-text-field>
          </Field>
          <ErrorMessage name="name" class="tw-text-secondary text-sm pt-1">
          </ErrorMessage>
        </v-col>
        <v-col>
          <Field v-slot="{ field }" name="message">
            <v-text-field
              v-model="contactDto.content"
              v-bind="field"
              variant="underlined"
              label=" Message"
            ></v-text-field>
          </Field>
          <ErrorMessage name="message" class="tw-text-secondary text-sm pt-1">
          </ErrorMessage>
        </v-col>
        <v-divider></v-divider>

        <div class="tw-mt-2">
          <v-btn variant="flat" color="primary" @click="submit" class="tw-m-2 text-white"
            >Send</v-btn
          >
          <v-btn variant="outlined" color="primary" @click="cancel" c lass="tw-m-2"
            >Cancel</v-btn
          >
        </div>
      </v-container>
    </v-form>
  </Form>
</template>
<script lang="ts" setup>
import { ErrorMessage, Field, Form } from "vee-validate";
import { useContactUs } from "@/store/contactUs/index";
import * as yup from "yup";
import type { AddContact } from "@/api/dto/dashboard/contactUs";
const formContact = ref<InstanceType<typeof Form> | null>(null);
const emit = defineEmits(["formSubmit"]);
const store = useContactUs();
const contactDto = reactive<AddContact>({
  title: "",
  content: "",
});
function submit() {
  formContact.value?.validate().then((valid) => {
    if (valid.valid) {
      store.addContact(contactDto).then(() => {
        emit("formSubmit");
      });
    }
  });
}
function cancel() {
  emit("formSubmit");
}
const schema = computed(() => {
  return yup.object({
    name: yup.string().required("  title message is required"),
    message: yup.string().required("  message is required"),
  });
});
</script>
