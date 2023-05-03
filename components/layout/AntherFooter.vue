<template>
  <footer class="tw-h-min  tw-w-[90%] md:tw-ml-[100px]">
    <div class="tw-relative">
 
   
      <div
      >
       
  
        <div class="tw-w-[92%] tw-absolute tw-bottom-0 tw-left-0 tw-my-2">
        </div>
        <div>
        </div>
          <div
            class="tw-h-[50px] tw-flex  md:tw-flex-row tw-flex-col tw-items-center  tw-text-center tw-justify-center md:tw-justify-between tw-mt-6"
          >
            <!-- 👉 Footer: left content -->
            <div>
              <span class="md:tw-flex tw-gap-x-2 md:tw-flex-row tw-flex-col tw-items-center ">
                <span>{{ $t("Footer.Reserved") }}</span>
                <a class="tw-text-primary" href="" target="noopener noreferrer"
                  >QR
                </a>
              </span>
            </div>

            <div>
              <span class="tw-flex tw-text-center tw-gap-x-2 md:tw-flex-row tw-flex-col tw-items-center ">
                <span>{{ $t("Footer.Powered") }}</span>
                <a
                  href="https://www.facebook.com/Elkood?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="tw-text-primary tw-ms-1"
                  >ELKOOD</a
                >
                {{ new Date().getFullYear() }}
                &copy;
              </span>
            </div>
            <!-- 👉 Footer: right content -->
          </div>
      </div>
    </div>
    <!-- <div class="dark">
      <img src="~assets/svg/footer-dark.svg" alt="" />
 
    -->
  </footer>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
const appStore = useAppStore();
function setQrDialog(is: boolean) {
  appStore.qrDialog = is;
}
</script>




<!--<template>
 <footer class="tw-h-min tw-overflow-hidden tw-absolute tw-w-full tw-p-4">
    
       <v-container>
      <div
        class="tw-bottom-0 tw-h-[40px] tw-flex md:tw-flex-row tw-flex-col tw-justify-center tw-text-center md:tw-justify-between"
      >
   
        <div>
          <span class="md:tw-flex tw-gap-x-2">
            <span>All Rights Reserved</span>
            <a class="tw-text-primary" href="" target="noopener noreferrer"
              >QR
            </a>
          </span>
        </div>

        <div>
          <span class="md:tw-flex tw-text-center tw-gap-x-2">
            <span>Powered By</span>
            <a
              href="https://www.facebook.com/Elkood?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              class="tw-text-primary tw-ms-1"
              >ELKOOD</a
            >
            {{ new Date().getFullYear() }}
            &copy;
          </span>
        </div>
     
      </div></v-container>
  </footer> 
</template>
<script setup lang="ts"></script>-->
