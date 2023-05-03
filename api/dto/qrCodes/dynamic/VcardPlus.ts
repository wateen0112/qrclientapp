import { QrStyle } from "../QrStyle";
import { SocialMediaItem } from "../../website/socialMediaItem";

export interface AddVCardPlusDto {
  id: string;
  imageFile: string;
  imageUrl: string;
  buttonColor: string;
  primaryColor: string;
  firstName: string;
  lastName: string;
  number: string;
  phone: string;
  fax: string;
  email: string;
  company: string;
  job: string;
  website: string;
  address: {
    country: string;
    city: string;
    storeNumber: string;
    regionNumber: string;
    streetName: string;
  };
  socialMediaChannels: SocialMediaItem[];
  hasShareButton: boolean;
  summary: string;
  qrName: string;
  qrStyle: QrStyle | null;
}
