import { SUPPORTED_LANGUAGES, type Language } from "@/consts/app-config";
import { BASE_URL, type ServiceError } from "./shared";
import { AddressItem, AddressTagRecords } from "@/schemas/addresses";
import z from "zod";

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

// Search adddresses in database
type GetAddressesRequest = {
  language: Language;
  keywords: string;
  tags: string[];
  pageSize: number;
  page: number;
};

const GetAddressesResponseObject = z.object({
  addresses: z.array(AddressItem),
  totalCount: z.number(),
  totalPages: z.number(),
  page: z.number(),
  language: z.enum(SUPPORTED_LANGUAGES),
});

type GetAddressesResponse = z.infer<typeof GetAddressesResponseObject>;

const getAddresses = async (
  requestBody: GetAddressesRequest,
  idToken: string,
  signal?: AbortSignal,
) => {
  const url = new URL(`address`, BASE_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    signal,
  });
  if (!response.ok) {
    const errorData = (await response.json()) as ServiceError;
    const errorMessage = errorData.error || `failed to get addresses ${response.status}`;
    throw new Error(errorMessage);
  }
  return GetAddressesResponseObject.parse((await response.json()).data);
};

export { getAllTags, getAddresses, GetAddressesResponseObject };
export type { GetAddressesRequest, GetAddressesResponse };
