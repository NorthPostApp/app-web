import { getPresignedMusicURL } from "@/apis/music";
import { useQuery } from "@tanstack/react-query";

export function useGetMusicURLQuery(filename: string) {
  const query = useQuery({
    queryKey: ["musicURL", filename],
    queryFn: async ({ signal }) => {
      return getPresignedMusicURL("abc", filename, signal);
    },
  });
  return query;
}
