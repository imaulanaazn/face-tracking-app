import { IAPIResponseTemplate, IDetectionHistory } from "@/data-types/merchant";
import apiClient from "@/lib/apiClient";

interface IGetMerchantMemberHistory extends IAPIResponseTemplate {
  data: IGetMerchantMemberHistoryResponse;
}

interface IGetMerchantMemberHistoryResponse {
  data: IDetectionHistory[];
  limit: number;
  sort: string;
  order: string;
  totalPages: number;
}

interface IGetMembersByMerchant extends IAPIResponseTemplate {
  data: IGetMembersByMerchantResponse;
}

interface IGetMembersByMerchantResponse {
  data: IMember[];
  limit: number;
  sort: string;
  order: string;
  totalPages: number;
  page: number;
}

interface IMember {
  id: string;
  name: string;
  mobileNumber: string;
  lastDetection: string;
  merchant: IMemberMerchant;
}

interface IMemberMerchant {
  id: string;
  name: string;
  logo: string;
}

export const getMerchantMemberHistory = async (
  memberId: string
): Promise<IGetMerchantMemberHistory> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IGetMerchantMemberHistoryResponse>(
      `/v1/merchant/member-detection-history/${memberId}?limit=10`,
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Berhasil mengambil history",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to get history");
  }
};

export const getMembersByMerchant = async (query: {
  page?: string;
  limit?: number;
  order?: string;
  name?: string;
  transaction?: string;
  unit?: string;
}): Promise<IGetMembersByMerchant> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IGetMembersByMerchantResponse>(
      "/v1/merchant/members",
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
        params: {
          ...query,
        },
      }
    );
    return {
      success: true,
      message: "Berhasil mengambil member",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to get members");
  }
};
