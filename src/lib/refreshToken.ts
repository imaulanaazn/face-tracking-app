import apiClient from "./apiClient";

interface IAuthResponseData {
  accessToken: string;
  accessTokenExpiredAt: string;
}

export const refreshAccessToken = async () => {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken")!);
  if (!refreshToken.token) {
    alert("Session expired, please log in again");
    window.location.href = "/auth/login";
    return;
  }

  try {
    const response = await apiClient.post<IAuthResponseData>(
      "/v1/merchant/token",
      { refreshToken: refreshToken.token }
    );

    const newAccessToken = {
      token: response.data.accessToken,
      expiredAt: response.data.accessTokenExpiredAt,
    };

    localStorage.setItem("accessToken", JSON.stringify(newAccessToken));
    return newAccessToken;
  } catch (error: any) {
    console.error("Failed to refresh access token:", error);
    alert("Session expired, please log in again");
    window.location.href = "/auth/login";
  }
};
