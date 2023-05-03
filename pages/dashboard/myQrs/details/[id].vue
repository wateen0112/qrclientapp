<template>
  <div class="tw-m-3">
 
    <div class="tw-flex tw-justify-between tw-items-center tw-m-3">
      <v-btn
        color="primary"
        class="text-white"
        prepend-icon="mdi-plus"
        @click="qrDialog = true"
        >{{$t('tableAllQR.NewQr')}}</v-btn
      >
      <v-btn color="primary" class="text-white" @click="$router.go(-1)">
        {{ $t("DetailsQR.Back") }}
        <v-icon dark right x-large class="tw-mt-1 tw-ml-1">
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </div>
    <!--Details Qr-->
    <div
      class="tw-grid tw-grid-cols-12 tw-bg-white tw-p-4 tw-gap-5 tw-m-9 tw-w-auto tw-justify-center tw-items-center tw-text-center tw-rounded-lg tw-shadow-md"
    >
      <div class="tw-col-span-12 lg:tw-col-span-4">
        <p class="tw-text-slate-500">
          {{ qrDto.qrType }}
        </p>
        <h2 class="tw-mb-2 tw-mt-2">{{ qrDto.qrName }}</h2>
        <p class="tw-text-slate-500">
          {{ new Date(qrDto.dateCreated).toLocaleDateString() }}
        </p>
      </div>
      <div class="tw-col-span-12 lg:tw-col-span-4">
        <p
          v-if="qrDto.qrCategory == 'Dynamic'"
          class="tw-text-slate-500 tw-mb-3"
        >
          {{ qrDto.version }} version
        </p>
        <v-btn
          @click="downloadQr"
          prepend-icon="mdi-download"
          variant="flat"
          color="primary"
        >
          Download</v-btn
        >

        <div class="tw-flex tw-justify-center tw-items-center tw-mt-3">
          <client-only>
            <v-btn
              v-if="qrDto.qrCategory === 'Dynamic'"
              icon
              size="x-small"
              flat
              @click="goToDetailsQr(qrDto)"
            >
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-btn icon size="x-small" flat @click="getIdQr(qrDto.id)">
              <v-icon color="primary">mdi-folder</v-icon>
            </v-btn>
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
                    Select the folder you would like to move your QR Code to:
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
                    label="إنشاء مجلد"
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
                  <v-btn color="primary" @click="move">
                    {{ $t("tableAllQR.Move") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon size="large" flat v-bind="props">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item-title class="tw-m-1 tw-cursor-pointer">
                  <v-btn
                    @click="deleteQr(qrDto.id, qrDto.qrIndex), $router.go(-1)"
                    >{{ $t('DetailsQR.delete') }}<v-icon color="red" class="mr-3" size="x-small"
                      >mdi-delete</v-icon
                    >
                  </v-btn>
                </v-list-item-title>
                <v-divider v-if="qrDto.qrCategory == 'Dynamic'"></v-divider>
                <v-list-item-title
                  v-if="qrDto.qrCategory == 'Dynamic'"
                  class="tw-m-1 tw-cursor-pointer"
                  @click="stateQr(qrDto), $router.go(-1)"
                  ><v-btn>
                    {{ qrDto.isActive ?  $t('DetailsQR.stop')  : $t('DetailsQR.active') }}
                    <v-icon class="mr-1" size="small">
                      mdi-play-outline</v-icon
                    ></v-btn
                  >
                </v-list-item-title>
              </v-list>
            </v-menu>
          </client-only>
        </div>
      </div>
      <div
        class="tw-col-span-12 lg:tw-col-span-4 tw-flex lg:tw-flex-row tw-flex-col tw-justify-center"
      >
        <div
          v-if="qrDto.qrCategory === 'Dynamic'"
          class="tw-flex tw-flex-col tw-justify-center"
        >
          <p class="tw-font-bold tw-text-xl tw-mx-14">
            Scans: {{ qrDto.scanCount }}
          </p>
          <p>{{ qrDto.shortUrl }}</p>
        </div>
        <div class="tw-flex tw-justify-center tw-items-center">
          <img
            :src="appConfig.DOMAIN_HOST + '/' + qrDto.qrUrl"
            height="150"
            width="150"
          />
        </div>
      </div>
    </div>

    <!--Welcome Screen-->
    <div
      v-if="qrDto.qrCategory == 'Dynamic'"
      class="tw-bg-white tw-rounded-lg tw-shadow-md tw-m-9 tw-flex tw-flex-col"
    >
      <div class="tw-flex tw-bg-gray-200 tw-p-4">
        <svg
          width="13"
          height="21"
          viewBox="0 0 13 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.7808 0H1.4184C0.6384 0 0 0.6378 0 1.4184V19.581C0 20.3616 0.6384 21 1.4184 21H10.7808C11.5608 21 12.1992 20.3628 12.1992 19.5816V1.4184C12.1992 0.6378 11.5608 0 10.7808 0ZM4.0158 19.9776H2.8182C2.5986 19.9776 2.4192 19.7988 2.4192 19.5786C2.4192 19.3584 2.5986 19.179 2.8182 19.179H4.0158C4.2348 19.179 4.4142 19.3584 4.4142 19.5786C4.4142 19.7988 4.2366 19.9776 4.0158 19.9776ZM6.0996 20.2908C5.7084 20.2908 5.3904 19.9734 5.3904 19.581C5.3904 19.1886 5.7078 18.8718 6.0996 18.8718C6.4914 18.8718 6.8088 19.1886 6.8088 19.581C6.8088 19.9734 6.4908 20.2908 6.0996 20.2908ZM9.381 19.9776H8.1846C7.9644 19.9776 7.785 19.7988 7.785 19.5786C7.785 19.3584 7.9644 19.179 8.1846 19.179H9.381C9.6012 19.179 9.78 19.3584 9.78 19.5786C9.78 19.7988 9.6012 19.9776 9.381 19.9776ZM11.2122 18.375H0.987V0.9264H11.2122V18.375Z"
            fill="black"
          />
        </svg>

        <span class="tw-text-gray-500 tw-font-bold tw-mx-3">Welcom screen</span>
      </div>
      <div class="tw-flex tw-flex-col tw-justify-around tw-p-5 tw-gap-4">
        <p>{{ $t("DetailsQR.text") }}</p>
        <div
          class="tw-grid tw-flex lg:tw-flex-row tw-flex-col lg:tw-justify-center tw-items-center"
        >
          <img
            :src="getFileUrl(qrDto.welcomeImageUrl)"
            class="tw-w-full md:tw-w-auto md:tw-h-[200px] md:tw-mx-auto tw-rounded-lg tw-object-contain tw-relative"
          />
          <div class="tw-flex tw-justify-center tw-items-center tw-mt-3">
            <v-btn
              color="primary"
              v-if="!changing"
              class="tw-mx-3 text-white"
              @click="changing = true"
              >Change</v-btn
            >
            <v-btn
              v-else
              color="primary"
              class="tw-mx-3 text-white"
              @click="changeQrImage"
              >Save</v-btn
            >
            <!-- <v-btn>Preview</v-btn> -->
          </div>
          <div v-if="changing" class="tw-mt-5 tw-relative">
            <VBtn icon="mdi-close" @click="changing = false"></VBtn>
            <FileUploader v-model="newImage" />
            <p class="tw-text-red-500" v-if="!newImage && saved">
              حدد صورة اولا
            </p>
          </div>
        </div>
      </div>
    </div>

    <!--Modify History-->
    <div
      v-if="qrDto.qrCategory == 'Dynamic'"
      class="tw-bg-white tw-rounded-lg tw-shadow-md tw-m-9 tw-flex tw-flex-col"
    >
      <div class="tw-flex tw-bg-gray-200 tw-p-4">
        <v-icon>mdi-pen</v-icon>

        <span class="tw-text-gray-500 tw-font-bold tw-mx-3"
          >Modifications History</span
        >
      </div>

      <v-List variant="flat" v-if="qrDto.records.length > 0">
        <v-list-item v-for="item in qrDto.records" :key="item.id">
          <div class="tw-p-5 tw-flex">
            <v-btn icon>#{{ item.version }}</v-btn>

            <div class="tw-p-3 tw-mx-3 tw-flex tw-justify-between tw-w-full">
              <v-List-item-subtitle
                >{{ new Date(item.dateCreated).toLocaleDateString() }}
              </v-List-item-subtitle>
              <v-List-item-title>{{ item.message }}</v-List-item-title>
              <div>
                <v-btn
                  append-icon="mdi-cash"
                  @click="pay(item.invoiceUrl)"
                  variant="tonal"
                  color="success"
                  v-if="!item.isPaid &&!item.isCansel "
                >
                  دفع</v-btn
                >
                  <v-btn
                  append-icon="mdi-cash"
                  variant="tonal"
                  color="success"
                  v-if="item.isPaid"
                >
                  تم الدفع </v-btn
                >
                <v-btn   v-if="!item.isCansel" @click="cancelEditQr(item.id, qrDto.qrIndex)" variant="tonal" color="error" class="tw-mx-1"
                  >إلغاء</v-btn
                >
                    <v-btn   v-if="item.isCansel"  variant="tonal" color="error" class="tw-mx-1"
                  >تم الإلغاء</v-btn
                >
                <v-btn
                  variant="tonal"
                  color="primary"
                  @click="goToDetailsQr(item)"
                  >مشاهدة التعديل</v-btn
                >
              </div>
            </div>
          </div>
        </v-list-item>
      </v-List>
      <div v-else class="tw-p-5 tw-flex tw-justify-center tw-font-bold">
        {{ $t("tableAllQR.noData") }}
      </div>
    </div>

    <!--Statistic-->
    <div
      v-if="qrDto.qrCategory == 'Dynamic'"
      class="tw-bg-white tw-rounded-lg tw-shadow-md tw-m-9 tw-flex tw-flex-col"
    >
      <div class="tw-flex tw-bg-gray-200 tw-p-4">
        <v-icon>mdi-chart-bar</v-icon>
        <span class="tw-text-gray-500 tw-font-bold tw-mx-3">Statistics</span>
      </div>
      <div>
        <div class="tw-flex tw-justify-center tw-items-center">
          <div
            class="tw-bg-white tw-rounded tw-flex tw-justify-center tw-flex-col w-[800px] tw-items-center tw-mt-5 tw-overflow-auto"
          >
            <div
              class="tw-text-no-wrap tw-flex md:tw-flex tw-gap-4 lg:tw-flex-col-2 tw-justify-center tw-items-center"
            >
              <h2 class="tw-my-5">{{ $t('DetailsQR.time') }}</h2>

              <div
                class="tw-flex tw-justify-center tw-items-center tw-gap-4 tw-flex-row-reverse"
              >
                <div class="tw-min-w-[250px]">
                  <div class="tw-flex tw-justify-center tw-items-center">
                    <flatPicker
                      class="tw-bg-gray-100 tw-p-1 tw-rounded-md"
                      v-model="startDate"
                      step="2"
                    />
                    <label class="mx-5">{{ $t('DetailsQR.from') }}</label>
                    <h6>{{ $t('DetailsQR.detailsQr') }}</h6>
                  </div>
                </div>

                <div class="min-w-[100px]">
                  <div class="tw-flex tw-justify-center tw-items-center">
                    <flatPicker
                      v-model="endDate"
                      class="tw-bg-gray-100 tw-p-1 tw-rounded-md"
                      step="2"
                    />
                    <label class="mx-5">{{ $t('DetailsQR.to') }}</label>
                  </div>
                </div>
              </div>
            </div>

            <ClientOnly>
              <StatisticsChartBar
                width="800"
                height="350"
                :color="['#FFD255']"
                :data="qrStatisticDto?.charts.map((ele) => ele.scansCount)"
                :categories="qrStatisticDto?.charts.map((ele) => ele.date)"
                :name="'scans count'"
              ></StatisticsChartBar>
            </ClientOnly>
          </div>
        </div>
        <div class="tw-flex tw-justify-center tw-items-center">
          <div
            class="tw-bg-white tw-rounded tw-mt-10 tw-flex tw-justify-evenly tw-items-center tw-flex-wrap tw-w-[800px] tw-p-10"
          >
            <div>
              <ClientOnly>
                <StatisticsChartDount
                  width="400"
                  height="350"
                  :color="[
                    '#FF9F43',
                    '#16a34a',
                    '#0284c7',
                    '#7c3aed',
                    '#dc2626',
                  ]"
                  :data="qrStatisticDto?.countries.map((ele) => ele.scansCount)"
                  :categories="qrStatisticDto?.countries.map((ele) => ele.rate)"
                  :name="'scans count'"
                ></StatisticsChartDount>
              </ClientOnly>
            </div>
            <div class="tw-shadow-lg">
              <v-table>
                <thead>
                  <tr>
                    <th class="tw-text-left">
                      {{ $t("DetailsQR.countries") }}
                    </th>
                    <th class="tw-text-left">{{ $t("DetailsQR.average") }}</th>
                    <th class="tw-text-left">
                      {{ $t("DetailsQR.numberScans") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in qrStatisticDto?.countries" :key="i">
                    <td>{{ item.name }}</td>
                    <td>{{ item.rate }}</td>
                    <td>{{ item.scansCount }}</td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </div>
        </div>
        <div
          class="tw-flex tw-justify-around tw-items-center tw-flex-wrap tw-gap-10 tw-my-10"
        >
          <div class="tw-bg-white tw-rounded tw-w-[400px] tw-shadow-lg">
            <div class="tw-flex tw-justify-between tw-items-center">
              <h2 class="tw-m-5 tw-mb-2 tw-font-bold">
                {{ $t("DetailsQR.details") }}
              </h2>
              <h2 class="tw-m-5 tw-mb-2 tw-font-bold">
                {{ $t("DetailsQR.topBrowser") }}
              </h2>
            </div>

            <v-table>
              <thead>
                <tr>
                  <th class="tw-text-left">{{ $t("DetailsQR.browser") }}</th>
                  <th class="tw-text-left">
                    {{ $t("DetailsQR.numberScans") }}
                  </th>
                  <th class="tw-text-left">{{ $t("DetailsQR.average") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in qrStatisticDto?.browsers" :key="i">
                  <td>{{ item.name }}</td>
                  <td>{{ item.scansCount }}</td>
                  <td>{{ item.rate }}</td> 
                </tr>
              </tbody>
            </v-table>
          </div>
          <div class="tw-bg-white tw-rounded tw-w-[400px] tw-shadow-lg">
            <div class="tw-flex tw-justify-between tw-items-center">
              <h2 class="tw-m-5 tw-mb-2 tw-font-bold">
                {{ $t("DetailsQR.details") }}
              </h2>
              <h2 class="tw-m-5 tw-mb-2 tw-font-bold">
                {{ $t("DetailsQR.cities") }}
              </h2>
            </div>
            <v-table>
              <thead>
                <tr>
                  <th class="tw-text-left">{{ $t("DetailsQR.cities") }}</th>
                  <th class="tw-text-left">{{ $t("DetailsQR.Average") }}</th>

                  <th class="tw-text-left">
                    {{ $t("DetailsQR.numberScans") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in qrStatisticDto?.cities" :key="i">
                  <td>{{ item.name }}</td>
                  <td>{{ item.rate }}</td>
                  <td>{{ item.scansCount }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useQrStore } from "@/store/qrCodes/qr";
import appConfig from "~/app.config";
import type { GetQrDetils, Qr, Statistic } from "~/api/dto/website/qrCodes";
import { storeToRefs } from "pinia";
import { useAppStore } from "~/store/app";
import { useAuthorization } from "~/store/auth";
import { QrController } from "~/api/endpoints/Qr";
import { QrCategory, QrIndex } from "~/api/enums/qr";
import { useAuth } from "~/composables/useAuth";
import { useFolderStore } from "~/store/dashboard/folder/index";
import "flatpickr/dist/flatpickr.css";
import flatPicker from "vue-flatpickr-component";
import { start } from "repl";
import axios from 'axios'
const { RefreshToken } = useAuth();
const saved = ref(false);
const folderStore = useFolderStore();

folderStore.GetAllFolder();
const moveFolderDto = reactive({
  id: "",
  folderId: "",
});
const stopDto = reactive({
  id: "",
  qrIndex: "",
});
const router = useRouter();
const dialog = ref(false);
const date = ref("");
const { qrDialog } = storeToRefs(useAppStore());
const store = useQrStore();
const route = useRoute();
const { newImageUrl } = storeToRefs(store);
const { SetAccessToken } = useAuth();
const props = defineProps(["token"]);
const changing = ref(false);
const token = route.query.token;
const newImage = ref();
const startDate = ref("2023-01-01");
const endDate = ref("2023-02-01");
onBeforeMount(() => {
  const token = route.query.token;
  if (process.server) {
    return;
  }
  // if (token) {
  //   useAuthorization().loginWithToken(token.toString());
  // }
});
const qrDto = ref<Qr>({
  id: "",
  qrName: "",
  qrIndex: QrIndex.AppDynamic,
  qrType: "dynamic",
  dateCreated: "",
  shortUrl: "",
  scanCount: 0,
  frameUrl: "",
  isActive: true,
  qrUrl: "",
  welcomeImageUrl: "",
  version: 0,
  qrCategory: QrCategory.dynamic,
  stripeInvoiceId: "",
  records: [],
});
const qrStatisticDto = ref<Statistic>({
  browsers: [],
  charts: [],
  cities: [],
  countries: [],
});
const viewDownloadOptions=ref(false );
const input = ref(true);
const button = ref(false);
const folderDto = reactive({
  name: "",
});
function getIdQr(id: any) {
  moveFolderDto.id = id;
  dialog.value = true;
}
function move() {
  store.moveFolder(moveFolderDto).then(() => (moveFolderDto.folderId = ""));
  dialog.value = false;
  store.GetAllQr();
}

function stateQr(target: any) {
  stopDto.id = target.id;
  stopDto.qrIndex = target.qrIndex;

  if (target.isActive) {
    store.stopeQr(stopDto);
  } else store.activeQr(stopDto);
}
function clickEnter() {
  folderStore.AddFolder(folderDto);
  button.value = false;
  input.value = true;
}
function emitEvent() {
  store.emitter.emit("download");
}
function changeBtn() {
  button.value = true;
  input.value = false;
  resetForm();
}
function resetForm() {
  folderDto.name = "";
}

const { download, downloadFile, getFileUrl } = useFile();


function pay(url: string) {
  console.log(url);
  if (process.client) window.open(url, "popup");
}

function deleteQr(id: string, qrIndex: string) {
  store.DeleteQr({ id: id, qrIndex: qrIndex });
}
function goToDetailsQr(target: any) {
  router.push(
    `/dynamic/${target.qrIndex ?? qrDto.value.qrIndex}/${target.id}`
  );
}

function cancelEditQr(id: string, qrIndex: string) {
  store.CancelEdit({ id: id, qrIndex: qrIndex });
  fetchData()

}
const { GET} = useApi();

const { data } = await useCustomFetch<GetQrDetils>(
  `${QrController.GET_DETAILS}?id=${route.params.id}&qrIndex=${route.query.qrIndex}&startDate=${startDate.value}&endDate=${endDate.value}`,
  {}
);

if (data.value !== null) {
  qrDto.value = data.value.qr;
  qrStatisticDto.value = data.value.statistic;
}


async function fetchData() {
  const res = await GET<GetQrDetils>(
  `${QrController.GET_DETAILS}?id=${route.params.id}&qrIndex=${route.query.qrIndex}&startDate=${startDate.value}&endDate=${endDate.value}`,
{}
  )
  qrDto.value = res.data.qr;
qrStatisticDto.value = res.data.statistic
}

watch(startDate, () => {
  if (startDate.value !== "" && endDate.value !== "") fetchData();
  console.log("sdgfdsg" ,fetchData());
  
});

watch(endDate, () => {
  if (startDate.value !== "" && endDate.value !== "") fetchData();
});

function changeQrImage() {
  saved.value = true;
  const obj = {
    id: qrDto.value.id,
    QrName: qrDto.value.qrName,
    qrIndex: qrDto.value.qrIndex,
    imageFile: newImage.value,
  };
  if (newImage.value) {
    store.modifyQr(obj).then((res) => {
      qrDto.value.welcomeImageUrl = newImageUrl.value;
      changing.value = false;
      saved.value = false;
    });
  }
}





</script>
<style>
.v-button{
  position: absolute;
  right: 0;
}
.v-overlay__content{
  display: flex;
  justify-content: center;
  align-items: center;
}
.download-btn{

  padding: 14px 20px ;
  border:2px solid rgb(60, 192, 253) ;
   border-radius: 80px;
   display:  flex;
   justify-content: center;
   align-items: center;
   color:  rgb(60, 192, 253) ;
}
</style>