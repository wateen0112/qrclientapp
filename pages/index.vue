<template>
  <div>
    <!-- Top Right Yello Shape -->
    <img class="tw-absolute lg:tw-h-screen -tw-z-10 tw-top-0 tw-right-0 rtl:-tw-scale-x-100"
      src="~assets/svg/shapes/index-yello-shape.svg" />

    <!-- start hero -->
    <section class="hero">
      <v-container>
        <div class="tw-grid tw-grid-cols-12 tw-gap-5 tw-mx-auto">
          <div
            class="order-2 order-md-1 hero-text tw-col-span-12 tw-p-4 md:tw-p-0 lg:tw-col-span-6 tw-flex tw-justify-center tw-flex-col">
            <h2 ref="heroHead" class="text-head-animation tw-my-3 tw-text-4xl xl:tw-text-5xl tw-font-bold">
              {{ $t("home.hero.head") }}
            </h2>

            <ReadMore ref="readMore" :words-count="30" :text='$t("home.hero.descriptionHero")'></ReadMore>


            <div ref="btnGroup" class="btn-group tw-flex tw-my-9 tw-space-x-5 tw-order-1 lg:tw-order-2">
              <v-btn @click="OpenDialog(true)" class="bg-dark md:tw-px-5 tw-min-w-min" rounded
                append-icon="mdi-arrow-right">
                {{ $t("home.hero.createQr") }}
              </v-btn>
              <nuxt-link :to="localePath('/LearnMore')">
                <v-btn rounded variant="outlined" class="md:tw-px-5">
                  {{ $t("home.hero.learnMore") }}
                </v-btn></nuxt-link>
            </div>
          </div>

          <div
            class="order-1 order-md-2 md:tw-px-5 hero-image tw-col-span-12 lg:tw-col-span-6 tw-flex tw-justify-center lg:tw-justify-end tw-items-center">
            <!-- <img class="phone" src="~assets/svg/hero-mobile.svg" alt="" /> -->
            <AnimatedHeroMobile></AnimatedHeroMobile>
            <AnimatedHeroQrCode></AnimatedHeroQrCode>
            <!-- <img class="hero-qr tw-mx-10" src="~assets/svg/hero-qr.svg" alt="" /> -->
          </div>
        </div>
      </v-container>
    </section>
    <!-- end hero -->

    <!-- start type-qr -->
    <section class="type-qr md:tw-mt-16 tw-mt-12 tw-overflow-hidden">
      <v-container>
        <div class="tw-mx-auto tw-px-3">
          <div class="tw-grid tw-grid-cols-12">
            <div class="tw-col-span-12 lg:tw-col-span-4" data-aos="fade-right">
              <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full">
                <h2 class="tw-leading-tight tw-font-bold tw-text-4xl">
                  {{ $t("home.hero.differentQr") }}
                </h2>
                <p class="md:tw-text-center lg:tw-text-start tw-mt-4 tw-text-lg">
                  {{ $t("home.hero.qrGermanyDefinition") }}
                </p>
              </div>
            </div>
            <div class="tw-col-span-12 lg:tw-col-span-8 tw-gap-10 tw-mt-5">
              <div
                class="tw-flex tw-flex-wrap md:tw-flex-nowrap xl:tw-justify-between tw-justify-center tw-items-center md:tw-mx-10 tw-mx-3">
                <div data-aos="fade-down"
                  class="tw-w-full md:tw-mb-20 tw-mb-0 tw-text-center tw-bg-white tw-flex tw-justify-center tw-items-center tw-flex-col tw-p-8 tw-shadow-lg md:tw-mt-0 tw-mt-10 md:tw-mx-10 tw-mx-3 tw-rounded-xl">
                  <img src="~/assets/img1.svg" />
                  <ReadMore :words-count="10" :text='$t("home.difference.easyStatiscs")'></ReadMore>

                </div>
                <div data-aos="fade-down"
                  class="tw-w-full tw-text-center tw-bg-white tw-flex tw-justify-center tw-items-center tw-flex-col tw-p-8 tw-shadow-lg md:tw-mt-0 tw-mt-5 md:tw-mx-10 tw-mx-3 tw-rounded-xl">
                  <img src="~/assets/img2.svg" />
                  <ReadMore :words-count="10" :text='$t("home.difference.dynamicTitle")'></ReadMore>
                </div>
              </div>
              <div
                class="tw-flex tw-flex-wrap md:tw-flex-nowrap xl:tw-justify-between tw-justify-center tw-items-center md:tw-mx-10 tw-mx-3">
                <div data-aos="fade-down"
                  class="tw-w-full md:tw-mb-20 tw-mb-0 tw-text-center tw-flex tw-justify-center tw-items-center tw-flex-col tw-bg-white tw-p-8 tw-shadow-lg md:tw-mt-0 tw-mt-5 md:tw-mx-10 tw-mx-3 tw-rounded-xl">
                  <img src="~/assets/img3.svg" />
                  <ReadMore :words-count="10" :text='$t("home.difference.nfc")'></ReadMore>
                </div>

                <div data-aos="fade-down"
                  class="tw-w-full tw-text-center tw-bg-white tw-flex tw-justify-center tw-items-center tw-flex-col tw-p-8 tw-shadow-lg md:tw-mt-0 tw-mt-5 md:tw-mx-10 tw-mx-3 tw-rounded-xl">
                  <img src="~/assets/img4.svg" />
                  <ReadMore :words-count="10" :text='$t("home.difference.advantage")'></ReadMore>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </section>
    <!-- end type-qr -->

    <!-- My Work -->
    <section class="tw-relative tw-mt-10 tw-overflow-hidden tw-bg-dark">
      <img class="tw-absolute tw-right-0 -tw-top-7" src="~/assets/qr-code1.svg" />
      <img class="tw-absolute tw-left-0 -tw-bottom-9 tw-mb-0" src="~/assets/qr-code2.svg" />
      <div>
        <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-my-5 tw-text-white">
          <h2 class="tw-leading-tight tw-text-3xl text-blue-600">
            {{ $t("home.hero.CreateStatic") }}
          </h2>
        </div>
      </div>

      <div class="cards lg:tw-container tw-mx-auto tw-px-3 tw-grid tw-grid-cols-12 tw-my-9 tw-flex-wrap tw-gap-12">
        <div data-aos="fade-right"
          class="tw-text-center tw-bg-white sm:tw-col-span-6 md:tw-col-span-2 tw-rounded-xl tw-col-span-6 tw-p-3 tw-shadow tw-mb-2 tw-flex-wrap">
          <nuxt-link :to="localePath('/static/WifiStatic/0')">
            <div class="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-flex-col">
              <v-icon color="#FF9494" class="text-5xl">mdi-wifi</v-icon>
              <h2 class="tw-text-dark tw-font-bold tw-text-xl tw-mt-1">WiFi</h2>
            </div>
          </nuxt-link>
        </div>

        <div data-aos="fade-left"
          class="tw-text-center tw-bg-white sm:tw-col-span-6 md:tw-col-span-2 tw-rounded-xl tw-col-span-6 tw-p-3 tw-shadow tw-mb-2 tw-flex-wrap">
          <nuxt-link :to="localePath('/static/EmailStatic/0')">
            <div class="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-flex-col">
              <v-icon color="#FF9494" class="text-5xl">mdi-email</v-icon>

              <h2 class="tw-text-dark tw-font-bold tw-text-xl tw-mt-1">Email</h2>
            </div>
          </nuxt-link>
        </div>
        <div data-aos="fade-right"
          class="tw-text-center tw-bg-white sm:tw-col-span-6 md:tw-col-span-2 tw-rounded-xl tw-col-span-6 tw-p-3 tw-shadow tw-mb-2 tw-flex-wrap">
          <nuxt-link :to="localePath('/static/SmsStatic/0')">
            <div class="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-flex-col">
              <v-icon color="#FF9494" class="text-5xl">mdi-message</v-icon>
              <h2 class="tw-text-dark tw-font-bold tw-text-xl tw-mt-1">SMS</h2>
            </div>
          </nuxt-link>
        </div>
        <div data-aos="fade-left"
          class="tw-text-center tw-bg-white sm:tw-col-span-6 md:tw-col-span-2 tw-rounded-xl tw-col-span-6 tw-p-3 tw-shadow tw-mb-2 tw-flex-wrap">
          <nuxt-link :to="localePath('/static/ContactDataStatic/0')">
            <div class="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-flex-col">
              <v-icon color="#FF9494" class="text-5xl">mdi-credit-card-outline</v-icon>
              <h2 class="tw-text-dark tw-font-bold tw-text-xl tw-mt-1">VS CARD</h2>
            </div>
          </nuxt-link>
        </div>

        <div data-aos="fade-right"
          class="tw-text-center tw-bg-white sm:tw-col-span-6 md:tw-col-span-2 tw-rounded-xl tw-col-span-6 tw-p-3 tw-shadow tw-mb-2 tw-flex-wrap">
          <nuxt-link :to="localePath('/static/WebsiteStatic/0')">
            <div class="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-flex-col">
              <v-icon color="#FF9494" class="text-5xl">mdi-web</v-icon>
              <h2 class="tw-text-dark tw-font-bold tw-text-xl tw-mt-1">Website</h2>
            </div>
          </nuxt-link>
        </div>
        <div data-aos="fade-left"
          class="tw-text-center tw-bg-white sm:tw-col-span-6 md:tw-col-span-2 tw-rounded-xl tw-col-span-6 tw-p-3 tw-shadow tw-mb-2 tw-flex-wrap">
          <nuxt-link :to="localePath('/static/TextStatic/0')">
            <div class="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-p-0 tw-flex-col">
              <v-icon color="#FF9494">mdi-clipboard-text-multiple-outline</v-icon>
              <h2 class="tw-text-dark tw-font-bold tw-text-xl tw-mt-1">TEXT</h2>
            </div>
          </nuxt-link>
        </div>
      </div>
    </section>
    <!-- My Work End-->

    <section class="type-qr md:tw-mt-16 tw-mt-7 tw-overflow-hidden">
      <div data-aos="fade-right" class="tw-col-span-12 lg:tw-col-span-4">
        <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full">
          <h2 class="tw-leading-tight tw-font-bold tw-text-3xl tw-m-6 sm:tw-p-5">
            {{ $t("home.hero.QRTypes") }}
          </h2>
          <p class="md:tw-text-center lg:tw-text-start tw-m-6 tw-text-xl sm:tw-p-5">
            {{ $t("home.hero.QRcodes") }}
          </p>
        </div>
      </div>
      <div>
        <div class="tw-grid tw-grid-cols-12">
          <div class="tw-col-span-12 lg:tw-col-span-8 tw-gap-10 tw-mt-5">
            <v-container>
              <div
                class="tw-flex tw-flex-wrap md:tw-flex-nowrap xl:tw-justify-between tw-justify-center tw-items-center tw-mx-20">
                <div data-aos="fade-down"
                  class="tw-w-full tw-cursor-pointer md:tw-mb-20 tw-mb-0 tw-text-center tw-bg-white tw-flex tw-justify-center tw-items-center tw-flex-col tw-p-8 tw-shadow md:tw-mt-0 tw-mt-10 tw-mx-2 tw-rounded-xl">
                  <div @click="goToUrl" class="tw-mb-5 tw-flex tw-justify-center tw-items-center tw-gap-2">
                    <v-icon color="#F5D14E" class="text-5xl">mdi-car</v-icon>
                    <h2 class="tw-text-xl tw-font-bold tw-text-gray-700">
                      {{ $t("home.hero.Car") }}
                    </h2>
                  </div>
                  <ReadMore :words-count="20" :text="$t('home.hero.Url')"></ReadMore>

                </div>
                <div data-aos="fade-down"
                  class="tw-w-full tw-cursor-pointer tw-text-center tw-bg-white md:tw-col-span-4 tw-col-span-12 tw-p-8 tw-shadow tw-my-5 md:tw-mx-10 tw-mx-3 tw-rounded-xl">
                  <div @click="goToSocial" class="tw-mb-5 tw-flex tw-justify-center tw-items-center tw-gap-2">
                    <v-icon color="#F5D14E" class="text-5xl">mdi-food</v-icon>

                    <h2 class="tw-text-xl tw-font-bold tw-text-gray-700">
                      {{ $t("home.hero.Food") }}
                    </h2>
                  </div>
                  <ReadMore :words-count="20" :text="$t('home.hero.socialMedia')"></ReadMore>
                </div>
              </div>
              <div
                class="tw-flex tw-flex-wrap md:tw-flex-nowrap xl:tw-justify-between tw-justify-center tw-items-center tw-mx-20">
                <div data-aos="fade-down"
                  class="tw-w-full tw-cursor-pointer md:tw-mb-20 tw-mb-0 tw-text-center tw-flex tw-justify-center tw-items-center tw-flex-col tw-bg-white tw-p-8 tw-shadow md:tw-mt-0 tw-mt-5 tw-mx-2 tw-rounded-xl">
                  <div @click="goToText()" class="tw-mb-5 tw-flex tw-justify-center tw-items-center tw-gap-2">
                    <img src="~/assets/svg/qrTypes/ProductDynamic.svg" />
                    <h2 class="tw-text-xl tw-font-bold tw-text-gray-700">
                      {{ $t("home.hero.PRODUCTS") }}
                    </h2>
                  </div>
                  <ReadMore :words-count="20" :text="$t('home.hero.Text')"></ReadMore>
                </div>
                <div data-aos="fade-down"
                  class="tw-w-full tw-cursor-pointer tw-text-center tw-bg-white md:tw-col-span-4 tw-col-span-12 tw-p-8 tw-shadow tw-my-5 md:tw-mx-10 tw-mx-3 tw-rounded-xl">
                  <div @click="goToCard" class="tw-mb-5 tw-flex tw-justify-center tw-items-center tw-gap-2">
                    <img src="~/assets/svg/qrTypes/BusinessDynamic.svg" />

                    <h2 class="tw-text-xl tw-font-bold tw-text-gray-700">
                      {{ $t("home.hero.BUSINESS") }}
                    </h2>
                  </div>
                  <ReadMore :words-count="20" :text="$t('home.hero.VsCard')"></ReadMore>
                </div>
              </div>
            </v-container>
          </div>
          <div class="tw-col-span-12 lg:tw-col-span-4 tw-flex tw-justify-center tw-items-center">
            <img src="~assets/icons.svg" />
          </div>
        </div>
        <div class="tw-flex tw-justify-center tw-items-center tw-p-2">
          <v-btn @click="goToTypes" variant="plain" class="tw-text-center tw-font-bold tw-cursor-pointer tw-border-none">
            {{ $t("home.hero.more") }}
          </v-btn>
        </div>
      </div>
    </section>

    <section class="create-qr tw-py-14 tw-flex tw-justify-center tw-items-center tw-flex-col tw-overflow-hidden">
      <h2 data-aos="fade-up" class="tw-text-center tw-text-3xl tw-mx-3">
        {{ $t("home.createQrInMinutes.createQrTitle") }}
      </h2>
      <div class="tw-flex tw-justify-center tw-items-center">
        <div class="tw-mx-auto tw-grid tw-grid-cols-12 md:tw-px-20 tw-px-5 tw-mt-10 tw-items-start">
          <div data-aos="fade-right"
            class="md:tw-col-span-3 tw-col-span-12 tw-text-center tw-flex tw-justify-center tw-items-center tw-flex-col tw-mb-2">
            <div
              class="tw-text-xl tw-top-[-16px] tw-absolute tw-w-9 tw-h-9 tw-bg-red-700 tw-text-white tw-rounded-3xl tw-flex tw-items-center justify-center">
              1
            </div>
            <img src="~/assets/svgAd/SVG/Asset1.svg" alt="" class="tw-h-[175px] tw-w-[175px] tw-mt-2" />
            <h3 class="tw-text-xl tw-my-3 tw-h-[100px]">
              {{ $t("home.createQrInMinutes.login") }}
            </h3>
          </div>
          <div data-aos="fade-right"
            class="md:tw-col-span-3 tw-col-span-12 tw-text-center tw-flex tw-justify-center tw-items-center tw-flex-col tw-mb-5">
            <div
              class="tw-text-xl tw-top-[-18px] tw-absolute tw-w-9 tw-h-9 tw-bg-primary tw-text-white tw-rounded-3xl tw-flex tw-items-center justify-center">
              2
            </div>
            <img src="~assets/svg/qr/qr-type.svg" alt="" srcset="" />
            <h3 class="tw-text-xl tw-my-5">
              {{ $t("home.createQrInMinutes.selectType") }}
            </h3>
          </div>

          <div data-aos="fade-left"
            class="md:tw-col-span-3 tw-col-span-12 tw-mt-5 lg:tw-mt-0 tw-text-center tw-flex tw-justify-center tw-items-center tw-flex-col">
            <div
              class="tw-top-[-18px] tw-absolute tw-w-9 tw-h-9 tw-bg-primary tw-text-white tw-rounded-3xl tw-flex tw-items-center justify-center tw-text-xl tw-mb-5">
              3
            </div>
            <img src="~assets/svg/qr/qr-customise.svg" alt="" srcset="" />
            <h3 class="tw-text-xl tw-my-5">
              {{ $t("home.createQrInMinutes.customise") }}
            </h3>
          </div>
          <div data-aos="fade-left"
            class="md:tw-col-span-3 tw-col-span-12 tw-mt-13 lg:tw-mt-0 tw-text-center tw-flex tw-justify-center tw-items-center tw-flex-col">
            <div
              class="tw-top-[-18px] tw-absolute tw-w-9 tw-h-9 tw-bg-primary tw-text-white tw-rounded-3xl tw-flex tw-items-center justify-center tw-text-xl">
              4
            </div>
            <img src="~assets/svg/qr/qr-download.svg" alt="" srcset="" />

            <h3 class="tw-text-xl tw-my-4">
              {{ $t("home.createQrInMinutes.downloadCode") }}
            </h3>
          </div>
        </div>
      </div>
    </section>
    <!-- end create-qr -->

    <!--start nfc-comming-soon -->
    <section class="nfc-comming-soon">
      <div class="tw-bg-white tw-flex tw-justify-center tw-items-center"></div>
      <div class="lg:tw-container tw-m-auto tw-mt-20">
        <h2 class="tw-text-center tw-text-3xl">
          {{ $t("home.nowQr.nowQrTitle") }}
        </h2>
        <div class="tw-flex lg:tw-gap-32 tw-gap-10 tw-items-center tw-flex-wrap lg:tw-flex-nowrap">
          <!-- <img src="~assets/svg/nfc/thinking.svg" alt="" /> -->
          <AnimatedThinking></AnimatedThinking>

          <!--common question-->
          <div class="tw-w-full tw-flex tw-flex-col tw-p-3" id="faq">
            <div v-for="item in store.commonQuestion">
              <!-- <v-list-group value="Admin">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" :title="item.question"></v-list-item>
                </template>

                <v-list-item :title="item.answer" :value="item.answer"></v-list-item>
              </v-list-group> -->

              <v-expansion-panels class="tw-mt-3">
                <v-expansion-panel>
                  <v-expansion-panel-title class="tw-bg-light">
                    <p>{{ item.question }}</p>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    {{ item.answer }}
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--end nfc-comming-soon -->

    <!--start ready-to-jump -->
    <section data-aos="fade-down" class="ready-to-jump tw-flex tw-justify-center tw-items-center">
      <div
        class="content md:tw-w-1/2 tw-w-full tw-p-10 tw-flex tw-justify-center tw-items-center tw-flex-col tw-gap-4 tw-rounded">
        <h2 class="tw-text-3xl tw-font-bold">
          {{ $t("home.ready.readyToJump") }}
        </h2>
        <p>{{ $t("home.ready.letGet") }}</p>
        <v-btn @click="appStore.qrDialog = true" rounded color="primary" class="tw-mt-5 bg-dark font-bold text-primary">
          {{ $t("home.ready.getStartFree") }}
        </v-btn>
      </div>
    </section>
    <!--end ready-to-jump -->
  </div>
