import apiClient from "@/lib/apiClient";

const dummyData = [
  {
    id: "id-1",
    name: "User 1",
    mobileNo: "+15997419434",
  },
  {
    id: "id-2",
    name: "User 2",
    mobileNo: "+18136005339",
  },
  {
    id: "id-3",
    name: "User 3",
    mobileNo: "+18639991392",
  },
  {
    id: "id-4",
    name: "User 4",
    mobileNo: "+14853125007",
  },
  {
    id: "id-5",
    name: "User 5",
    mobileNo: "+14782955281",
  },
  {
    id: "id-6",
    name: "User 6",
    mobileNo: "+13443208024",
  },
  {
    id: "id-7",
    name: "User 7",
    mobileNo: "+11215555587",
  },
  {
    id: "id-8",
    name: "User 8",
    mobileNo: "+17908907885",
  },
];

interface IHistory {
  id: string;
  name: string;
  mobileNo: string;
}

export const getRecognitionHistory = async (): Promise<IHistory[]> => {
  try {
    // const response = await apiClient.get<IHistory[]>(
    //   "/recognition/history",
    //   {
    //     headers: {
    //       credentials: "include",
    //     },
    //   }
    // );
    return dummyData;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to get user data");
  }
};
