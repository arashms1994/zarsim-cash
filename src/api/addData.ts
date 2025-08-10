import { getDigest } from "@/utils/getDigest";
import { toast } from "sonner";
import { BASE_URL } from "./base";

export async function addCashReceipt(data: {
  Title: string;
  count: string;
  reference_number: string;
  due_date: string;
  status: string;
}) {
  const listName = "Cash_List";
  const itemType = "SP.Data.Cash_x005f_ListListItem";

  try {
    const digest = await getDigest();

    await fetch(`${BASE_URL}/_api/web/lists/getbytitle('${listName}')/items`, {
      method: "POST",
      headers: {
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "X-RequestDigest": digest,
      },
      body: JSON.stringify({
        __metadata: { type: itemType },
        ...data,
      }),
    });

    toast.success("اطلاعات با موفقیت ذخیره شد.");
  } catch (err) {
    if (err instanceof Error) {
      toast.error(`خطا: ${err.message}`);
      console.error("خطا:", err.message);
    } else {
      toast.error("خطای ناشناس رخ داد");
      console.error("خطای ناشناس:", err);
    }
  }
}

export async function updateCashReceipt(
  data: {
    Title: string;
    count: string;
    reference_number: string;
    due_date: string;
    status: string;
  },
  ID: number
) {
  const listName = "Cash_List";
  const itemType = "SP.Data.Cash_x005f_ListListItem";

  try {
    const digest = await getDigest();

    await fetch(
      `${BASE_URL}/_api/web/lists/getbytitle('${listName}')/items(${ID})`,
      {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          "X-RequestDigest": digest,
          "X-HTTP-Method": "MERGE",
          "IF-MATCH": "*",
        },
        body: JSON.stringify({
          __metadata: { type: itemType },
          ...data,
        }),
      }
    );

    toast.success("اطلاعات با موفقیت ذخیره شد.");
  } catch (err) {
    if (err instanceof Error) {
      toast.error(`خطا: ${err.message}`);
      console.error("خطا:", err.message);
    } else {
      toast.error("خطای ناشناس رخ داد");
      console.error("خطای ناشناس:", err);
    }
  }
}
