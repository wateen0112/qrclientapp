import { useQrStore } from "@/store/qrCodes/qr";
import { CauponDto } from "~/api/dto/website/Caupon";
import { defineStore } from "pinia";
import { useNavigator } from "~/locale/useNavigator";

import { QrDynamicController } from "~/api/endpoints/qrDynamic";
export const useCouponStore = defineStore("CouponQr", () => {
  //States . . .
  const { navigateTo } = useNavigator();
  const qrStore = useQrStore();
  const preview_list = ref<any>([]);
  const image_list = ref<any>([]);
  const api = useApi();
  const dynamicCauponDto = ref<CauponDto>({
    imageUrl: "",
    primaryColor: "#73b5e7",
    buttonColor: "#dd0ec1",

    imageFile: [],

    company: "Bio Super Market",

    headline: "Angebote für die Frühlingssaison",

    description: "Holen Sie sich frische Frühlingsfrüchte zu tolien Rabatten",

    saleBadge: 0,

    couponName: "",

    validUntil: "",

    terms: "",
    address: {
      country: "",
      city: "",
      storeNumber: "",
      regionNumber: "",
      streetName: "",
    },

    button: {
      name: "this is a button",
      url: "",
    },

    website: "",

    mapUrl: "www.map.url.com",

    qrName: "",
    location: "",
    socialMediaChannels: [],
  });
  const reset = () => {
    dynamicCauponDto.value.imageFile = [];

    image_list.value = [];
    preview_list.value = [];
  };
  function previewMultiImage(event: any) {
    reset();

    var input = event.target;
    var count = input.files.length;

    if (input.files) {
      var reader = new FileReader();
      reader.onload = (e: any | never) => {
        preview_list.value.push(e.target.result);
      };
      image_list.value.push(input.files[0]);
      dynamicCauponDto.value.imageFile = input.files[0];
      // imageList.value.push(input.files[index]);
      reader.readAsDataURL(input.files[0]);
    }
  }

  // methods and actions . . .
  async function addCouponQR() {
    qrStore.$patch({ qrLoader: true });

    try {
      const res = await api.POST(
        QrDynamicController.ADD_COUPON,
        {
          ...dynamicCauponDto.value,
          qrStyle: qrStore.qrStyleDto,
        },
        { error: true, success: "Done !" },

        { formData: true }
      );
      qrStore.$patch({ qrLoader: false });
      qrStore.setQrPreview(res);
    } catch (error) { }
  }

  async function modify(id: any) {
    qrStore.$patch({ qrLoader: true });
    try {
      qrStore.$patch({ qrLoader: false });
      const res = await api.POST(
        QrDynamicController.MODIFY_COUPON,
        {
          id: id,
          ...dynamicCauponDto.value,
          qrStyle: qrStore.qrStyleDto,
        },
        {
          success: "data updated successfully !!",
          error: "an error occured ",
        },
        { formData: true }
      );
    } catch (error) {
      qrStore.$patch({ qrLoader: false });
    }
  }

  const resetDto = function () {
    dynamicCauponDto.value = {
      imageUrl: "",
      primaryColor: "#73b5e7",
      buttonColor: "#dd0ec1",

      imageFile: [],

      company: "Bio Super Market",

      headline: "Angebote für die Frühlingssaison",

      description: "Holen Sie sich frische Frühlingsfrüchte zu tolien Rabatten",

      saleBadge: 0,

      couponName: "",

      validUntil: "",

      terms: "",
      address: {
        country: "",
        city: "",
        storeNumber: "",
        regionNumber: "",
        streetName: "",
      },
      button: {
        name: "this is a button",
        url: "",
      },

      website: "",

      mapUrl: "www.map.url.com",

      qrName: "",
      location: "",
      socialMediaChannels: [],
    };
  };
  const unshiftImage = (i: any) => {
    reset();
    image_list.value = image_list.value.filter((item: any) => {
      return item !== i;
    });

    preview_list.value = preview_list.value.filter((item: any) => {
      dynamicCauponDto.value.imageFile = image_list.value;
      return item !== i;
    });
  };

  return {
    dynamicCauponDto,
    addCouponQR,
    modify,
    resetDto,
    preview_list,
    unshiftImage,
    image_list,
    previewMultiImage,
  };
});
