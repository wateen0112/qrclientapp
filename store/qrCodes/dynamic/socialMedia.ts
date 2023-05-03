import { defineStore } from "pinia";
import { socialMediaController } from "@/api/endpoints/socialMediaDynamic";
import { DQResponse } from "~/api/dto/qrCodes/dynamic/CreateDQrResponse";
import { AddSocialMediaDto } from "~/api/dto/qrCodes/dynamic/SocialMedia";
import { useApi } from "~/composables/useApi";
import { useQrStore } from "../qr";
import { useNavigator } from "~/locale/useNavigator";

const api = useApi();

export const useQrSocialMediaDynamic = defineStore(
  "qrSocialMediaDynamic",
  () => {
    const QrStore = useQrStore();
    const { navigateTo } = useNavigator();

    const url = ref({
      url1: "https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Teaser/social-media-plattformen-t.jpg",
      url2: "https://www.pagepersonnel.fr/sites/pagepersonnel.fr/files/legacy/shutterstock_767934082_970x480.jpg",
      url3: "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2022-05/hand-drawn-illustrations-social-media.jpg",
      url4: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Importance_of_Social_Media_in_Todays_World.jpg",
      url5: "https://www.marketing365.com.br/wp-content/uploads/2018/10/social-media.jpg",
      url6: "https://simplepage.vn/blog/wp-content/uploads/2022/03/social-media.jpg",
    });
    const socialDynamicDto = ref<AddSocialMediaDto>({
      id: "",
      imageFile: "",
      socialMediaUrl: "",
      imageUrl: "",
      buttonColor: "#73b5e7",
      primaryColor: "#dd0ec1",
      headLine: "Let's Go",
      aboutUs: "Verbinden Sie sich mit uns um auf dem neuesten Stand zu bleiben.",
      socialMediaChannels: [],
      qrName: "",
      qrStyle: null,
    });
    const activeSwiper = ref("");
    const activeIndex = ref(0);

    function setColor(color: Array<string>, i: number) {
      socialDynamicDto.value.buttonColor = color[0];
      socialDynamicDto.value.primaryColor = color[1];
      activeIndex.value = i;
    }

    function swap() {
      [
        socialDynamicDto.value.primaryColor,
        socialDynamicDto.value.buttonColor,
      ] = [
          socialDynamicDto.value.buttonColor,
          socialDynamicDto.value.primaryColor,
        ];
    }

    async function addSocialMedia() {
      QrStore.$patch({
        qrLoader: true,
      });
      try {
        const response = await api.POST<DQResponse>(
          socialMediaController.ADD_QR_SOCIAL_MEDIA,
          { ...socialDynamicDto.value, qrStyle: QrStore.qrStyleDto },
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

    //modify socialMedia
    async function modifySocialMedia() {
      QrStore.$patch({
        qrLoader: true,
      });
      try {
        const response = await api.POST<DQResponse>(
          socialMediaController.MODIFY_QR_SOCIAL_MEDIA,
          { ...socialDynamicDto.value, qrStyle: QrStore.qrStyleDto },
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
      socialDynamicDto.value = {
        id: "",
        imageFile: "",
        socialMediaUrl: "",
        imageUrl: "",
        buttonColor: "#73b5e7",
        primaryColor: "#dd0ec1",
        headLine: "",
        aboutUs: "",
        socialMediaChannels: {
          url: "",
          text: "",
          iconName: "",
        },
        qrName: "",
        qrStyle: null,
      };
    }

    return {
      addSocialMedia,
      modifySocialMedia,
      socialDynamicDto,
      url,
      setColor,
      swap,
      activeSwiper,
      activeIndex,
      resetDto,
    };
  }
);
