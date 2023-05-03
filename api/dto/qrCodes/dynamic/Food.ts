import { SocialMediaItem } from "../../website/socialMediaItem"
import { QrStyle } from "../QrStyle"
export interface ComProduct {
    component: string,
    isBold: boolean
}
export interface AddFoodDto {
    id: string;
    primaryColor: string;
    buttonColor: string;
    productName: string;
    productWeight: string;
    simpleExplanation: string;
    nutritionalValues: string[][];
    productFeatures: string[];
    allergene: string[];
    price: number;
    productComponents: ComProduct[];
    productQualityGrade: string;
    expirationDate: string;
    referenceQuantity: string;
    button: {
        name: string;
        url: string;
    };
    description: string;
    address: {
        company: string,
        country: string;
        city: string;
        storeNumber: string;
        regionNumber: string;
        streetName: string
    }
    image?: {
        file: File | any | null,
        toDelete?: boolean
    },
    imageFile: File | any | null,
    imageUrl: string,
    companyLogo?: {
        file: File | any | null,
        toDelete?: boolean
    },
    companyLogoFile: File | any | null,
    companyLogoUrl: string;
    productPrivateFile: any[];
    productPrivateUrl: string[];
    socialMediaChannels: SocialMediaItem[];
    qrName: string;
    qrStyle: QrStyle | null
}