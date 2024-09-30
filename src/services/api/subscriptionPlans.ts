import {
  IAPIResponseTemplate,
  IGetSubscriptionsResponse,
  IPlan,
} from "@/data-types/merchant";
import apiClient from "@/lib/apiClient";

interface IGetPlans extends IAPIResponseTemplate {
  data: IPlan[];
}

export const getPlans = async (): Promise<IGetPlans> => {
  try {
    const response = await apiClient.get<IPlan[]>("/v1/plans");
    return {
      success: true,
      message: "Berhasil mengambil data pricing plans",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to get pricing plans"
    );
  }
};

interface IGetMerchantSubscriptions extends IAPIResponseTemplate {
  data: IGetSubscriptionsResponse;
}

export const getMerchantSubscriptions = async (query: {
  page?: string;
  limit?: number;
  order?: string;
  search?: string;
  sort?: string;
}): Promise<IGetMerchantSubscriptions> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IGetSubscriptionsResponse>(
      `/v1/merchant/subscriptions`,
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
      message: "Berhasil mengambil subscriptions list",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to get subscriptions list"
    );
  }
};

export const getSubscriptionsDetail = async (
  subscription: string
): Promise<IGetMerchantSubscriptions> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IGetSubscriptionsResponse>(
      `/v1/merchant/subscriptions`,
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Berhasil mengambil subscriptions list",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to get subscriptions list"
    );
  }
};
