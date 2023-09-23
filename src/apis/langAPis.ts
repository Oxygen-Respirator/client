import { axiosInstance } from "./AxiosInstance";

const langApis = {
  getList: async () => {
    const result = await axiosInstance.get("group");
    return result;
  },
};

export default langApis;
