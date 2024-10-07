import apiClient from "@/lib/apiClient";

export interface ChartData {
  timestamp: string;
  totalTransaction: number;
  totalAmount: number;
}

export interface ChartResponse {
  startDate: string;
  endDate: string;
  frequency: string;
  data: ChartData[];
}

interface ChartRequestParams {
  frequency?: string;
  startDate?: string;
  endDate?: string;
}

// Function to get the ISO string of the start of the previous month
export function getPreviousMonthStartDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);
  return date.toISOString();
}

// Function to get the current ISO date string
export function getCurrentEndDate(): string {
  return new Date().toISOString();
}

// API call to get the transaction chart data
export async function getTransactionChart(
  params?: ChartRequestParams
): Promise<ChartResponse> {
  try {
    const response = await apiClient.get<ChartResponse>("/v1/admin/chart", {
      params: params,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching transaction chart:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
}

// Define the types for the response data
interface TotalNewMerchant {
  startDate: string;
  endDate: string;
  total: number;
}

interface TotalTransactions {
  startDate: string;
  endDate: string;
  total: {
    total: number;
    totalPendingPayment: number;
    totalProcessing: number;
    totalCompleted: number;
    totalFailed: number;
  };
}

interface TotalDevices {
  total: number;
  totalBoloDevices: number;
  totalUserDevices: number;
}

export interface StatisticsResponse {
  totalMerchants: number;
  totalNewMerchant: TotalNewMerchant;
  totalTransactions: TotalTransactions;
  totalDevices: TotalDevices;
}

// API call to get the statistics data
export async function getStatistics(
  startDate: string,
  endDate: string
): Promise<StatisticsResponse> {
  try {
    const response = await apiClient.get<StatisticsResponse>(
      "/v1/admin/statistics",
      {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching statistics:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
}

interface Merchant {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  logo: string;
}

interface Amount {
  price: number;
  totalAmount: number;
  discountAmount: number;
  feeAmount: number;
}

interface Order {
  invoiceId: string;
  merchant: Merchant;
  amount: Amount;
  status: string;
  type: string;
  periodeSubscription: string;
  periodeOnMonth: number;
  createdAt: string;
}

export interface OrdersResponse {
  data: Order[];
  page: number;
  limit: number;
  totalData: number;
  sort: string;
  order: string;
  totalPages: number;
}

// API call to get the orders data
export async function getOrders(query: {
  page?: string;
  limit?: number;
  order?: string;
  name?: string;
  sort?: string;
  search?: string;
}): Promise<OrdersResponse> {
  try {
    const response = await apiClient.get<OrdersResponse>("/v1/admin/orders", {
      params: {
        ...query,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
}
