import { useRef } from "react";
import { toast } from "sonner";
import { useAtomValue } from "jotai";
import { useMutation } from "@tanstack/react-query";
import { getUserIdToken } from "@/apis/auth";
import {
  updateAddressBook,
  type UpdateAction,
  type UpdateAddressBookRequest,
} from "@/apis/address-book";
import { appConfigAtom } from "@/atoms/appConfigAtom";

export function useUpdateAddressBookMutation(updateFn?: (ids: string[]) => void) {
  const abortControllerRef = useRef<AbortController>(null);
  const idsRef = useRef<string[]>(null);
  const { language } = useAtomValue(appConfigAtom);
  const mutation = useMutation({
    mutationFn: async ({
      ids,
      action,
    }: {
      ids: string | string[];
      action: UpdateAction;
    }) => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
      const idToken = (await getUserIdToken()) || "";
      const addressIDs = typeof ids === "string" ? [ids] : ids;
      idsRef.current = addressIDs;
      const request: UpdateAddressBookRequest = {
        language,
        addressIDs,
        action,
      };
      return updateAddressBook(request, idToken, abortControllerRef.current.signal);
    },
    onSuccess: () => {
      if (idsRef.current) {
        if (updateFn) updateFn(idsRef.current);
        toast.success("successfully added address"); // i18n
      }
    },
    onError: (error) => {
      if (error.name === "AbortError" || error.name === "CanceledError") return;
      toast.error(error.message);
    },
  });
  return mutation;
}
