import { getMusicList } from "@/apis/music";
import { useQuery } from "@tanstack/react-query";

export function useGetMusicListQuery() {
  const query = useQuery({
    queryKey: ["musicList"],
    queryFn: async ({ signal }) => {
      return getMusicList("abc", signal);
    },
  });
  return query;
}
