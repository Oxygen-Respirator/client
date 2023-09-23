import { axiosInstance } from "./AxiosInstance";

const authApis = {
  in: async (data: SignIn) => {
    const result = await axiosInstance.post("user/login", data);
    return result;
  },
  up: async (data: SignUp) => {
    const result = await axiosInstance.post("user/sign-up", data);
    return result;
  },
  getUserInfo: async () => {
    const result = await axiosInstance.get("user/info");
    return result;
  },
};

export default authApis;
