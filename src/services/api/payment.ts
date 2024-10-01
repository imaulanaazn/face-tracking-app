import {
  IAPIResponseTemplate,
  IOrderDetail,
  IPaymentHistoryResponse,
  IPaymentMethod,
  IPaymentMethodWithCategory,
} from "@/data-types/merchant";
import apiClient from "@/lib/apiClient";

interface IGetMerchant extends IAPIResponseTemplate {
  data: IPaymentMethodWithCategory[];
}

export const getListPaymentMethod = async (
  planId: string
): Promise<IGetMerchant> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IPaymentMethodWithCategory[]>(
      `/v1/payment-methods?planId=${planId}`,
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );

    const result = {
      success: response.status === 200,
      message: "Berhasil mengambil data",
      data: response.data,
    };

    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to get user data");
  }
};

interface ISubscribePlanProps {
  planId: string;
  paymentMethodId: string;
  unit: "month" | "year";
  value: number;
}

interface ISubscribePlan extends IAPIResponseTemplate {
  data: {
    invoiceId: string;
  };
}

export const subscribePlan = async ({
  planId,
  paymentMethodId,
  unit,
  value,
}: ISubscribePlanProps): Promise<ISubscribePlan> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.post<{ invoiceId: string }>(
      "/v1/subscription/order",
      {
        planId,
        paymentMethodId,
        periode: {
          unit,
          value,
        },
      },
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );

    const result = {
      success: response.status === 200,
      message: "Order Subscription Success",
      data: response.data,
    };

    return result;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to order subscription"
    );
  }
};

interface IRenewalPlanProps {
  subscriptionId: string;
  paymentMethodId: string;
  unit: "month" | "year";
  value: number;
}

export const renewalPlan = async ({
  subscriptionId,
  paymentMethodId,
  unit,
  value,
}: IRenewalPlanProps): Promise<ISubscribePlan> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.post<{ invoiceId: string }>(
      "/v1/subscription/renewal",
      {
        subscriptionId,
        paymentMethodId,
        periode: {
          unit,
          value,
        },
      },
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );

    const result = {
      success: response.status === 200,
      message: "Order Renewal Success",
      data: response.data,
    };

    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to order Renewal");
  }
};

interface IGetOrderDetail extends IAPIResponseTemplate {
  data: IOrderDetail;
}

export const getOrderDetail = async (
  invoiceId: string
): Promise<IGetOrderDetail> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IOrderDetail>(
      `/v1/merchant/order/${invoiceId}`,
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );

    const result = {
      success: response.status === 200,
      message: "Successfully get order detail",
      data: response.data,
    };

    return result;
  } catch (error: any) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || "Failed to get order detail"
    );
  }
};

interface IGetPaymentHistories extends IAPIResponseTemplate {
  data: IPaymentHistoryResponse;
}

export const getPaymentHistories = async (query: {
  page?: string;
  limit?: number;
  order?: string;
  name?: string;
  sort?: string;
}): Promise<IGetPaymentHistories> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IPaymentHistoryResponse>(
      "/v1/merchant/order",
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
      message: "Berhasil mengambil hisotry",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to get histories");
  }
};

interface IGetPaymentStatus extends IAPIResponseTemplate {
  data: {
    cd: string;
    name: string;
  }[];
}

export const getPaymentStatuses = async (): Promise<IGetPaymentStatus> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<{ name: string; cd: string }[]>(
      "/v1/order-statuses",
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Berhasil mengambil payment statuses",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to get payment statuses"
    );
  }
};
