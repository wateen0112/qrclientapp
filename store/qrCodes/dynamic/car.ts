import { QrDynamicController } from "~/api/endpoints/qrDynamic";
import { defineStore } from "pinia";
import { AddCarDto } from "~/api/dto/qrCodes/dynamic/Car";
import { DQResponse } from "~/api/dto/qrCodes/dynamic/CreateDQrResponse";
import { CarDynamicController } from "~/api/endpoints/carDynamic";
import { useNavigator } from "~/locale/useNavigator";
import { useQrStore } from "../qr";
import Swal from "sweetalert2";

export const useCarQrStore = defineStore("CarQr", () => {
  const { navigateTo } = useNavigator();
  const QrStore = useQrStore();

  const { POST, GET } = useApi();

  const colorsData = ref([
    ["#73b5e7", "#dd0ec1"],
    ["#EEA886", "#F07464"],
    ["#F9C2ED", "#E567F0"],
  ]);

  const activeIndex = ref(0);

  function setColor(color: Array<string>, i: number) {
    carDto.value.buttonColor = color[0];
    carDto.value.primaryColor = color[1];
    activeIndex.value = i;
  }

  function swap() {
    [carDto.value.primaryColor, carDto.value.buttonColor] = [
      carDto.value.buttonColor,
      carDto.value.primaryColor,
    ];
  }
  const carDto = ref<AddCarDto>({
    companyName: "",
    contactInformation: {
      phone: "",
      name: "",
      email: "",
    },
    primaryColor: "#73b5e7",
    buttonColor: "#dd0ec1",
    carName: "Car Name",
    carModel: "Car Model",
    companyLogoFile: null,
    imagesUrls: [],
    companyLogoUrl: "",
    simpleExplanation: "",
    info: [
      ["Basic Information", "Description"],

      ["Marke", "Audi"],
      ["Modell  ", "A6"],
      ["Kilometerstand", "11500k"],
      ["Estzulassung", "April 2012"],
      ["Kraftstoffart", "Diesel"],
      ["Leistung", "270 ps"],
      ["Getriebe", "Automatic"],
      ["Fahzenugtyp", "Limosine"],
      ["Anzahl Türen", "4/5"],
      ["HU Bis", " Juni 2024"],
      ["Umweltplakette", " 4 (Grün)"],
      ["Schadstoffklasse", "Euro5"],
      ["Außenfarbe", " Silber"],
      ["Material Innenausstattung", " Vollleder"],
      ["Fahrzeugzustand", " Unbeschädigtes Fahrzeug"],
    ],
    interiorFeatures: [],
    price: "0",

    currency: "$",
    button: {
      name: "",
      url: "",
    },
    description: " Default Description",
    address: {
      country: "",
      city: "",
      storeNumber: "",
      regionNumber: "",
      streetName: "",
    },
    imageFiles: [],
    socialMediaIcons: [],
    socialMediaChannels: [],

    qrName: "Default Name",
    qrStyle: null,
  });
  async function addCar() {
    QrStore.$patch({
      qrLoader: true,
    });
    try {
      const response = await POST<DQResponse>(
        CarDynamicController.AddCar,
        { ...carDto.value, qrStyle: QrStore.qrStyleDto },
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
  async function ModifyCar(id: any) {
    QrStore.$patch({
      qrLoader: true,
    });
    try {
      await QrStore.CheckUpdate(id);
      const response = await POST<DQResponse>(
        CarDynamicController.MODIFY_QR_CAR,
        { id: id, ...carDto.value, qrStyle: QrStore.qrStyleDto },
        { error: true, success: "Done Edit!" },
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

  const route = useRoute();
  onMounted(() => {
    QrStore.emitter.on("dynamicQrDownload", () => {
      if (route.params.id !== "0") {
        ModifyCar(route.params.id);
      } else {
        addCar();
      }
    });
  });
  function resetDTO() {
    carDto.value = {
      companyName: "",
      contactInformation: {
        phone: "",
        name: "",
        email: "",
      },
      primaryColor: "#ace4fc",
      buttonColor: "#eeeeee",
      carName: "",
      carModel: "",
      companyLogoFile: null,
      imagesUrls: [],
      companyLogoUrl: "",
      simpleExplanation: "",
      info: [
        ["Basic Information", "Description"],
        ["Marke", "Audi"],
        ["Modell  ", "A6"],
        ["Kilometerstand", "11500k"],
        ["Estzulassung", "April 2012"],
        ["Kraftstoffart", "Diesel"],
        ["Leistung", "270 ps"],
        ["Getriebe", "Automatic"],
        ["Fahzenugtyp", "Limosine"],
        ["Anzahl Türen", "4/5"],
        ["HU Bis", " Juni 2024"],
        ["Umweltplakette", " 4 (Grün)"],
        ["Schadstoffklasse", "Euro5"],
        ["Außenfarbe", " Silber"],
        ["Material Innenausstattung", " Vollleder"],
        ["Fahrzeugzustand", " Unbeschädigtes Fahrzeug"],
      ],
      interiorFeatures: [],
      price: "0",
      currency: "$",
      button: {
        name: "",
        url: "",
      },
      description: "",
      address: {
        country: "",
        city: "",
        storeNumber: "",
        regionNumber: "",
        streetName: "",
      },
      imageFiles: [],
      socialMediaIcons: [],
      socialMediaChannels: [],
      qrName: "",
      qrStyle: null,
    };
  }

  return {
    carDto,
    setColor,
    colorsData,
    resetDTO,
    activeIndex,
    swap,
    addCar,
  };
});
