<template>
  <div class="vue-file-uploader">
    <div :class="isOverlayHidden ? 'overlay' : ''">
      <button @click="closeImage" class="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>close</title>
          <path
            fill="white"
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </button>
      <img :src="imageUrl" alt="" srcset="" />
    </div>

    <button  v-if="!isCarousel||files.length===0"
      type="button"
      class="vue-file-uploader-btn"
      @click="showUploadFileWindow"
      @drop="dropHandler"
   
    >
      <slot>
        <span> Drag and Drop Your Image </span>
        <svg style="width: 45px; height: 45px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04M19,18H6A4,4 0 0,1 2,14C2,11.95 3.53,10.24 5.56,10.03L6.63,9.92L7.13,8.97C8.08,7.14 9.94,6 12,6C14.62,6 16.88,7.86 17.39,10.43L17.69,11.93L19.22,12.04C20.78,12.14 22,13.45 22,15A3,3 0 0,1 19,18M8,13H10.55V16H13.45V13H16L12,9L8,13Z"
          />
        </svg>
      </slot>
      <div
        class="vue-file-uploader-preview   "
        :class="[{ multi: isMulti }, previwerContainerClass]"
      >
      <div  class="  tw-col-span-3 tw-flex tw-justify-center tw-items-center tw-gap-5">
        
        <div
        class="vue-file-uploader-preview-item tw-min"
        :class="previwerItemClass"
        v-for="(file, i) in files"
        :key="file.id"
      >
     
        <img :src="getFilePreveiw(file)" :class="previewImageClass" />
        <div class="preview-item-overlay">
          <div class="info" v-if="file.file">
            <!-- <div class="info-icon"> -->
            <button @click="imageOverlay">
              <!-- @click="cropperImage" -->
              <svg
                width="30"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>cropper image</title>
                <path
                  fill="white"
                  d="M15.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
                />
              </svg>
            </button>
          </div>

          <button
            :id="`delete-btn-${i}`"
            :class="deleteBtnClass"
            class="vue-file-uploader-preview-item-delete-btn"
            @click="deleteFile($event, file.id)"
          >
            <slot name="delete-btn">
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
                />
              </svg>
            </slot>
          </button>
        </div>
      </div>
   
    </div>
   
      </div>
    </button>
    <div class="tw-col-span-3 " v-else>
      <button 
      type="button"
      class="vue-file-uploader-btn"
      @click="showUploadFileWindow"
      @drop="dropHandler"
      @dragover="dragOverHandler"
    >
  
    <slot>
      <span> Drag and Drop Your Image </span>
      <svg style="width: 45px; height: 45px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04M19,18H6A4,4 0 0,1 2,14C2,11.95 3.53,10.24 5.56,10.03L6.63,9.92L7.13,8.97C8.08,7.14 9.94,6 12,6C14.62,6 16.88,7.86 17.39,10.43L17.69,11.93L19.22,12.04C20.78,12.14 22,13.45 22,15A3,3 0 0,1 19,18M8,13H10.55V16H13.45V13H16L12,9L8,13Z"
        />
      </svg>
    </slot>
    <div
      class="vue-file-uploader-preview tw-z-50 "
      :class="[{ multi: isMulti }, previwerContainerClass]"
    >
  
    </div>
  </button>
      <v-carousel      class="tw-flex tw-justify-center "  v-model="currnetPage">
        <v-carousel-item
        class="vue-file-uploader-preview-item tw-relative"
  
        :class="previwerItemClass"
        v-for="(file, i) in files"
        :key="i"
        >
   <div   @mouseover="showImageOptions =true" @mouseleave="showImageOptions=false"   v-if="showImageOptions"  class=" tw-hidden  tw-absolute tw-top-0   tw-w-[100%] tw-h-[100%] tw-bg-[#0005]" >
    <!-- <button @click="imageOverlay"
  class="tw-z-50 tw-absolute tw-top-[50%] tw-left-[50%] tw-translate-[-50%]"
    >
      
      <svg
        width="60"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <title>cropper image</title>
        <path
          fill="white"
          d="M15.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
        />
      </svg>
    </button> -->
  <button 
  class="tw-z-50 tw-absolute tw-top-0 tw-left-0"
  @click="   deleteFile($event, file.id)">
    <!-- @click="cropperImage" -->
   
      <svg viewBox="0 0 24 24" width="60">
        <path
          fill="white"
          d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
        />
      </svg>

  </button>

   </div>
        <img  @mouseover="showImageOptions =true" :src="getFilePreveiw(file)"   width="100%" height="300"  class="tw-w-[100%]   tw-z-20 tw-min-h-[300px] " />
       
  
 
     
        
        </v-carousel-item>
      </v-carousel>

    </div>
    <input
      v-bind:="$attrs"
      ref="fileInput"
      :id="`file-uploader-${id}`"
      type="file"
      hidden
      @change="clickHandler"
    />
  </div>
