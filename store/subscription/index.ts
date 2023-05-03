import { useApi } from "~/composables/useApi";
import { defineStore } from "pinia";
import { GetAllSubscription } from "~/api/dto/website/subscription.dto";
import { GetAllSub } from "~/api/dto/dashboard/subscription";
import { SubscriptionController } from "~/api/endpoints/Subscription";
import { SettingsController } from "~/api/endpoints/settings";
import appConfig from "~/app.config";
const api = useApi();
interface Pagination {
  pageSize: number;
  pageIndex: number;
}
export const useSubStore = defineStore("subscription", () => {
  const { GetAccessToken } = useAuth();
  //State
  const subscriptionList = ref<GetAllSubscription[]>([]);
  const SubList = ref<GetAllSub[]>([]);
  const pagination = ref({
    pageSize: 8,
    pageIndex: 1,
  });
  const filterVal = ref("");

  //Actions

  //Get All Subscription Website
  async function GetAllSubscription() {
    try {
      const response = await api.GET<GetAllSubscription[]>(
        SubscriptionController.PRICING
      );
      subscriptionList.value = response.data;
      return response;
    } catch (er) {
    }
  }
  //Get All Subscription Customer

  async function GetAllSub() {
    try {
      const response = await api.GET<GetAllSub[]>(
        SubscriptionController.GET_ALL_SUB
      );
      SubList.value = response.data;
      return response;
    } catch (er) {
      throw er;
    }
  }

  async function Subscribe(id: string) {
    try {
      let res = await api.POST<{ url: string }>(
        SubscriptionController.SUBSCRIBE,
        { id },
        { error: true, success: "تم الاشتراك بنجاح", comfirm: false }
      );
      const stripeWindow = window.open(res.data.url, "mozillaWindow", "popup");
      stripeWindow?.addEventListener("close", () => {
      });
    } catch (er) {
    }
  }
  async function Pay(  id: string ) {
    try {
      let res = await api.POST<{ url: string }>(
        SubscriptionController.PAY + id
      );
      const stripeWindow = window.open(res.data.url, "mozillaWindow", "popup");
      stripeWindow?.addEventListener("close", () => {
      });
    } catch (er) {
    }
  }
  function paginationSub(payload: Pagination) {
    pagination.value = {
      pageSize: payload.pageSize,
      pageIndex: payload.pageIndex,
    };
  }
  const paginateListSub = computed(() => {
    return filterListSub.value.slice(
      (pagination.value.pageIndex - 1) * pagination.value.pageSize,
      pagination.value.pageSize * pagination.value.pageIndex
    );
  });
  const filterListSub = computed(() => {
    return SubList.value.filter(
      (ele: {
        name: string;
        price: number;
        qrCount: number;
        tax: number;
        qrLeftCount: number;
      }) =>
        ele.name.toLowerCase().includes(filterVal.value.toLowerCase()) ||
        ele.qrCount
          .toString()
          .toLowerCase()
          .includes(filterVal.value.toLowerCase()) ||
        ele.price
          .toString()
          .toLowerCase()
          .includes(filterVal.value.toLowerCase()) ||
        ele.tax
          .toString()
          .toLowerCase()
          .includes(filterVal.value.toLowerCase()) ||
        ele.qrLeftCount
          .toString()
          .toLowerCase()
          .includes(filterVal.value.toLowerCase()) ||
        !SubList.value
    );
  });
  function findContact(payload: string) {
    filterVal.value = payload;
  }
  async function deleteSub(ids: string[]) {
    await api.DELETE(SubscriptionController.DELETE_SUB, ids);

    SubList.value = SubList.value?.filter(
      (item: any) => !ids.includes(item.id)
    );
  }
  return {
    GetAllSubscription,
    subscriptionList,
    GetAllSub,
    SubList,
    Subscribe,
    paginationSub,
    paginateListSub,
    filterListSub,
    pagination,
    findContact,
    deleteSub,
    Pay,
  };
});
