import apiClient from "../apiClient";

interface IAuthResponseData {
  accessToken: string;
  accessTokenExpiredAt: string;
}

export const refreshAccessToken = async () => {
  const refreshToken = JSON.parse(localStorage.getItem("usrRefToken")!);
  try {
    if (!refreshToken) {
      throw new Error("refresh token cannot be not found");
    }

    const response = await apiClient.post<IAuthResponseData>(
      "/v1/merchant/token",
      { refreshToken: refreshToken.token }
    );

    const newAccessToken = {
      token: response.data.accessToken,
      expiredAt: response.data.accessTokenExpiredAt,
    };

    localStorage.setItem("usrAccToken", JSON.stringify(newAccessToken));
    return newAccessToken;
  } catch (error: any) {
    throw new Error("Failed to refresh access token " + error);
  }
};

export const refreshAdminAccessToken = async () => {
  const refreshToken = JSON.parse(localStorage.getItem("admRefToken")!);

  try {
    if (!refreshToken) {
      throw new Error("refresh token cannot be not found");
    }

    const response = await apiClient.post<IAuthResponseData>(
      "/v1/admin/token",
      { refreshToken: refreshToken.token }
    );

    const newAccessToken = {
      token: response.data.accessToken,
      expiredAt: response.data.accessTokenExpiredAt,
    };

    localStorage.setItem("admAccToken", JSON.stringify(newAccessToken));
    return newAccessToken;
  } catch (error: any) {
    throw new Error("Failed to refresh access token " + error);
  }
};
