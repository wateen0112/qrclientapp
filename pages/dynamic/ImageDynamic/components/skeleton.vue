<template>
  <div
    class="tw-pt-[80px] tw-flex tw-justify-between tw-flex-row tw-bg-[#FFF5F5] tw-gap-5"
  >
    <div class="tw-min-h-[100vh] tw-py-20 tw-px-10 tw-w-[100%]">
      <div class="tw-bg-white tw-min-w-[60%] tw-px-5 tw-min-h-[600px] tw-py-20 tw-block">
        <div
          class="tw-bg-gray-200 tw-w-[90%] tw-min-h-[70px] tw-rounded-md skelton-1 tw-my-5"
        ></div>
        <div
          class="tw-bg-gray-200 tw-w-[90%] tw-min-h-[70px] tw-rounded-md skelton-2 tw-my-5"
        ></div>
        <div
          class="tw-bg-gray-200 tw-w-[90%] tw-min-h-[70px] tw-rounded-md skelton-3 tw-my-5"
        ></div>
        <div
          class="tw-bg-gray-200 tw-w-[90%] tw-min-h-[70px] tw-rounded-md skelton-4 tw-my-5"
        ></div>
      </div>
    </div>
    <div class="tw-bg-black tw-w-[35%] tw-px-3 tw-max-h-[600px] tw-rounded-lg">
      <div class="tw-flex tw-justify-center tw-gap-11 tw-items-center tw-mt-5">
        <div class="tw-bg-yellow-400 tw-w-32 tw-h-12 popup"></div>
        <div class="tw-bg-yellow-400 tw-w-32 tw-h-12 popup"></div>
      </div>
      <div class="tw-mt-[20px] tw-bg-white tw-w-[100%] tw-h-[490px]"></div>
    </div>
  </div>
</template>
<style scoped>
.skelton-1 {
  animation: skelton-1 1.2s ease-in-out infinite;
}
.skelton-2 {
  animation: skelton-1 1.4s ease-in-out infinite;
}
.skelton-3 {
  animation: skelton-1 1.5s ease-in-out infinite;
}
.skelton-4 {
  animation: skelton-1 1.6s ease-in-out infinite;
}
.popup {
  animation: popup 0.9s ease-in-out infinite;
}
.popup-1 {
  animation: popup 1.2s ease-in-out infinite;
}

@keyframes skelton {
  0% {
    opacity: 0;
  }
}
@keyframes skelton-1 {
  0% {
    opacity: 0.2;
    width: 0%;
  }
}
@keyframes popup {
  0% {
    width: 0px;
  }
}
</style>
