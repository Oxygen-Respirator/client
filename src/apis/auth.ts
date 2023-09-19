import { axiosInstance } from "./AxiosInstance";

export const signIn = async (data: { userId: string; userPw: string }) => {
  const response = await axiosInstance.post(`/api/user/login`, data);
  const token = response?.headers?.authorization;
  return token;
};

export const signUp = async (data: {
  userId: string;
  userPw: string;
  userNickname: string;
}) => {
  const response = await axiosInstance.post(`/api/user/sign-up`, data);
  return response.data.data;
};
