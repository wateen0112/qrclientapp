<template>
  <div>
    <v-layout  >
      <!-- Top left Red Shape -->
      <img
        class="tw-absolute tw-top-0 tw-left-0 rtl:-tw-scale-x-100 -tw-z-10"
        src="~assets/svg/shapes/red-shape-qr.svg"
      />
      <div class="tw-w-full">
        <LayoutNavbar></LayoutNavbar>
        <main class="tw-min-h-screen">
          <slot></slot>
        </main>
        <LayoutFooter></LayoutFooter>
        <div v-if="loading" class="website-loader tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-z-50 tw-bg-dark tw-h-screen tw-flex tw-justify-center tw-items-center ">
          <h2 class="tw-text-5xl tw-text-white">LOADING </h2>
        </div>
      </div>
    </v-layout>
  </div>
</template>


<script setup lang="ts">
const loading = ref(true)
onMounted(()=>{
loading.value = false
})

</script>

<style >


</style>
