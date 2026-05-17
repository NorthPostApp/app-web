import { type Language } from "@/consts/app-config";
import { BASE_URL, type ServiceError } from "./shared";

type UpdateAction = "add" | "remove";

type UpdateAddressBookRequest = {
  language: Language;
  addressIDs: string[];
  action: UpdateAction;
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
      errorData.error || `failed to update address book ${response.status}`;
    throw new Error(errorMessage);
  }
  return (await response.json()).data as string;
};

export { updateAddressBook };
export type { UpdateAction, UpdateAddressBookRequest };
