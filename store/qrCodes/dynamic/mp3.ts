import { defineStore } from 'pinia';
import { DynamicMp3Dto } from '~/api/dto/website/DynamicMp3';
import { QrDynamicController } from '@/api/endpoints/qrDynamic'
import { useQrStore } from '../qr';
export const useMp3DynamicStore = defineStore('mp3Qr', () => {
  const api = useApi();
  const qrStore = useQrStore();
  const preview_list = ref<any>([]);
  const image_list = ref<any>();
  const preview_list2 = ref<any>([]);
  const image_list2 = ref();
  const { locale } = useI18n();

  //States . . . 
  const dynamicMp3Dto = ref<DynamicMp3Dto>({
    primaryColor: '#73b5e7',
    mp3Url: '',
    buttonColor: '#dd0ec1',
    imageFile: [],
    mp3File: [],
    title: "",
    moreInfo: "",
    website: "",
    button: {
      url: "",
      name: "",
    },
    qrName: "",
    imageUrl: "",
  });
  async function addMp3Qr() {
    qrStore.$patch({
      qrLoader: true
    })
    try {

      const res = await api.POST<any>(QrDynamicController.ADD_MP3, { ...dynamicMp3Dto.value, qrStyle: qrStore.qrStyleDto }, { error: true, success: " done" }, {
        formData: true
      });
      qrStore.$patch({
        qrLoader: false,
        qrPreview: res.data
      })
    } catch (error) {
      qrStore.$patch({
        qrLoader: false
      })
      throw (error);
    }
  }
  async function modify(id: any) {
    qrStore.$patch({
      qrLoader: true
    })
    try {
      const res = await api.POST(QrDynamicController.MODIFY_MP3, { id: id, ...dynamicMp3Dto.value, qrStyle: qrStore.qrStyleDto }
        , { success: "تم تعديل البيانات بنجاح" },
        {
          formData: true
        }
      );
      qrStore.$patch({
        qrLoader: false
      })
    } catch (error) {
      qrStore.$patch({
        qrLoader: false
      })
    }
  }
  const resetDto = function () {
    dynamicMp3Dto.value = {
      primaryColor: '#73b5e7',
      mp3Url: '',
      buttonColor: '#dd0ec1',
      imageFile: [],
      mp3File: [],
      title: "",
      moreInfo: "",
      website: "",
      button: {
        url: "",
        name: "",
      },
      qrName: "",
      imageUrl: "",
    }
  }
  const reset = () => {

    image_list.value = [];
    preview_list.value = [];

  };
  const reset2 = () => {

    image_list2.value = [];
    preview_list2.value = [];

  };
  function previewMp3(event: any) {
    resetDataFromServer()
    reset();
    var input = event.target;
    var count = input.files.length;
    var index = 0;
    if (input.files) {
      dynamicMp3Dto.value.mp3File = input.files[0]
      while (count--) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
          preview_list.value.push(e.target.result);
        };
        image_list.value.push(input.files[index]);
        // imageList.value.push(input.files[index]);
        reader.readAsDataURL(input.files[index]);
        index++;
      }
    }
  }
  function previewMp3Image(event: any) {
    reset2();

    var input = event.target;
    var count = input.files.length;
    var index = 0;
    if (input.files) {
      dynamicMp3Dto.value.imageFile = input.files[0]
      while (count--) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
          preview_list2.value.push(e.target.result);
        };
        image_list2.value.push(input.files[index]);
        // imageList.value.push(input.files[index]);
        reader.readAsDataURL(input.files[index]);
        index++;
      }
    }
  }
  const unshiftImage = (i: any) => {
    reset();

    image_list.value = image_list.value.filter((item: any) => {
      return item !== i;
    });

    preview_list.value = preview_list.value.filter((item: any) => {
      return item !== i;
    });

  };
  const unshiftImage2 = (i: any) => {
    reset2();
    image_list.value = image_list.value.filter((item: any) => {
      return item !== i;
    });

    preview_list.value = preview_list.value.filter((item: any) => {
      return item !== i;
    });

  };
  const resetDataFromServer = () => {
    dynamicMp3Dto.value.imageUrl = '';
    dynamicMp3Dto.value.mp3Url = '';
  }

  return { dynamicMp3Dto, addMp3Qr, modify, resetDto, previewMp3, previewMp3Image, reset, reset2, preview_list, preview_list2, image_list, image_list2, unshiftImage2, unshiftImage, resetDataFromServer }

});
