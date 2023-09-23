import { axiosInstance } from "./AxiosInstance";

const rankApis = {
  get: async (_rangId: number) => {
    const result = await axiosInstance.get(`rank/${_rangId}`);
    return result;
  },
};

export default rankApis;
