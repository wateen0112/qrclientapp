<template>
  <svg
    width="175"
    height="175"
    viewBox="0 0 175 175"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="87.5" cy="87.5" r="87.5" fill="white" />
    <rect x="42" y="43" width="96" height="94" rx="2" fill="#220E27" />
    <rect x="53" y="52" width="31" height="27" fill="white" />
    <rect x="94.5" y="52.5" width="30" height="26" stroke="white" />
    <rect x="63" y="61" width="11" height="9" fill="#220E27" />
    <rect x="103" y="61" width="11" height="9" fill="white" />
    <rect x="53.5" y="97.5" width="30" height="26" stroke="white" />
    <rect x="62" y="106" width="11" height="9" fill="white" />
    <rect x="100" y="97" width="9" height="7" fill="white" />
    <rect x="116" y="97" width="9" height="7" fill="white" />
    <rect x="107" y="108" width="9" height="7" fill="white" />
    <rect x="100" y="117" width="9" height="7" fill="white" />
    <rect x="131" y="46" width="5" height="4" fill="#220E27" />
    <rect x="127" y="51" width="5" height="4" fill="#220E27" />
    <rect x="120" y="117" width="9" height="7" fill="white" />
    <circle cx="139.5" cy="141.5" r="30" fill="white" stroke="#407BFF" />
    <g class="download">
      <path
        d="M139.793 145.707C140.183 146.098 140.817 146.098 141.207 145.707L147.571 139.343C147.962 138.953 147.962 138.319 147.571 137.929C147.181 137.538 146.547 137.538 146.157 137.929L140.5 143.586L134.843 137.929C134.453 137.538 133.819 137.538 133.429 137.929C133.038 138.319 133.038 138.953 133.429 139.343L139.793 145.707ZM139.5 131V145H141.5V131H139.5Z"
        fill="black"
      />
      <path d="M132 145V150.5H148V145" stroke="black" stroke-width="3" />
    </g>
  </svg>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";

onMounted(() => {
  //   gsap.from("g .download", {
  //     opacity: 0,
  //     y: 0,
  //   });
});
</script>
<style></style>
