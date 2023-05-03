import { useApi } from "~/composables/useApi";
import { defineStore } from "pinia";
import { GetAllHome } from "~/api/dto/dashboard/home";
import { HomeController } from "~/api/endpoints/home";

const api = useApi();
export const useHomeStore = defineStore("home", () => {
  //State
  const homeList = ref<GetAllHome[]>([]);

  //Actions
  async function GetAllHome() {
    try {
      const response = await api.GET<GetAllHome[]>(HomeController.GET_HOME);
      homeList.value = response.data;
      return response;
    } catch (er) {
      throw (er)
    }
  }

  return { GetAllHome, homeList };
});
