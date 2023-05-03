<template>
  <div class="d-flex align-items-center">
    <!-- <v-avatar>
      <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
    </v-avatar> -->

    <client-only>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
          rounded
            variant="text"
            color="transparent"
            v-bind="props"
            class="text-grey-darken-1 md-dash"
            append-icon="mdi-menu-down"
          >
            {{ username }}</v-btn
          >
        </template>
        <v-list color="flat">
          <v-list-item :value="1" :to="localPath('/dashboard/home')">
            <template v-slot:prepend>
              <v-icon :icon="`mdi-qrcode-edit`"></v-icon>
            </template>

            <v-list-item-title> {{ $t("nav.Dashboard") }}</v-list-item-title>
          </v-list-item>
          <v-list-item :value="1" :to="localPath('/dashboard/myaccount')">
            <template v-slot:prepend>
              <v-icon :icon="`mdi-account`"></v-icon>
            </template>

            <v-list-item-title> {{ $t("nav.Profile") }}</v-list-item-title>
          </v-list-item>
          <v-list-item :value="1" @click="LogOut()">
            <template v-slot:prepend>
              <v-icon :icon="`mdi-door-open`"></v-icon>
            </template>

            <v-list-item-title>{{ $t("nav.LogOut") }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </client-only>
  </div>
</template>

<script setup lang="ts">
const { GetUserData, LogOut } = useAuth();
const username = computed(() => GetUserData().name);
const localPath = useLocalePath()
</script>

<style lang="scss" scoped></style>
