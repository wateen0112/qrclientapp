import { QrStyle } from "../QrStyle";

export interface AddEvent {
  id: string;
  imageFile: string;
  imageUrl: string;
  buttonColor: string;
  primaryColor: string;
  organizer: string;
  title: string;
  button: {
    name: string;
    url: string;
  };
  startDate: string;
  endDate: string;
  where: string;
  iconName: string;
  about: string;
  contact: string;
  phone: string;
  email: string;
  website: string;
  address: {
    country: string;
    city: string;
    storeNumber: string;
    regionNumber: string;
    streetName: string;
  };
  featureIcons: string[];
  summary: string;
  qrName: string;
  qrStyle: QrStyle | null;
}
