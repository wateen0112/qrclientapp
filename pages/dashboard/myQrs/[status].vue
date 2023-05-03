<template>
  <DashboardPage
    :icon="'mdi-format-list-checkbox'"
    @search="searchContact($event)"
  >
    <template #action-button>
      <v-btn
        color="primary"
        @click="qrDialog = true"
        prepend-icon="mdi-plus"
        variant="outlined"
        >{{ $t("tableAllQR.NewQr") }}</v-btn
      >
    </template>
    <div class="tw-mt-5">
      <div v-if="store.paginateListQr.length > 0" class="ml-2 mr-2">
        <ClientOnly>
          <v-table>
            <thead>
              <tr>
                <th style="text-align: left">{{ $t("tableAllQR.NameQR") }}</th>
                <th style="text-align: left">
                  {{ $t("tableAllQR.QRCategory") }}
                </th>
                <th style="text-align: left">{{ $t("tableAllQR.QRMode") }}</th>
                <th style="text-align: left">{{ $t("tableAllQR.QRType") }}</th>
                <th style="text-align: left">{{ $t("tableAllQR.file") }}</th>
                <th style="text-align: left">
                  {{ $t("tableAllQR.DateCreated") }}
                </th>
                <th style="text-align: left">
                  {{ $t("tableAllQR.ScansNumber") }}
                </th>
                <th style="text-align: left">
                  {{ $t("tableAllQR.MoveFolder") }}
                </th>
                <th style="text-align: left">{{ $t("tableAllQR.Edit") }}</th>
                <th style="text-align: left">{{ $t("tableAllQR.Details") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in store.paginateListQr" :key="item.id">
                <td>{{ item.name }}</td>
                <td>
                  {{ item.qrCategory == "Dynamic" ? "Dynamic" : "Static" }}
                </td>
                <td>
                  {{
                    item.isActive
                      ? "Active"
                      : item.qrCategory === QrCategory.static
                      ? "-"
                      : " NotActive"
                  }}
                </td>
                <td>{{ item.qrIndex }}</td>
                <td>{{ item.folderName ? item.folderName : "nothing" }}</td>
                <td>
                  {{ new Date(item.dateCreated).toLocaleDateString() }}
                </td>
                <td>{{ item.scanCount ? item.scanCount : "nothing" }}</td>
                <td style="text-align: center">
                  <v-btn icon flat @click="getIdQr(item)">
                    <v-icon color="primary">mdi-folder</v-icon>
                  </v-btn>
                  <ClientOnly>
                    <v-dialog v-model="dialog" width="720">
                      <v-card>
                        <v-card-title class="p-2">
                          <v-btn icon size="small" flat @click="dialog = false">
                            <v-icon color="primary">mdi-close</v-icon>
                          </v-btn>
                          {{ $t("tableAllQR.MoveQr") }}
                        </v-card-title>
                        <v-card-text class="tw-bg-gray-100 tw-h-64">
                          <p>
                            {{ $t("tableAllQR.text") }}
                          </p>
                          <v-list-item
                            v-if="button == false"
                            value="1"
                            exact
                            class="my-5"
                            rounded="lg"
                            color="primary"
                            @click="changeBtn"
                          >
                            <template v-slot:prepend>
                              <v-icon color="red" icon="mdi-plus"></v-icon>
                            </template>

                            <v-list-item-title
                              class="tw-text-black"
                              v-text="$t('dashboard.sideBar.addFolder')"
                            ></v-list-item-title>
                          </v-list-item>
                          <v-text-field
                            v-if="input == false"
                            v-model="folderDto.name"
                            variant="underlined"
                            :label="$t('dashboard.sideBar.addFolder')"
                            @keyup.enter="clickEnter"
                          >
                          </v-text-field>
                          <ClientOnly>
                            <v-select
                              v-model="moveFolderDto.folderId"
                              prepend-icon="mdi-folder"
                              itemValue="id"
                              itemTitle="name"
                              label="Folders"
                              :items="folderStore.folderList"
                              variant="underlined"
                            ></v-select>
                          </ClientOnly>
                        </v-card-text>
                        <v-card-actions class="tw-flex tw-justify-center">
                          <v-btn color="primary" @click="move"
                            >{{ $t("tableAllQR.Move") }}
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </ClientOnly>
                </td>
                <td>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn   icon flat v-bind="props">
                        <v-icon>mdi-pencil-outline</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                        value="1"
                        @click="deleteQr(item.id, item.qrIndex)"
                      >
                        <v-list-item-title class="tw-m-1 tw-cursor-pointer">
                          <v-icon color="red" class="mr-3" size="small">
                            mdi-delete</v-icon
                          >
                          {{ $t("tableAllQR.Delete") }}
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        value="2"
                        v-if="item.qrCategory == 'Dynamic'"
                      >
                        <v-list-item-title
                          @click="stateQr(item)"
                          class="tw-m-1 tw-cursor-pointer"
                        >
                          <v-icon class="mr-3" size="small">
                            mdi-play-outline</v-icon
                          >
                          {{ item.isActive ? "turningOff" : "activation" }}
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        :to="localePath(`/dynamic/${item.qrIndex}/${item.id}`)"
                        value="2"
                        @click="store.qrNameToDownload=item.name"
                        v-if="item.qrCategory == 'Dynamic'"
                      >
                        <v-list-item-title class="tw-m-1 tw-cursor-pointer">
                          <v-icon class="mr-3" size="small"> mdi-pen</v-icon>
                          {{ $t("tableAllQR.Edit") }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </td>
                <td>
                  <v-btn icon flat @click="goToDetails(item)">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </ClientOnly>
      </div>
      <div v-else>
        <v-col>
          <div class="tw-bg-white tw-flex tw-justify-center tw-p-5">
            <h1 class="tw-text-xl">{{ $t("tableAllQR.noData") }}</h1>
          </div>
        </v-col>
      </div>
      <div
        class="flex justify-center items-center w-full bg-white border-t-2 tw-p-5"
      >
        <v-pagination
          v-model="pagination.pageIndex"
          :length="Math.ceil(store.filterListQr.length / pagination.pageSize)"
          rounded="circle"
          @update:modelValue="paginate"
          :total-visible="10"
        ></v-pagination>
      </div>
    </div>
  </DashboardPage>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useQrStore } from "@/store/qrCodes/qr";
import { storeToRefs } from "pinia";
import { GetAllQr } from "~/api/dto/dashboard/totalQr";
import { QrController } from "~/api/endpoints/Qr";
import { useAppStore } from "~/store/app";
import { QrCategory } from "~/api/enums/qr";
import { useFolderStore } from "~/store/dashboard/folder/index";
const folderStore = useFolderStore();
folderStore.GetAllFolder();
const stopDto = reactive({
  id: "",
  qrIndex: "",
});
const moveFolderDto = reactive({
  id: "",
  folderId: "",
});
const dialog = ref(false);
const input = ref(true);
const button = ref(false);
const folderDto = reactive({
  name: "",
});
function getIdQr(target: any) {
  moveFolderDto.id = target.id;
  dialog.value = true;
}
function move() {
  store.moveFolder(moveFolderDto).then(() => store.GetAllQr());
  moveFolderDto.folderId = "";
  dialog.value = false;
}
function clickEnter() {
  folderStore.AddFolder(folderDto);
  button.value = false;
  input.value = true;
}
function changeBtn() {
  button.value = true;
  input.value = false;
  resetForm();
}
function resetForm() {
  folderDto.name = "";
}
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

function stateQr(target: any) {
  stopDto.id = target.id;
  stopDto.qrIndex = target.qrIndex;
  if (target.isActive) {
    store.stopeQr(stopDto).then(() => store.GetAllQr());
  } else store.activeQr(stopDto).then(() => store.GetAllQr());
}

const router = useRouter();
const route = useRoute();
const store = useQrStore();
const localePath = useLocalePath()
const pagination = computed(() => store.pagination);

function paginate(e: any) {
  store.paginationQr({
    pageSize: pagination.value.pageSize,
    pageIndex: e,
  });
}
function searchContact(e: any) {
  store.findContact(e);
}
const { qrDialog } = storeToRefs(useAppStore());

function goToDetails(target: any) {
  router.push(
    `/dashboard/myQrs/details/${target.id}?qrIndex=${target.qrIndex}`
  );
}

function deleteQr(id: string, qrIndex: string) {
  store.DeleteQr({ id: id, qrIndex: qrIndex });
}
const { data: myQrs } = await useCustomFetch<GetAllQr[]>(
  `${QrController.GET_ALL_QR}?folderId=${
    route.query.folderId ? route.query.folderId : ""
  }`
);
if (myQrs.value)
  store.$patch({
    qrTotalList: myQrs.value,
  });
</script>
