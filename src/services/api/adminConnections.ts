import {
  IAPIResponseTemplate,
  IGetAdminConnectionsAPIResponse,
} from "@/data-types/merchant";
import apiClient from "@/lib/apiClient";

interface IGetAdminConnections extends IAPIResponseTemplate {
  data: IGetAdminConnectionsAPIResponse;
}

export const getAdminConnections = async (query: {
  page?: string;
  limit?: number;
  order?: string;
  sort?: string;
  search?: string;
}): Promise<IGetAdminConnections> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.get<IGetAdminConnectionsAPIResponse>(
      "/v1/admin/bolo-numbers",
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
      message: "Succesfully retreiving admin connections",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to retreive admin connections"
    );
  }
};

interface ICreateNewBoloNumber extends IAPIResponseTemplate {}

export const createNewBoloNumber = async (
  mobileNumber: string
): Promise<ICreateNewBoloNumber> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
    const response = await apiClient.post(
      "/v1/admin/create-connection",
      {
        mobileNumber,
      },
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Succesfully creating new number",
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create new number"
    );
  }
};
