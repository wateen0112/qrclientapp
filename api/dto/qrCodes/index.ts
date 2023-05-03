import { QrIndex, } from "~/api/enums/qr";



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

export interface CheckModifyDto {
  isFreeModify: boolean;
  price: number;
  dateEnd: string;
}