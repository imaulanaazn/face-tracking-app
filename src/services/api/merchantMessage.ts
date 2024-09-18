import {
  IAPIResponseTemplate,
  IGetMessageAPIResponse,
  IMessageHistoryResponse,
  IMessageThemeCount,
} from "@/data-types/merchant";
import apiClient from "@/lib/apiClient";

interface IGetMessageThemeCount extends IAPIResponseTemplate {
  data: IMessageThemeCount[];
}

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

interface IGetMessageDetail extends IAPIResponseTemplate {
  data: IGetMessageAPIResponse;
}

export const getMessageDetail = async (
  messageId: string
): Promise<IGetMessageDetail> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IGetMessageAPIResponse>(
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

interface SendMessageData {
  connectionId: string;
  memberIds: string[];
  message: string;
  name: string;
  themeMessageId: string;
}

export const sendMessage = async (
  data: SendMessageData
): Promise<IAPIResponseTemplate> => {
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

interface IGetMessageHistories extends IAPIResponseTemplate {
  data: IMessageHistoryResponse;
}

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
