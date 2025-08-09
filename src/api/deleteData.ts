import { getDigest } from "@/utils/getDigest";
import { BASE_URL } from "./base";

export async function deleteCashReceipt(ID: number): Promise<void> {
  try {
    const digest = await getDigest();
    if (!digest) {
      throw new Error("دریافت Request Digest با خطا مواجه شد");
    }

    const listName = "Cash_List";
    const res = await fetch(
      `${BASE_URL}/_api/web/lists/getbytitle('${listName}')/items(${ID})`,
      {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "X-RequestDigest": digest,
          "X-HTTP-Method": "DELETE",
          "IF-MATCH": "*",
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`حذف با خطا مواجه شد: ${res.status} - ${errorText}`);
    }
  } catch (error) {
    throw new Error(
      `خطا در حذف آیتم: ${
        error instanceof Error ? error.message : "خطای ناشناخته"
      }`
    );
  }
}
