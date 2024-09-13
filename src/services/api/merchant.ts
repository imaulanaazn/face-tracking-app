import {
  IConnection,
  IConnectionType,
  IMerchant,
  IMessageHistoryResponse,
  IMessageThemeCount,
  IPlans,
  IWhatsappConnection,
} from "@/data-types/merchant";
import apiClient from "@/lib/apiClient";

interface IAPIResponseTemplate {
  success: boolean;
  message: string;
}

interface IMerchantResponse extends IAPIResponseTemplate {
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

interface IRegisterFaceResponse extends IAPIResponseTemplate {
  data: any;
}

interface IAttendanceData {
  faceDescriptor: number[];
}

interface ICheckAttendanceResponse extends IAPIResponseTemplate {
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

interface IRecognitionHistory extends IAPIResponseTemplate {
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

interface IUpdateMerchantProfile extends IAPIResponseTemplate {
  data: IUpdateMerchantProfileResponse;
}

interface IUpdateMerchantProfileResponse {
  url: string;
}

interface IGetIndonesiaLocations extends IAPIResponseTemplate {
  data: IGetLocationsResponse[];
}

interface IGetLocationsResponse {
  id: string;
  name: string;
}

interface IGetCities extends IAPIResponseTemplate {
  data: IGetCitiesResponse[];
}

interface IGetCitiesResponse {
  id: string;
  province_id: string;
  name: string;
}

interface IGetDistricts extends IAPIResponseTemplate {
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

interface IEditMerchantAddress extends IAPIResponseTemplate {}

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

export interface IDetectionHistory {
  id: string;
  name: string;
  timestamp: string;
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

interface IGetListConnectionType extends IAPIResponseTemplate {
  data: IConnectionType[];
}

interface IGetAvailableWhatsapp extends IAPIResponseTemplate {
  data: IWhatsappConnection[];
}

interface ICreateConnectionData {
  connectionName: string;
  connectionTypeId: string;
  connectionId: string;
  mobileNumber: string;
}

interface ICreateConnection extends IAPIResponseTemplate {}

interface IGetMerchantConnections extends IAPIResponseTemplate {
  data: IConnection[];
}

interface IGetMessageHistories extends IAPIResponseTemplate {
  data: IMessageHistoryResponse;
}

interface IGetMessageDetail extends IAPIResponseTemplate {
  data: IGetMessageDetailResponse;
}

export interface IGetMessageDetailResponse {
  id: string;
  name: string;
  content: string;
  dateCreated: string;
  recipients: IRecipent[];
}

interface IRecipent {
  id: string;
  recipientNumber: string;
  recipientName: string;
  status: string;
}

interface IGetPlans extends IAPIResponseTemplate {
  data: IPlans[];
}

interface IGetMessageThemeCount extends IAPIResponseTemplate {
  data: IMessageThemeCount[];
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
      data: response.data,
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

export const getMembersByMerchant = async (query: {
  page?: string;
  limit?: string;
  order?: string;
  name?: string;
  transaction?: string;
  unit?: string;
}): Promise<IGetMembersByMerchant> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IGetMembersByMerchantResponse>(
      "/v1/merchant/members?value=1",
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

export const getListConnectionType =
  async (): Promise<IGetListConnectionType> => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await apiClient.get<IConnectionType[]>(
        "/v1/merchant/whatsapp-connection-type",
        {
          headers: {
            Authorization: accessToken ? "Bearer " + accessToken.token : "",
          },
        }
      );
      return {
        success: true,
        message: "Berhasil mengambil list tipe koneksi",
        data: response.data,
      };
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to get connection type list"
      );
    }
  };

export const getAvailableWhatsapp =
  async (): Promise<IGetAvailableWhatsapp> => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await apiClient.get<IWhatsappConnection[]>(
        "/v1/merchant/available-whatsapp-connection",
        {
          headers: {
            Authorization: accessToken ? "Bearer " + accessToken.token : "",
          },
        }
      );
      return {
        success: true,
        message: "Berhasil mengambil list whatsapp tersedia",
        data: response.data,
      };
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to get avaliable whatsapp"
      );
    }
  };

export const createConnection = async (
  data: ICreateConnectionData
): Promise<ICreateConnection> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.post(
      "/v1/merchant/create-connection",
      data,
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Berhasil membuat koneksi",
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create new connection"
    );
  }
};

export const getMerchantConnections =
  async (): Promise<IGetMerchantConnections> => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await apiClient.get<IConnection[]>(
        "/v1/merchant/connection",
        {
          headers: {
            Authorization: accessToken ? "Bearer " + accessToken.token : "",
          },
        }
      );
      return {
        success: true,
        message: "Berhasil membuat koneksi",
        data: response.data,
      };
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create new connection"
      );
    }
  };

export const connectWhatsapp = async (
  connectionId: string
): Promise<IAPIResponseTemplate> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.post(
      "/v1/merchant/connect-whatsapp",
      { connectionId },
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Berhasil meminta menghubungkan wahatsapp",
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to request whatsapp connection"
    );
  }
};

export const deleteWhatsappConnection = async (
  connectionId: string
): Promise<IAPIResponseTemplate> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.delete(
      `/v1/merchant/delete-whatsapp-connection/${connectionId}`,
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Berhasil menghapus koneksi wahatsapp",
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete whatsapp connection"
    );
  }
};

export const sendMessage = async (data: {
  connectionId: string;
  memberIds: string[];
  message: string;
  name: string;
}): Promise<IAPIResponseTemplate> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.post(`/v1/merchant/send-messages`, data, {
      headers: {
        Authorization: accessToken ? "Bearer " + accessToken.token : "",
      },
    });
    return {
      success: true,
      message: "Pesan berhasil dikirim",
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to send message");
  }
};

export const getMessageHistories = async (query: {
  page?: string;
  limit?: number;
  order?: string;
  name?: string;
  sort?: string;
}): Promise<IGetMessageHistories> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IMessageHistoryResponse>(
      "/v1/merchant/messages",
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

export const getMessageDetail = async (
  messageId: string
): Promise<IGetMessageDetail> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IGetMessageDetailResponse>(
      `/v1/merchant/messages/${messageId}`,
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Berhasil mengambil data message detail",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to get message detail"
    );
  }
};

export const getPlans = async (): Promise<IGetPlans> => {
  try {
    const response = await apiClient.get<IPlans[]>("/v1/plans");
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

export const getThemeMessageCount = async (
  connectionId: string
): Promise<IGetMessageThemeCount> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IMessageThemeCount[]>(
      `/v1/merchant/theme-messages-count/${connectionId}`,
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Berhasil mengambil message theme count",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to get message theme count"
    );
  }
};
