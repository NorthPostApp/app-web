import { getUserIdToken } from "@/apis/auth";
import { getPresignedMusicURL } from "@/apis/music";
import { useQuery } from "@tanstack/react-query";

export function useGetMusicURLQuery(filename: string | undefined) {
  const query = useQuery({
    queryKey: ["musicURL", filename],
    queryFn: async ({ signal }) => {
      if (filename && filename.length > 0) {
        const userIdToken = (await getUserIdToken()) || "";
        return getPresignedMusicURL(userIdToken, filename, signal);
      }
      return undefined;
    },
    enabled: false,
  });
  return query;
}
