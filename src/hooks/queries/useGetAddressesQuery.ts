import { getAddresses, type GetAddressesRequest } from "@/apis/address";
import { getUserIdToken } from "@/apis/auth";
import {
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
} from "@/components/address-book/search/consts";
import type { Language } from "@/consts/app-config";
import { useQuery } from "@tanstack/react-query";

const validateKeywords = (keywords: string | undefined) => {
  return keywords ? keywords : "";
};
const validateTags = (tags: string[] | undefined) => {
  return tags ? [...tags].sort() : [];
};
const validatePageSize = (pageSize: number | undefined) => {
  if (!pageSize) return DEFAULT_PAGE_SIZE;
  return Math.max(DEFAULT_PAGE_SIZE, Math.min(pageSize, MAX_PAGE_SIZE));
};
const validatePage = (page: number) => {
  return Math.max(page, 1);
};

export function useGetAddressesQuery(
  language: Language,
  page: number,
  keywords?: string,
  tags?: string[],
  pageSize?: number,
) {
  const requestPage = validatePage(page);
  const requestKeywords = validateKeywords(keywords);
  const requestTags = validateTags(tags);
  const requestPageSize = validatePageSize(pageSize);

  const query = useQuery({
    queryKey: [
      "searchAddresses",
      language,
      requestPage,
      requestPageSize,
      requestKeywords,
      ...requestTags,
    ],
    queryFn: async ({ signal }) => {
      const userIdToken = (await getUserIdToken()) || "";
      const requestBody: GetAddressesRequest = {
        language,
        keywords: requestKeywords,
        tags: requestTags,
        pageSize: requestPageSize,
        page: requestPage,
      };
      return getAddresses(requestBody, userIdToken, signal);
    },
    enabled: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return query;
}
