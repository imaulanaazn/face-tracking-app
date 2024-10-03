import {
  IAPIResponseTemplate,
  IGetBoloMerchantsAPIResponse,
} from "@/data-types/merchant";
import apiClient from "@/lib/apiClient";

interface IGetBoloMerchants extends IAPIResponseTemplate {
  data: IGetBoloMerchantsAPIResponse;
}

export const getBoloMerchants = async (query: {
  page?: string;
  limit?: number;
  order?: string;
  search?: string;
}): Promise<IGetBoloMerchants> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IGetBoloMerchantsAPIResponse>(
      "/v1/admin/merchants",
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
      message: "Retreive bolo merchants success",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to retreive bolo merchants"
    );
  }
};
