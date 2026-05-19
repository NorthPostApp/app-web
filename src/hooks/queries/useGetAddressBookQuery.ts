import { getAddressBook } from "@/apis/address-book";
import { getUserIdToken } from "@/apis/auth";
import { appConfigAtom } from "@/atoms/appConfigAtom";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

export function useGetAddressBookQuery() {
  const { language } = useAtomValue(appConfigAtom);
  const query = useQuery({
    queryKey: ["address-book", "saved", language],
    queryFn: async ({ signal }) => {
      const userIdToken = (await getUserIdToken()) || "";
      return getAddressBook(userIdToken, language, signal);
    },
    staleTime: 5 * 60 * 1000,
  });
  return query;
}
