import { SocialMediaItem } from "../../website/socialMediaItem";
import { QrStyle } from "../QrStyle";

export interface AddCarDto {
  primaryColor: string;
  buttonColor: string;
  carName: string;
  carModel: string;
  simpleExplanation: string;
  info: string[][
    
    
  ];
  interiorFeatures: string[];
  price: string;
  currency:string,
  button: {
    name: string;
    url: string;
  };
  description: string;
  address: {
    country: string;
    city: string;
    storeNumber: string;
    regionNumber: string;
    streetName: string;
  };
  imageFiles: any[];
  companyLogoFile: File | any | null;
  companyLogoUrl?: string;
  companyName:string
  imagesUrls?: string[];
  socialMediaChannels: SocialMediaItem[];
  socialMediaIcons: [];
  qrName: string;
  qrStyle: QrStyle | null;
  contactInformation:{
    phone:string ; 
    name:string;
    email:string
  }
}
