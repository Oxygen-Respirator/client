import { useMutation } from "@tanstack/react-query";
import authApis from "@/apis/authApis";

//로그인
export function useSignInMutation() {
  return useMutation((data: SignIn) => authApis.in(data));
}

//회원가입
export function useSignUpMutation() {
  return useMutation((data: SignUp) => authApis.up(data));
}

//회원 확인
export function useGetUserInfoMutation() {
  return useMutation(() => authApis.getUserInfo());
}
