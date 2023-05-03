<script setup lang="ts">
const props = defineProps({
  text: String,
  wordsCount: {
    type: Number,
    default: 20,
  },
  default: {
    type: Boolean,
    default: false,
  },
  class:String
});

const textLength = computed(() => props.text?.split(" ").length ?? 0);
const expand = ref(props.default);
</script>

<template>
  <p class="tw-flex-wrap">
    <span :class="class" v-html="expand || textLength <= wordsCount ? text : text?.split(' ').slice(0, wordsCount).join(' ') + ' ... '"></span>
    <VBtn variant="plain" v-if="text && text.split(' ').length > wordsCount"
      class=" hover:tw-bg-white tw-underline tw-border-primary tw-transition hover:tw-bg-opacity-10 tw-p-px tw-rounded-lg"
      @click="expand = !expand">
      {{ expand ? " Read Less" : "Read More" }}
    </VBtn>
</p>
</template>


<style lang="scss"></style>
