<template>
  <div class="overflow-y-auto h-100">
    <v-list>
      <template v-for="(item, i) in navLinks" :key="i">
        <v-list-subheader v-if="item.header">{{ $t(item.header) }}
        </v-list-subheader>
        <v-list-item exact :to="localePath(item.path)" class="my-5" rounded="lg" variant="flat" color="#FFCC00" v-else>
          <template v-slot:prepend>
            <v-icon color="light" :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="$t(item.title)"></v-list-item-title>
        </v-list-item>
      </template>

      <v-list-subheader>{{ $t("dashboard.sideBar.folders") }}</v-list-subheader>

      <v-list-group class="m-0" value="folders" prepend-icon="mdi-folder">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" class="tw-mt-3 tw-cursor-pointer" :title="$t('dashboard.sideBar.myFolders')">
          </v-list-item>
        </template>

        <v-list>
          <v-list-item class="tw-cursor-pointer" v-for="item in folderStore.folderList" @click="goToPage(item)" exact
            rounded="lg" variant="flat" color="primary">
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-list-group>

      <v-list-item v-if="button == false" value="1" exact class="my-5" rounded="lg" color="primary" @click="changeBtn">
        <template v-slot:prepend>
          <v-icon color="light" icon="mdi-plus"></v-icon>
        </template>

        <v-list-item-title v-text="$t('dashboard.sideBar.addFolder')"></v-list-item-title>
      </v-list-item>
      <v-text-field v-if="input == false" v-model="folderDto.name" variant="underlined" label="إنشاء مجلد"
        @keyup.enter="clickEnter">
      </v-text-field>
    </v-list>
  </div>
</template>
<script lang="ts" setup>
import type { NavigationItem } from "../../app/types/base";
import { NavLinks } from "../../app/navigation";
import { useFolderStore } from "~/store/dashboard/folder/index";

const navLinks = computed<NavigationItem[]>(() => NavLinks);
const folderDto = reactive({
  name: "",
});
const router = useRouter();

const folderStore = useFolderStore();
const input = ref(true);
const button = ref(false);
const localePath = useLocalePath()

function changeBtn() {
  button.value = true;
  input.value = false;
  resetForm();
}
function goToPage(target: any) {
  router.push(`/dashboard/myQrs/all?folderId=${target.id}`);
}
function clickEnter() {
  folderStore.AddFolder(folderDto);
  button.value = false;
  input.value = true;
}
function resetForm() {
  folderDto.name = "";
}
folderStore.GetAllFolder();
</script>

<style>
.icon {
  height: 13px;
}
</style>
