import { QrStyle } from "../QrStyle";

export interface QrStaticWebsite {
    website: string;
    qrName: string;
    qrStyle: QrStyle;
    saveChanges: boolean;
  }
  
  export interface QrStaticWifi {
    name: string;
    password: string;
    authentication: number;
    qrName: string;
    qrStyle: QrStyle;
    saveChanges: boolean;
  }
  
  export interface QrStaticSms {
    phoneNumber: string;
    message: string;
    qrName: string;
    qrStyle: QrStyle;
    saveChanges: boolean;
  }
  export interface QrStaticEmail {
    email: string;
    subject: string;
    message: string;
    qrName: string;
    qrStyle: QrStyle;
    saveChanges: boolean;
  }
  export interface QrStaticText {
    text: string;
    qrName: string;
    qrStyle: QrStyle;
    saveChanges: boolean;
  }
  export interface QrStaticContactDate {
    firstName: string;
    lastName: string;
    phone: string;
    phoneNumber: string;
    mail: string;
    company: string;
    job: string;
    street: string;
    city: string;
    country: string;
    web: string;
    qrName: string;
    qrStyle: QrStyle;
    saveChanges: boolean;
  }