import { BASE_URL, type ServiceError } from "@/apis/shared";
import { MusicList, MusicURL } from "@/schemas/music";

async function getMusicList(idToken: string, signal: AbortSignal) {
  const url = new URL("music/list", BASE_URL);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    signal,
  });
  if (!response.ok) {
    const errorData = (await response.json()) as ServiceError;
    const errorMessage =
      errorData.error || `failed to get music list: ${response.status}`;
    throw new Error(errorMessage);
  }
  return MusicList.parse((await response.json()).data);
}

async function getPresignedMusicURL(
  idToken: string,
  filename: string,
  signal: AbortSignal,
) {
  const url = new URL(`music/${filename}`, BASE_URL);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    signal,
  });
  if (!response.ok) {
    const errorData = (await response.json()) as ServiceError;
    const errorMessage = errorData.error || `failed to get music url: ${response.status}`;
    throw new Error(errorMessage);
  }
  return MusicURL.parse((await response.json()).data);
}

export { getMusicList, getPresignedMusicURL };
