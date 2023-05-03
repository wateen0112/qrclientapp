import { GetAllQrType } from "~/api/dto/website/qrCodes";
// import mergeImages from 'merge-images';
import { useFile } from "~/composables/useFile";
import { QrTypeController } from "@/api/endpoints/QrType.controller";
import { GetAllQr } from "@/api/dto/dashboard/totalQr";
import { defineStore } from "pinia";
import { QrController } from "@/api/endpoints/Qr";
import { ref, reactive } from "vue";
import { QrDynamicController } from "~/api/endpoints/qrDynamic";
import mitt from "mitt";
import { AxiosError, AxiosResponse } from "axios";
import { QrStyle } from "~/api/dto/qrCodes/QrStyle";
import { QrCategory, QrIndex } from "~/api/enums/qr";
import { CheckModifyDto, QrsMedia, QrType } from "~/api/dto/qrCodes";
import type { Statistic, GetQrDetils } from "~/api/dto/website/qrCodes";
import Swal from "sweetalert2";

import testFrame from '@/assets/svg/frames/testFrame';
import { QrFrames } from "~/api/endpoints/qrFrames";
const { getFileUrl } = useFile()
import mergeImages from "merge-images";

const { GET, DELETE, POST } = useApi();
interface Pagination {
  pageSize: number;
  pageIndex: number;
}

