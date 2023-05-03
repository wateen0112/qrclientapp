<template>
  <div class="websitePage tw-grid">
    <!--name QR-->
    <Form :validation-schema="schema" ref="qrForm">
      <div class="tw-col-span-12 lg:tw-col-span-6">
        <div class="nameQr tw-flex tw-mt-5">
          <p class="tw-p-4 tw-font-bold">{{ $t("static.website.name") }}</p>
          <Field name="QrName" v-slot="{ field }">
            <v-text-field
              v-bind="field"
              v-model="qrWebsiteDto.qrName"
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
        <div class="titleWebsite tw-flex tw-text-center tw-items-center tw-p-4">
          <svg
            width="33"
            height="24"
            viewBox="0 0 33 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4371 8.16933C11.0187 7.58771 11.7562 7.2165 12.5694 7.09608C13.0213 7.02925 13.3333 6.60842 13.2665 6.15682C13.1996 5.70489 12.7798 5.39191 12.3272 5.46007C11.16 5.63277 10.102 6.16542 9.26758 6.9998L4.49849 11.7686C2.36688 13.9005 2.36688 17.3694 4.49849 19.5013C5.56446 20.5676 6.96492 21.1003 8.36504 21.1003C9.76516 21.1003 11.1656 20.5673 12.2313 19.5013L16.9997 14.7326C17.8059 13.927 18.332 12.9073 18.5222 11.7844C18.5983 11.3342 18.2949 10.9074 17.8446 10.831C17.3977 10.7532 16.9673 11.0582 16.8912 11.5085C16.7588 12.291 16.3919 13.0016 15.8302 13.563L11.0614 18.3318C9.57493 19.8189 7.15482 19.8189 5.66802 18.3318C4.18088 16.8447 4.18088 14.4252 5.66802 12.9381L10.4371 8.16933Z"
              fill="#263238"
            />
            <path
              d="M21.3178 9.128C21.2235 8.68004 20.7818 8.39651 20.3378 8.48915C19.8905 8.58344 19.6047 9.02213 19.699 9.4691C20.1711 11.7069 19.4915 14.0039 17.8817 15.6142L13.1129 20.3826C11.8471 21.6484 10.1611 22.3458 8.365 22.3458C6.5692 22.3458 4.88322 21.6487 3.61709 20.3826C0.999142 17.7646 0.999142 13.505 3.61709 10.8871L8.38585 6.11833C10.0602 4.44394 12.5303 3.77432 14.8303 4.37116C15.2726 4.48662 15.7239 4.22062 15.8384 3.77796C15.9532 3.33595 15.6875 2.88469 15.2455 2.76988C12.3788 2.02681 9.30294 2.86186 7.21632 4.94881L2.44757 9.71756C0.869122 11.296 0 13.3972 0 15.635C0 17.8728 0.869122 19.974 2.44757 21.5524C4.02601 23.1309 6.12752 24 8.365 24C10.6028 24 12.7043 23.1309 14.2824 21.5524L19.0512 16.784C21.0584 14.7768 21.9057 11.9147 21.3178 9.128Z"
              fill="#263238"
            />
            <path
              d="M22.2148 15.8305C21.6742 16.3708 20.9927 16.7327 20.2433 16.8763C19.795 16.9626 19.5009 17.3957 19.5872 17.8447C19.663 18.2403 20.0097 18.5156 20.3985 18.5156C20.4501 18.5156 20.5027 18.5106 20.5556 18.5007C21.6312 18.2943 22.6095 17.7755 23.3846 17L28.1534 12.2313C30.285 10.0996 30.285 6.63043 28.1534 4.49849C26.0218 2.36688 22.5522 2.36688 20.4206 4.49849L15.6519 9.26725C14.975 9.94415 14.4866 10.7894 14.2395 11.7112C14.1214 12.1522 14.3834 12.6058 14.8244 12.7242C15.2668 12.8413 15.7194 12.5803 15.8375 12.139C16.0092 11.4978 16.3496 10.9089 16.8217 10.4368L21.5902 5.66802C23.0776 4.18121 25.4971 4.18188 26.9839 5.66802C28.4707 7.15515 28.4707 9.57493 26.9839 11.0617L22.2148 15.8305Z"
              fill="#263238"
            />
            <path
              d="M30.204 2.44732C26.9412 -0.815442 21.6319 -0.816104 18.3691 2.44732L13.6004 7.21574C11.5594 9.25704 10.7217 12.1622 11.3592 14.9872C11.4598 15.4325 11.9028 15.7121 12.3481 15.6118C12.7938 15.5113 13.0733 15.0686 12.9728 14.623C12.4609 12.355 13.1329 10.0229 14.7702 8.38527L19.5387 3.61684C22.1566 0.999224 26.4165 0.998893 29.0345 3.61684C31.6524 6.2348 31.6524 10.4947 29.0345 13.1127L24.266 17.8811C22.6089 19.5379 20.2516 20.2033 17.9632 19.6637C17.5185 19.5578 17.0732 19.8337 16.968 20.278C16.8628 20.7224 17.1381 21.168 17.5824 21.2732C18.2345 21.4274 18.8905 21.5025 19.5396 21.5025C21.7308 21.5025 23.8422 20.6439 25.4352 19.0506L30.2037 14.2822C33.4674 11.0198 33.4674 5.71041 30.204 2.44732Z"
              fill="#263238"
            />
          </svg>
          <h1 class="tw-px-4">{{ $t("static.website.title") }}</h1>
        </div>
      </div>
      <!--form-->
      <div class="tw-col-span-12 lg:tw-col-span-11">
        <div
          class="formWebsite tw-rounded tw-p-5 tw-text-gray-400 tw-bg-white tw-flex tw-flex-col"
        >
          <!--title form-->
          <p class="tw-font-bold tw-text-sm">
            {{ $t("static.website.description") }}
          </p>

          <!--input Website-->
          <div class="tw-flex tw-mt-4">
            <p class="tw-px-2 tw-pt-4 tw-font-bold tw-text-sm">
              {{ $t("static.website.website") }}
            </p>
            <Field name="website" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                label="http:llwww.my-website.com"
                variant="underlined"
                @keypress="qrWebsiteDto.website= qrStore.httpsCheck($event.target.value)"
                v-model="qrWebsiteDto.website"
         
              ></v-text-field>
            </Field>
            <ErrorMessage name="website" v-slot="{ message }">
              <span class="text-red-lighten-1">{{ message }}</span>
            </ErrorMessage>
          </div>
        </div>
      </div>
      <!--text bottom-->
      <div class="textCode tw-col-span-12 tw-flex tw-justify-center tw-mt-5">
        <p>{{ $t("static.website.message") }}</p>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { useQrStatic } from "@/store/qrCodes/static/index";
