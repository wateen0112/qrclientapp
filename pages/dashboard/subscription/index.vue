<template>
  <DashboardPage @search="searchContact($event)">
    <template #action-button>
      <v-btn variant="flat" color="primary" class="text-white"
        prepend-icon="mdi-plus" @click="goToPages">
        {{ $t("SubscriptionTable.Subscription") }}</v-btn>
    </template>
    <div v-if="store.SubList.length > 0" class="ml-2 mr-2">
      <v-table>
        <thead>
          <tr>
            <th style="text-align: left">{{
              $t("SubscriptionTable.PackageName")
            }}</th>
            <th style="text-align: left">{{
              $t("SubscriptionTable.PackageStatus")
            }}</th>
            <th style="text-align: left">{{
              $t("SubscriptionTable.start")
            }}</th>
            <th style="text-align: left">{{
              $t("SubscriptionTable.PackagePrice")
            }}</th>
            <th style="text-align: left">{{ $t("SubscriptionTable.Tax") }}
            </th>
            <th style="text-align: left">{{
              $t("SubscriptionTable.number")
            }}</th>
            <th style="text-align: left">{{
              $t("SubscriptionTable.remaining")
            }}</th>
            <th style="text-align: left">
              {{ $t("SubscriptionTable.payingoff") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in     store.paginateListSub" :key="item.name">
            <td>{{ item.name }}</td>
            <td>
              {{ item.isActive ? "effective" : "not effective " }}
            </td>
            <td>{{ new Date(item.dateCreated).toLocaleDateString() }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.tax }}</td>
            <td>{{ item.qrCount }}</td>
            <td>{{ item.qrLeftCount }}</td>
            <td v-if="item.isActive == false">
              <v-btn size="x-small" color="primary"
                @click="store.Pay(item.id)">
                {{ $t("SubscriptionTable.Push") }}</v-btn>
            </td>
            <td v-else>
              <p> {{ $t("SubscriptionTable.paid") }}</p>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <div v-else>
      <v-col>
        <div class="tw-bg-white tw-flex tw-justify-center tw-p-5">
          <h1 class="tw-text-xl">{{ $t("tableAllQR.noData") }}</h1>
        </div>
      </v-col>
    </div>
    <div
      class="flex justify-center items-center w-full bg-white border-t-2">
      <v-pagination v-model="pagination.pageIndex"
        :length="Math.ceil(store.filterListSub.length / pagination.pageSize)"
        rounded="circle" @update:modelValue="paginate"
        :total-visible="6"></v-pagination>
    </div>
  </DashboardPage>
</template>

<script lang="ts" setup>
import { useSubStore } from "@/store/subscription/index";
import { GetAllSub } from "~/api/dto/dashboard/subscription";
import { SubscriptionController } from "~/api/endpoints/Subscription";
import appConfig from "~/app.config";
const localePath = useLocalePath();

const store = useSubStore();
const { GetAccessToken } = useAuth();
const selectSingalList = ref<Array<string>>([]);
const selectList = ref<Array<string>>([]);
const isMulti = ref();
const ids = ref<Array<string>>([]);
function deleteById() {
  store.deleteSub(selectList.value);
}
const SubList = computed(() => store.SubList);

//select all singal id
function selectAll() {
  SubList.value?.forEach((element: any) => {
    selectSingalList.value.push(element.id);
  });
  isMulti.value = !isMulti.value;
}
function popSelectAll() {
  selectSingalList.value.splice(0, selectSingalList.value.length);
}
//select singal id
function selectAllSingal(ids: any) {
  selectList.value.push(ids);
}
function removeItem(rows: Array<any>) {
  ids.value = rows.map((ele) => ele.id);
}
watch(selectList.value, () => {
  if (selectList.value.length > 0) {
    isMulti.value = true;
  } else {
    isMulti.value = false;
  }
});


function goToPages() {
  navigateTo(localePath(`/pricing`));
}


const pagination = computed(() => store.pagination);
const { data } = await useCustomFetch<GetAllSub[]>(SubscriptionController.GET_ALL_SUB);
if (data.value)
  store.$patch({
    SubList: data.value

  });

function paginate(e: any) {
  store.paginationSub({
    pageSize: pagination.value.pageSize,
    pageIndex: e,
  });
}
function goToPay(target: any) {
  console.log('test', target)
}
function searchContact(e: any) {
  store.findContact(e);
}
definePageMeta({
  layout: "dashboard",
});
</script>
