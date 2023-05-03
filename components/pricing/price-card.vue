<template>
  <v-container>
    <div class="mainCard">
      <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-y-5">
        <div
          class="tw-m-5"
          v-for="item in subStore.subscriptionList"
          :key="item.id"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <v-card rounded="xl" width="280">
            <v-card-text
              class="textHeader tw-text-center tw-bg-yellow-400 tw-text-white"
              >{{ item.name }}</v-card-text
            >
            <v-card-actions class="justify-center">
              <div class="tw-flex tw-flex-col tw-justify-center tw-text-center">
                <p class="tw-pb-5 tw-font-bold">
                  {{ item.description }}
                </p>
                <hr />
                <h4 class="py-5">Dynamic Qr Codes</h4>
                <v-col cols="12" sm="12" md="12">
                  <v-chip class="ml-0 mr-2 black--text tw-font-bold" label>
                    <span class="tw-text-lg"> {{ item.qrLimit }} </span>
                  </v-chip>
                </v-col>
                <p class="tw-text-yellow-300 pb-5 tw-text-lg">
                  Scans <span class="tw-text-gray-400">UnLimited</span>
                </p>
                <!-- <p>one time payment</p> -->
                <p class="pt-5 pb-5 tw-font-bold tw-text-2xl">{{ item.price }}* €</p>
                <!-- <span class="pb-3 tw-font-mono tw-text-lg">tax {{ item.tax }} </span> -->
                <v-col cols="12" sm="12" md="12">
                  <v-btn
                    class="submit-btn bg-dark"
                    rounded="xl"
                    variant="flat"
                    @click="subStore.Subscribe(item.id)"
                    style="width: 120px"
                  >
                    <p class="tw-text-white tw-text-lg">{{ $t("dashboardAdmin.pay") }}</p>
                  </v-btn>
                </v-col>
              </div>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script lang="ts" setup>
import { useSubStore } from "~/store/subscription";
const subStore = useSubStore();
</script>
<style lang="scss" scoped>
.mainCard .textHeader {
  font-size: 25px;
}

.mainCard .submit-btn:hover {
  padding: 0.7rem 3rem;
  transition: all 0.3s ease;
}

.mainCard .submit-btn:hover {
  padding: 0.7rem 4rem;
}
</style>
