import { IAPIResponseTemplate } from "@/data-types/merchant";
import apiClient from "@/lib/apiClient";

interface IMobileCodeResponse extends IAPIResponseTemplate {
  data: IMobileCode[];
}

export interface IMobileCode {
  name: string;
  code: string;
  flag: string;
  cca3: string;
  message: string;
}

export const getMobileCountryCode = async (): Promise<IMobileCodeResponse> => {
  try {
    const response = await apiClient.get<IMobileCode[]>(
      "/v1/mobile-country-code"
    );

    const result = {
      success: response.status === 200,
      message: "Berhasil Mendapatkan Kode Nomor HP",
      data: response.data || {},
    };

    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
