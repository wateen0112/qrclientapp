import { SocialMediaItem } from "../../website/socialMediaItem";
export interface CauponDto {
  primaryColor: string;

  buttonColor: string;
  imageUrl: string;

  imageFile: any[];

  company: string;

  headline: string;

  description: string;

  saleBadge: number;

  couponName: string;

  validUntil: string;

  terms: string;

  button: {
    name: string;
    url: string;
  };
  socialMediaChannels: SocialMediaItem[];
  address: {
    country: string,
    city: string,
    storeNumber: string,
    regionNumber: string,
    streetName: string,
  },

  website: string;

  mapUrl: string;

  qrName: string;
  location: string;
}
