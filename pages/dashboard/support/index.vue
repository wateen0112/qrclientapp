<template>
  <DashboardPage
    ref="supportPage"
    :buttonText="'Send Message'"
    :dialog-title="'New Message'"
    :search="false"
  >
    <template #dialog-form>
      <DashboardSupport @formSubmit="closeForm"></DashboardSupport>
    </template>

    <div v-if="store.contactList.length > 0">
      <v-col v-for="item in store.paginateListContact">
        <v-card class="mx-auto tw-rounded-lg tw-shadow">
          <v-card-title>
            <div class="tw-flex tw-justify-between">
              <h1>{{ item.title }}</h1>
              <div v-if="item.reply != null" class="tw-mt-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9" cy="9" r="8.5" stroke="#21F31C" />
                  <circle cx="9" cy="9" r="4" fill="#21F31C" />
                </svg>
              </div>
              <div v-else class="tw-mt-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9" cy="9" r="8.5" stroke="#F81111" />
                  <circle cx="9" cy="9" r="4" fill="#F81111" />
                </svg>
              </div>
            </div>
          </v-card-title>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <p>{{ item.content }}</p>
              </v-expansion-panel-title>
              <v-expansion-panel-text v-if="item.reply != null">
                {{ item.reply }}
              </v-expansion-panel-text>
              <v-expansion-panel-text v-else>
                There is currently no response to this message
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </div>
    <div v-else>
      <v-col>
        <div class="tw-bg-white tw-flex tw-justify-center tw-p-5">
          <h1 class="tw-text-xl">There is no Data</h1>
        </div>
      </v-col>
    </div>
    <div class="flex justify-center items-center w-full bg-white border-t-2">
      <v-pagination
        v-model="pagination.pageIndex"
        :length="Math.ceil(store.filterListContact.length / pagination.pageSize)"
        rounded="circle"
        @update:modelValue="paginate"
        :total-visible="6"
      ></v-pagination>
    </div>
  </DashboardPage>
</template>

<script lang="ts" setup>
import { useContactUs } from "@/store/contactUs/index";
const supportPage = ref(null);
function closeForm() {
  supportPage.value.closeDialog();
}
const store = useContactUs();
store.GetAllContacUS();
const pagination = computed(() => store.pagination);
function paginate(e: any) {
  store.paginationContact({
    pageSize: pagination.value.pageSize,
    pageIndex: e,
  });
}
definePageMeta({
  layout: "dashboard",
});
</script>
