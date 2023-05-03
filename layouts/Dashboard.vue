<template>
  <v-layout>
    <!-- <ClientOnly> -->
    <div class="tw-w-full">
      <DashboardSidebar></DashboardSidebar>

      <v-main
        class="pt-0 tw-pt-0 tw-min-h-[100vh]"
        :style="{ 'padding-top': '30px' }"
      >
        <ClientOnly>
          <DashboardNavbar></DashboardNavbar>
        </ClientOnly>
        <slot></slot>
      </v-main>
      <!-- </ClientOnly> -->
      <LayoutAntherFooter></LayoutAntherFooter>
    </div>
  </v-layout>
</template>
<script setup lang="ts">
</script>

<style lang="scss">
.v-navigation-drawer {
  ::-webkit-scrollbar {
    background-color: transparent !important;
    width: 5px;
    transition: 0.3s;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent !important;
    border-radius: 2.5rem;
    visibility: hidden !important;
    transition: background-color 0.5s !important;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent !important;
  }

  &:hover {
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #ccc !important;
      visibility: visible !important;
    }
  }
}

.v-toolbar__content {
  width: 100%;
}
</style>
