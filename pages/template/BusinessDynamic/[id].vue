<script setup lang="ts">
import { useBusinessDynamic } from "~/store/qrCodes/dynamic/business";
import { storeToRefs } from "pinia";
import { AddBussinessDto } from "@/api/dto/qrCodes/dynamic/Businnes";
import { BusinessDynamicController } from "~/api/endpoints/businessDynamic";
const businessStore = useBusinessDynamic();
const { getFileUrl } = useFile();
const { businessDto } = storeToRefs(businessStore);
definePageMeta({
  layout: "fullscreen",
});
const route = useRoute();
const props = defineProps({
  fetchData: {
    type: Boolean,
    default: true,
  },
});

const icons = computed(() => {
  if (businessDto.value.featureIcons[0] == null)
    return businessDto.value.featureIcons?.filter((ele) => ele != null);
});

if (props.fetchData) {
  const { data } = await useCustomFetch<AddBussinessDto>(
    BusinessDynamicController.GET_QR_Business + `?id=${route.params.id}`
  );
  if (data.value) {
    businessDto.value = data.value;
    for (let i = 0; i < businessDto.value.openingHours.length; i++)
      if ((businessDto.value.openingHours[i].checked = true)) {
        businessDto.value.openingHours[i].checked = true;
      } else businessDto.value.openingHours[i].checked = false;
  }
}
function removeIconFeatures(icon: string, i: number) {
  businessDto.value.featureIcons = businessDto.value.featureIcons.filter(
    (ele) => ele != icon
  );
}
const shareData = async () => {
  try {
    await navigator.share({
      title: "Share",
      text: "",
      url: route.fullPath,
    });
  } catch (error) {}
};
function go() {
  window.open(getFileUrl(businessDto.value.pdfUrl));
}
</script>

