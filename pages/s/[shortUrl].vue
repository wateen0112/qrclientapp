<script lang="ts" setup>
import { QrDynamicController } from "~/api/endpoints/qrDynamic";
definePageMeta({
  layout: "fullscreen",
});

const waiting = ref(false)
const { getFileUrl } = useFile()
const welcomeScreen = ref('')
const { POST } = useApi();
const browserName = computed(() => {
  if (process.client) {
    let userAgent = navigator.userAgent;

    if (userAgent.match(/chrome|chromium|crios/i)) {
      return "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      return "firefox";
    } else if (userAgent.match(/safari/i)) {
      return "safari";
    } else if (userAgent.match(/opr\//i)) {
      return "opera";
    } else if (userAgent.match(/edg/i)) {
      return "edge";
    } else {
      return "No browser detection";
    }
  }
});

const scan = async () => {
  if (process.client) {
    const result = await POST<{ url: string, welcomeImageUrl: string }>(QrDynamicController.SCAN, {
      browserName: browserName.value,
      shortUrl: route.params.shortUrl,
    });
    welcomeScreen.value = result.data.welcomeImageUrl;

    setTimeout(() => {
      window.location.replace(result.data.url);
    }, 3000)
  }
};

const route = useRoute();

scan();
</script>
<template>
  <div
    class="tw-flex tw-flex-col tw-h-screen tw-items-center tw-justify-center space-y-4">
    <div
      class="tw-flex tw-flex-col tw-h-screen tw-items-center tw-justify-center space-y-4">

      <AnimatedHeroMobile v-if="!welcomeScreen" class="my-12"
        width="200px">
      </AnimatedHeroMobile>

      <img v-else :src="getFileUrl(welcomeScreen)" alt="">

      <ClientOnly>
        <span class="my-2 tw-capitalize"> Browsing With : {{ browserName }}
        </span>
      </ClientOnly>

      <div
        class="tw-flex tw-justify-center tw-items-center bg-gray-100 tw-flex-col">
        <h1 class="tw-text-gray-800 lg:tw-text-6xl" v-if="!welcomeScreen">
          Please Wait For Scanning ...
        </h1>
        <template v-else>

          <h1 class="tw-text-gray-800 lg:tw-text-6xl">
            Thanks For Scanning !
          </h1>
          <h4 class="tw-text-gray-500 tw-text-xl mt-12">You Will Be
            Redirected Right Now</h4>
        </template>
      </div>
    </div>
  </div>
</template>
