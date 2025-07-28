import { getDigest } from "@/utils/getDigest";
import { BASE_URL } from "./base";

export async function addCashReceipt(GUID: string, state: any): Promise<void> {
  const listName = "Cash_List";
  const itemType = "SP.Data.Cash_ListListItem";
  const digest = await getDigest();

  const response = await fetch(
    `${BASE_URL}/_api/web/lists/getbytitle('${listName}')/items`,
    {
      method: "POST",
      headers: {
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "X-RequestDigest": digest,
      },
      body: JSON.stringify({
        __metadata: { type: itemType },
        Title: String(GUID),
        LC_Number: String(state.LCNumber),
        Total_Price: String(state.LCTotalPrice),
        Settlement_Period: String(state.LCSettlementDate),
        Origin_Openning_Date: String(state.LCOriginOpenningDate),
        Opening_Date: String(state.LCOpenningDate),
        Communication_Date: String(state.LCCommunicationDate),
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error("خطا در ثبت آیتم: " + error);
  }

  const data = await response.json();
  console.log("آیتم با موفقیت ثبت شد:", data);
}
