import { useMutation } from "@tanstack/react-query";
import signApis from "../../../../../../apis/signApis";

//로그인
export function useSignInMutation() {
  return useMutation((data: SignIn) => signApis.in(data));
}

//회원가입
export function useSignUpMutation() {
  return useMutation((data: SignUp) => signApis.up(data));
}
