import { defineStore } from "pinia";
import { useApi } from "@/composables/useApi";
import { useRoute } from "vue-router";
import { BusinessDynamicController } from "@/api/endpoints/businessDynamic";
import { AddBussinessDto } from "../../../api/dto/qrCodes/dynamic/Businnes";
import { useQrStore } from "../qr";
const { POST } = useApi();
export const useBusinessDynamic = defineStore("businessDynamic", () => {

  const route: any = useRoute();
  const QrStore = useQrStore();
  const changeColorDto = ref({
    primary: "#73b5e7",
    button: "#dd0ec1",
    isActiveIndex: 0,
  });
  const urlImage = ref("");

  const businessDto = ref<AddBussinessDto>({
    primaryColor: "#73b5e7",
    buttonColor: "#dd0ec1",
    imageUrl: "https://img.freepik.com/free-vector/shop-with-sign-we-are-open_52683-38687.jpg?w=2000",
    imageFile: null,
    pdfFile: null,
    pdfUrl: "",
    company: "",
    headline: "wir stellen alle Arten  von QR_codes zur ver fugung .um das Geschaf",
    summary: "",
    pdfName: 'Menu Pdf',
    button: {
      name: "online einkaufen",
      url: "",
    },
    openingHours: [
      {
        day: "sunday",
        times: [
          {
            startTime: "07:00:00",
            endTime: "20:00:00",
          },
        ],
        checked: true,
      },
      {
        day: "monday",
        times: [
          {
            startTime: "07:00:00",
            endTime: "20:00:00",
          },
        ],
        checked: true,
      },
      {
        day: "tuesday",
        times: [
          {
            startTime: "07:00:00",
            endTime: "20:00:00",
          },
        ],
        checked: true,
      },
      {
        day: "wednesday",
        times: [
          {
            startTime: "07:00:00",
            endTime: "20:00:00",
          },
        ],
        checked: true,
      },
      {
        day: "thursday",
        times: [
          {
            startTime: "07:00:00",
            endTime: "20:00:00",
          },
        ],
        checked: true,
      },
      {
        day: "friday",
        times: [
          {
            startTime: "07:00:00",
            endTime: "20:00:00",
          },
        ],
        checked: true,
      },
      {
        day: "saturday",
        times: [
          {
            startTime: "07:00:00",
            endTime: "20:00:00",
          },
        ],
        checked: true,
      },
    ],
    address: {
      company: "",
      country: "",
      city: "",
      storeNumber: "",
      regionNumber: "",
      streetName: "",
    },
    about: "",
    name: "",
    phone: "",
    email: "",
    featureIcons: [],
    socialMediaChannels: [],
    qrName: "",
  });

  function resetDto() {

    businessDto.value = {
      primaryColor: "#73b5e7",
      buttonColor: "#dd0ec1",
      imageUrl: "",
      imageFile: null,
      pdfFile: "",
      pdfUrl: "",
      company: "",
      headline: "",
      summary: "",
      pdfName: 'Menu Pdf',
      button: {
        name: "VIEW PAGE",
        url: "",
      },
      openingHours: [
        {
          day: "sunday",
          times: [
            {
              startTime: "07:00:00",
              endTime: "20:00:00",
            },
          ],

          checked: true,
        },
        {
          day: "monday",
          times: [
            {
              startTime: "07:00:00",
              endTime: "20:00:00",
            },
          ],
          checked: true,
        },
        {
          day: "tuesday",
          times: [
            {
              startTime: "07:00:00",
              endTime: "20:00:00",
            },
          ],
          checked: true,
        },
        {
          day: "wednesday",
          times: [
            {
              startTime: "07:00:00",
              endTime: "20:00:00",
            },
          ],
          checked: true,
        },
        {
          day: "thursday",
          times: [
            {
              startTime: "07:00:00",
              endTime: "20:00:00",
            },
          ],
          checked: true,
        },
        {
          day: "friday",
          times: [
            {
              startTime: "07:00:00",
              endTime: "20:00:00",
            },
          ],
          checked: true,
        },
        {
          day: "saturday",
          times: [
            {
              startTime: "07:00:00",
              endTime: "20:00:00",
            },
          ],
          checked: true,
        },
      ],
      address: {
        company: "",
        country: "",
        city: "",
        storeNumber: "",
        regionNumber: "",
        streetName: "",
      },
      about: "",
      name: "",
      phone: "",
      email: "",
      featureIcons: [""],
      socialMediaChannels: [],
      qrName: "name qr",
    };
  }
  async function addQrBusiness() {
    const localePath = useLocalePath()

    QrStore.$patch({
      qrLoader: true,
    });
    try {
      const response: any = await POST(
        BusinessDynamicController.Add_Business_Dynamic,
        {
          ...businessDto.value,
          qrStyle: QrStore.qrStyleDto,
          openingHours: businessDto.value.openingHours.filter(h => h.checked)
        },
        { error: true, success: "Done !" },
        { formData: true }
      );
      QrStore.$patch({
        qrLoader: false,
      });
      navigateTo(localePath(`/dashboard/myQrs/details/${response.data.id}?qrIndex=${response.data.qrIndex}`));

    } catch (er) {
      QrStore.$patch({
        qrLoader: false,
      });
    }
  }

  async function modifyQrBusiness() {
    const localePath = useLocalePath()

    QrStore.$patch({
      qrLoader: true,
    });
    try {
      await QrStore.CheckUpdate(route.params.id);
      const response: any = await POST(
        BusinessDynamicController.MODIFY_QR_Business,
        {
          ...businessDto.value,
          qrStyle: QrStore.qrStyleDto,
          id: route.params.id,
        },
        { error: true, success: "Done !" },
        { formData: true }
      );
      QrStore.$patch({
        qrLoader: false,
      });
      navigateTo(localePath(`/dashboard/myQrs/details/${response.data.id}?qrIndex=${response.data.qrIndex}`));

    } catch (er) {
      QrStore.$patch({
        qrLoader: false,
      });
    }
  }

  return {
    changeColorDto,
    urlImage,
    businessDto,
    resetDto,
    addQrBusiness,
    modifyQrBusiness,
  };
});
