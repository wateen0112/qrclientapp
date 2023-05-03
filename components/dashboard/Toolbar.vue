<template>
    <v-toolbar class="page-header align-items-center">
      <v-btn @click="AppStore.SET_SIDE_BAR(!Sidebar)" icon class="d-block d-md-none">
        <v-icon> mdi-menu </v-icon>
      </v-btn>
      <v-btn icon v-if="$route.meta.backBtn">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
  
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        variant="underlined"
        label="Search"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <div id="tool-bar-actions">
      </div>
    </v-toolbar>
  </template>
  
  <script lang="ts" setup>
  import { useAppStore } from "../../store/app";
  const route = useRoute();
  const pageTitle = computed(() => route.meta.title);
  const AppStore = useAppStore();
  const Sidebar = computed(() => AppStore.Sidebar);
  </script>
  
  <style lang="scss">
  .page-header {
    background-color: transparentize($color: #fff, $amount: 0.1) !important;
    padding: 1rem !important;
    backdrop-filter: blur(5px);
    position: sticky !important;
    top: 0 !important;
    width: 100%;
    display: flex;
    justify-content: space-between;
  
    .left-side,
    .right-side {
      display: flex;
      align-items: center;
      gap: 2rem;
  
      .page-title {
        font-weight: bold;
      }
    }
  }
  </style>
  