import { getUserIdToken } from "@/apis/auth";
import { getMusicList } from "@/apis/music";
import { useQuery } from "@tanstack/react-query";

export function useGetMusicListQuery() {
  const query = useQuery({
    queryKey: ["musicList"],
    queryFn: async ({ signal }) => {
      const userIdToken = (await getUserIdToken()) || "";
      return getMusicList(userIdToken, signal);
    },
    enabled: false,
  });
  return query;
}
