import z from "zod";

export const formSchema = z.object({
  Title: z.string(),
  count: z.string().min(1, "مبلغ را وارد کنید"),
  reference_number: z.string().min(1, "شماره مرجع را وارد کنید"),
  due_date: z.string().min(1, "تاریخ واریز الزامی است"),
  isUpdating: z.boolean(),
});
