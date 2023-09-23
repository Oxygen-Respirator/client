import { axiosInstance } from "./AxiosInstance";

const rankApis = {
  get: async (groupId: number) => {
    const result = await axiosInstance.get("rank", {
      params: { "group-id": groupId },
    });
    return result;
  },
};

export default rankApis;
