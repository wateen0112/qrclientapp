import { defineStore } from 'pinia';
import { useApi } from '~/composables/useApi';
import { SettingsController } from '@/api/endpoints/settings'
import { ref } from 'vue';
const { POST, DELETE, GET } = useApi()
export const useSettings = defineStore('settingStore', () => {
    let industries = ref([
        {
            id: '',
            name: ''
        }
    ])


    async function getIndustries() {
        const res = await GET(SettingsController.GET_ALL_INDUSTRY)
        industries.value = res.data;
    }
    return { industries, getIndustries }
})