import rankApis from "@/apis/rankApis";
import { useQuery } from "@tanstack/react-query";

export function useGetRankListQuery(_lagnId: number) {
  return useQuery([_lagnId, "rank"], () => rankApis.get(_lagnId), {
    enabled: !!_lagnId,
    select({ data }) {
      return data.data;
    },
  });
}
