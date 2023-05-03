import { defineStore } from "pinia";
import { DynamicImageDto } from "~/api/dto/website/Image";
import { QrDynamicController } from "~/api/endpoints/qrDynamic";
import { useApi } from "~/composables/useApi";
import { useQrStore } from "../qr";
import { DQResponse } from "~/api/dto/qrCodes/dynamic/CreateDQrResponse";
import { useNavigator } from "~/locale/useNavigator";

const api = useApi();
const preview_list = ref<any>([]);
const image_list = ref();
export const useDynamicImageStore = defineStore("dynamicImage", () => {
  const qrStore = useQrStore();
  const { navigateTo } = useNavigator();
  //states . . .
  const isWhiteText = ref(false);
  const dynamicImageDto = ref<DynamicImageDto>({
    color: "#73b5e7",
    buttonColor: "#dd0ec1",
    title: "",

    description: "",

    website: "",

    button: {
      name: "",

      url: "",
    },
    imageUrls: [],
    imageFiles: [],
    deleteImages: [],
    qrName: "",
  });
  const thereIsButton = ref(
    dynamicImageDto.value.button.name !== "" &&
    dynamicImageDto.value.button.url !== ""
  );
  //Methods and funcitons  . . .
  async function addImageQr() {
    qrStore.$patch({
      qrLoader: true,
    });
    try {
      const res = await api.POST<DQResponse>(
        QrDynamicController.ADD_IMAGE,
        { ...dynamicImageDto.value, qrStyle: qrStore.qrStyleDto },
        {
          error: true,
          success: "Done !",
        },

        {
          formData: true,
        }
      );
      navigateTo(
        `/dashboard/myQrs/details/${res.data.id}?qrIndex=${res.data.qrIndex}`
      );
    } catch (error) {
      qrStore.$patch({
        qrLoader: false,
      });
    }
  }

  async function modify(id: any) {
    qrStore.$patch({ qrLoader: true });

    try {
      const res = await api.POST(
        QrDynamicController.MODIFY_IMAGE,
        { id: id, ...dynamicImageDto.value, qrStyle: qrStore.qrStyleDto },
        { error: true, success: "Done !" },
        {
          formData: true,
        }
      );

      qrStore.$patch({ qrLoader: false });
    } catch (error) {
      qrStore.$patch({ qrLoader: false });
      throw error;
    }
  }
  const reset = () => {
    image_list.value = [];
    preview_list.value = [];
    dynamicImageDto.value.imageFiles = [];
  };
  function previewMultiImage() {
    var count = dynamicImageDto.value.imageFiles?.length;

    var index = 0;
    if (dynamicImageDto.value.imageFiles) {
      while (count--) {
        var reader = new FileReader();
        reader.onload = (e: any | undefined) => {
          preview_list.value.push(e.target.result);
        };

        reader.readAsDataURL(dynamicImageDto.value.imageFiles[index]);
        index++;
      }
    }
  }
  const unshiftImage = (i: string) => {
    // image_list.value= image_list.value.filter((item:string) => {
    //   return !i.includes(item)
    // });
    preview_list.value = preview_list.value.filter((item: string) => {
      return !i.includes(item);
    });
  };

  const resetDto = function () {
    dynamicImageDto.value = {
      buttonColor: "#73b5e7",
      color: "#dd0ec1",
      title: "",

      description: "",

      website: "",

      button: {
        name: "",

        url: "",
      },
      imageFiles: [],
      imageUrls: [],
      deleteImages: [],
      qrName: "",
    };
  };
  return {
    thereIsButton,
    isWhiteText,
    dynamicImageDto,
    addImageQr,
    modify,
    resetDto,
    preview_list,
    image_list,
    previewMultiImage,
    unshiftImage,
    reset,
  };
});
