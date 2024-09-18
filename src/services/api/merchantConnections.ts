import {
  IAPIResponseTemplate,
  IConnection,
  IConnectionType,
  IWhatsappConnection,
} from "@/data-types/merchant";
import apiClient from "@/lib/apiClient";

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

interface ICreateConnectionData {
  connectionName: string;
  connectionTypeId: string;
  connectionId: string;
  mobileNumber: string;
}

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
      {
        connectionId: connectionId,
      },
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
