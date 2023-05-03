import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
import { DQResponse } from "~/api/dto/qrCodes/dynamic/CreateDQrResponse";
import { pdfController } from "@/api/endpoints/pdfDynamic";
import { AddPdfDto } from "~/api/dto/qrCodes/dynamic/Pdf";
import { useQrStore } from "../qr";
import { useNavigator } from "~/locale/useNavigator";
const api = useApi();
const route = useRoute();

export const useQrPdfDynamic = defineStore("qrPdfDynamic", () => {
  const { navigateTo } = useNavigator();
  const QrStore = useQrStore();

  const pdfDynamicDto = ref<AddPdfDto>({
    id: "",
    pdfFile: "",
    pdfUrl: "",
    coverFile: "",
    coverUrl: "",
    buttonColor: "#73b5e7",
    primaryColor: "#dd0ec1",
    company: "",
    title: "",
    description: "",
    website: "",
    qrName: "",
    qrStyle: null,
  });
  const activeIndex = ref(0);
  //setColor
  function setColor(color: Array<string>, i: number) {
    pdfDynamicDto.value.buttonColor = color[0];
    pdfDynamicDto.value.primaryColor = color[1];
    activeIndex.value = i;
  }
  //swap color
  function swap() {
    [pdfDynamicDto.value.primaryColor, pdfDynamicDto.value.buttonColor] = [
      pdfDynamicDto.value.buttonColor,
      pdfDynamicDto.value.primaryColor,
    ];
  }
  //add pdf
  async function addPdf() {
    QrStore.$patch({
      qrLoader: true,
    });
    try {
      const response = await api.POST<DQResponse>(
        pdfController.ADD_QR_PDF,
        { ...pdfDynamicDto.value, qrStyle: QrStore.qrStyleDto },
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
  //modify pdf
  async function modifyPdf() {
    await QrStore.CheckUpdate(pdfDynamicDto.value.id)

    QrStore.$patch({
      qrLoader: true,
    });
    try {
      const response = await api.POST<DQResponse>(
        pdfController.MODIFY_QR_PDF,
        { ...pdfDynamicDto.value, qrStyle: QrStore.qrStyleDto },
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
    pdfDynamicDto.value = {
      id: "",
      pdfFile: "",
      pdfUrl: "",
      coverFile: "",
      coverUrl: "",
      buttonColor: "#73b5e7",
      primaryColor: "#dd0ec1",
      company: "",
      title: "",
      description: "",
      website: "",
      qrName: "",
      qrStyle: null,
    };
  }
  return {
    addPdf,
    modifyPdf,
    setColor,
    swap,
    activeIndex,
    pdfDynamicDto,
    resetDto,
  };
});
