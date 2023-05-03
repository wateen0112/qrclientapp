import { useApi } from "~/composables/useApi";
import { defineStore } from "pinia";
import { QrStaticController } from "@/api/endpoints/QrStatic";
import { useQrStore } from "@/store/qrCodes/qr";
const { POST } = useApi();

export const useQrStatic = defineStore("qrStaticStore", () => {
  const qrStore = useQrStore();

  //Actions
  async function addWebsite(payload: any) {
    qrStore.$patch({ qrLoader: true });
    const response = await POST(
      QrStaticController.QrWebsite,
      payload,
      { error: true },
      { formData: true, responseType: "arraybuffer" }
    );
    qrStore.$patch({ qrLoader: false });
    qrStore.setQrPreview(response);
  }

  async function addWifi(payload: any) {
    qrStore.$patch({ qrLoader: true });
    const response = await POST(
      QrStaticController.QrWifi,
      payload,
      { error: true },
      { formData: true, responseType: "arraybuffer" }
    );

    qrStore.$patch({ qrLoader: false });
    qrStore.setQrPreview(response);
  }

  async function addContactData(payload: any) {
    qrStore.$patch({ qrLoader: true });
    const response = await POST(
      QrStaticController.QrContactData,
      payload,
      { error: true },
      { formData: true, responseType: "arraybuffer" }
    );
    qrStore.$patch({ qrLoader: false });
    qrStore.setQrPreview(response);
  }

  async function addEmail(payload: any) {
    qrStore.$patch({ qrLoader: true });
    const response = await POST(
      QrStaticController.QrEmail,
      payload,
      { error: true },
      { formData: true, responseType: "arraybuffer" }
    );
    qrStore.$patch({ qrLoader: false });
    qrStore.setQrPreview(response);
  }

  async function addText(payload: any) {
    qrStore.$patch({ qrLoader: true });
    const response = await POST(
      QrStaticController.QrText,
      payload,
      { error: true },
      { formData: true, responseType: "arraybuffer" }
    );
    qrStore.$patch({ qrLoader: false });
    qrStore.setQrPreview(response);
  }

  async function addSms(payload: any) {
    qrStore.$patch({ qrLoader: true });
    const response = await POST(
      QrStaticController.QrSms,
      payload,
      { error: true },
      { formData: true, responseType: "arraybuffer" }
    );
    qrStore.$patch({ qrLoader: false });
    qrStore.setQrPreview(response);
  }

  return { addWebsite, addWifi, addContactData, addEmail, addText, addSms };
});
