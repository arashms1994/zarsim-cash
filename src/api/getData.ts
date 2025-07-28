import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./base";
import type { ICashListItem } from "@/utils/type";

declare const _spPageContextInfo: { webAbsoluteUrl: string };

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
  const rawLoginName = data.d.LoginName;

  return rawLoginName;
}

export async function getAllCashListItems(): Promise<ICashListItem[]> {
  const listTitle = "Cash_List";
  let items: ICashListItem[] = [];

  let nextUrl:
    | string
    | null = `${BASE_URL}/_api/web/lists/getbytitle('${listTitle}')/items?$top=100&$orderby=ID desc`;

  while (nextUrl) {
    const res: Response = await fetch(nextUrl, {
      method: "GET",
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
    const results = json?.d?.results;
    if (!results) throw new Error("ساختار داده‌ی برگشتی نامعتبر است");

    items = [...items, ...results];
    nextUrl = json.d.__next ?? null;
  }

  return items;
}

export function useUser() {
  return useQuery<any, Error>({
    queryKey: ["customer"],
    queryFn: () => getCurrentUser(),
  });
}

export function useCashListItems() {
  return useQuery<ICashListItem[], Error>({
    queryKey: ["cashListItems"],
    queryFn: () => getAllCashListItems(),
  });
}
