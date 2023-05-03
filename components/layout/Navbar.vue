<template>
  <nav class="tw-p-2 tw-w-full tw-fixed tw-top-0 tw-z-50" :class="{
    'tw-bg-dark tw-bg-opacity-95 tw-backdrop-blur-xl tw-shadow-lg':
      !arrivedState.top,
  }">
    <div
      class="tw-flex tw-container lg:tw-max-w-[1200px] 2xl:tw-max-w[1400px] tw-mx-auto tw-justify-between tw-items-center tw-w-full">
      <div class="tw-block lg:tw-hidden">
        <v-app-bar-nav-icon class="tw-block" variant="text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      </div>

      <ClientOnly>

        <ul class="tw-hidden lg:tw-flex tw-gap-6 tw-items-center">
          <div class="tw-flex tw-justify-start">
            <img src="~/assets/Logo.svg" />
          </div>
          <li v-for="link in navLinks" :key="link.path">
            <NuxtLink class="tw-text-gray-400 tw-font-semibold tw-text-xl tw-p-4 navbar-link"
              active-class="tw-text-dark font-bold" :to="localePath(link.path)">
              {{ link.title }}
            </NuxtLink>
          </li>
        </ul>

        <div class="right-side tw-items-center">
          <div class="tw-relative tw-flex tw-items-center tw-gap-8">
            <Localizer :class="{ 'tw-text-white': !arrivedState.top }">
            </Localizer>

            <div class="tw-hidden lg:tw-flex tw-gap-8 tw-items-center">
              <v-btn v-if="!isLogedIn" class="bg-dark tw-mx-3" rounded :to="localePath('login')">
                <span>{{ $t("nav.Register") }}</span>
              </v-btn>

              <AppUserInfo v-else></AppUserInfo>

              <v-btn class="bg-dark rounded-xl" @click="setQrDialog(true)">
                <span>{{ $t("home.hero.createQr") }}</span>
              </v-btn>

              <span>v{{ appStore.appVersion }}</span>
            </div>
          </div>
        </div>
      </ClientOnly>


    </div>

    <div class="lg:tw-hidden">
      <ClientOnly>

        <v-navigation-drawer v-model="drawer" temporary :location="$i18n.locale == 'ar' ? 'right' : 'left'">
          <v-list>
            <v-list-item v-for="item in navLinks" :key="item.path" :to="localePath(item.path)">
              {{ item.title }}
              {{ localePath(item.path) }}
            </v-list-item>

            <v-list-item>
              <div>
                <v-btn v-if="!isLogedIn" class="bg-dark" rounded :to="localePath('login')">
                  <span>{{ $t("nav.Register") }}</span>
                </v-btn>

                <AppUserInfo v-else class="tw-mr-20"></AppUserInfo>
              </div>
            </v-list-item>
            <v-list-item>
              <v-btn class="bg-dark rounded-xl tw-mr-4" @click="setQrDialog(true)">
                <span>{{ $t("home.hero.createQr") }}</span>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </ClientOnly>

    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useAppStore } from "../../store/app";
import { useScroll } from "@vueuse/core";
const drawer = ref(false);
const { arrivedState } = useScroll(process.client ? window : null);
const { IsLoggedIn } = useAuth();
const localePath = useLocalePath()
const route = useRoute();
const appStore = useAppStore();
const isLogedIn = computed(() => IsLoggedIn());
const dialog = computed(() => appStore.qrDialog);
const { locale, t } = useI18n();
function setQrDialog(is: boolean) {
  appStore.qrDialog = is;
}

const navLinks = computed(() =>
  [
    {
      title: t("home.hero.home"),
      path: "/",
    },
    {
      title: t("home.hero.price"),
      path: "/pricing",
    },
    {
      title: t("home.hero.contactUs"),
      path: "/contact",
    },
    {
      title: "signUp",
      path: "/signup",
    },
  ].filter(
    (li) => !isLogedIn.value || (isLogedIn.value && li.title !== "signUp")
  )
);
</script>

<style lang="scss" scoped>
nav {
  transition: 0.3s ease-in-out;

  .navbar-link {
    text-transform: capitalize;
  }

  &.tw-bg-dark {}

  .router-link-exact-active {
    color: theme("colors.primary") !important;
  }
}
</style>
