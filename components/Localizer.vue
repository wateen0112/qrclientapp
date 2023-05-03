<script lang="ts" setup>
import { LocaleSelect } from "@/locale/i18n.config";
const switchLocalePath = useSwitchLocalePath()
const i18n = useI18n();


defineProps({
  className: [Object, String],
});


</script>

<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn rounded :class="className" class="tw-text-300" prepend-icon="mdi-web" variant="text" v-bind="props">
          {{ LocaleSelect.find((l) => l.value === $i18n.locale)?.name }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item :to="switchLocalePath(item.value)" v-for="(item, index) in LocaleSelect" :key="index" :value="index">
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
