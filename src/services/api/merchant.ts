import { IAPIResponseTemplate, IMerchant } from "@/data-types/merchant";
import apiClient from "@/lib/apiClient";

interface IGetMyMerchant extends IAPIResponseTemplate {
  data: IGetMyMerchantAPIResponse;
}

interface IGetMyMerchantAPIResponse extends IMerchant {
  errorCode: string;
  message: string;
}

export const getMyMerchant = async (): Promise<IGetMyMerchant> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("usrAccToken")!);
    const response = await apiClient.get<IGetMyMerchantAPIResponse>(
      "/v1/merchant/me",
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );

    const result = {
      success: response.status === 200,
      message: response.data.message || "Berhasil mengambil data",
      data: response.data,
    };

    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to get user data");
  }
};

interface IMerchantName {
  firstName: string;
  lastName: string;
}

interface IChangeMerchantName extends IAPIResponseTemplate {}

interface IPutMerchantNameResponse {
  message: string;
}

export const changeMerchantName = async (
  data: IMerchantName
): Promise<IChangeMerchantName> => {
  try {
    const response = await apiClient.put<IPutMerchantNameResponse>(
      "/user/username",
      { username: data.firstName + data.lastName },
      {
        headers: {
          credentials: "include",
        },
      }
    );
    return {
      success: true,
      message: "Berhasil mengubah marchant name",
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Change merchant name failed"
    );
  }
};

interface IChangeEmail extends IAPIResponseTemplate {}

interface EmailData {
  email: string;
}

interface IPutEmailAPIResponse {
  message: string;
}

export const changeEmail = async (data: EmailData): Promise<IChangeEmail> => {
  try {
    const response = await apiClient.put<IPutEmailAPIResponse>(
      "/user/email",
      data,
      {
        headers: {
          credentials: "include",
        },
      }
    );
    return {
      success: true,
      message: "Berhasil mengubah marchant email",
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Change Email failed");
  }
};

interface IChangePassword extends IAPIResponseTemplate {}

interface PasswordData {
  oldPassword: string;
  newPassword: string;
}

interface IPutPasswordAPIResponse {
  message: string;
}

export const changePassword = async (
  data: PasswordData
): Promise<IChangePassword> => {
  try {
    const response = await apiClient.put<IPutPasswordAPIResponse>(
      "/user/password",
      data,
      {
        headers: {
          credentials: "include",
        },
      }
    );
    return {
      success: true,
      message: "Berhasil mengubah marchant password",
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Change password failed");
  }
};

interface IUpdateMerchantProfile extends IAPIResponseTemplate {
  data: IPutMerchantProfileAPIResponse;
}

interface IPutMerchantProfileAPIResponse {
  url: string;
}

export const updateMerchantProfile = async (
  logo: File
): Promise<IUpdateMerchantProfile> => {
  const formData = new FormData();
  logo && formData.append("logo", logo);
  try {
    const accessToken = JSON.parse(localStorage.getItem("usrAccToken")!);
    const response = await apiClient.put<IPutMerchantProfileAPIResponse>(
      "/v1/merchant/logo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Berhasil mengubah logo merchant",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update merchant logo"
    );
  }
};

interface IGetIndonesiaLocations extends IAPIResponseTemplate {
  data: IGetLocationsAPIResponse[];
}

interface IGetLocationsAPIResponse {
  id: string;
  name: string;
}

export const getIndonesiaLocations =
  async (): Promise<IGetIndonesiaLocations> => {
    try {
      const response = await apiClient.get<IGetLocationsAPIResponse[]>(
        "/v1/indonesia-location"
      );
      return {
        success: true,
        message: "Berhasil mengambil data lokasi",
        data: response.data,
      };
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to get locations"
      );
    }
  };

interface IGetCities extends IAPIResponseTemplate {
  data: IGetCitiesAPIResponse[];
}

interface IGetCitiesAPIResponse {
  id: string;
  province_id: string;
  name: string;
}

export const getCities = async (province_id: string): Promise<IGetCities> => {
  try {
    const response = await apiClient.get<IGetCitiesAPIResponse[]>(
      `/v1/indonesia-location?province=${province_id}`
    );
    return {
      success: true,
      message: "Berhasil mengambil data provinsi",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to get provinsi");
  }
};

interface IGetDistricts extends IAPIResponseTemplate {
  data: IGetCityAPIResponse[];
}

interface IGetCityAPIResponse {
  id: string;
  regency_id: string;
  name: string;
}

export const getDistricts = async (city_id: string): Promise<IGetDistricts> => {
  try {
    const response = await apiClient.get<IGetCityAPIResponse[]>(
      `/v1/indonesia-location?city=${city_id}`
    );
    return {
      success: true,
      message: "Berhasil mengambil data provinsi",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to get provinsi");
  }
};

interface IEditMerchantAddress extends IAPIResponseTemplate {}
interface IEditMerchantAddressData {
  province: string;
  city: string;
  district: string;
  street: string;
}

export const editMerchantAddress = async (
  data: IEditMerchantAddressData
): Promise<IEditMerchantAddress> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("usrAccToken")!);
    const response = await apiClient.put("/v1/merchant/profile", data, {
      headers: {
        Authorization: accessToken ? "Bearer " + accessToken.token : "",
      },
    });
    return {
      success: true,
      message: "Berhasil mengubah alamat merchant",
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to edit merchant address"
    );
  }
};
