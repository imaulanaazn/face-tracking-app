import apiClient from "@/lib/apiClient";

interface IUserReponse {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
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

export const getUser = async (): Promise<IUserReponse> => {
  try {
    const response = await apiClient.get<IUserReponse>("/getMe", {
      headers: {
        credentials: "include",
      },
    });
    return response.data;
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
