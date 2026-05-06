import { getAllTags } from "@/apis/address";
import { getUserIdToken } from "@/apis/auth";
import type { Language } from "@/consts/app-config";
import { useQuery } from "@tanstack/react-query";

export function useGetAllTagsQuery(language: Language) {
  const query = useQuery({
    queryKey: ["addressTags", language],
    queryFn: async ({ signal }) => {
      const userIdToken = (await getUserIdToken()) || "";
      return getAllTags(language, userIdToken, signal);
    },
    staleTime: Infinity,
  });
  return query;
}