export const useQrStore = defineStore("qr", () => {
  //#region State
  const pagination = ref({
    pageSize: 12,
    pageIndex: 1,
  });
  const frameColor = ref('#101010')
  const qrNameToDownload = ref('')
  const framesLayouts = [
    {
      url: "QrMedia/frame/3.svg",
      src: QrFrames.svg3,
      x: 1500,
      y: 1600,
      textX: 1500,
      textY: 1200,
      textXCenter: 2100,
      mainColor: '#010101',
      textColor: 'black'
    },
    {
      url: "QrMedia/frame/4.svg",
      src: QrFrames.svg4,
      x: 1300,
      y: 2000,
      textX: 1400,
      textY: 4800,
      mainColor: '#010101',
      textXCenter: 1800,
      textColor: 'black'
    },
    {
      url: "QrMedia/frame/5.svg",
      src: QrFrames.svg5,
      x: 1750,
      y: 1700,
      textX: 1600,
      textXCenter: 2100,
      textY: 4400,
      textColor: 'white'
    },
    {
      url: "QrMedia/frame/6.svg",
      src: QrFrames.svg6,
      x: 200,
      y: 200,
      textX: 0,
      textY: 0,
      mainColor: '#010101',
      textXCenter: 2400,
      textColor: 'white'
    },
    {
      url: "QrMedia/frame/1.svg",
      src: QrFrames.svg1,
      x: 2900,
      y: 2400,
      textX: 2400,
      textY: 6000,
      mainColor: '#010101',
      textXCenter: 3300,
      textColor: 'black'

    },
    {
      url: "QrMedia/frame/2.svg",
      src: QrFrames.svg2,
      x: 1750,
      y: 2000,
      textX: 1600,
      textXCenter: 2400,
      textY: 4600,
      mainColor: '#010101',
      textColor: 'white'
    },
  ]
  const filterVal = ref("");
  const newImageUrl = ref("");
  const emitter = mitt();
  const frameInnerText = ref('Scan me')
  const qrLoader = ref(false);
  const qrTypes = ref<QrType[]>([]);
  const qrTotalList = ref<GetAllQr[]>([]);
  const qrList = ref<GetQrDetils[]>([]);
  const qrStaticList = ref<GetQrDetils[]>([]);
  const startDate = ref('2023-1-1');
  const endDate = ref('2023-2-1');

  let qrMedia = ref<QrsMedia>({
    outer: [],
    inner: [],
    logo: [],
    frame: [],
  });

  const qrStatisticDto = ref<Statistic>({
    browsers: [],
    charts: [],
    cities: [],
    countries: [],
  });

  let qrPreview = ref("");
  let qrStyleDto = reactive<QrStyle>({
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
    frameUrl: "",
    frameFile: null,
    qrPatternStyle: 0,
    topLeftInnerCorner: {
      url: "QrMedia/corners/inner/1.svg",
      color: "#000000",
    },
    topLeftOuterCorner: {
      url: "QrMedia/corners/outer/1.svg",
      color: "#000000",
    },
    topRightOuterCorner: {
      url: "QrMedia/corners/outer/1.svg",
      color: "#000000",
    },
    topRightInnerCorner: {
      url: "QrMedia/corners/inner/1.svg",
      color: "#000000",
    },
    bottomLeftOuterCorner: {
      url: "QrMedia/corners/outer/1.svg",
      color: "#000000",
    },
    bottomLeftInnerCorner: {
      url: "QrMedia/corners/inner/1.svg",
      color: "#000000",
    },
    qrUrl: "",
  });
  //#endregion

  //#region Getters
  const staticQrTypes = computed(() =>
    qrTypes.value.filter((qr) => qr.qrCategory === QrCategory.static)
  );
  const dynamicQrTypes = computed(() =>
    qrTypes.value.filter((qr) => qr.qrCategory === QrCategory.dynamic)
  );
  //#endregion

  async function GetAllQrTypes() {
    try {
      const response = await GET<GetAllQrType>(QrTypeController.GET_ALL);
      qrTypes.value = response.data.qrTypes;
      return response;
    } catch (er) {
      throw er;
    }
  }
  //generate new qr code   {Just for dynamic codes }   . . .
  //qr dimentions option added 
  // it works for download qr options 
  async function GenerateStyle(qrConfigs?: any) {

    try {
      qrLoader.value = true;
      const res = await POST(
        QrDynamicController.GET_PREVIEW,
        { qrStyle: qrStyleDto },
        { comfirm: false, error: false, success: false },
        { formData: true }
      );
      qrLoader.value = false;


      setQrPreview(res, qrConfigs);
    } catch (er) {
      qrLoader.value = false;
      let error = er as AxiosError;
    }
  }
  async function GetAllQr() {
    const response = await GET<GetAllQr[]>(QrController.GET_ALL_QR);
    qrTotalList.value = response.data;
    return response;
  }

  async function CheckUpdate(id: string, qrIndex: string) {
    try {
      const qrIndex = route.path.split("/")[2];


      const res = await POST<CheckModifyDto>(
        `${QrDynamicController.CheckIfPaidModify}?id=${id}&qrIndex=${qrIndex}`,
      );
      Swal.fire({
        title: res.data.isFreeModify ? "Free Modify" : "Paid Modify",
        text: !res.data.isFreeModify
          ? `This Is Paid Update .. You Have To Pay It Before ${new Date(
            res.data.dateEnd
          ).toLocaleDateString()}`
          : "Your Code Has Been Saved !",
      });
    } catch (er) {
      console.log(er);
    }
  }

  async function DeleteQr(payload: { id: string; qrIndex: string }) {
    try {
      await DELETE(QrController.DELETE_QR, payload);
      qrTotalList.value = qrTotalList.value.filter(
        (ele: any) => ele.id != payload.id
      );
    } catch (er) { }
  }

  async function CancelEdit(payload: { id: string; qrIndex: string }) {
    try {
      await POST(QrController.CANCEL_EDIT, payload);
      qrTotalList.value = qrTotalList.value.filter(
        (ele: any) => ele.id != payload.id
      );
    } catch (er) { }
  }

  async function getMedia() {
    const res = await GET<QrsMedia>(QrController.GET_MEDIA);
    qrMedia.value = res.data;
  }
  function setQrPreview(response: AxiosResponse, qrConfigs?: any) {
    qrLoader.value = true;





    if (qrStyleDto.frameUrl !== "") {
      let blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      qrPreview.value = URL.createObjectURL(blob);
      let svg = framesLayouts.filter((item) => { return item.url === qrStyleDto.frameUrl })[0]

      const FrameBlob = new Blob([svg.src.replaceAll(svg.mainColor, frameColor.value).replace('<text></text>', `<text fill="${svg.textColor}" x="${frameInnerText.value.length > 10 ? svg.textX : svg.textXCenter}"   font-family="Arial, Helvetica, sans-serif"  y="${svg.textY}" font-size="${svg.src === QrFrames.svg1 || QrFrames.svg5 ? '300px' : '240px'}">${frameInnerText.value} </text>`)], { type: 'image/svg+xml' });

      mergeImages([
        { src: URL.createObjectURL(FrameBlob), x: 0, y: 0 },
        { src: URL.createObjectURL(blob), x: svg.x, y: svg.y },


      ])
        .then((b64: any) => {
          qrPreview.value = b64;
          qrLoader.value = false;

        }
        );



    }

    else {
      let blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      qrPreview.value = URL.createObjectURL(blob);
      qrLoader.value = false;
    }
  }

  function paginationQr(payload: Pagination) {
    pagination.value = {
      pageSize: payload.pageSize,
      pageIndex: payload.pageIndex,
    };
  }

  type qrStatus = "stopped" | "all" | "active";

  const status = computed<qrStatus>(() => route.params.status as qrStatus);

  const filterListQr = computed(() => {
    return qrTotalList.value.filter((ele: GetAllQr) => {
      return (
        (ele.qrIndex.toLowerCase().includes(filterVal.value.toLowerCase()) ||
          ele.name.toLowerCase().includes(filterVal.value.toLowerCase()) ||
          ele.qrCategory
            .toLowerCase()
            .includes(filterVal.value.toLowerCase()) ||
          !filterVal.value) &&
        (status.value === "all" ||
          (ele.isActive && status.value === "active") ||
          (!ele.isActive && status.value === "stopped"))
      );
    });
  });

  const paginateListQr = computed(() => {
    return filterListQr.value.slice(
      (pagination.value.pageIndex - 1) * pagination.value.pageSize,
      pagination.value.pageSize * pagination.value.pageIndex
    );
  });

  const route = useRoute();

  function findContact(payload: string) {
    filterVal.value = payload;
  }

  //move to folder
  async function moveFolder(payload: any) {
    const response = await POST(QrController.MOVE_FOLDER, payload, {
      error: true,
      success: "تم النقل بنجاح",
    });
  }
  //stop qr
  async function stopeQr(payload: any) {
    const response = await POST(QrController.STOPE_QR, payload, {
      error: true,
      success: "تم الإيقاف بنجاح",
    });
  }
  //active qr
  async function activeQr(payload: any) {
    const response = await POST(QrController.ACTIVE_QR, payload, {
      error: true,
      success: "تم التفعيل بنجاح",
    });
  }
  const changeQrImage = async (payload: any) => {

  }
  async function modifyQr(payload: any) {
    try {
      const res = await POST(QrController.MODIFY_QR, payload, { success: "تم التعديل بنجاح", error: true }, { formData: true });
      newImageUrl.value = res.data.welcomeImageUrl;
    } catch (error) {
      throw error;
    }
  }
  function httpCheck(link: string) {


    return !link.includes('http') && link.length >= 4 ? 'http://' + link : link
  }
  function httpsCheck(link: string) {

    // return !link.includes('https://')&&link.length>=8?'https://'+link.split('://').length:link
    if (!link.includes('https://') && link.length >= 8) {
      if (link.split('://').length == 1) return 'https://' + link.split('://')[0];
      else if (link.split('://').length > 1) return 'https://' + link.split('://')[1];


    }
    else return link;
  }

  watch(frameColor, () => {
    if (qrStyleDto.frameUrl !== '') {
      GenerateStyle()
    }
  })
  watch(frameInnerText, () => {
    if (qrStyleDto.frameUrl !== '') {
      GenerateStyle()
    }
  })
  return {
    frameColor,
    qrNameToDownload,
    httpCheck,
    httpsCheck,
    newImageUrl,
    moveFolder,
    GetAllQr,
    qrMedia,
    getMedia,
    DeleteQr,
    qrStyleDto,
    qrTotalList,
    qrPreview,
    qrTypes,
    staticQrTypes,
    dynamicQrTypes,
    setQrPreview,
    GetAllQrTypes,
    emitter,
    qrLoader,
    GenerateStyle,
    pagination,
    filterListQr,
    paginationQr,
    paginateListQr,
    findContact,
    stopeQr,
    activeQr,
    CheckUpdate,
    modifyQr,
    CancelEdit,
    frameInnerText
  };
});
