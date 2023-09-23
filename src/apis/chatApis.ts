import { axiosInstance } from "./AxiosInstance";

const chatApis = {
  get: async (groupId: number) => {
    const result = await axiosInstance.get(`message/${groupId}`);
    return result.data.data;
  },
  post: async (groupId: number, data: { message: string }) => {
    const result = await axiosInstance.post(`message/${groupId}`, data);
    return result.data.data;
  },
};

export default chatApis;
