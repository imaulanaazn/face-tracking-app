import { IAPIResponseTemplate, IPlan } from "@/data-types/merchant";
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
