import {
  IAPIResponseTemplate,
  IOrderDetail,
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

interface ISubscripePlanProps {
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
}: ISubscripePlanProps): Promise<ISubscribePlan> => {
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
      message: "Order Subscribtion Success",
      data: response.data,
    };

    return result;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to order subscribtion"
    );
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
