import { QrCategory, QrIndex } from "~/api/enums/qr";

export interface QrsMedia {
  outer: Array<string>;
  inner: Array<string>;
  logo: Array<string>;
  frame: Array<string>;
}
export interface QrType {
  id: string;
  name: string;
  qrIndex: QrIndex;
  qrCategory: string;
  description: string;
}

export interface GetAllQrType {
  qrTypes: QrType[];
  canCreateQrDynamic: boolean;
}

interface Record {
  id: string;
  version: number;
  dateCreated: string;
  isPaid: boolean;
  isCansel: boolean;
  message: string;
  invoiceUrl: string;
}

export interface Qr {
  id: string;
  qrName: string;
  qrIndex: QrIndex;
  qrType: "dynamic" | "static";
  dateCreated: string;
  shortUrl: string;
  scanCount: number;
  frameUrl: string;
  isActive: boolean;
  qrUrl: string;
  welcomeImageUrl: string;
  version: number;
  qrCategory: QrCategory;
  stripeInvoiceId: string;
  records: Record[];
}

export interface Stat {
  name: string;
  scansCount: number;
  rate?: number;
  date: string;
}
export interface Statistic {
  browsers: Array<Stat>;
  charts: Array<Stat>;
  cities: Array<Stat>;
  countries: Array<Stat>;
}
export interface GetQrDetils {
  qr: Qr;
  statistic: Statistic;
}
