<template>
  <div class="dialog">
    <v-dialog
      transition="dialog-bottom-transition"
      class="tw-flex tw-justify-center tw-items-center"
      v-model="optionsDialog"
    >
      <div class="tw-flex tw-justify-center">
        <v-card class="tw-min-w-[400px]">
          <div
            class="tw-flex  tw-w-full  tw-relative tw-flex-row tw-flex-no-wrap tw-justify-between tw-items-center  "
          >
         
<v-card-title>Select your format</v-card-title>
<v-btn
class="v-button tw-z-50 tw-max-w-[40px]"
color="blue"
variant="text"
@click="optionsDialog = false"
icon="mdi-close"
>
</v-btn>
          </div>
          <div
            class="tw-flex tw-flex-col tw-gap-2 tw-justify-center tw-items-center tw-p-5"
          >
            <v-btn class="download-btn" @click="downloadAsImage('png')"
              >DOWNLOAD PNG
            </v-btn>
            <v-btn class="download-btn" @click="printImg()">DOWNLOAD PDF</v-btn>
            <v-btn class="download-btn" @click="downloadAsImage('jpg')"
              >DOWNLOAD JPG
            </v-btn>
            <v-btn class="download-btn" @click="downloadSvg">DOWNLOAD SVG </v-btn>
          </div>
        </v-card>
      </div>
    </v-dialog>
  </div>
  <div
    class="tw-bg-dark tw-p-10 tw-m-5 tw-rounded-3xl tw-flex tw-justify-center tw-items-center tw-flex-col tw-gap-4"
  >
    <div class="tw-relative">
      <img v-if="qrPreview" :src="qrPreview" height="300" width="300" />
      <template v-if="!qrPreview && !qrLoader">
        <img src="~assets/svg/qrstyle/qr-hidden.svg" height="300" width="300" />
        <p v-if="!qrLoader" class="tw-absolute tw-top-28 tw-mx-4 tw-text-center">
          Please fill in all required fields to preview your QR Code
        </p>
      </template>
      <codes-qr-loader v-if="qrLoader"></codes-qr-loader>
    </div>

    <client-only>
      <v-dialog
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
        v-model="dialog"
        persistent
      >
        <template v-slot:activator="{ props }">
          <div class="tw-flex tw-justify-center tw-flex-col tw-items-center tw-gap-5">
            <v-btn
              :class="{
                'tw-mt-10': qrStyleDto.frameUrl !== '',
              }"
              :disabled="qrPreview ? false : true"
              color="primary"
              variant="outlined"
              v-bind="props"
              >Customize QR
            </v-btn>
            <v-btn
              v-if="!isDynamic&&!qrLoader"
              :disabled="qrPreview ? false : true"
              class="text-white"
              color="primary"
              id="#qr-download-btn"
              @click="  optionsDialog = true"
              >Save & Download</v-btn
              
            >
            <p class="tw-text-center tw-mx-5 tw-text-white">
              You can choose multiple format to download from in the next step
            </p>
          </div>
        </template>

        <v-card>
          <v-card-title class="tw-bg-gray-200">
            <div class="tw-w-full tw-flex tw-justify-between tw-items-center">
              <span class="text-xl">more options</span>
              <v-icon @click="dialog = false" class="tw-cursor-pointer">mdi-close</v-icon>
            </div>
          </v-card-title>
          <v-card-text class="tw-my-2">
            <v-row>
              <v-col
                cols="12"
                md="3"
                style="border-right: 1px solid gray"
                class="tw-flex tw-justify-center tw-items-center tw-flex-col tw-gap-5"
              >
                <div
                  class="tw-relative tw-overflow-hidden tw--max-h-[300px] tw-max-w-[300px] tw-flex tw-flex-col"
                >
                  <img
                    id="qrPrev"
                    v-if="qrPreview"
                    :src="qrPreview"
                    height="300"
                    width="300"
                  />

                  <template v-if="!qrPreview && !qrLoader">
                    <img
                      src="~assets/svg/qrstyle/qr-hidden.svg"
                      height="300"
                      width="300"
                    />
                    <p
                      v-if="!qrLoader"
                      class="tw-absolute tw-top-28 tw-mx-4 tw-text-center"
                    >
                      Please fill in all required fields to preview your QR Code
                    </p>
                  </template>
                  <codes-qr-loader v-if="qrLoader"></codes-qr-loader>
                  <v-btn
                
                    :disabled="qrPreview ? false : true"
                    variant="flat"
                    class="tw-mx-auto mt-4"
                    color="primary"
                    id="#qr-download-btn"
                    @click="optionsDialog = true"
                    >Save & Download</v-btn
                  >
                </div>
              </v-col>
              <v-col cols="12" md="9">
                <!--start frame -->
                <div class="frame">
                  <div class="tw-flex tw-justify-start tw-items-start tw-gap-3">
                    <h2 class="text-uppercase tw-mb-1">frames</h2>
                  </div>
                  <div class="tw-flex tw-justify-start tw-gap-5">
                    <div
                      @click="qrStyleDto.frameUrl = ''"
                      :class="{
                        'tw-border-2 tw-border-primary': qrStyleDto.frameUrl === '',
                      }"
                      style="height: 80px; width: 80px"
                      class="tw-bg-gray-100 tw-cursor-pointer md:tw-col-span-1 tw-col-span-12 tw-p-3 tw-rounded tw-flex tw-justify-center tw-items-center"
                    >
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 23 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="11.5" cy="11.5" r="11" stroke="black" />
                        <path d="M3.48486 4.18176L18.4697 19.8636" stroke="black" />
                      </svg>
                    </div>
                    <div v-for="(item, i) in qrMedia.frame" :key="i" @click="setFrame(i)">
                      <div
                        style="height: 80px; width: 80px"
                        :class="{
                          'tw-border-2 tw-border-primary':
                            qrMedia.frame[i] === qrStyleDto.frameUrl,
                        }"
                        class="tw-bg-gray-100 tw-cursor-pointer md:tw-col-span-1 tw-col-span-12 tw-p-3 tw-rounded tw-flex tw-justify-center tw-items-center"
                      >
                        <img
                          height="70"
                          width="70"
                          :src="appConfig.DOMAIN_HOST + '/' + qrMedia.frame[i]"
                          alt=""
                          srcset=""
                        />
                      </div>
                    </div>
                  </div>
                  <div class="tw-flex tw-justify-start tw-items-start tw-mt-5">
                    <div class="tw-w-36">
                      <v-text-field
                        label="frame color"
                        variant="underlined"
                        type="color"
                        style="width: 100px"
                        v-model="store.frameColor"
                      >
                      </v-text-field>
                    </div>
                    <div style="width: 200px">
                      <v-text-field
                        label="frame text"
                        type="text"
                        @change="($event) => (store.frameInnerText = $event.target.value)"
                        variant="underlined"
                      ></v-text-field>
                    </div>
                  </div>
                </div>
                <!--end frame -->

                <!-- start qr code -->
                <div class="qr-code tw-mt-4">
                  <h2 class="text-uppercase tw-mb-1">qr code</h2>
                  <div class="tw-flex tw-justify-start tw-items-center tw-gap-5">
                    <div
                      @click="qrStyleDto.qrPatternStyle = 'circle'"
                      style="height: 60px; width: 60px"
                      :class="{
                        'tw-border-2 tw-border-primary':
                          qrStyleDto.qrPatternStyle === 'circle',
                      }"
                    >
                      <img src="~assets/svg/qrstyle/circle.svg" height="60" width="60" />
                    </div>

                    <div
                      style="height: 60px; width: 60px"
                      @click="qrStyleDto.qrPatternStyle = 0"
                      :class="{
                        'tw-border-2 tw-border-primary': qrStyleDto.qrPatternStyle === 0,
                      }"
                    >
                      <img src="~assets/svg/qrstyle/sqare.svg" height="60" width="60" />
                    </div>
                    <div
                      style="height: 60px; width: 60px"
                      @click="qrStyleDto.qrPatternStyle = 'dimond'"
                      :class="{
                        'tw-border-2 tw-border-primary':
                          qrStyleDto.qrPatternStyle === 'dimond',
                      }"
                    >
                      <img src="~assets/svg/qrstyle/dimond.svg" height="60" width="60" />
                    </div>

                    <div
                      style="height: 60px; width: 60px"
                      @click="qrStyleDto.qrPatternStyle = 'SquareCircleV'"
                      :class="{
                        'tw-border-2 tw-border-primary':
                          qrStyleDto.qrPatternStyle === 'SquareCircleV',
                      }"
                    >
                      <img
                        src="~assets/svg/qrstyle/SquareCircleV.svg"
                        height="60"
                        width="60"
                      />
                    </div>

                    <div
                      style="height: 60px; width: 60px"
                      @click="qrStyleDto.qrPatternStyle = 'SquareCircleH'"
                      :class="{
                        'tw-border-2 tw-border-primary':
                          qrStyleDto.qrPatternStyle === 'SquareCircleH',
                      }"
                    >
                      <img
                        src="~assets/svg/qrstyle/SquareCircleH.svg"
                        height="60"
                        width="60"
                      />
                    </div>
                    <div
                      style="height: 60px; width: 60px"
                      @click="qrStyleDto.qrPatternStyle = 'SquareDiamondH'"
                      :class="{
                        'tw-border-2 tw-border-primary':
                          qrStyleDto.qrPatternStyle === 'SquareDiamondH',
                      }"
                    >
                      <img
                        src="~assets/svg/qrstyle/SquareDiamondH.svg"
                        height="60"
                        width="60"
                      />
                    </div>
                    <div
                      @click="qrStyleDto.qrPatternStyle = 1"
                      style="height: 60px; width: 60px"
                      :class="{
                        'tw-border-2 tw-border-primary': qrStyleDto.qrPatternStyle === 1,
                      }"
                    >
                      <img src="~assets/svg/qrstyle/circle.svg" height="60" width="60" />
                    </div>
                    <div class="tw-w-36">
                      <v-text-field
                        label="inner color"
                        variant="underlined"
                        type="color"
                        v-model="qrStyleDto.backgroundColor"
                      ></v-text-field>
                    </div>
                    <div class="tw-w-36">
                      <v-text-field
                        label="outer color"
                        variant="underlined"
                        type="color"
                        v-model="qrStyleDto.foregroundColor"
                      ></v-text-field>
                    </div>
                  </div>
                </div>
                <!-- end qr code -->

                <!-- start edges -->
                <div class="edges">
                  <!-- {{ qrStyleDto }} -->
                  <h2 class="text-uppercase tw-my-5">edges</h2>

                  <div class="tw-grid tw-grid-cols-12 tw-gap-10">
                    <div class="md:tw-col-span-3 tw-col-span-12">
                      <v-select
                        label="top left inner"
                        :items="qrMedia.inner"
                        variant="underlined"
                        v-model="qrStyleDto.topLeftInnerCorner.url"
                      >
                        <template v-slot:item="{ item, props }">
                          <v-list-item v-bind="props" title="">
                            <img
                              height="24"
                              width="24"
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              alt=""
                            />
                          </v-list-item>
                        </template>
                        <template v-slot:selection="{ props, item }">
                          <v-list-item v-if="item.value" v-bind="props" title="">
                            <img
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              height="24"
                              width="24"
                            />
                          </v-list-item>
                        </template>
                      </v-select>
                      <v-select
                        label="top right inner"
                        :items="qrMedia.inner"
                        variant="underlined"
                        v-model="qrStyleDto.topRightInnerCorner.url"
                      >
                        <template v-slot:item="{ item, props }">
                          <v-list-item v-bind="props" title="">
                            <img
                              height="24"
                              width="24"
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              alt=""
                            />
                          </v-list-item>
                        </template>
                        <template v-slot:selection="{ props, item }">
                          <v-list-item v-if="item.value" v-bind="props" title="">
                            <img
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              height="24"
                              width="24"
                            />
                          </v-list-item>
                        </template>
                      </v-select>
                      <v-select
                        label="bottom left inner"
                        :items="qrMedia.inner"
                        variant="underlined"
                        v-model="qrStyleDto.bottomLeftInnerCorner.url"
                      >
                        <template v-slot:item="{ item, props }">
                          <v-list-item v-bind="props" title="">
                            <img
                              height="24"
                              width="24"
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              alt=""
                            />
                          </v-list-item>
                        </template>
                        <template v-slot:selection="{ props, item }">
                          <v-list-item v-if="item.value" v-bind="props" title="">
                            <img
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              height="24"
                              width="24"
                            />
                          </v-list-item>
                        </template>
                      </v-select>
                      <v-select
                        label="bottom right inner"
                        :items="qrMedia.inner"
                        variant="underlined"
                        v-model="qrStyleDto.bottomLeftInnerCorner.url"
                      >
                        <template v-slot:item="{ item, props }">
                          <v-list-item v-bind="props" title="">
                            <img
                              height="24"
                              width="24"
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              alt=""
                            />
                          </v-list-item>
                        </template>
                        <template v-slot:selection="{ props, item }">
                          <v-list-item v-if="item.value" v-bind="props" title="">
                            <img
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              height="24"
                              width="24"
                            />
                          </v-list-item>
                        </template>
                      </v-select>
                    </div>
                    <div class="md:tw-col-span-3 tw-col-span-12">
                      <v-select
                        label="top left outer"
                        :items="qrMedia.outer"
                        variant="underlined"
                        v-model="qrStyleDto.topLeftOuterCorner.url"
                      >
                        <template v-slot:item="{ item, props }">
                          <v-list-item v-bind="props" title="">
                            <img
                              height="24"
                              width="24"
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              alt=""
                            />
                          </v-list-item>
                        </template>
                        <template v-slot:selection="{ props, item }">
                          <v-list-item v-if="item.value" v-bind="props" title="">
                            <img
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              height="24"
                              width="24"
                            />
                          </v-list-item>
                        </template>
                      </v-select>
                      <v-select
                        label="top right outer"
                        :items="qrMedia.outer"
                        variant="underlined"
                        v-model="qrStyleDto.topRightOuterCorner.url"
                      >
                        <template v-slot:item="{ item, props }">
                          <v-list-item v-bind="props" title="">
                            <img
                              height="24"
                              width="24"
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              alt=""
                            />
                          </v-list-item>
                        </template>
                        <template v-slot:selection="{ props, item }">
                          <v-list-item v-if="item.value" v-bind="props" title="">
                            <img
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              height="24"
                              width="24"
                            />
                          </v-list-item>
                        </template>
                      </v-select>
                      <v-select
                        label="bottom left outer"
                        :items="qrMedia.outer"
                        variant="underlined"
                        v-model="qrStyleDto.bottomLeftOuterCorner.url"
                      >
                        <template v-slot:item="{ item, props }">
                          <v-list-item v-bind="props" title="">
                            <img
                              height="24"
                              width="24"
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              alt=""
                            />
                          </v-list-item>
                        </template>
                        <template v-slot:selection="{ props, item }">
                          <v-list-item v-if="item.value" v-bind="props" title="">
                            <img
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              height="24"
                              width="24"
                            />
                          </v-list-item>
                        </template>
                      </v-select>
                      <v-select
                        label="bottom right outer"
                        :items="qrMedia.outer"
                        variant="underlined"
                        v-model="qrStyleDto.bottomLeftOuterCorner.url"
                      >
                        <template v-slot:item="{ item, props }">
                          <v-list-item v-bind="props" title="">
                            <img
                              height="24"
                              width="24"
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              alt=""
                            />
                          </v-list-item>
                        </template>
                        <template v-slot:selection="{ props, item }">
                          <v-list-item v-if="item.value" v-bind="props" title="">
                            <img
                              :src="appConfig.DOMAIN_HOST + '/' + item.value"
                              height="24"
                              width="24"
                            />
                          </v-list-item>
                        </template>
                      </v-select>
                    </div>
                    <div class="md:tw-col-span-3 tw-col-span-12">
                      <v-text-field
                        variant="underlined"
                        label="top left outer color"
                        type="color"
                        style="width: 150px"
                        v-model="qrStyleDto.topLeftOuterCorner.color"
                      >
                      </v-text-field>

                      <v-text-field
                        label="bottom left outer color"
                        variant="underlined"
                        type="color"
                        style="width: 150px"
                        v-model="qrStyleDto.bottomLeftOuterCorner.color"
                      ></v-text-field>
                      <v-text-field
                        label="bottom left inner color"
                        variant="underlined"
                        type="color"
                        style="width: 150px"
                        v-model="qrStyleDto.bottomLeftInnerCorner.color"
                      ></v-text-field>
                    </div>
                    <div class="md:tw-col-span-3 tw-col-span-12">
                      <v-text-field
                        label="top rigth outer color"
                        variant="underlined"
                        type="color"
                        style="width: 150px"
                        v-model="qrStyleDto.topRightOuterCorner.color"
                      ></v-text-field>
                      <v-text-field
                        variant="underlined"
                        label="top left inner color"
                        type="color"
                        style="width: 150px"
                        v-model="qrStyleDto.topLeftInnerCorner.color"
                      >
                      </v-text-field>
                      <v-text-field
                        label="top rigth inner color"
                        variant="underlined"
                        type="color"
                        style="width: 150px"
                        v-model="qrStyleDto.topRightInnerCorner.color"
                      ></v-text-field>
                    </div>
                  </div>
                </div>

                <!-- end edges -->

                <!-- start logo -->
                <div class="logo tw-mt-4">
                  <div class="tw-flex tw-justify-start tw-items-start tw-gap-3">
                    <h2 class="text-uppercase tw-mb-1">logo</h2>
                    <span>upload</span>
                  </div>
                  <div
                    class="tw-grid tw-grid-cols-12"
                    v-for="(item, i) in qrMedia.logo"
                    :key="i"
                  >
                    <div
                      @click="qrStyleDto.logoUrl = qrMedia.logo[i]"
                      style="height: 50px; width: 50px"
                      :class="
                        qrStyleDto.logoUrl === qrMedia.logo[i]
                          ? 'tw-border-2 tw-border-primary'
                          : ''
                      "
                      class="tw-bg-gray-100 tw-cursor-pointer md:tw-col-span-1 tw-col-span-12 tw-p-3 tw-rounded tw-flex tw-justify-center tw-items-center"
                    >
                      <img
                        height="20"
                        width="20"
                        :src="appConfig.DOMAIN_HOST + '/' + qrMedia.logo[i]"
                        alt=""
                        srcset=""
                      />
                      
                    </div>
                 </div>
              
                </div>
                <!-- end logo -->
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </client-only>

    <!-- end dialog qr -->
    <div class="tw-fixed tw-bottom-5 lg:tw-hidden tw-block" style="right: 20px">
      <v-btn @click="dialog = true" icon="mdi-auto-fix"></v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import mergeImages from "merge-images";

