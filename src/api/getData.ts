import { useQuery } from "@tanstack/react-query";
import type { ICashListItem, ICustomer } from "@/utils/type";
import { BASE_URL } from "./base";

export async function getAllCashListItems(
  userGuid: string
): Promise<ICashListItem[]> {
  const listTitle = "Cash_List";
  let items: ICashListItem[] = [];

  let nextUrl:
    | string
    | null = `${BASE_URL}/_api/web/lists/getbytitle('${listTitle}')/items?$top=100&$orderby=ID desc&$filter=customer_GUID eq '${userGuid}'`;

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

export async function getCustomer(userGuid: string): Promise<ICustomer> {
  const listTitle = "customer_info";
  const url = `${BASE_URL}/_api/web/lists/getbytitle('${listTitle}')/items?$filter=guid_form eq '${userGuid}'`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json;odata=verbose",
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error("خطا در گرفتن آیتم‌های customer_info: " + err);
  }

  const json: { d: { results: ICustomer[] } } = await res.json();

  const results = json.d?.results;
  if (!Array.isArray(results) || results.length === 0) {
    throw new Error("هیچ مشتری‌ای با این guid_form پیدا نشد");
  }

  return results[0];
}

export function useUser(userGuid: string) {
  return useQuery<ICustomer, Error>({
    queryKey: ["currentUser", userGuid],
    queryFn: () => getCustomer(userGuid),
    enabled: !!userGuid,
  });
}


export function useCashListItems(userGuid: string) {
  return useQuery<ICashListItem[], Error>({
    queryKey: ["cashListItems", userGuid],
    queryFn: () => getAllCashListItems(userGuid),
    staleTime: 2000,
    enabled: !!userGuid,
  });
}
