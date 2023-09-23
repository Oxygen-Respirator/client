import { axiosInstance } from "./AxiosInstance";

const reportApis = {
  getHistory: async () => {
    const result = await axiosInstance.get("/history");
    return result.data.data;
  },
};

export default reportApis;
