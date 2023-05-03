<template><skelton v-if="loading"></skelton> <mainView v-else> </mainView></template>
<script setup>
import skelton from "./components/skelton.vue";
import { onMounted } from "vue";
import mainView from "./components/mainView.vue";
const loading = ref(true);
onMounted(() => {
  loading.value = false;
});
</script>
