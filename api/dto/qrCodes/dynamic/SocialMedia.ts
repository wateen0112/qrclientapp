import { QrStyle } from "../QrStyle";
import { SocialMediaItem } from "../../website/socialMediaItem";

export interface AddSocialMediaDto {
  id: string;
  imageFile: string;
  imageUrl: string;
  socialMediaUrl: string;
  buttonColor: string;
  primaryColor: string;
  headLine: string;
  aboutUs: string;
  socialMediaChannels: SocialMediaItem[];
  qrName: string;
  qrStyle: QrStyle | null;
}
