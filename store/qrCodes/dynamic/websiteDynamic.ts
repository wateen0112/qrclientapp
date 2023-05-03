import { defineStore } from "pinia";
import { useApi } from "@/composables/useApi";
import { websiteDto } from "~/api/dto/website/websiteDto";
import { WebsiteController } from "~/api/endpoints/websiteDynamic";
import { DQResponse } from "~/api/dto/qrCodes/dynamic/CreateDQrResponse";
import { useQrStore } from "../qr";
import { useNavigator } from "~/locale/useNavigator";
import { onMounted } from "vue";
export const useWebsiteQrStore = defineStore("Website", () => {
  const QrStore = useQrStore();
  const { navigateTo } = useNavigator();
  const { GET, POST } = useApi();
  const WebDto = ref<websiteDto>({
    qrName: "",
    website: "",
  });
  async function ADDWebsite() {
    QrStore.$patch({
      qrLoader: true,
    });
    try {
      const response = await POST<DQResponse>(
        WebsiteController.AddWebsite,
        { ...WebDto.value },
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
  async function modifyWebsite() {
    QrStore.$patch({
      qrLoader: true,
    });
    try {
      if (WebDto.value.id)
        await QrStore.CheckUpdate(WebDto.value.id)
      const response = await POST<DQResponse>(
        WebsiteController.ModifyWebsite,
        { ...WebDto.value, qrStyle: QrStore.qrStyleDto },
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
  const route = useRoute();
  onMounted(() => {
    QrStore.emitter.on("dynamicQrDownload", () => {
      if (route.params.id !== "0") {
        modifyWebsite();
      } else {
        ADDWebsite();
      }
    });
  });
  function resetDto() {
    WebDto.value = {
      qrName: "",
      website: "",
    };
  }
  return {
    WebDto,
    ADDWebsite,
    modifyWebsite,
    resetDto,
  };
});
