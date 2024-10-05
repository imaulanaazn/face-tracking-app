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

import axios from "axios";

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

interface StatisticsResponse {
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
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
}
