import { IAPIResponseTemplate } from "@/data-types/merchant";
import apiClient from "@/lib/apiClient";

interface LoginData {
  email: string;
  password: string;
}

interface IAuthResponse extends IAPIResponseTemplate {
  data: IAuthApiResponse;
}

interface IAuthApiResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredAt: Date;
  refreshTokenExpiredAt: Date;
  message: string;
  errorCode: string;
}

interface RegisterData {
  name: string;
  mobileNumber: string;
  phoneCode: string;
  email: string;
  password: string;
}

export const login = async (data: LoginData): Promise<IAuthResponse> => {
  try {
    const response = await apiClient.post<IAuthApiResponse>(
      "/v1/merchant/login",
      data
    );

    const result = {
      success: response.status === 200,
      message: response.data.message || "Berhasil Login",
      data: response.data || {},
    };

    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const register = async (data: RegisterData) => {
  try {
    const response = await apiClient.post<IAuthApiResponse>(
      "/v1/merchant/registration",
      data
    );

    const result = {
      success: response.status === 200,
      message: response.data.message || "Berhasil Mendaftar",
      data: response.data || {},
    };

    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

interface ITokenResetPassword extends IAPIResponseTemplate {}

export const tokenResetPassword = async (
  identifier: string
): Promise<ITokenResetPassword> => {
  try {
    const response = await apiClient.post<{ message: string }>(
      "/v1/token-reset-password",
      {
        identifier,
      }
    );

    const result = {
      success: response.status === 200,
      message: response.data.message || "Reset password url has been sent",
    };

    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const logout = (user: string) => {
  localStorage.removeItem(user === "admin" ? "admAccToken" : "usrAccToken");
  localStorage.removeItem(user === "admin" ? "admRefToken" : "usrRefToken");
  localStorage.removeItem("user");
  window.location.href = user === "admin" ? "/admin/auth/login" : "/auth/login";
};

export const validateTokenReset = async (
  token: string
): Promise<ITokenResetPassword> => {
  try {
    const response = await apiClient.get<{ message: string }>(
      `/v1/token-reset-password/${token}`
    );

    const result = {
      success: response.status === 200,
      message: response.data.message || "Reset token is valid",
    };

    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

interface IResetPassword extends IAPIResponseTemplate {}

export const resetPassword = async ({
  newPassword,
  token,
}: {
  newPassword: string;
  token: string;
}): Promise<IResetPassword> => {
  try {
    const response = await apiClient.post<{ message: string }>(
      `/v1/reset-password`,
      {
        newPassword,
        token,
      }
    );

    const result = {
      success: response.status === 200,
      message: response.data.message || "Password updated. Please login",
    };

    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

interface IAdminLoginData {
  username: string;
  password: string;
}

export const adminLogin = async (
  data: IAdminLoginData
): Promise<IAuthResponse> => {
  try {
    const response = await apiClient.post<IAuthApiResponse>(
      "/v1/admin/login",
      data
    );

    const result = {
      success: response.status === 200,
      message: response.data.message || "Berhasil Login",
      data: response.data || {},
    };

    return result;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
