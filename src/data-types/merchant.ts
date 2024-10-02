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
  limit: number;
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

export interface IPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  maxDevices: number;
  dateCreated: string;
  lastUpdated: string;
}

export interface IMessageThemeCount {
  themeMessageId: string;
  themeMessageName: string;
  maxMessage: number;
  totalSent: number;
  remainingMessage: number;
}

export interface IAPIResponseTemplate {
  success: boolean;
  message: string;
}

export interface IGetMessageAPIResponse {
  id: string;
  name: string;
  content: string;
  dateCreated: string;
  recipients: IRecipent[];
}

interface IRecipent {
  id: string;
  recipientNumber: string;
  recipientName: string;
  status: string;
}

export interface IProvince {
  id: string;
  name: string;
}

export interface ICitie {
  id: string;
  province_id: string;
  name: string;
}

export interface IDistrict {
  id: string;
  regency_id: string;
  name: string;
}

export interface IDetectionHistory {
  id: string;
  name: string;
  timestamp: string;
}

export interface IPaymentMethod {
  id: string;
  name: string;
  logo: string | null;
  disabled: boolean;
  price: number;
  fee: number;
  totalPrice: number;
}

export interface IPaymentMethodWithCategory {
  categoryId: string;
  categoryName: string;
  paymentMethods: IPaymentMethod[];
}

export interface IOrderDetail {
  orderId: string;
  invoiceId: string;
  status: string;
  paymentMethod: {
    name: string;
    logo: string | null;
    cd: string;
    category: string;
    action: Action;
  };
  plan: {
    name: string;
    price: number;
  };
  amount: number;
  feeAmount: number;
  discAmount: number;
  totalAmount: number;
  periodeSubscription: string;
  periodeOnMonth: number;
  orderTimeline: [
    {
      status: string;
      desc: string;
    }
  ];
}

export interface IPaymentHistoryResponse {
  data: IOrder[];
  limit: number;
  sort: string;
  order: string;
  totalPages: number;
  page: number;
  totalData: number;
}

export interface IOrder {
  orderId: string;
  invoiceId: string;
  status: string;
  paymentMethod: {
    name: string;
    logo: string | null;
    cd: string;
    category: string;
    action: Action;
  };
  plan: {
    id: string;
    name: string;
    price: number;
  };
  amount: number;
  feeAmount: number;
  discAmount: number;
  totalAmount: number;
  periodeSubscription: string;
  periodeOnMonth: number;
}

interface CheckoutUrlAction {
  checkoutUrl: string;
}

interface QrStringAction {
  qrString: string;
}

interface PaymentCodeAction {
  paymentCode: string;
}

interface MobileNumberAction {
  mobileNumber: string;
}

interface CashTagAction {
  cashtag: string;
}

interface EmptyAction {}

type Action =
  | CheckoutUrlAction
  | QrStringAction
  | PaymentCodeAction
  | EmptyAction
  | CashTagAction
  | MobileNumberAction;

export interface IGetSubscriptionsResponse {
  data: IMerchantSubscription[];
  limit: number;
  sort: string;
  order: string;
  totalPages: number;
  totalData: number;
  page: number;
}

export interface IMerchantSubscription {
  id: string;
  startDate: string;
  endDate: string;
  remainPeriode: string;
  isActive: boolean;
  plan: {
    id: string;
    name: string;
  };
  deviceLimit: number;
}

export interface ISubscriptionDetail {
  id: string;
  startDate: string;
  endDate: string;
  remainPeriode: string;
  isActive: boolean;
  plan: {
    id: string;
    name: string;
  };
  deviceLimit: number;
  subscriptionTimeline: SubscriptionTimeline[];
}

export interface SubscriptionTimeline {
  periodeSubscription: string;
  periodeOnMonth: number;
  type: string;
  status: string;
  dateCreated: string;
}

export interface IGetAdminConnectionsAPIResponse {
  page: number;
  limit: number;
  totalData: number;
  sort: string;
  order: string;
  totalPages: number;
  data: IBoloNumber[];
}

interface IBoloNumber {
  id: string;
  mobileNumber: string;
  status: string;
  usedBy: string[] | null;
}
