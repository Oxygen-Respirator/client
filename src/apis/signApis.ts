import instance from "./instance";

const signApis = {
  in: async (data: SignIn) => {
    const result = await instance.post("user/login", data);
    return result;
  },
};

export default signApis;
