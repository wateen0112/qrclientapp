<template>
  <div class="tw-mt-[100px] tw-overflow-hidden">
    <section>
      <div
        class="tw-flex tw-justify-center tw-items-center tw-gap-14  tw-flex-wrap md:tw-gap-6 tw-my-[100px]"
      >
        <div class="tw-max-w-[800px] tw-mx-7 tw-flex tw-flex-col tw-justify-center">
          <h1 class="tw-mt-7 tw-leading-tight tw-font-bold tw-text-3xl  tw-flex tw-justify-center">
            {{ $t("learnMore.Beginner’s") }}
          </h1>
          <p class="tw-mt-4" v-html='$t("learnMore.Beginner’sParagraph")'>
          </p>
        </div>
        <div class="min-w-[400px] tw-mx-12">
          <img class="" src="~assets/svg/learnMore/qr.svg" />
        </div>
      </div>
    </section>
    <section>
      <div
        class="tw-bg-[#FFF5CD] tw-flex tw-justify-around tw-flex-wrap md:tw-gap-6 tw-my-[100px]"
      >
        <div class="min-w-[400px]">
          <img class="" src="~assets/svg/learnMore/qr1.svg" />
        </div>
        <div class="tw-max-w-[700px] tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center">
          <h1 class=" tw-leading-tight tw-font-bold tw-text-3xl ">
            {{ $t("learnMore.ScanQr") }}
          </h1>
          <p class="tw-mt-4 " v-html='$t("learnMore.ScanQrParagraph")'> </p>
        </div>
      </div>
    </section>
    <section>
      <div>
        <div class="tw-flex tw-justify-center tw-text-center tw-my-[100px]">
          <div class="tw-w-full">
            <h1
              data-aos="fade-down"
              class="text-animation tw-text-center tw-m-4 tw-leading-tight tw-font-bold tw-text-3xl"
            >
              {{ $t("learnMore.anatomyQr") }}
            </h1>
            <p
              data-aos="fade-down"
              class="Paragraph-animation tw-text-center tw-mt-2 tw-mx-12"
            >
              {{ $t("learnMore.anatomyQrParagraph") }}
            </p>
          </div>
        </div>
        <div
          class="tw-flex tw-justify-center tw-items-center tw-gap-14  tw-my-[100px] tw-flex-wrap md:tw-gap-6"
        >
          <div data-aos="fade-left" class="min-w-[400px] tw-mx-12">
            <img class="" src="~assets/svg/learnMore/phone1.svg" />
          </div>
          <div data-aos="fade-right" class="tw-max-w-[700px] tw-mx-12">
            <h1
              class="text-animation tw-text-center tw-m-7 tw-leading-tight tw-font-bold tw-text-3xl"
            >
              {{ $t("learnMore.Positioning") }}
            </h1>
            <p class="Paragraph-animation tw-mt-4" v-html='$t("learnMore.PositioningParagraph")'>
            </p>
          </div>
        </div>
        <div
          class="tw-flex tw-justify-center tw-items-center tw-gap-14 tw-my-[100px] tw-flex-wrap md:tw-gap-6"
        >
          <div data-aos="fade-left" class="tw-max-w-[700px] tw-mx-12">
            <h1
              class="text-animation tw-text-center tw-m-7 tw-leading-tight tw-font-bold tw-text-3xl"
            >
              {{ $t("learnMore.TimingQr") }}
            </h1>
            <p class="Paragraph-animation tw-mt-4" v-html='$t("learnMore.TimingQrParagraph")'>
            </p>
          </div>
          <div data-aos="fade-right" class="min-w-[400px] tw-mx-12">
            <img class="" src="~assets/svg/learnMore/phone2.svg" />
          </div>
        </div>
        <div
          class="tw-flex tw-justify-center tw-items-center tw-gap-14  tw-my-[100px] tw-flex-wrap md:tw-gap-6"
        >
          <div data-aos="fade-left" class="min-w-[400px] tw-mx-12">
            <img class="" src="~assets/svg/learnMore/phone3.svg" />
          </div>
          <div data-aos="fade-right" class="tw-max-w-[700px] tw-mx-12">
            <h1
              class="text-animation tw-text-center tw-m-7 tw-leading-tight tw-font-bold tw-text-3xl"
            >
              {{ $t("learnMore.QuietZone") }}
            </h1>
            <p class="Paragraph-animation tw-mt-4 tw-flex tw-text-center" v-html='$t("learnMore.QuietZoneParagraph")'>
            </p>
            <p class="Paragraph-animation tw-mt-4" v-html='$t("learnMore.Quiet")'>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import gsap from "gsap";
import AOS from "aos";
onMounted(() => {
  if (process.client) {
    AOS.init();
    const t1 = gsap.timeline({ repeatDelay: 2 });
    t1.from(".text-animation", { x: -300, duration: 1, opacity: 0 });
    t1.to(".text-animation", { x: 0, duration: 1, opacity: 1 });
    t1.from(".Paragraph-animation", {
      y: -50,
      duration: 1,
      opacity: 0,
    });
    t1.to(".Paragraph-animation", {
      y: 0,
      duration: 1,
      opacity: 1,
    });
  }
});
</script>
<style scoped></style>
