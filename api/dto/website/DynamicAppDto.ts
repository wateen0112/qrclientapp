export interface AddAppDto {
  qrName: string;
  welcomeImageUrl: string;
  primaryColor: string;
  buttonColor: string;
  name: string;
  developer: string;
  logoUrl: string;
  title: string;
  description: string;
  website: string;
  button: {
    name: string;
    url: string;
  };
  LogoFile: File | any | null;
  appStoreUrl: string;
  googleStoreUrl: string;
}
