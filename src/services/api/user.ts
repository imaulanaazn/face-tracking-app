import apiClient from "@/lib/apiClient";

interface IUserReponse {
  success: boolean;
  message: string;
  data: IUserReponseData;
}

interface IUserReponseData {
  errorCode: string;
  message: string;
  id: string;
  name: string;
  logo: string;
  street: string;
  district: string;
  city: string;
  province: string;
  country: string;
  dateCreated: Date;
  lastUpdated: Date;
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

export const getMyMerchant = async (): Promise<IUserReponse> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IUserReponseData>("/v1/merchant/me", {
      headers: {
        Authorization: accessToken ? "Bearer " + accessToken.token : "",
      },
    });

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
