import { defineStore } from "pinia";
import { DynamicVideoDto } from "~/api/dto/website/Video";
import { useApi } from "~/composables/useApi";
import { useQrStore } from "../qr";
import { DQResponse } from "~/api/dto/qrCodes/dynamic/CreateDQrResponse";
import { QrDynamicController } from "@/api/endpoints/qrDynamic";
export const useVideoDynamicStore = defineStore("video", () => {
  //States  . . .
  const api = useApi();
  const preview_list = ref<any>([]);
  const image_list = ref<any>([]);
  const qrStore = useQrStore();
  var tempUrlValue: any[] = [];

  const dynamicVideoDto = ref<DynamicVideoDto>({
    urls: [],
    deletedFiles: [],
    primaryColor: "#73b5e7",
    buttonColor: "#dd0ec1",
    company: "",
    headline: "",
    summary: "",
    hasShareButton: true,
    button: {
      name: "",
      url: "",
    },
    files: [],
    socialMediaChannels: [],
    qrName: "",
  });
  const reset = () => {
    dynamicVideoDto.value.urls = tempUrlValue;
    image_list.value = [];
    preview_list.value = [];
  };
  function previewMultiImage() {
    tempUrlValue = dynamicVideoDto.value.urls;
    dynamicVideoDto.value.urls = [];

    var count = dynamicVideoDto.value.files?.length;

    var index = 0;
    if (dynamicVideoDto.value.files) {
      while (count--) {
        var reader = new FileReader();
        reader.onload = (e: any | undefined) => {
          preview_list.value.push(e.target.result);


        };

        reader.readAsDataURL(dynamicVideoDto.value.files[index]);
        index++;
      }
    }
  }
  async function addVideoQr() {
    const localePath = useLocalePath()
    qrStore.$patch({
      qrLoader: true,
    });
    try {
      const res = await api.POST<DQResponse>(
        QrDynamicController.ADD_VIDEO,
        { ...dynamicVideoDto.value, qrStyle: qrStore.qrStyleDto },
        { error: true, success: "Done !" },
        {
          formData: true,
        }
      );
      qrStore.$patch({
        qrLoader: false,
      });
      navigateTo(
        localePath(
          `/dashboard/myQrs/details/${res.data.id}?qrIndex=${res.data.qrIndex}`
        )
      );
    } catch (error) {
      qrStore.$patch({
        qrLoader: false,
      });
      throw error;
    }
  }

  async function modify(id: any) {
    const localePath = useLocalePath()

    qrStore.$patch({ qrLoader: true });
    try {
      qrStore.$patch({ qrLoader: false });
      const res = await api.POST(
        QrDynamicController.MODIFY_VIDEO,
        {
          id: id,
          ...dynamicVideoDto.value,
          qrStyle: qrStore.qrStyleDto,
        },
        { success: "Done !!" },
        { formData: true },
      );
    } catch (error) {
      qrStore.$patch({ qrLoader: false });
    }
  }
  const resetDto = function () {
    dynamicVideoDto.value = {
      deletedFiles: [],
      urls: [],
      primaryColor: "#73b5e7",
      buttonColor: "#dd0ec1",
      company: "",
      headline: " ",
      summary: "",
      hasShareButton: true,
      button: {
        name: "",
        url: "",
      },
      files: [],
      socialMediaChannels: [],
      qrName: "",
    };
  };
  const unshiftImage = (i: any) => {
    reset();

    image_list.value = image_list.value.filter((item: any) => {
      return item !== i;
    });

    preview_list.value = preview_list.value.filter((item: any) => {
      return item !== i;
    });

    dynamicVideoDto.value.files = preview_list.value;
  };
  return {
    dynamicVideoDto,
    addVideoQr,
    modify,
    resetDto,
    image_list,
    preview_list,
    previewMultiImage,
    reset,
    unshiftImage,
  };
});
