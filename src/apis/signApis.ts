import instance from "./instance";

const signApis = {
  in: async (data: SignIn) => {
    const result = await instance.post("user/login", data);
    return result;
  },
  up: async (data: SignUp) => {
    const result = await instance.post("user/sign-up", data);
    return result;
  },
};

export default signApis;
