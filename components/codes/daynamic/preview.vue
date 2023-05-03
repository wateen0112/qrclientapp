<template>
  <div class="tw-flex tw-justify-center tw-items-center">
    <div
      class="preview-container tw-pt-10 tw-overflow-hidden tw-relative tw-w-[396px] tw-min-h-[810px]">
      <div
        class="tw-top-14 tw-z-50 tw-absolute tw-w-[300px] tw-left-[50%] tw-translate-x-[-50%]">
        <ul
          class="tw-bg-gray-300 tw-rounded-full tw-px-5 tw-py-1 tw-flex tw-justify-center tw-items-center tw-gap-4">
          <li>
            <button @click="isActive = 'Preview'"
              :class="isActive == 'Preview' ? 'tw-bg-primary' : ''"
              class="tw-rounded-full text-white tw-p-2 tw-px-3 tw-transition-all">
              Preview
            </button>
          </li>
          <li>
            <button @click="generateCode"
              :class="isActive == 'qrCode' ? 'tw-bg-primary' : ''"
              class="tw-rounded-full text-white tw-p-2 tw-px-3 tw-transition-all">
              Qr code
            </button>
          </li>
          <li>
            <vBtn
            variant="tonal"
            color="primary"
            :to="$route.path.replace('dynamic', 'template')"
            icon="mdi-eye"
            class="mx-auto"
          ></vBtn>
          </li>
        </ul>
      
      </div>
      <div class="tw-absolute tw-top-24 tw-w-[396px] tw-min-h-[810px]">
      </div>
      <div class="tw-flex tw-justify-center tw-items-center tw-flex-col">
        <div
          class="tw-w-[100%] tw-top-2 tw-left-[50%] tw-flex tw-justify-center tw-flex-col tw-items-center tw-translate-x-[-50%] tw-absolute tw-pt-7">
          <div
            class="tw-w-[92%] ovs tw-pt-16  tw-bg-white tw-mt-5 tw-h-[745px]  tw-overflow-x-hidden  tw-overflow-y-auto  tw-border-b-[5px] tw-border-solid tw-border-b-black tw-rounded-[40px] tw-overflow-hidden"
            v-if="isActive == 'Preview'"
          >
            <slot> </slot>
          </div>
          <div class="tw-mt-16" v-else>
            <CodesQrStyle :isDynamic="isDynamic"></CodesQrStyle>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
defineProps({
  isDynamic: Boolean,
});
const isActive = ref("Preview");
const generateCode = () => {
  isActive.value = "qrCode";
};
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.preview-container {
  overflow: hidden !important;
  background: url("assets/svg/mobileFrame.svg");
  background-size: cover;
  background-repeat: no-repeat;
  max-height: 800px;
  padding-top: 40px;
  padding-bottom: 40px;
}

::-webkit-scrollbar {
  margin-right: 20px;
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: darkgrey;
  display: none;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
