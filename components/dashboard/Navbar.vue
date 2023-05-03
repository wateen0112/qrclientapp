<template>
  <v-app-bar class="position-static w-100 d-flex justify-content-between" flat>
    <!-- User Info And Avatar -->
    <div class="left">
      <v-breadcrumbs :items="breadCrumnItems">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
            {{ $t(item.text) }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <div class="tw-relative tw-flex tw-items-center tw-space-x-8">
        <div>
          <ClientOnly>
            <!-- <VSelect
              :value="LocaleSelect.find((l) => l.value === $i18n.locale)?.name as string"
              variant="plain"
              :class="class"
              class="tw-w-24 mb-2 tw-capitalize"
              menu-icon="mdi-web"
              color="primary"
              @update:modelValue="setLocale()"
              :items="LocaleSelect"
              item-title="name"
              item-value="value"
            >
            </VSelect> -->

            <!-- <VSelect menu-icon="mdi-web" :items="langs" item-title="name" item-value="value" v-model="">
            </VSelect> -->
            <Localizer />
          </ClientOnly>
        </div>
      </div>
    </div>
    <div class="right d-flex align-center justify-content-end justify-space-between">
      <div class="d-none d-md-block mx-3">
        <AppUserInfo></AppUserInfo>
      </div>

      <v-btn @click="AppStore.SET_SIDE_BAR(!Sidebar)" icon class="d-block d-lg-none">
        <v-icon> mdi-menu </v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "~/store/app";
import { LocaleSelect } from "@/locale/i18n.config";
const i18n = useI18n();
// function setLocale(e: string) {
//   i18n.locale.value = e;
//   localStorage.setItem("lang", e);
// }
const lang = ref(localStorage.getItem("lang") ?? "de");
defineProps({
  class: [Object, String],
});
const route = useRoute();
const AppStore = useAppStore();

const Sidebar = computed(() => AppStore.Sidebar);

const breadCrumnItems = computed(() => route.meta.breadCrumb);
const langs = ref([
  // { name: "العربية", value: 1 },
  { name: "English", value: "en" },
  {
    name: "Deutsch",
    value: "de",
  },
]);
// watch(lang, () => {
//   setLocale(lang.value);
// });

onBeforeMount(() => {
  // i18n.locale.value = localStorage.getItem("lang") ?? "de";
});
</script>

<style lang="scss">
.v-toolbar__content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.left,
.right {
  display: flex;
}
</style>
