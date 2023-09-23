import { useMutation } from "@tanstack/react-query";
import langApis from "@/apis/langAPis";

export function useGetLangListMutation() {
  return useMutation(() => langApis.getList());
}
