import type { Language } from "@/consts/app-config";
import { BASE_URL, type ServiceError } from "./shared";
import { AddressTagRecords } from "@/schemas/addresses";

const getAllTags = async (language: Language, idToken: string, signal?: AbortSignal) => {
  const url = new URL(`address/tags?language=${language}`, BASE_URL);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    signal,
  });
  if (!response.ok) {
    const errorData = (await response.json()) as ServiceError;
    const errorMessage = errorData.error || `failed to get all tags: ${response.status}`;
    throw new Error(errorMessage);
  }
  return AddressTagRecords.parse((await response.json()).data);
};

export { getAllTags };
