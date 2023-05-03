<template>
  <div>
    <div class="tw-p-3" :style="{ backgroundColor: eventDto.primaryColor }">
      <div class="tw-flex tw-flex-col tw-items-center">
        <h1 class="tw-mt-2 tw-text-xl text-white">{{ eventDto.title }}</h1>
        <p>{{ eventDto.organizer }}</p>
      </div>
      <div v-if="eventDto.imageUrl" class="tw-p-3">
        <img
          class="tw-w-full md:tw-w-auto md:tw-mx-auto tw-rounded-lg tw-object-contain"
          :src="getFileUrl(eventDto.imageUrl)"
        />
      </div>
      <div class="text-white tw-flex tw-flex-col lg:tw-items-center tw-items-start">
        <p>{{ eventDto.summary }}</p>
        <a
          target="_blank"
          class="tw-text-dark tw-bg-white tw-rounded tw-text-base"
          :href="eventDto.button.url"
          ><v-btn v-if="eventDto.button.name">{{ eventDto.button.name }}</v-btn></a
        >
      </div>
      <hr v-if="eventDto.button.name" class="tw-m-2"/>
    </div>

    <section
      class="tw-pb-5 tw-flex tw-flex-col tw-items-center tw-gap-12"
      :style="{ backgroundColor: eventDto.primaryColor }"
    >
      <div class="tw-container tw-mx-auto">
        <section class="tw-mx-5">
          <div v-if="eventDto.featureIcons" class="tw-flex tw-flex-col text-white my-2">
            <h4 class="tw-mt-4 tw-text-lg" v-if="eventDto.featureIcons.length > 0">
              {{ $t("dynamicQr.businessDynamic.featuers") }}:
            </h4>
            <ul
              class="tw-flex tw-flex-wrap tw-gap-4 tw-mt-1 tw-relative"
              v-if="eventDto.featureIcons.length > 0"
            >
              <li v-for="(item, i) in eventDto.featureIcons" :key="i" class="tw-relative">
                <v-icon
                  class="tw-text-gray-600 tw-flex tw-justify-center"
                  v-if="eventDto.featureIcons.length > 0"
                  color="#fff"
                  >{{ item }}</v-icon
                >
              </li>
            </ul>
          </div>
          <div v-if="eventDto.startDate" class="tw-flex tw-flex-col tw-gap-2 text-white">
            <div class="tw-flex">
              <v-icon>mdi-calendar-blank-outline</v-icon>
              <h1 class="tw-mx-1">when</h1>
            </div>
            <div class="tw-flex tw-mx-6">
              <p>{{ new Date(eventDto.startDate).toLocaleDateString() }}</p>
              <p>_</p>
              <p>{{ new Date(eventDto.endDate).toLocaleDateString() }}</p>
            </div>
          </div>

          <div
            v-if="eventDto.where"
            class="tw-flex tw-flex-col tw-gap-2 tw-mt-2 text-white"
          >
            <div class="tw-flex">
              <v-icon>mdi-car</v-icon>
              <h1 class="tw-mx-1">Where</h1>
            </div>
            <div class="tw-flex tw-mx-6">
              <p>{{ eventDto.where }}</p>
            </div>
          </div>

          <div
            v-if="eventDto.about"
            class="tw-flex tw-flex-col tw-gap-2 text-white tw-mt-2"
          >
            <div class="tw-flex">
              <v-icon>mdi-alert-circle-outline</v-icon>
              <h1 class="tw-mx-1">About</h1>
            </div>
            <div class="tw-flex tw-mx-6">
              <p>{{ eventDto.about }}</p>
            </div>
          </div>
          <div
            v-if="eventDto.contact"
            class="tw-flex tw-flex-col tw-gap-2 text-white tw-mt-2"
          >
            <div class="tw-flex">
              <v-icon>mdi-comment-outline</v-icon>
              <h1 class="tw-mx-1">Contact</h1>
            </div>
            <div class="tw-flex tw-mx-6">
              <p>{{ eventDto.contact }}</p>
            </div>
          </div>
          <div
            v-if="eventDto.phone"
            class="tw-flex tw-flex-col tw-gap-2 text-white tw-mt-2"
          >
            <div class="tw-flex">
              <v-icon>mdi-phone-outline</v-icon>
              <h1 class="tw-mx-1">Phone</h1>
            </div>
            <div class="tw-flex tw-mx-6">
              <p>{{ eventDto.phone }}</p>
            </div>
          </div>
          <div
            v-if="eventDto.email"
            class="tw-flex tw-flex-col tw-gap-2 text-white tw-mt-2"
          >
            <div class="tw-flex">
              <v-icon>mdi-email-minus-outline</v-icon>
              <h1 class="tw-mx-1">Email</h1>
            </div>
            <div class="tw-flex tw-mx-6">
              <p>{{ eventDto.email }}</p>
            </div>
          </div>
          <div
            v-if="eventDto.website"
            class="tw-flex tw-flex-col tw-gap-2 text-white tw-mt-2"
          >
            <div class="tw-flex">
              <v-icon>mdi-web</v-icon>
              <h1 class="tw-mx-1">Website</h1>
            </div>
            <div class="tw-flex tw-mx-6">
              <p>{{ eventDto.website }}</p>
            </div>
          </div>

          <div
            v-if="eventDto.address.city"
            class="tw-flex tw-flex-col tw-gap-2 text-white tw-mt-2"
          >
            <div class="tw-flex">
              <v-icon>mdi-map-marker-outline</v-icon>
              <h1 class="tw-mx-1">Address</h1>
            </div>
            <div class="tw-flex tw-flex-col tw-mx-6">
              <p v-if="eventDto.address.streetName" class="tw-flex tw-gap-6">
                <span>{{ eventDto.address.streetName }}</span>
                <span>{{ eventDto.address.storeNumber }}</span>
              </p>
              <p v-if="eventDto.address.storeNumber" class="tw-flex tw-gap-6">
                <span>{{ eventDto.address.regionNumber }}</span>
                <span>{{ eventDto.address.city }}</span>
              </p>

              <p v-if="eventDto.address.country">
                {{ eventDto.address.country }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>

    <div class="tw-absolute" style="right: 30px; bottom: 20px">
      <v-btn
        class="ma-2 text-white"
        :color="eventDto.buttonColor"
        icon="mdi-share-variant-outline"
        @click="shareData"
      ></v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useQrEventDynamic } from "@/store/qrCodes/dynamic/event";
import { AddEvent } from "~/api/dto/qrCodes/dynamic/Event";
import { eventController } from "~/api/endpoints/eventDynamic";
import { storeToRefs } from "pinia";
const { getFileUrl } = useFile();
const eventStore = useQrEventDynamic();
const { eventDto } = storeToRefs(eventStore);
const route = useRoute();

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

// const icons = computed(() => {
//   if (eventDto.value.featureIcons[0] == null)
//     return eventDto.value.featureIcons?.filter((ele) => ele != null);
// });

//GetById PdfDto
if (props.fetchData) {
  const { data } = await useCustomFetch<AddEvent>(
    eventController.GET_QR_EVENT + `?id=${route.params.id}`
  );
  if (data.value) {
    eventDto.value = data.value;
  }
}
definePageMeta({ layout: "fullscreen" });
</script>
<style>
hr {
  padding: 0.5px;
}
</style>
