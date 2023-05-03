import { SocialMediaItem } from "../../website/socialMediaItem";
import { QrStyle } from "../QrStyle";
export interface AddProductDto {
  qrName: string;
  welcomeImageUrl: string;
  primaryColor: string;
  buttonColor: string;
  CompanyLogoFile: File | any | null;
  companyLogoUrl: string;
  ImageFile: File | any | null;
  imageUrl: string;
  ProductPrivateFile: File | any | null;
  productPrivateUrl: string[];
  productName: string;
  productFeatures: string[];
  simpleExplanation: string;
  expirationDate: string;
  productWeight: string;
  price: 0;
  productInformation: string;
  description: string;
  button: {
    name: string;
    url: string;
  };
  address: {
    country: string;
    city: string;
    storeNumber: string;
    regionNumber: string;
    streetName: string;
  };
  socialMediaChannels: SocialMediaItem[];
  qrStyle: QrStyle | null;
}
