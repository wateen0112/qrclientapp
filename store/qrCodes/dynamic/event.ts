import { defineStore } from "pinia";
import { eventController } from "@/api/endpoints/eventDynamic";
import { DQResponse } from "~/api/dto/qrCodes/dynamic/CreateDQrResponse";
import { AddEvent } from "~/api/dto/qrCodes/dynamic/Event";
import { useQrStore } from "../qr";
import { useNavigator } from "~/locale/useNavigator";
import { useApi } from "~/composables/useApi";
const api = useApi();

export const useQrEventDynamic = defineStore("qrEventDynamic", () => {
  const QrStore = useQrStore();
  const { navigateTo } = useNavigator();
  const eventDto = ref<AddEvent>({
    id: "",
    imageFile: "",
    imageUrl: "",
    buttonColor: "#73b5e7",
    primaryColor: "#dd0ec1",
    organizer: "",
    title: "",
    button: {
      name: "",
      url: "",
    },
    startDate: "",
    endDate: "",
    where: "",
    iconName: "",
    about: "",
    contact: "",
    phone: "",
    email: "",
    website: "",
    address: {
      country: "",
      city: "",
      storeNumber: "",
      regionNumber: "",
      streetName: "",
    },
    featureIcons: [],
    summary: "",
    qrName: "",
    qrStyle: null,
  });
  const activeIndex = ref(0);

  function setColor(color: Array<string>, i: number) {
    eventDto.value.buttonColor = color[0];
    eventDto.value.primaryColor = color[1];
    activeIndex.value = i;
  }

  function swap() {
    [eventDto.value.primaryColor, eventDto.value.buttonColor] = [
      eventDto.value.buttonColor,
      eventDto.value.primaryColor,
    ];
  }
  async function addEvent() {
    QrStore.$patch({
      qrLoader: true,
    });
    try {
      const response = await api.POST<DQResponse>(
        eventController.ADD_QR_EVENT,
        { ...eventDto.value, qrStyle: QrStore.qrStyleDto },
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
  async function modifyEvent() {
    await QrStore.CheckUpdate(eventDto.value.id)

    QrStore.$patch({
      qrLoader: true,
    });
    try {
      const response = await api.POST<DQResponse>(
        eventController.MODIFY_QR_EVENT,
        { ...eventDto.value, qrStyle: QrStore.qrStyleDto },
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
    eventDto.value = {
      id: "",
      imageFile: "",
      imageUrl: "",
      buttonColor: "#73b5e7",
      primaryColor: "#dd0ec1",
      organizer: "",
      title: "",
      button: {
        name: "",
        url: "",
      },
      startDate: "",
      endDate: "",
      where: "",
      iconName: "",
      about: "",
      contact: "",
      phone: "",
      email: "",
      website: "",
      address: {
        country: "",
        city: "",
        storeNumber: "",
        regionNumber: "",
        streetName: "",
      },
      featureIcons: [],
      summary: "",
      qrName: "",
      qrStyle: null,
    };
  }

  return {
    addEvent,
    modifyEvent,
    setColor,
    swap,
    eventDto,
    activeIndex,
    resetDto,
  };
});
