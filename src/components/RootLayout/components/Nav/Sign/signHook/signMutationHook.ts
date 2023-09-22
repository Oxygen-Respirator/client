import { UseMutationResult, useMutation } from "@tanstack/react-query";
import signApis from "../../../../../../apis/signApis";
import {  AxiosError, AxiosResponse } from "axios";

//로그인
export function useSignInMutation(){
  return useMutation<AxiosResponse, AxiosError, SignIn>((data: SignIn) => signApis.in(data)) ;
}

//회원가입
export function useSignUpMutation() {
  return useMutation((data: SignUp) => signApis.up(data));
}
