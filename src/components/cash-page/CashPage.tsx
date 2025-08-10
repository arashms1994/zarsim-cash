import { FormProvider, useForm } from "react-hook-form";
import CashForm from "../cash-form/CashForm";
import { CashHistoryTabs } from "../cash-tabs/CashHistoryTabs";
import Guid from "@/utils/createGUID";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/utils/validation";
import { useCashListItems } from "@/api/getData";
import { useSearchParams } from "react-router";

const CashPage = () => {
  const [searchParams] = useSearchParams();
  const userGuid = searchParams.get("guid");
  const itemGuid = Guid();

  const { data } = useCashListItems();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Title: itemGuid,
      customer_GUID: userGuid || "",
      count: "",
      reference_number: "",
      due_date: "",
      bank_account: "",
      isUpdating: false,
    },
  });

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500">هیچ آیتمی وجود ندارد.</div>
    );
  }

  return (
    <FormProvider {...form}>
      <div className="w-full flex justify-between gap-3 items-center">
        <CashForm userGuid={userGuid} />
        <CashHistoryTabs data={data} />
      </div>
    </FormProvider>
  );
};

export default CashPage;