import { ref, reactive } from "vue";
import appConfig from "~/app.config";
import type { GetQrDetils, Qr, Statistic } from "~/api/dto/website/qrCodes";
import { QrCategory, QrIndex } from "~/api/enums/qr";
import { useQrStore } from "@/store/qrCodes/qr";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import axios from "axios";
import FileUploader from "@/components/FileUploader.vue";
defineProps({
  isDynamic: Boolean,
});

function downloadQr() {
  viewDownloadOptions.value = true;

  // store.emitter.emit("download");
  // download(store.qrPreview, qrDto.value.qrName);
}

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
const store = useQrStore();
const dialog = ref(false);
const optionsDialog = ref(false);
const qrMedia = computed(() => store.qrMedia);
const viewDownloadOptions = ref(false);
const { qrStyleDto, qrPreview, qrLoader,qrNameToDownload } = storeToRefs(store);
const { download, getFileUrl } = useFile();
function emitEvent() {
  store.emitter.emit("download");
  dialog.value = false;
}
async function triggerDownload(imgURI: any, ext: any) {
  var evt = new MouseEvent("click", {
    view: window,
    bubbles: false,
    cancelable: true,
  });
  var a = document.createElement("a");
  a.setAttribute("download",qrNameToDownload.value + `.${ext}`);
  a.setAttribute("href", imgURI);
  a.setAttribute("target", "_blank");

  a.dispatchEvent(evt);
  
}
async function printImg() {
  var DOMURL = window.URL || window.webkitURL || window;

  var image = qrPreview.value;
  var svgimg = document.createElementNS("http://www.w3.org/2000/svg", "image");
  // new
  svgimg.setAttribute("width", "800");
  svgimg.setAttribute("height", "800");

  svgimg.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", image);

  // document.getElementById("mySvg").appendChild(svgimg);
  var newTab = window.open();
  newTab.document.body.innerHTML = `<img src="${image}" "width="800px" height="800px">`;
  newTab?.print();
}

