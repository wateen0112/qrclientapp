export interface GetAllContactUs {
  id: string;
  title: string;
  senderName: string;
  senderEmail: number;
  senderPhoneNumber: number;
}

export interface GetAllContactInterprise {
  companyName: string;
  name: string;
  email: string;
  phoneNumber: string;
  qrCount: number;
  qrType: string;
  description: string;
  industryId: string;
}
