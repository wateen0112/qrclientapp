import { defineStore } from "pinia";
import { DQResponse } from "~/api/dto/qrCodes/dynamic/CreateDQrResponse";
import { useQrStore } from "../qr";
import { onMounted } from "vue";
import { useApi } from "@/composables/useApi";
import { ProductController } from "~/api/endpoints/ProductDynamic";
import { AddProductDto } from "~/api/dto/qrCodes/dynamic/Product";
const route = useRoute();
export const useProductQrStore = defineStore("useProductQrStore", () => {
  const { GET, POST } = useApi();
  const QrStore = useQrStore();
  const Colors = ref([
    ["#73b5e7", "#dd0ec1"],
    ["#EEA886", "#F07464"],
    ["#F9C2ED", "#E567F0"],
  ]);
  const index = ref(0);
  function SetColor(color: Array<string>, i: number) {
    productDto.value.primaryColor = color[0];
    productDto.value.buttonColor = color[1];
    index.value = i;
  }

  function switchColor() {
    [productDto.value.primaryColor, productDto.value.buttonColor] = [
      productDto.value.buttonColor,
      productDto.value.primaryColor,
    ];
  }
  const productDto = ref<AddProductDto>({
    qrName: "",
    welcomeImageUrl: "",
    primaryColor: "#73b5e7",
    buttonColor: "#dd0ec1",
    CompanyLogoFile: null,
    companyLogoUrl: "",
    ImageFile: null,
    imageUrl: "",
    ProductPrivateFile: null,
    productPrivateUrl: [],
    productName: "",
    productFeatures: [""],
    simpleExplanation: "",
    expirationDate: "",
    productWeight: "",
    price: 0,
    productInformation: "",
    description: "",
    button: {
      name: "",
      url: "",
    },
    address: {
      country: "",
      city: "",
      storeNumber: "",
      regionNumber: "",
      streetName: "",
    },
    socialMediaChannels: [],
    qrStyle: null,
  });
  async function addProduct() {
    QrStore.$patch({
      qrLoader: true,
    });
    try {
      const response = await POST<DQResponse>(
        ProductController.ADD_PRODUCT,
        { ...productDto.value, qrStyle: QrStore.qrStyleDto },
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
  async function modifyProduct() {
    try {
      const response = await POST<DQResponse>(
        ProductController.MODIFY_Product,
        { ...productDto.value, qrStyle: QrStore.qrStyleDto },
        { error: true, success: "Done !" },
        { formData: true }
      );
    } catch (error) {
    }
  }
  onMounted(() => {
    QrStore.emitter.on("dynamicQrDownload", () => {
      if (route.params.id !== "0") {
        modifyProduct();
      } else {
        addProduct();
      }
    });
  });

  function resetDto() {
    productDto.value = {
      qrName: "",
      welcomeImageUrl: "",
      primaryColor: "#73b5e7",
      buttonColor: "#dd0ec1",
      CompanyLogoFile: null,
      companyLogoUrl: "",
      ImageFile: null,
      imageUrl: "",
      ProductPrivateFile: null,
      productPrivateUrl: [],
      productName: "",
      productFeatures: [],
      simpleExplanation: "",
      expirationDate: "",
      productWeight: "",
      price: 0,
      productInformation: "",
      description: "",
      button: {
        name: "",
        url: "",
      },
      address: {
        country: "",
        city: "",
        storeNumber: "",
        regionNumber: "",
        streetName: "",
      },
      socialMediaChannels: [],
      qrStyle: null,
    };
  }
  return {
    addProduct,
    modifyProduct,
    resetDto,
    Colors,
    productDto,
    switchColor,
    SetColor,
    index,
  };
});
