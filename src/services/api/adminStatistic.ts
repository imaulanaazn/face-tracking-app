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
  } catch (error) {
    console.error("Error fetching transaction chart:", error);
    throw error;
  }
}
