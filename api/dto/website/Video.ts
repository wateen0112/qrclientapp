import { SocialMediaItem } from "../../website/socialMediaItem";

export interface dynamicVideoDto {
  primaryColor: string;
  buttonColor: string;
  company: string;
  headline: string;
  summary: string;
  hasShareButton: boolean;
  button: {
    name: string;
    url: string;
  };
  files: any[];
  socialMediaIcons: any[];
  socialMediaChannels: SocialMediaItem[];
  qrName: string;
  deletedFiles: string[];
  urls: any[];
}
