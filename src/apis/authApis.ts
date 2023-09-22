import instance from "./instance";

const authApis = {
  in: async (data: SignIn) => {
    const result = await instance.post("user/login", data);
    return result;
  },
  up: async (data: SignUp) => {
    const result = await instance.post("user/sign-up", data);
    return result;
  },
  getUserInfo: async () => {
    const result = await instance.get("user/info");
    return result;
  },
};

export default authApis;
