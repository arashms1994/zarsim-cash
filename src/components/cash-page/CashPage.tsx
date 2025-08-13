import { useState } from "react";
import CashForm from "../cash-form/CashForm";
import { CashHistoryTabs } from "../cash-tabs/CashHistoryTabs";
import Guid from "@/utils/createGUID";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/utils/validation";
import { useCashListItems, useUser } from "@/api/getData";
import { useSearchParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";

const CashPage = () => {
  const [searchParams] = useSearchParams();
  const userGuid = searchParams.get("guid");
  const [itemGuid, setItemGuid] = useState(Guid());
  const user = useUser(userGuid || "");
  const userTitle = user.data?.Title;

  const { data } = useCashListItems(userGuid || "");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Title: itemGuid,
      customer_GUID: userGuid || "",
      customer_title: userTitle || "",
      count: "",
      reference_number: "",
      due_date: "",
      bank_account: "",
      isUpdating: false,
    },
  });

  const handleSuccessfulSubmit = () => {
    setItemGuid(Guid());
    form.reset({
      Title: itemGuid,
      customer_GUID: userGuid || "",
      count: "",
      reference_number: "",
      due_date: "",
      bank_account: "",
      customer_title: "",
      isUpdating: false,
    });
  };

  return (
    <FormProvider {...form}>
      <div className="max-w-[1300px] flex justify-between gap-3 items-start">
        <CashForm
          userTitle={userTitle ?? null}
          userGuid={userGuid}
          onSuccessfulSubmit={handleSuccessfulSubmit}
          itemGuid={itemGuid}
        />
        <CashHistoryTabs data={data} />
      </div>
    </FormProvider>
  );
};

export default CashPage;
