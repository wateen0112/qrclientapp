import { defineStore } from "pinia";
import { useApi } from "@/composables/useApi";
import { facebookController } from "@/api/endpoints/facebook";
import { facebookDto } from "@/api/dto/website/facebookDto";
import { DQResponse } from "~/api/dto/qrCodes/dynamic/CreateDQrResponse";
import { useQrStore } from "../qr";
import { onMounted } from "vue";
import { useNavigator } from "~/locale/useNavigator";
export const useFacebookStore = defineStore("facebookCodeStore", () => {
  const { navigateTo } = useNavigator();
  const QrStore = useQrStore();
  const { GET, POST } = useApi();
  const codeDto = ref<facebookDto>({
    ImageFile: null,
    qrName: "",
    welcomeImageUrl: "",
    primaryColor: "#73b5e7",
    buttonColor: "#dd0ec1",
    imageUrl: "",
    facebookUrl: "",
    name: "",
    title: "",
    website: "",
  });
  async function ADDFacebook() {
    QrStore.$patch({
      qrLoader: true,
    });
    try {
      const response = await POST<DQResponse>(
        facebookController.AddFacebook,
        { ...codeDto.value, qrStyle: QrStore.qrStyleDto },
        { error: true, success: "Done !" },
        { formData: true }
      );
      QrStore.$patch({
        qrLoader: false,
      });
      navigateTo(
        `/dashboard/myQrs/details/${response.data.id}?qrIndex=${response.data.qrIndex}`
      );
    } catch (error) {
      QrStore.$patch({
        qrLoader: false,
      });
    }
  }
  async function modifyFacebook(id: any) {
    QrStore.$patch({
      qrLoader: true,
    });
    try {
      const response = await POST<DQResponse>(
        facebookController.ModifyFacebook,
        { id: id, ...codeDto.value, qrStyle: QrStore.qrStyleDto },
        { error: true, success: "Done !" },
        { formData: true }
      );
      QrStore.$patch({
        qrLoader: false,
      });
    } catch (error) {
      QrStore.$patch({
        qrLoader: false,
      });
    }
  }
  const route = useRoute();
  onMounted(() => {
    QrStore.emitter.on("dynamicQrDownload", () => {
      if (route.params.id !== "0") {
        modifyFacebook(route.params.id);
      } else {
        ADDFacebook();
      }
    });
  });
  function resetDto() {
    codeDto.value = {
      ImageFile: null,
      qrName: "",
      welcomeImageUrl: "",
      primaryColor: "#73b5e7",
      buttonColor: "#dd0ec1",
      imageUrl: "",
      facebookUrl: "",
      name: "",
      title: "",
      website: "",
    };
  }

  return { codeDto, ADDFacebook, resetDto };
});
