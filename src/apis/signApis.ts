import instance from "./instance";

const signApis = {
  in: async (data: SignIn) => {
    try{
      const result = await instance.post("user/login", data);
      return result;
    }catch(error){
      return error
    }
  },
  up: async (data: SignUp) => {
    try{

      const result = await instance.post("user/sign-up", data);
      return result;
    }catch(error){
      return error
    }
  },
};

export default signApis;
