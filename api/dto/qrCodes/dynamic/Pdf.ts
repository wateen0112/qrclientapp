import { QrStyle } from "../QrStyle";

export interface AddPdfDto {
  id: string;
  pdfFile: string;
  pdfUrl: string;
  coverFile: string;
  coverUrl: string;
  buttonColor: string;
  primaryColor: string;
  company: string;
  title: string;
  description: string;
  website: string;
  qrName: string;
  qrStyle: QrStyle | null;
}
