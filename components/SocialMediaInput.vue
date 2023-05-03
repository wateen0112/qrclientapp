<script lang="ts" setup>
import { iconsData, getIconColor } from "~/api/dto/website/iconsData";
import { useQrStore } from "~/store/qrCodes/qr";
const props = defineProps(["modelValue"]);
const store = useQrStore();
const emit = defineEmits(["update:modelValue"]);
type iconItem = {
  iconName: string;
  text: string;
  url: string;
  color?: string;
  name: string;
};
const AddedIcons = ref(0);
const deletedIcons = ref(0);
const socialMediaList = ref<iconItem[]>([
  // {
  //   iconName: "mdi-youtube",
  //   color: "#ab121f",
  //   text: "Youtube",
  //   url: "",
  // },
  // {
  //   iconName: "mdi-web",
  //   color: "gray",
  //   text: "web",
  //   url: "",
  // },
]);

function addNewSocialMediaItem(icon: iconItem) {
  socialMediaList.value.push({ ...icon });
  AddedIcons.value++;
}

function removeItem(item: any, index: any) {
  deletedIcons.value++;

  socialMediaList.value = socialMediaList.value.filter((ix, i) => {
    return index !== i;
  });

  watch(
    socialMediaList,
    (nv) => {
      if (nv) {
        emit("update:modelValue", nv);
      }
    },
    { deep: true }
  );
}

// AddTrueIcon();
// const tempArr = socialMediaList.value;
// socialMediaList.value = [];
// socialMediaList.value = tempArr;

watch(
  socialMediaList,
  (nv) => {
    if (nv) {
      emit("update:modelValue", nv);
    }
  },
  { deep: true }
);

onMounted(() => {
  socialMediaList.value = props.modelValue;
  emit("update:modelValue", socialMediaList);
});
</script>

<template>
  <div class="tw-w-full tw-bg-white tw-rounded-lg">
    <div
      class="hidden tw-bg-white tw-rounded-lg tw-flex tw-flex-col tw-justify-center tw-items-center"
    >
      <div
        class="icon-item tw-w-[100%] tw-relative dropdown my-4"
        v-for="(item, index) in socialMediaList"
        :key="index"
      >
        <div class="tw-flex tw-justify-between tw-w-full">
          <h6 class="text-left tw-w-[100%]">
            <v-icon
              :style="'background-color:' + getIconColor(item.iconName)"
              class="tw-p-4 tw-rounded-lg tw-mr-5"
              color="white"
              >{{ item.iconName }}</v-icon
            >
            <span style="margin-left: 10px"> {{ item.name }} </span>
          </h6>
          <v-btn
            icon="mdi-close"
            color="red"
            variant="tonal"
            size="x-small"
            @click="removeItem(item, index)"
          >
          </v-btn>
        </div>
        <div class="tw-w-[100%] tw-my-5">
          <v-text-field
            v-model="item.url"
            @keypress="item.url = store.httpsCheck($event.target.value)"
            label="url"
          ></v-text-field>
          <span v-if="!item.url" class="text-red">enter url to save icons</span>
        </div>
        <div class="tw-w-[100%] tw-my-5">
          <v-text-field label="text " v-model="item.text"></v-text-field>
        </div>
      </div>
    </div>
    <!--Social Media-->
    <div class="tw-flex tw-flex-col tw-items-center">
      <p class="tw-font-bold tw-px-6 tw-pb-4 tw-text-gray-700">
        {{ $t("dynamicQr.videoDynamic.clickToAddMoreIcons") }}
      </p>
      <div class="tw-flex tw-flex-col tw-p-4">
        <h1
          class="tw-items-center tw-flex tw-justify-center tw-text-gray-700 tw-text-xl"
        >
          {{ $t("dynamicQr.videoDynamic.addMoreIcons") }}
        </h1>
        <div
          class="tw-flex tw-flex-row tw-flex-wrap tw-p-8 tw-justify-start tw-text-center tw-items-center tw-gap-9"
        >
          <div
            v-for="item in iconsData"
            class="group/item tw-transition-all hover:tw-scale-125 group-hover:tw-text-primary"
          >
            <v-icon
              color="grey"
              class="tw-cursor-pointer group-hover/item:tw-text-primary"
              size="30"
              @click="
                addNewSocialMediaItem({
                  iconName: item.iconName,
                  color: item.color,
                  text: item.text,
                  url: 'https://www.' + item.name + '/example',
                  name: item.name,
                })
              "
            >
              {{ item.iconName }}</v-icon
            >
            <p class="tw-cursor-pointer">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
