import { useMutation } from "@tanstack/react-query";
import signApis from "../../../apis/signApis";

export function useSignInMutation() {
  return useMutation((data: SignIn) => signApis.in(data));
}
