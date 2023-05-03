import { SocialMediaItem } from "../../website/socialMediaItem";
export interface OpeningHour {
  day: string;
  times: [
    {
      startTime: string;
      endTime: string;
    }
  ];
  checked: boolean;
}
export interface AddBussinessDto {
  primaryColor: string;
  buttonColor: string;
  imageUrl: string;
  imageFile: File | null | any;
  pdfFile: File | null | any;
  pdfUrl: string;
  company: string;
  headline: string;
  summary: string;
  pdfName: string;
  button: {
    name: string;
    url: string;
  };
  openingHours: OpeningHour[]
  address: {
    company: string;
    country: string;
    city: string;
    storeNumber: string;
    regionNumber: string;
    streetName: string;
  };
  about: string;
  name: string;
  phone: string;
  email: string;
  featureIcons: string[];
  socialMediaChannels: SocialMediaItem[];
  qrName: string;
}
