import { useQuery } from "@tanstack/react-query";
import type { ICashListItem } from "@/utils/type";
import { BASE_URL } from "./base";

declare const _spPageContextInfo: {
  webAbsoluteUrl: string;
};

/**
 * Get current logged-in SharePoint user
 */
export async function getCurrentUser(): Promise<string> {
  const response = await fetch(
    `${_spPageContextInfo.webAbsoluteUrl}/_api/web/currentuser`,
    {
      headers: { Accept: "application/json;odata=verbose" },
      credentials: "same-origin",
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.d.LoginName;
}

/**
 * Fetch all items from Cash_List (paginated)
 */
export async function getAllCashListItems(): Promise<ICashListItem[]> {
  const listTitle = "Cash_List";
  let items: ICashListItem[] = [];

  let nextUrl:
    | string
    | null = `${BASE_URL}/_api/web/lists/getbytitle('${listTitle}')/items?$top=100&$orderby=ID desc`;

  while (nextUrl) {
    const res = await fetch(nextUrl, {
      headers: {
        Accept: "application/json;odata=verbose",
      },
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error("خطا در گرفتن آیتم‌های Cash_List: " + err);
    }

    const json: { d: { results: ICashListItem[]; __next?: string } } =
      await res.json();

    const results = json.d?.results;
    if (!Array.isArray(results)) {
      throw new Error("ساختار داده‌ی برگشتی نامعتبر است");
    }

    items = [...items, ...results];
    nextUrl = json.d.__next ?? null;
  }

  return items;
}

/**
 * React Query hook to get current SharePoint user
 */
export function useUser() {
  return useQuery<string, Error>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
}

/**
 * React Query hook to get all Cash List items
 */
export function useCashListItems() {
  return useQuery<ICashListItem[], Error>({
    queryKey: ["cashListItems"],
    queryFn: getAllCashListItems,
    staleTime: 1000 * 60 * 5, // Optional: 5 minutes cache
  });
}
