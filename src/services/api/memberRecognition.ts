import { IAPIResponseTemplate } from "@/data-types/merchant";
import apiClient from "@/lib/apiClient";

interface IRegisterFaceData {
  name: string;
  mobileNumber: string;
  faceDescriptor: number[];
}

interface IRegisterFaceResponse extends IAPIResponseTemplate {}

export const registerFace = async (
  data: IRegisterFaceData
): Promise<IRegisterFaceResponse> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("usrAccToken")!);
    const response = await apiClient.post(
      "/v1/merchant/face-registration",
      data,
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Member berhasil didaftarkan",
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Register face failed");
  }
};

interface IAttendanceData {
  faceDescriptor: number[];
}

interface ICheckAttendance extends IAPIResponseTemplate {
  data: ICheckAttendanceAPIResponse;
}

interface ICheckAttendanceAPIResponse {
  id: string;
  merchantId: string;
  name: string;
  mobileNumber: number;
  dateCreated: Date | string;
  lastUpdated: string | null;
}

export const checkAttendance = async (
  data: IAttendanceData
): Promise<ICheckAttendance> => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("usrAccToken")!);
    const response = await apiClient.post<ICheckAttendanceAPIResponse>(
      "/v1/merchant/attendace",
      data,
      {
        headers: {
          Authorization: accessToken ? "Bearer " + accessToken.token : "",
        },
      }
    );
    return {
      success: true,
      message: "Member terdeteksi",
      data: response.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Register face failed");
  }
};