</template>

<script setup lang="ts">
import Compressor from "compressorjs";
import { hasOwn } from "@vue/shared";
import { useFile, FileTypes } from "@/composables/useFile";
import { ref, useAttrs, computed } from "vue";
import { v4 as uuid } from "uuid";
import Croppr from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import "cropperjs/dist/cropper.min.js";
export type fileDto = {
  file: File | undefined;
  url: string;
  id: string;
  type: FileTypes;
};

const imageUrl = ref("");
const isOverlayHidden = ref(false);
const emit = defineEmits(["update:modelValue", "update:url"]);
const props = defineProps({
  base64: Boolean,
  quality: {
    type: Number,
    default: 0.7,
  },
  contain: {
    type: Boolean,
    default: false,
  },
  cover: {
    type: Boolean,
    default: true,
  },
  isCarousel:{
    type:Boolean,
    default:false
  },
  deleteBtnClass: String,
  previwerContainerClass: String,
  previwerItemClass: String,
  previewImageClass: String,
  modelValue: Array || Object || File,
  maxSize: Number,
  maxWidth: Number,
  maxHeight: Number,
});

const { getFileExt, getFileType, isPdf } = useFile();
const fileInput = ref<HTMLInputElement | null>(null);
const id = Date.now() * (Math.random() * 10000);
const files = ref<fileDto[]>([]);
const attrs = useAttrs();
const isMulti = computed(() => hasOwn(attrs, "multiple"));
const currnetPage = ref(0)
function showUploadFileWindow() {
  if (fileInput.value) fileInput.value.click();
}
function compressFile(file: File) {
  return new Promise<File>((resolve, reject) => {
    new Compressor(file, {
      quality: props.quality,
      success(result) {
        resolve(
          new File([result], file.name, {
            lastModified: new Date().getTime(),
            type: result.type,
          })
        );
      },
      error(err) {
        reject(err);
      },
    });
  });
}
function deleteFile(e: any, id: string) {
  e.stopImmediatePropagation();
currnetPage.value--;
  files.value = files.value.filter((f) => {
    if (f.id === id) {
      URL.revokeObjectURL(f.url);
    }
    return f.id != id;
  });

  uploadEvent();
}