</template>

<script setup lang="ts">
import { MetaObject } from "@nuxt/schema";
import { useAppStore } from "@/store/app";
import { useQuestion } from "@/store/commonQuestion";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import type ReadMore from "~/components/ReadMore.vue";

const router = useRouter();
const appStore = useAppStore();
const store = useQuestion();
store.GetAllCommonQuestion();
const { locale, t } = useI18n();
const localePath = useLocalePath()
const open = ref<Array<string>>(["home", "page", "strign"]);
const heroHead = ref<HTMLElement | null>(null);
const readMore = ref<InstanceType<typeof ReadMore> | null>(null);
const btnGroup = ref<HTMLElement | null>(null);
const headers: { [x: string]: MetaObject } = {
  en: {
    title: "Home Page",
    htmlAttrs: {
      lang: locale.value,
      dir: "ltr",
    },
    meta: [{ name: "description", content: "Description in English" }],
  },
  de: {
    title: "Home Page",
    htmlAttrs: {
      lang: locale.value,
      dir: "ltr",

    },
    meta: [{ name: "description", content: "Description in English" }],
  },


};
useHead(headers[locale.value]);
definePageMeta({
  title: "home.title",
});
function OpenDialog(is: boolean) {
  appStore.qrDialog = is;
}
onMounted(() => {

  if (process.client) {
    AOS.init();
    const t1 = gsap.timeline({ repeatDelay: 2 });

    t1.from(heroHead.value, {
      y: -window.innerHeight,
      duration: 1,
      opacity: 1,
    });

    // t1.from(readMore.value?.$el('svg'), {
    //   y: -50,
    //   duration: 1,
    //   opacity: 0,
    // });

    t1.from(btnGroup.value, {
      y: window.innerHeight / 4,
      duration: 0.4,
      opacity: 0,
    });


  }
});
function goToTypes() {
  router.push("/types");
}
function goToText() {
  router.push(`/dynamic/ProductDynamic/${0}`);
}
function goToCard() {
  router.push(`/dynamic/BusinessDynamic/${0}`);
}
function goToUrl() {
  router.push(`/dynamic/CarDynamic/${0}`);
}
function goToSocial() {
  router.push(`/dynamic/FoodDynamic/${0}`);
}
</script>

<style lang="scss" scoped>
.hero {
  height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  margin-top: 72px;
}

* {
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden !important;
}

.create-qr {
  background-color: rgba(228, 215, 215, 0.56);
}

.nfc-comming-soon {
  .v-list.v-theme--mainTheme.v-list--density-default.v-list--one-line {
    background-color: transparent !important;
  }
}

.ready-to-jump {
  .content {
    background-color: #e4d7d7ab;
  }
}
</style>
