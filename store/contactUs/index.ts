import { useApi } from "~/composables/useApi";
import { defineStore } from "pinia";
import { ContactUsController } from "@/api/endpoints/contactUs";
import { contactController } from "~/api/dto/dashboard/contactUs";
const api = useApi();
interface Pagination {
  pageSize: number;
  pageIndex: number;
}
export const useContactUs = defineStore("contactUsStore", () => {
  //State
  const pagination = ref({
    pageSize: 5,
    pageIndex: 1,
  });
  const contactList = ref<contactController[]>([]);
  const filterVal = ref("");

  //Actions

  //add contactUs in website
  async function contactUs(payload: any) {
    const response = await api.POST(ContactUsController.CONTACT_US, payload, {
      error: true,
      success: "تمت الإضافة بنجاح",
    });
  }

  //add contactUs enterprise in websire
  async function contactUsEnterprise(payload: any) {
    const response = await api.POST(
      ContactUsController.CONTACT_US_ENTERPRISE,
      payload,
      { error: true, success: "تمت الإضافة بنجاح" }
    );
  }

  //get All ContactUs in customer
  async function GetAllContacUS() {
    const response = await api.GET<contactController[]>(
      ContactUsController.GET_ALL_CONTACT
    );
    contactList.value = response.data;
    return response;
  }

  //add contactUs to customer
  async function addContact(payload: any) {
    const response = await api.POST(ContactUsController.ADD_CONTACT, payload, {
      error: true,
      success: "تمت الإضافة بنجاح",
    });
    contactList.value?.unshift(payload);
  }
  function paginationContact(payload: Pagination) {
    pagination.value = {
      pageSize: payload.pageSize,
      pageIndex: payload.pageIndex,
    };
  }
  const paginateListContact = computed(() => {
    return filterListContact.value.slice(
      (pagination.value.pageIndex - 1) * pagination.value.pageSize,
      pagination.value.pageSize * pagination.value.pageIndex
    );
  });
  const filterListContact = computed(() => {
    return contactList.value.filter(
      (ele: { title: string; content: string }) =>
        ele.title.toLowerCase().includes(filterVal.value.toLowerCase()) ||
        ele.content.toLowerCase().includes(filterVal.value.toLowerCase()) ||
        !contactList.value
    );
  });

  return {
    contactUs,
    contactUsEnterprise,
    GetAllContacUS,
    contactList,
    addContact,
    pagination,
    paginationContact,
    paginateListContact,
    filterListContact
  };
});