async function downloadSvg() {


  const svg = `<svg width="1000" height="1000" viewBox="0 0 8000 8000" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

  <image    xlink:href="${qrPreview.value}" />
  </svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  download(url, qrNameToDownload.value)
}
async function downloadAsImage(ext: String) {

    var canvas =  window.document.createElement('canvas')
    var ctx = canvas.getContext('2d');

    var img = new Image();
  const configs={width:140 , height:140}
  store.GenerateStyle(configs);

    img.onload=()=>{
      ctx.drawImage(img,0,0);
      URL.revokeObjectURL(qrPreview.value);
  var imgUrl = canvas.toDataURL(`image/${ext}`).replace(`image/${ext}`, 'image/octet-stream');
  triggerDownload(imgUrl,ext).then(()=>store.GenerateStyle()
    )}
  img.src=qrPreview.value;

}

store.getMedia();
const setFrame = (i: number) => {
  qrStyleDto.value.frameUrl = qrMedia.value.frame[i];
};
</script>
<style lang="scss" scoped>
.frame {
  background-color: #ffffff1e;

  .code-one,
  .code-two,
  .code-three {
    background-color: #ffffff1e;
  }

  /* background:#D9D9D9 */
}

.activeCode,
.activeFrame,
.activeLogo {
  border: 2px solid rgb(241, 106, 106);
}

.download-btn {
  padding: 14px 20px;
  border: 2px solid rgb(60, 192, 253);
  border-radius: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(60, 192, 253);
}
</style>
