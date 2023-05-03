<template>
  <div class="VCardPlus">
    <!-- <template #content-Info> -->
    <div
      class="tw-w-full tw-text-gray-500 tw-rounded-lg tw-shadow-md tw-relative tw-flex tw-flex-col tw-justify-center tw-items-center"
    >
      <div
        class="header tw-text-white tw-w-[100%]"
        :style="{ backgroundColor: vCardPlusDto.primaryColor }"
      >
        <!--img-->
        <div
          class="tw-my-3 tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-object-contain"
        >
          <p class="tw-text-2xl">{{ vCardPlusDto.company }}</p>

          <div v-if="vCardPlusDto.imageFile || vCardPlusDto.imageUrl">
            <img
              style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%"
              :src="getFileUrl(vCardPlusDto.imageUrl)"
            />
          </div>
        </div>
        <!--name & job-->
        <div class="tw-flex tw-flex-col tw-justify-center tw-text-center text-white">
          <div class="tw-flex tw-justify-center tw-text-center">
            <p>{{ vCardPlusDto.firstName }}</p>
            <p class="tw-mx-2">{{ vCardPlusDto.lastName }}</p>
          </div>
          <p>{{ vCardPlusDto.job }}</p>
        </div>
        <div style="border-top: 1px solid; margin-top: 12px">
          <v-tabs fixed-tabs :style="{ backgroundColor: vCardPlusDto.buttonColor }">
            <v-tab>
              <a :href="`tel:${vCardPlusDto.number}`">
                <div class="tw-flex tw-flex-col tw-items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.0725 16.9579C19.0717 16.9854 19.07 17.0131 19.0672 17.0407C19.031 17.4284 18.8302 17.7823 18.5158 18.0116C14.6953 20.8027 8.62263 19.5038 4.3903 14.9898C0.158728 10.4757 -0.745357 4.3308 2.28622 0.698889C2.53535 0.399763 2.90162 0.222459 3.29061 0.211263C3.67848 0.200031 4.05266 0.355613 4.31697 0.637569L7.18979 3.70214C7.43607 3.96428 7.56605 4.30695 7.5544 4.66768L7.55438 4.66843C7.54273 5.02897 7.39166 5.36275 7.12818 5.60975L5.40376 7.22682L5.58746 7.65193C6.89519 10.6695 9.22949 13.0852 12.1871 14.4945L13.9282 12.863C14.1903 12.6168 14.5337 12.4868 14.8945 12.4984C15.255 12.5101 15.5893 12.6619 15.8358 12.9252L18.7079 15.989C18.9536 16.2511 19.0841 16.6004 19.0725 16.9579ZM1.85844 5.69431C1.76983 8.4379 2.99509 11.5747 5.35128 14.0889C9.0672 18.0519 14.5084 19.3077 17.7392 16.9477L14.874 13.8255L12.7655 15.7579C12.573 15.9383 12.2922 15.9864 12.0503 15.8807C8.60105 14.3681 5.8766 11.6317 4.37864 8.1752L4.01011 7.32474C3.89939 7.06887 3.96177 6.7722 4.1642 6.58244L6.22714 4.64857L3.35598 1.53861C2.39719 2.66355 1.9095 4.11333 1.85844 5.69431Z"
                      fill="white"
                    />
                  </svg>

                  Call
                </div>
              </a>
            </v-tab>
            <v-tab style="border-left: 1px solid; border-right: 1px solid">
              <a :href="`mailto:${vCardPlusDto.email}`">
                <div class="tw-flex tw-flex-col tw-items-center">
                  <svg
                    width="22"
                    height="16"
                    viewBox="0 0 22 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.61469 8.50684L0 1.55664V14.5277L7.61469 8.50684Z"
                      fill="white"
                    />
                    <path
                      d="M13.6714 9.13672L11.3008 11.3008C11.1167 11.4714 10.8294 11.4714 10.6453 11.3008L8.31062 9.13672L0.875519 15.0184H21.1245L13.6714 9.13672Z"
                      fill="white"
                    />
                    <path
                      d="M10.982 10.3212L21.2278 0.982422H0.736328L10.982 10.3212Z"
                      fill="white"
                    />
                    <path
                      d="M14.3673 8.50723L22 14.528V1.53906L14.3673 8.50723Z"
                      fill="white"
                    />
                  </svg>

                  Email
                </div>
              </a>
            </v-tab>
            <v-tab>
              <a
                :href="`https://www.google.com/maps/place/${vCardPlusDto.address.streetName},
               ${vCardPlusDto.address.storeNumber},
               ${vCardPlusDto.address.regionNumber},
               ${vCardPlusDto.address.city},
               ${vCardPlusDto.address.country}

               `"
                target="_blank"
              >
                <div class="tw-flex tw-flex-col tw-items-center">
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 15 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6456 4.97777C14.5683 4.71076 14.4109 4.42663 14.2947 4.17753C12.901 1.10247 9.85699 0 7.39898 0C4.10808 0 0.483932 2.02649 0 6.20421V7.05777C0 7.09338 0.0132039 7.41313 0.0326953 7.5733C0.303898 9.56417 2.0139 11.6802 3.29132 13.671C4.66536 15.8044 6.09159 17.9021 7.5044 20C8.37523 18.6313 9.24333 17.2447 10.0947 15.9108C10.3265 15.5199 10.5962 15.1289 10.8284 14.7552C10.9831 14.5067 11.2786 14.2578 11.414 14.0266C12.788 11.7156 15 9.38649 15 7.09338V6.15088C15.0002 5.90236 14.6651 5.03128 14.6456 4.97777ZM7.45892 9.26194C6.49148 9.26194 5.43307 8.81764 4.91037 7.59101C4.8324 7.39561 4.83869 7.00445 4.83869 6.96883V6.4175C4.83869 4.8536 6.28462 4.1423 7.54234 4.1423C9.09096 4.1423 10.2885 5.28 10.2885 6.70222C10.2885 8.12463 9.00733 9.26194 7.45892 9.26194Z"
                      fill="white"
                    />
                  </svg>
                  Direction
                </div></a
              >
            </v-tab>
          </v-tabs>
        </div>
      </div>

      <!--Your information -->
      <div class="hidden tw-pb-5 tw-w-[100%] tw-bg-white">
        <div class="tw-p-5">
          <p>{{ vCardPlusDto.summary }}</p>

          <hr v-if="vCardPlusDto.summary" class="tw-my-3" />

          <div v-if="vCardPlusDto.website" class="tw-flex">
            <div class="tw-my-2">
              <v-icon>mdi-web</v-icon>
            </div>
            <div class="tw-mx-3">
              <p>{{ vCardPlusDto.website }}</p>
              <p>Website</p>
            </div>
          </div>

          <hr v-if="vCardPlusDto.website" class="tw-my-3" />

          <div v-if="vCardPlusDto.number" class="tw-flex">
            <v-icon>mdi-cellphone</v-icon>
            <div class="tw-mx-3">
              <p>{{ vCardPlusDto.number }}</p>
              <p>Mobile</p>
            </div>
          </div>
          <div v-if="vCardPlusDto.phone" class="tw-flex tw-my-2">
            <v-icon>mdi-phone</v-icon>
            <div class="tw-mx-3">
              <p>{{ vCardPlusDto.phone }}</p>
              <p>Phone</p>
            </div>
          </div>
          <div v-if="vCardPlusDto.fax" class="tw-flex tw-my-2">
            <v-icon>mdi-fax</v-icon>
            <div class="tw-mx-3">
              <p>{{ vCardPlusDto.fax }}</p>
              <p>Fax</p>
            </div>
          </div>

          <hr v-if="vCardPlusDto.email" class="tw-my-3" />

          <div v-if="vCardPlusDto.email" class="tw-flex">
            <div class="tw-my-2">
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.61469 8.50684L0 1.55664V14.5277L7.61469 8.50684Z"
                  fill="#B3B4BB"
                />
                <path
                  d="M13.6714 9.13672L11.3008 11.3008C11.1167 11.4714 10.8294 11.4714 10.6453 11.3008L8.31062 9.13672L0.875519 15.0184H21.1245L13.6714 9.13672Z"
                  fill="#B3B4BB"
                />
                <path
                  d="M10.982 10.3212L21.2278 0.982422H0.736328L10.982 10.3212Z"
                  fill="#B3B4BB"
                />
                <path
                  d="M14.3673 8.50723L22 14.528V1.53906L14.3673 8.50723Z"
                  fill="#B3B4BB"
                />
              </svg>
            </div>
            <div class="tw-mx-3">
              <p>{{ vCardPlusDto.email }}</p>
              <p>Email</p>
            </div>
          </div>

          <hr v-if="vCardPlusDto.company" class="tw-my-3" />

          <div v-if="vCardPlusDto.company" class="tw-flex">
            <div class="tw-my-2">
              <v-icon>mdi-bag-checked</v-icon>
            </div>
            <div class="tw-mx-3">
              <p>{{ vCardPlusDto.company }}</p>
              <p>Job</p>
            </div>
          </div>

          <hr v-if="vCardPlusDto.job" class="tw-my-3" />

          <div v-if="vCardPlusDto.job" class="tw-flex">
            <div class="tw-my-2">
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 5.50136C7.33333 2.00136 11.2 -2.89864 16 5.50136"
                  stroke="#B3B4BB"
                />
                <rect y="5" width="22" height="15" rx="4" fill="#B3B4BB" />
              </svg>
            </div>
            <div class="tw-mx-3">
              <p>{{ vCardPlusDto.job }}</p>
              <p>Job</p>
            </div>
          </div>

          <hr v-if="vCardPlusDto.address.country" class="tw-my-3" />

          <div
            v-if="vCardPlusDto.address.city"
            class="tw-flex tw-flex-col tw-gap-2 tw-mt-2"
          >
            <div class="tw-flex">
              <v-icon>mdi-map-marker-outline</v-icon>
              <h1 class="tw-mx-1">Address</h1>
            </div>
            <div class="tw-flex tw-flex-col tw-mx-6">
              <p v-if="vCardPlusDto.address.streetName" class="tw-flex tw-gap-6">
                <span>{{ vCardPlusDto.address.streetName }}</span>
                <span>{{ vCardPlusDto.address.storeNumber }}</span>
              </p>
              <p v-if="vCardPlusDto.address.storeNumber" class="tw-flex tw-gap-6">
                <span>{{ vCardPlusDto.address.regionNumber }}</span>
                <span>{{ vCardPlusDto.address.city }}</span>
              </p>

              <p v-if="vCardPlusDto.address.country">
                {{ vCardPlusDto.address.country }}
              </p>
            </div>
          </div>
        </div>
        <!-- Social media -->

        <div class="tw-bg-white social-media tw-mt-5 tw-mx-5 tw-mb-5">
          <h4
            v-if="
              vCardPlusDto.socialMediaChannels &&
              vCardPlusDto.socialMediaChannels.length > 0
            "
            class="tw-mb-4 tw-text-lg tw-text-gray-700"
          >
            {{ $t("dynamicQr.businessDynamic.channels") }}:
          </h4>
          <ul
            v-if="
              vCardPlusDto.socialMediaChannels &&
              vCardPlusDto.socialMediaChannels.length > 0
            "
            class="tw-flex tw-flex-wrap tw-gap-4 tw-mt-4"
          >
            <li
              v-for="item in vCardPlusDto.socialMediaChannels"
              :key="item.url"
              class="tw-flex tw-flex-row"
            >
              <v-icon size="x-large" class="tw-text-gray-600 tw-my-auto tw-mx-3">{{
                item.iconName
              }}</v-icon>
              <div class="tw-flex tw-flex-col">
                <a variant="plain" :href="item.url" class="tw-font-bold tw-text-lg">
                  {{ item.name }}
                </a>
                <span>{{ item.text }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--icon share-->
      <div class="tw-absolute" style="right: 10px; bottom: 10px">
        <v-btn
          class="ma-2 text-white"
          :color="vCardPlusDto.buttonColor"
          icon="mdi-share-variant-outline"
          @click="shareData"
        ></v-btn>
      </div>
    </div>

    <!-- </template> -->
  </div>
</template>
<script setup lang="ts">
import { useQrvCardPlusDynamic } from "@/store/qrCodes/dynamic/vCardPlus";
import { storeToRefs } from "pinia";
import { AddVCardPlusDto } from "~/api/dto/qrCodes/dynamic/VcardPlus";
import { vCardPlusController } from "~/api/endpoints/vCardPlusDynamic";
const route = useRoute();
const vCardPlusStore = useQrvCardPlusDynamic();
const { getFileUrl } = useFile();
const { vCardPlusDto } = storeToRefs(vCardPlusStore);

const props = defineProps({
  fetchData: {
    type: Boolean,
    default: true,
  },
});

const shareData = async () => {
  try {
    await navigator.share({
      title: "Share",
      text: "",
      url: route.fullPath,
    });
  } catch (error) {}
};

//GetById PdfDto
if (props.fetchData) {
  const { data } = await useCustomFetch<AddVCardPlusDto>(
    vCardPlusController.GET_QR_VCARD_PLUS + `?id=${route.params.id}`
  );
  if (data.value) {
    vCardPlusDto.value = data.value;
  }
}
definePageMeta({ layout: "fullscreen" });
</script>
<style>
hr {
  padding: 0.5px;
}
.v-tab__slider {
  height: 0px !important;
}
</style>
