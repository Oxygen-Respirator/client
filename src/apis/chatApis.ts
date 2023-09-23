import { axiosInstance } from "./AxiosInstance";

const chatApis = {
  send: async (massge: string) => {
    const result = axiosInstance.post("chat", { massge });
    return result;
  },
};

export default chatApis;
