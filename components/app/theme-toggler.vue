<template>
  <button>
    <ui-custom-icon name="brightness" size="27"></ui-custom-icon>
  </button>
</template>

<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { ref } from "vue";
const isDark = ref(false);
const ToggleTheme = useToggle(isDark.value);
</script>

<style scoped lang="scss">
button {
  svg {
    font-size: 35px;
  }
}
</style>
