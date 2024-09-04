import apiClient from "@/lib/apiClient";

interface IMerchantResponse {
  success: boolean;
  message: string;
  data: IMerchantResponseData;
}

interface IMerchantResponseData extends IMerchant {
  errorCode: string;
  message: string;
}

interface UsernameData {
  firstName: string;
  lastName: string;
}

interface ChangeUsernameResponse {
  message: string;
}

interface EmailData {
  email: string;
}

interface ChangeEmailResponse {
  message: string;
}

interface PasswordData {
  oldPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  message: string;
}

interface IRegisterFaceData {
  name: string;
  mobileNumber: string;
  faceDescriptor: number[];
}

interface IRegisterFaceResponse {
  success: boolean;
  message: string;
  data: any;
}

interface IAttendanceData {
  faceDescriptor: number[];
}

interface ICheckAttendanceResponse {
  success: boolean;
  message: string;
  data: ICheckAttendanceResponseData;
}

interface ICheckAttendanceResponseData {
  id: string;
  merchantId: string;
  name: string;
  mobileNumber: number;
  dateCreated: Date | string;
  lastUpdated: string | null;
}

interface IRecognitionHistory {
  success: boolean;
  message: string;
  data: IHistoryResponse;
}

interface IHistoryResponse {
  data: IHistoryData[];
  limit: number;
  sort: string;
  order: string;
  totalPages: number;
}

interface IHistoryData {
  id: string;
  name: string;
  timestamp: string;
}

interface IUpdateMerchantProfile {
  success: boolean;
  message: string;
  data: IUpdateMerchantProfileResponse;
}

interface IUpdateMerchantProfileResponse {
  url: string;
}

interface IGetIndonesiaLocations {
  success: boolean;
  message: string;
  data: IGetLocationsResponse[];
}

interface IGetLocationsResponse {
  id: string;
  name: string;
}

interface IGetCities {
  success: boolean;
  message: string;
  data: IGetCitiesResponse[];
}

interface IGetCitiesResponse {
  id: string;
  province_id: string;
  name: string;
}

interface IGetDistricts {
  success: boolean;
  message: string;
  data: IGetDistrictsResponse[];
}

interface IGetDistrictsResponse {
  id: string;
  regency_id: string;
  name: string;
}

interface IEditMerchantAddressProps {
  province: string;
  city: string;
  district: string;
  street: string;
}

interface IEditMerchantAddress {
  success: boolean;
  message: string;
}

interface IGetMerchantMemberHistory {
  success: boolean;
  message: string;
  data: IGetMerchantMemberHistoryResponse;
}

interface IGetMerchantMemberHistoryResponse {
  data: IDetectionHistory[];
  limit: number;
  sort: string;
  order: string;
  totalPages: number;
}

export interface IDetectionHistory {
  id: string;
  name: string;
  timestamp: string;
}

export const getMyMerchant = async (): Promise<IMerchantResponse> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IMerchantResponseData>(
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
      data: response.data || {},
    };

    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to get user data");
  }
};

export const changeUsername = async (
  data: UsernameData
): Promise<ChangeUsernameResponse> => {
  try {
    const response = await apiClient.put<ChangeUsernameResponse>(
      "/user/username",
      { username: data.firstName + data.lastName },
      {
        headers: {
          credentials: "include",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Change Username failed");
  }
};

export const changeEmail = async (
  data: EmailData
): Promise<ChangeEmailResponse> => {
  try {
    const response = await apiClient.put<ChangeEmailResponse>(
      "/user/email",
      data,
      {
        headers: {
          credentials: "include",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Change Email failed");
  }
};

export const changePassword = async (
  data: PasswordData
): Promise<ChangePasswordResponse> => {
  try {
    const response = await apiClient.put<ChangePasswordResponse>(
      "/user/password",
      data,
      {
        headers: {
          credentials: "include",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Change Password failed");
  }
};

export const registerFace = async (
  data: IRegisterFaceData
): Promise<IRegisterFaceResponse> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.post<IRegisterFaceResponse>(
      "/v1/merchant/face-registration",
      data,
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Member berhasil didaftarkan",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Register face failed");
  }
};

export const checkAttendance = async (
  data: IAttendanceData
): Promise<ICheckAttendanceResponse> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.post<ICheckAttendanceResponseData>(
      "/v1/merchant/attendace",
      data,
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Member terdeteksi",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Register face failed");
  }
};

export const getRecognitionHistory = async (
  merchantId: string
): Promise<IRecognitionHistory> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IHistoryResponse>(
      `/v1/merchant/member-detection-history/${merchantId}`,
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Berhasil mengambil data recognition history",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to get recognition history"
    );
  }
};

export const updateMerchantProfile = async (
  logo: File
): Promise<IUpdateMerchantProfile> => {
  const formData = new FormData();
  logo && formData.append("logo", logo);
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.put<IUpdateMerchantProfileResponse>(
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

export const getIndonesiaLocations =
  async (): Promise<IGetIndonesiaLocations> => {
    try {
      const response = await apiClient.get<IGetLocationsResponse[]>(
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

export const getCities = async (province_id: string): Promise<IGetCities> => {
  try {
    const response = await apiClient.get<IGetCitiesResponse[]>(
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

export const getDistricts = async (city_id: string): Promise<IGetDistricts> => {
  try {
    const response = await apiClient.get<IGetDistrictsResponse[]>(
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

export const editMerchantAddress = async (
  data: IEditMerchantAddressProps
): Promise<IEditMerchantAddress> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
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
