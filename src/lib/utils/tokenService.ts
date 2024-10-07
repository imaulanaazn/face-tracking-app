import { refreshAccessToken, refreshAdminAccessToken } from "./refreshToken";

let refreshTimeout: NodeJS.Timeout | null = null;

export const startTokenRefresh = (user: "merchant" | "admin") => {
  const scheduleRefresh = (expiresIn: number) => {
    if (refreshTimeout) {
      clearTimeout(refreshTimeout);
    }

    const refreshTime = (expiresIn - 11 * 60) * 1000; // Refresh 1 minute before expiration

    refreshTimeout = setTimeout(async () => {
      const newAccessToken =
        user === "admin"
          ? await refreshAdminAccessToken()
          : await refreshAccessToken();

      const newExpiredAt = newAccessToken?.expiredAt;

      if (newExpiredAt) {
        const newExpiresIn = calculateTimeUntilExpiration(newExpiredAt);
        if (newExpiresIn > 0) {
          scheduleRefresh(newExpiresIn);
        } else {
          console.error("New token is already expired.");
        }
      } else {
        console.error("Failed to retrieve new expiredAt time from api.");
      }
    }, refreshTime);
  };

  const accessToken = getTokenFromStorage(
    user === "admin" ? "admAccToken" : "usrAccToken"
  );
  const refreshToken = getTokenFromStorage(
    user === "admin" ? "admRefToken" : "usrRefToken"
  );

  if (refreshToken && isTokenValid(refreshToken.expiredAt)) {
    const expiresIn = accessToken?.expiredAt
      ? calculateTimeUntilExpiration(accessToken.expiredAt)
      : calculateTimeUntilExpiration(new Date().toISOString());

    scheduleRefresh(expiresIn);
  } else {
    clearToken("refreshToken");
    console.error("Refresh token is invalid.");
  }
};

export const stopTokenRefresh = () => {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    refreshTimeout = null;
  }
};

// Helper function to parse and retrieve token from localStorage
const getTokenFromStorage = (key: string) => {
  const token = localStorage.getItem(key);
  return token ? JSON.parse(token) : null;
};

// Helper function to calculate the time until expiration
const calculateTimeUntilExpiration = (expiredAt: string) => {
  return (new Date(expiredAt).getTime() - Date.now()) / 1000; // Return in seconds
};

// Helper function to check if a token is still valid
const isTokenValid = (expiredAt: string) => {
  return calculateTimeUntilExpiration(expiredAt) > 0;
};

const clearToken = (key: string) => {
  localStorage.removeItem(key);
  localStorage.removeItem(key);
};
