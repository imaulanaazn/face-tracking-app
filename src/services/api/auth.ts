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

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  window.location.href = "/auth/login";
};
