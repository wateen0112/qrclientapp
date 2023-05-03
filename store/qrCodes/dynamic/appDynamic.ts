import { defineStore } from "pinia";
import { DQResponse } from "~/api/dto/qrCodes/dynamic/CreateDQrResponse";
import { useQrStore } from "../qr";
import { onMounted } from "vue";
import { useApi } from "@/composables/useApi";
import { AppDynamicController } from "~/api/endpoints/AppDynamic";
import { AddAppDto } from "~/api/dto/website/DynamicAppDto";
const route = useRoute();
export const useAppQrStore = defineStore("useAppQrStore", () => {
  const { GET, POST } = useApi();
  const QrStore = useQrStore();
  const Colors = ref([
    ["#73b5e7", "#dd0ec1"],
    ["#EEA886", "#F07464"],
    ["#F9C2ED", "#E567F0"],
  ]);
  const index = ref(0);
  function SetColor(color: Array<string>, i: number) {
    appDto.value.primaryColor = color[0];
    appDto.value.buttonColor = color[1];
    index.value = i;
  }

  function switchColor() {
    [appDto.value.primaryColor, appDto.value.buttonColor] = [
      appDto.value.buttonColor,
      appDto.value.primaryColor,
    ];
  }
  const appDto = ref<AddAppDto>({
    LogoFile: null,
    qrName: "",
    welcomeImageUrl: "",
    primaryColor: "#73b5e7",
    buttonColor: "#dd0ec1",
    name: "",
    developer: "",
    logoUrl: "",
    title: "",
    description: "",
    website: "",
    button: {
      name: "",
      url: "",
    },
    appStoreUrl: "",
    googleStoreUrl: "",
  });
  async function addApp() {
    const localePath = useLocalePath()

    QrStore.$patch({
      qrLoader: true,
    });
    try {
      const response = await POST<DQResponse>(
        AppDynamicController.AddApp,
        { ...appDto.value, qrStyle: QrStore.qrStyleDto },
        { error: true, success: "Done !" },
        { formData: true }
      );
      console.log('testing', response)
      QrStore.$patch({
        qrLoader: false,
      });
      navigateTo(
        localePath(
          `/dashboard/myQrs/details/${response.data.id}?qrIndex=${response.data.qrIndex}`
        )
      );
    } catch (error) {
      QrStore.$patch({
        qrLoader: false,
      });
    }
  }
  async function modifyApp(id: any) {
    const localePath = useLocalePath()

    try {
      await QrStore.CheckUpdate(id)
      const response = await POST<DQResponse>(
        AppDynamicController.modifyApp,
        { id: id, ...appDto.value, qrStyle: QrStore.qrStyleDto },
        { error: true, success: "Done !" },
        { formData: true }
      );
      navigateTo(localePath(`/dashboard/myQrs/details/${response.data.id}?qrIndex=${response.data.qrIndex}`));
    } catch (error) {
    }
  }
  onMounted(() => {
    QrStore.emitter.on("dynamicQrDownload", () => {
      if (route.params.id !== "0") {
        modifyApp(route.params.id);
      } else {
        addApp();
      }
    });
  });
  function resetDto() {
    appDto.value = {
      LogoFile: null,
      qrName: "",
      welcomeImageUrl: "",
      primaryColor: "",
      buttonColor: "",
      name: "",
      developer: "",
      logoUrl: "",
      title: "",
      description: "",
      website: "",
      button: {
        name: "",
        url: "",
      },
      appStoreUrl: "",
      googleStoreUrl: "",
    };
  }
  function httpCheck(link: string) {
    return !link.includes('http') && link.length >= 4 ? 'http://' + link : link
  }
  function httpsCheck(link: string) {
    return !link.includes('https') && link.length >= 5 ? 'https://' + link : link
  }
  return {
    httpsCheck,
    httpCheck,
    modifyApp,
    addApp,
    resetDto,
    Colors,
    appDto,
    switchColor,
    SetColor,
    index,
  };
});
