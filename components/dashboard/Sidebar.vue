<template>
  <v-navigation-drawer :rail="!isSmallerOrEqual('md')" rail-width="85"
    :expand-on-hover="true" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    :location="dir" elevation="5" class="sidebar"
    v-model="AppStore.Sidebar" app width="280">
    <div class="sidebar px-3">
      <div class="sidebar-header">
        <AppInfo></AppInfo>
      </div>
      <div class="sidebar-body">
        <DashboardSidebarMenu></DashboardSidebarMenu>



      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { useAppStore } from "../../store/app";
import { useFolderStore } from "~/store/dashboard/folder/index";
const folderDto = reactive({
  name: "",
});
const folderStore = useFolderStore();

// ? Define
const AppStore = useAppStore();
const i18n = useI18n();
const input = ref(true);
const button = ref(false);
const dir = computed(() => (i18n.locale.value === "ar" ? "right" : "left"));
const { isSmallerOrEqual } = useBreakpoints(breakpointsTailwind)






folderStore.GetAllFolder();
</script>

<style lang="scss" scoped>
.sidebar {
  max-height: 100vh !important;
}
</style>
