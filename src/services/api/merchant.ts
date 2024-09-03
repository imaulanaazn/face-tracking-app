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
