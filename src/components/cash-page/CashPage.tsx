import { FormProvider, useForm } from "react-hook-form";
import CashForm from "../cash-form/CashForm";
import { CashHistoryTabs } from "../cash-tabs/CashHistoryTabs";
import Guid from "@/utils/createGUID";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/utils/validation";

const CashPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: Guid(),
      count: "",
      reference_number: "",
      due_date: "",
      isUpdating: false,
    },
  });
  return (
    <FormProvider {...form}>
      <div className="w-full flex justify-between gap-3 items-center">
        <CashForm />
        <CashHistoryTabs />
      </div>
    </FormProvider>
  );
};

export default CashPage;