<template>
  <div class="business">
    <div
      class="tw-w-full tw-h-full tw-text-gray-500 tw-rounded-lg tw-shadow-md"
      :style="{ backgroundColor: businessDto.primaryColor }"
    >
      <div
        :class="
          route.meta.layout == 'fullscreen'
            ? 'tw-flex tw-justify-center tw-items-center tw-flex-col'
            : ''
        "
      >
        <div class="header tw-p-4 tw-text-white tw-text-center tw-text-2xl">
          <span>{{ businessDto.company }}</span>
        </div>

        <div v-if="businessDto.imageUrl">
          <img
            :class="
              route.meta.layout == 'fullscreen'
                ? 'tw-w-full tw-h-[400px] tw-object-cover'
                : 'tw-w-full tw-h-[230px] tw-object-cover'
            "
            :src="getFileUrl(businessDto.imageUrl)"
          />
        </div>
        <div
          class="tw-text-white tw-flex tw-justify-start tw-items-start tw-flex-col tw-gap-2"
        >
          <div class="tw-my-5 tw-mx-5">
            <!-- <h2 class="tw-text-2xl">{{codeStore.codeDto.name}}</h2> -->
            <h2 class="tw-text-2xl">{{ businessDto.headline }}</h2>
            <!-- <p>
              {{ businessDto.summary }}
            </p> -->

            <div
              class="tw-text-gray-600 tw-flex tw-flex-col md:tw-flex-row tw-gap-2 my-3"
            >
              <a
                v-if="businessDto.button.name"
                target="_blank"
                class="tw-text-dark tw-bg-white tw-rounded tw-text-base tw-p-2"
                :href="businessDto.button.url"
                >{{ businessDto.button.name }}</a
              >

              <a
                v-if="businessDto.pdfUrl"
                target="_blank"
                class="tw-text-dark tw-rounded tw-text-base"
                @click="go()"
              >
                <v-btn> {{ businessDto.pdfName }} </v-btn></a
              >
            </div>
          </div>
        </div>
      </div>
      <div
        :class="route.meta.layout == 'fullscreen' ? 'md:tw-px-40 tw-px-10' : ''"
        class="tw-bg-white tw-pb-5 tw-relative"
        style="border-bottom-left-radius: 5px; border-bottom-right-radius: 5px"
      >
        <!-- opening-hours -->
        <div class="opening-hours tw-mt-6 tw-mx-5">
          <h4 class="tw-mb-4 tw-text-lg tw-text-gray-700" v-if="businessDto.openingHours">
            {{ $t("dynamicQr.businessDynamic.openingHour") }}
          </h4>
          <div
            v-for="hour in businessDto.openingHours"
            :key="hour.day"
            class="tw-flex tw-justify-between tw-items-center tw-mt-2"
          >
            <span v-if="hour.checked">{{ hour.day }}</span>
            <div v-if="hour.checked">
              <div v-for="(time, i) in hour.times" :key="i">
                <span v-if="time.startTime && time.endTime"
                  >{{ time.startTime.split(":").slice(0, 2).join(":") }} -
                  {{ time.endTime.split(":").slice(0, 2).join(":") }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- <hr class="tw-bg-gray-600 tw-mt-5 tw-mx-5" /> -->

        <!-- location -->
        <div class="location tw-mt-5 tw-mx-5">
          <div
            v-if="businessDto.address.city"
            class="tw-flex tw-flex-col tw-gap-2 tw-mt-2"
          >
            <div class="tw-flex">
              <v-icon>mdi-map-marker-outline</v-icon>
              <h1 class="tw-mx-1">Address</h1>
            </div>
            <div class="tw-flex tw-flex-col tw-mx-6">
              <p v-if="businessDto.address.streetName" class="tw-flex tw-gap-6">
                <span>{{ businessDto.address.streetName }}</span>
                <span>{{ businessDto.address.storeNumber }}</span>
              </p>
              <p v-if="businessDto.address.storeNumber" class="tw-flex tw-gap-6">
                <span>{{ businessDto.address.regionNumber }}</span>
                <span>{{ businessDto.address.city }}</span>
              </p>

              <p v-if="businessDto.address.country">
                {{ businessDto.address.country }}
              </p>
            </div>
          </div>
          <h4
            class="tw-mt-4 tw-text-lg tw-text-gray-700"
            v-if="businessDto.featureIcons.length > 0"
          >
            {{ $t("dynamicQr.businessDynamic.featuers") }}:
          </h4>
          <ul
            class="tw-flex tw-flex-wrap tw-gap-4 tw-mt-1 tw-relative"
            v-if="businessDto.featureIcons.length > 0"
          >
            <li
              v-for="(item, i) in businessDto.featureIcons"
              :key="i"
              class="tw-relative"
            >
              <v-icon
                class="tw-text-gray-600"
                v-if="businessDto.featureIcons.length > 0"
                >{{ item }}</v-icon
              >
              <!-- <div
                id="close"
                class="tw-absolute -tw-top-6 -tw-right-2 tw-cursor-pointer"
                @click="removeIconFeatures(item, i)"
              >
                <v-icon id="mdi" icon="mdi-close" color="red" size="0.8rem"></v-icon>
              </div> -->
            </li>
          </ul>
        </div>
        <!-- <hr class="tw-bg-gray-600 tw-mt-5 tw-mx-5" /> -->

        <!-- contact -->
        <div class="tw-ml-4 tw-mt-4">
          <div v-if="businessDto.about" class="tw-flex tw-flex-col tw-gap-2 tw-mt-2">
            <div class="tw-flex">
              <v-icon>mdi-alert-circle-outline</v-icon>
              <h1 class="tw-mx-1">About</h1>
            </div>
            <div class="tw-flex tw-mx-5">
              <p>{{ businessDto.about }}</p>
            </div>
          </div>
          <div v-if="businessDto.name" class="tw-flex tw-flex-col tw-gap-2 tw-mt-2">
            <div class="tw-flex">
              <v-icon>mdi-comment-outline</v-icon>
              <h1 class="tw-mx-1">name</h1>
            </div>
            <div class="tw-flex tw-mx-6">
              <p>{{ businessDto.name }}</p>
            </div>
          </div>
          <div v-if="businessDto.phone" class="tw-flex tw-flex-col tw-gap-2 tw-mt-2">
            <div class="tw-flex">
              <v-icon>mdi-phone-outline</v-icon>
              <h1 class="tw-mx-1">Phone</h1>
            </div>
            <div class="tw-flex tw-mx-6">
              <p>{{ businessDto.phone }}</p>
            </div>
          </div>
          <div v-if="businessDto.email" class="tw-flex tw-flex-col tw-gap-2 tw-mt-2">
            <div class="tw-flex">
              <v-icon>mdi-email-minus-outline</v-icon>
              <h1 class="tw-mx-1">Email</h1>
            </div>
            <div class="tw-flex tw-mx-6">
              <p>{{ businessDto.email }}</p>
            </div>
          </div>
        </div>

        <!-- <hr class="tw-bg-gray-600 tw-mt-5 tw-mx-5" /> -->

        <!-- Social media -->

        <div
          class="social-media tw-mt-5 tw-mx-5 tw-mb-20"
          v-if="
            businessDto.socialMediaChannels.find((ele) => ele.url != '') &&
            businessDto.socialMediaChannels &&
            businessDto.socialMediaChannels.length > 0
          "
        >
          <h4 class="tw-mb-4 tw-text-lg tw-text-gray-700">
            {{ $t("dynamicQr.businessDynamic.channels") }}:
          </h4>

          <ul
            v-if="
              businessDto.socialMediaChannels &&
              businessDto.socialMediaChannels.length > 0
            "
            class="tw-flex tw-flex-wrap tw-gap-4 tw-mt-4"
          >
            <li
              v-for="item in businessDto.socialMediaChannels"
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
        <div class="tw-absolute" style="right: 10px; bottom: 10px">
          <v-btn
            class="ma-2 text-white"
            :color="businessDto.buttonColor"
            icon="mdi-share-variant-outline"
            @click="shareData"
          ></v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
hr {
  padding: 0.5px;
}
</style>
