import VueApexCharts from 'vue3-apexcharts';

export default defineNuxtPlugin((nuxtApp) => {
    // if (process.client && window) {
        nuxtApp.vueApp.use(VueApexCharts as any);
    // }
});