import { useQrStore } from "~/store/qrCodes/qr";
import { storeToRefs } from "pinia";
const { t } = useI18n();
const qrForm = ref<InstanceType<typeof Form> | null>(null);
const { download } = useFile();
const timer = ref();
const currStatic = storeToRefs(useQrStatic())
const qrWebsiteDto = reactive({
  qrName: "",
  website: "",
  saveChanges: true,
});
const schema = computed(() => {
  return yup.object({
    QrName: yup.string().required(t("static.website.validation.name")),
    website: yup.string().required(t("static.website.validation.website")),
  });
});
//store
const store = useQrStatic();
const qrStore = useQrStore();
qrWebsiteDto.website = "https://" + qrWebsiteDto.website;
//add QrWebsite
function craeteWebsite(save = false) {
  store.addWebsite({ ...qrWebsiteDto, qrStyle: qrStore.qrStyleDto, saveChanges: save });
}

// Watch the StyleQr Dto

watch(qrStore.qrStyleDto, (nv) => {
  clearTimeout(timer.value);
  if (nv && typeof nv === "object") {
    timer.value = setTimeout(() => {
      craeteWebsite(false);
    }, 1500);
  }
});

// Watch the StaticQR Dto
watch(qrWebsiteDto, () => {
  clearTimeout(timer.value);

  timer.value = setTimeout(() => {
    qrForm.value?.validate().then((e) => {
      if (e.valid) {
        craeteWebsite();
      } else qrStore.$patch({ qrPreview: "" });
    });
  }, 1500);
});

//layout
definePageMeta({
  layout: "static-code-layout",
});

onMounted(() => {
  currStatic.value='website'
  // ? Download On Click (Save & Download)
  qrStore.emitter.on("download", () => {
    craeteWebsite(true);
    download(qrStore.qrPreview, qrWebsiteDto.qrName);
  });

  // ? RESET THE PREVIEW
  qrStore.$patch({
    qrPreview: "",
  });
});
</script>
<style lang="scss">
.websitePage {
  .nameQr p {
    font-size: 13px;
    color: #7b7b7b;
  }

  .titleWebsite h1 {
    font-size: 25px;
  }

  .formWebsite {
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .textCode p {
    font-weight: bold;
  }
}
</style>
