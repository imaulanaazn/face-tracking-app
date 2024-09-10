import { WhatsAppConnectionStatus } from "@/enum";

export interface IMerchant {
  id: string;
  name: string;
  logo: string | null;
  street: string | null;
  district: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  dateCreated: Date | string;
  lastUpdated: Date | null;
}

export interface IMemberFIlter {
  limit: string;
  transaction: string;
  unit: string;
}

export interface IConnectionType {
  id: string;
  name: string;
  cd: string;
}

export interface IWhatsappConnection {
  id: string;
  mobileNumber: string;
}

export interface IConnection {
  id: string;
  name: string;
  mobileNumber: string;
  connectionType: string;
  connectionTypeCd: string;
  status: WhatsAppConnectionStatus;
}

export interface IWhatsappStatus {
  id: string;
  merchantName: string;
  merchantId: string;
  status: WhatsAppConnectionStatus;
  qr: string;
}

export interface IMessageHistoryResponse {
  data: IMessageHistory[];
  limit: number;
  sort: string;
  order: string;
  totalPages: number;
  page: number;
  totalRecipients: {
    totalRecipients: string;
    totalSent: string;
    totalPending: string;
    totalFailed: string;
  };
}

export interface IMessageHistory {
  id: string;
  name: string;
  content: string;
  dateCreated: string;
  totalRecipients: string;
  totalSent: string;
  totalPending: string;
  totalFailed: string;
}
