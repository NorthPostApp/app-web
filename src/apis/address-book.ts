import { type Language } from "@/consts/app-config";
import { BASE_URL, type ServiceError } from "./shared";
import z from "zod";
import { AddressItemSchema } from "@/schemas/addresses";

type UpdateAction = "add" | "remove";

type UpdateAddressBookRequest = {
  language: Language;
  addressIDs: string[];
  action: UpdateAction;
};

const GetAddressBookResponse = z.array(AddressItemSchema);

// get address book based on current language
const getAddressBook = async (
  idToken: string,
  language: Language,
  signal?: AbortSignal,
) => {
  const url = new URL("address-book", BASE_URL);
  url.searchParams.set("language", language);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    signal,
  });
  if (!response.ok) {
    const errorData = (await response.json()) as ServiceError;
    const errorMessage =
      errorData.error || `failed to get address book. Status: ${response.status}`;
    throw new Error(errorMessage);
  }
  const responseData = (await response.json()).data;
  return GetAddressBookResponse.parse(responseData);
};

// The response is just a updated time string, no need to return
const updateAddressBook = async (
  request: UpdateAddressBookRequest,
  idToken: string,
  signal?: AbortSignal,
) => {
  const url = new URL("address-book", BASE_URL);
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
    signal,
  });
  if (!response.ok) {
    const errorData = (await response.json()) as ServiceError;
    const errorMessage =
      errorData.error || `failed to update address book. Status: ${response.status}`;
    throw new Error(errorMessage);
  }
  return (await response.json()).data as string;
};

export { updateAddressBook, getAddressBook };
export type { UpdateAction, UpdateAddressBookRequest };
