import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
import { DQResponse } from "~/api/dto/qrCodes/dynamic/CreateDQrResponse";
import { AddVCardPlusDto } from "~/api/dto/qrCodes/dynamic/VcardPlus";
import { vCardPlusController } from "@/api/endpoints/vCardPlusDynamic";
import { useQrStore } from "../qr";
import { useNavigator } from "~/locale/useNavigator";
const api = useApi();

export const useQrvCardPlusDynamic = defineStore("qrVCardPlusDynamic", () => {
  const QrStore = useQrStore();
  const localePath = useLocalePath()

  const vCardPlusDto = ref<AddVCardPlusDto>({
    id: "",
    imageFile: "",
    imageUrl: "",
    buttonColor: "#73b5e7",
    primaryColor: "#dd0ec1",
    firstName: "",
    lastName: "",
    number: "",
    phone: "",
    fax: "",
    email: "",
    company: "",
    job: "",
    website: "",
    address: {
      country: "",
      city: "",
      storeNumber: "",
      regionNumber: "",
      streetName: "",
    },
    socialMediaChannels: [],
    hasShareButton: false,
    summary: "",
    qrName: "",
    qrStyle: null,
  });
  const activeIndex = ref(0);

  function setColor(color: Array<string>, i: number) {
    vCardPlusDto.value.buttonColor = color[0];
    vCardPlusDto.value.primaryColor = color[1];
    activeIndex.value = i;
  }

  function swap() {
    [vCardPlusDto.value.primaryColor, vCardPlusDto.value.buttonColor] = [
      vCardPlusDto.value.buttonColor,
      vCardPlusDto.value.primaryColor,
    ];
  }

  async function addVcadPlus() {
    QrStore.$patch({
      qrLoader: true,
    });
    try {
      const response = await api.POST<DQResponse>(
        vCardPlusController.ADD_QR_VCARD_PLUS,
        { ...vCardPlusDto.value, qrStyle: QrStore.qrStyleDto },
        { error: true, success: "Done !" },
        { formData: true }
      );
      QrStore.$patch({
        qrLoader: false,
      });
      // navigateTo(
      //   `/dashboard/myQrs/details/${response.data.id}?qrIndex=${response.data.qrIndex}`
      // );
    } catch (er) {
      QrStore.$patch({
        qrLoader: false,
      });
    }
  }
  async function modifyVcardPlus() {
    QrStore.$patch({
      qrLoader: true,
    });
    try {
      const response = await api.POST<DQResponse>(
        vCardPlusController.MODIFY_QR_VCARD_PLUS,
        { ...vCardPlusDto.value, qrStyle: QrStore.qrStyleDto },
        { error: true, success: "Done !" },
        { formData: true }
      );
      QrStore.$patch({
        qrLoader: false,
      });
      // navigateTo(
      //   `/dashboard/myQrs/details/${response.data.id}?qrIndex=${response.data.qrIndex}`
      // );
    } catch (er) {
      QrStore.$patch({
        qrLoader: false,
      });
    }
  }

  //resetDto
  function resetDto() {
    vCardPlusDto.value = {
      id: "",
      imageFile: "",
      imageUrl: "",
      buttonColor: "#73b5e7",
      primaryColor: "#dd0ec1",
      firstName: "",
      lastName: "",
      number: "",
      phone: "",
      fax: "",
      email: "",
      company: "",
      job: "",
      website: "",
      address: {
        country: "",
        city: "",
        storeNumber: "",
        regionNumber: "",
        streetName: "",
      },
      socialMediaChannels: {
        url: "",
        text: "",
        iconName: "",
      },
      hasShareButton: false,
      summary: "",
      qrName: "",
      qrStyle: null,
    };
  }

  return {
    addVcadPlus,
    modifyVcardPlus,
    vCardPlusDto,
    setColor,
    swap,
    activeIndex,
    resetDto,
  };
});
