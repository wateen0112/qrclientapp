import { defineStore } from "pinia";
import { Country } from "~/api/dto/website/country.dto";
import { useApi } from "~/composables/useApi";
import { CountryController } from "~/api/endpoints/CountryController";
import { ref, computed, watch } from "vue";
const api = useApi();
export const useCountryStore = defineStore("country", () => {
  //state
  const countries = ref<Country[]>([]);
  //Actions

  async function getAllCountries() {
    try {
      const res = await api.GET<Country[]>(CountryController.GET_ALL_COUNTRIES);
      countries.value = res.data;
      console.log("test", countries.value);

      return res;
    } catch (err) {
      throw err;
    }
  }
  return { countries, getAllCountries };
});
