import z from "zod";

export const FormSchema = z.object({
  Title: z.string(),
  count: z.string().min(1, "مبلغ را وارد کنید."),
  reference_number: z.string().min(1, "شماره مرجع را وارد کنید."),
  due_date: z.string().min(1, "تاریخ واریز الزامی است."),
  bank_account: z.string().min(1, "شماره حساب الزامی است."),
  customer_GUID: z.string(),
  isUpdating: z.boolean(),
});

export type FormSchema = z.infer<typeof FormSchema>;
