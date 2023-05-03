<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script>
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
