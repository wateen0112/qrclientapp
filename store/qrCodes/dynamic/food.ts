import { defineStore } from "pinia";
import { useApi } from "@/composables/useApi";
import { FoodDynamicController } from "@/api/endpoints/foodDynamic"
import { AddFoodDto, ComProduct } from '~/api/dto/qrCodes/dynamic/Food';
import { useQrStore } from '../qr';
import { useNavigator } from "~/locale/useNavigator";
import { useRoute } from "vue-router";
const { POST, GET } = useApi();

export const useFoodDynamic = defineStore('foodDynamic', () => {
    const { navigateTo } = useNavigator();
    const QrStore = useQrStore();
    const route: any = useRoute();
    const coinPrice = ref("€");
    const changeColorDto = ref({
        primary: '#73b5e7',
        button: "#dd0ec1",
        isActiveIndex: 0
    })
    const colorsData = ref([
        ["#73b5e7", "#dd0ec1"],
        ["#EEA886", "#F07464"],
        ["#F9C2ED", "#E567F0"],
    ]);


    const qualities = ref([
        {
            value: 1,
            name: "A"
        },
        {
            value: 2,
            name: "B"
        },
        {
            value: 3,
            name: "C"
        },
        {
            value: 4,
            name: "D"
        },
        {
            value: 5,
            name: "E"
        },

    ])
    const foodDto = ref<AddFoodDto>({
        id: '',
        primaryColor: "#73b5e7",
        buttonColor: "#dd0ec1",
        productName: "",
        productWeight: "",
        simpleExplanation: "",
        nutritionalValues: [
            ["Nährwerte", "100/g"],
            ["Energie", "1481 kj/ 349 kcal"],
            ["fett", "0,1g"],
            ["davon gesättigte Fettsäuren", "0,1g"],
            ["Kohlenhydrate", "86,6g"],
            ["davon Zucker", "0,1g"],
            ["Eiweiß", "0,4g"],
            ["saiz", "0,01"],
        ],
        productPrivateFile: [],
        productFeatures: [""],
        allergene: ["viele Gründe"],
        price: 0,
        referenceQuantity: "",
        productComponents: [{
            component: "",
            isBold: false
        }],
        productQualityGrade: '',
        expirationDate: "",
        button: {
            name: "",
            url: "",
        },
        description: "",
        address: {
            company: "",
            country: "",
            city: "",
            storeNumber: "",
            regionNumber: "",
            streetName: ""
        },
        image: {
            file: null
        },
        imageFile: null,
        imageUrl: "",
        companyLogo: {
            file: null
        },
        companyLogoFile: null,
        companyLogoUrl: "",

        productPrivateUrl: [],
        socialMediaChannels: [],
        qrName: "",
        qrStyle: null
    })

    function resetDto() {
        foodDto.value = {
            id: '',
            primaryColor: "#73b5e7",
            buttonColor: "#dd0ec1",
            productName: "",
            referenceQuantity: "",
            productWeight: "",
            simpleExplanation: "",
            nutritionalValues: [["Header1", "Header2"]],
            productPrivateFile: [],
            productFeatures: [""],
            allergene: [""],
            price: 0,
            productComponents: [{
                component: "",
                isBold: false
            }],
            productQualityGrade: "",
            expirationDate: "",
            button: {
                name: "",
                url: "",
            },
            description: "",
            address: {
                company: "",
                country: "",
                city: "",
                storeNumber: "",
                regionNumber: "",
                streetName: ""
            },
            image: {
                file: null
            },
            imageFile: null,
            imageUrl: "",
            companyLogo: {
                file: null
            },
            companyLogoFile: null,
            companyLogoUrl: "",

            productPrivateUrl: [],
            socialMediaChannels: [],
            qrName: "",
            qrStyle: null
        };
    }

    async function addQrFood() {
        QrStore.$patch({
            qrLoader: true
        })
        try {
            const response: any = await POST(FoodDynamicController.Add_Food_Dynamic, { ...foodDto.value, qrStyle: QrStore.qrStyleDto }, { error: true, success: "Done !" }, { formData: true })
            QrStore.$patch({
                qrLoader: false
            })


            navigateTo(
                `/dashboard/myQrs/details/${response.data.id}?qrIndex=${response.data.qrIndex}`
            );

        }
        catch (er) {
            QrStore.$patch({
                qrLoader: false
            })
        }
    }


    async function modifyQrFood() {
        QrStore.$patch({
            qrLoader: true
        })
        try {
            const response: any = await POST(FoodDynamicController.Modify_Food_Dynamic, { ...foodDto.value, qrStyle: QrStore.qrStyleDto, id: route.params.id, image: { file: foodDto.value.imageFile }, companyLogo: { file: foodDto.value.companyLogoFile } }, { error: true, success: "Done !" }, { formData: true })
            QrStore.$patch({
                qrLoader: false
            })


            navigateTo(
                `/dashboard/myQrs/details/${response.data.id}?qrIndex=${response.data.qrIndex}`
            );


        }
        catch (er) {
            QrStore.$patch({
                qrLoader: false
            })
        }
    }
    return { changeColorDto, foodDto, addQrFood, resetDto, coinPrice, colorsData, qualities, modifyQrFood }
})