function closeImage() {
  imageUrl.value = "";
  isOverlayHidden.value = false;
}
function imageOverlay(e: any) {
  e.stopImmediatePropagation();
  isOverlayHidden.value = true;
  imageUrl.value = files.value[0].url;
  const img = new Image();
  img.src = files.value[0].url;
  var cropInstance = new Croppr(img, {
    aspectRatio: 1,
    viewMode: 0,
    scalable: false,
    zoomable: false,
  });
  const imgCrop = cropInstance.getCroppedCanvas().toDataURL(img.src);
  console.log(imgCrop);
}
// function cropperImage(e: any) {
//   e.stopImmediatePropagation();
//   const img = new Image();
//   img.src = files.value[0].url;
//   var cropInstance = new Croppr(img, {
//     aspectRatio: 1,
//     viewMode: 0,
//     scalable: false,
//     zoomable: false,
//   });
//   console.log(cropInstance);
//   console.log(files.value[0].url);
//   cropInstance.getCroppedCanvas().toDataURL(files.value[0].url);
// }
const showImageOptions = ref(false)
async function setFiles(filesList: FileList) {
  for (const file of filesList) {
    const valid = validateFile(file);
    if (valid) {
      const fileType = getFileType(getFileExt(file));
      let compressedFile;
      try {
        compressedFile = await compressFile(file);
      } catch (er) {}
      if (compressedFile && isMulti.value) {
        files.value.push({
          file: compressedFile,
          id: uuid(),
          type: fileType,
          url: URL.createObjectURL(file),
        });
      } else {
        files.value = [];
        files.value[0] = {
          file: compressedFile,
          id: uuid(),
          type: fileType,
          url: URL.createObjectURL(file),
        };
      }
    }
    uploadEvent();
  }
}
function uploadEvent() {
  if (isMulti.value) {
    emit(
      "update:modelValue",
      files.value.map(({ file }) => file)
    );
    emit(
      "update:url",
      files.value.map(({ url }) => url)
    );
  } else {
    emit("update:modelValue", files.value.length ? files.value[0].file : null);
    emit("update:url", files.value.length ? files.value[0].url : "");
  }
}
function clickHandler(e: any) {
  const filesList: FileList = e.target.files;
  setFiles(filesList);
}
function dropHandler(ev: any) {
  ev.preventDefault();
  let files = ev.dataTransfer.files;
  setFiles(files);
}
function dragOverHandler(ev: any) {
  ev.preventDefault();
}
function validateFile(file: File): boolean {
  // if (isImage(getFileExt(file.name))) {
  //   let imgWidth, imgHeight;
  //   const fileUrl = URL.createObjectURL(file);
  //   const img = new Image();

  //   img.src = fileUrl;

  // }
  return true;
}
function getFilePreveiw(file: fileDto) {
  switch (file.type) {
    case "image":
      return file.url;
    case "pdf":
      return "/placeholders/pdf.png";

    default:
      return "/placeholders/pdf.png";
  }
}
</script>

<style  lang="scss">
@import "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css";
*{
  transition: .4s;
}
.vue-file-uploader {
  .img-container {
    width: 640px;
    height: 480px;
  }
  .overlay {
    height: 100%;
    width: 100%;
    color: white;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.415);
    top: 0;
    left: 0;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 60%;
    }
    button.close {
      width: 40px;
      position: absolute;
      top: 20px;
      right: 50px;
    }
  }
  &-btn {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;  
    border-radius: 5px;

    color: gray;

    .vue-file-uploader-preview {
      &-item {
        position: relative;

        img {
          width: 100%;
          max-height: 200px;
        }

        .preview-item-overlay {
          position: absolute;
          visibility: hidden;
          display: flex;
          flex-direction: column;
          opacity: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          top: 0;
          background-color: rgba(36, 36, 36, 0.729);
          transition: 0.5s;

          .info {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            position: relative;
            span {
              text-align: initial;
              color: #ffffff;
              font-size: 24px;
            }
            button {
              top: 5px;
              right: 20px;
              position: absolute;
              z-index: 9999;
              // svg {
              //   background-color: gray;
              //   border-radius: 50%;
              // }
            }
            // .info-icon {
            //   width: 100%;
            //   display: flex;
            //   justify-content: space-between;
            //   align-items: center;
            // }
          }

          button {
            border-radius: 5px;
            align-self: center;
            color: #ffffff;
            position: absolute;
            top: 44.5%;

            svg {
              height: 4rem;
            }
          }
        }

        &:hover {
          .preview-item-overlay {
            visibility: visible;
            opacity: 1;
          }
        }
      }

      &.multi {
        display: grid;
        position: relative;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;

        img {
          height: 150px;
          object-fit: contain;
        }

        .info {
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
}
.v-carousel__controls{
  background: transparent;
}
</style>
