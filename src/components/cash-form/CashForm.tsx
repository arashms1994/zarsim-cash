import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUploader from "../file-uploader/FileUploader";
import PersianDatePicker from "../persian-date-picker/PersianDatePicker";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { formSchema } from "@/utils/validation";
import { useUser } from "@/api/getData";

const CashForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      count: "",
      reference_number: "",
      due_date: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast("واریز ثبت شد", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-black text-white p-4 text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      ),
    });
  };

  const user = useUser();
  console.log(user);

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[450px] space-y-4 rounded-xl inset-shadow-xs p-6 bg-slate-50"
        >
          <span className="text-2xl text-center text-black">
            فرم ثبت واریز نقدی
          </span>
          <FormField
            control={form.control}
            name="count"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center w-full">
                <FormLabel>مبلغ واریز (ریال):</FormLabel>
                <FormControl style={{ width: "230px" }}>
                  <Input placeholder="مبلغ" {...field} width={230} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="due_date"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center w-full">
                <FormLabel>تاریخ واریز:</FormLabel>
                <FormControl>
                  <PersianDatePicker
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reference_number"
            render={({ field }) => (
              <FormItem className="flex justify-between items-center w-full">
                <FormLabel>شماره مرجع:</FormLabel>
                <FormControl style={{ width: "230px" }}>
                  <Input placeholder="شماره مرجع" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center w-full">
            <FormLabel>آپلود رسید واریز:</FormLabel>
            <FileUploader orderNumber="52555" subFolder="55555" />
          </div>

          <div className="flex justify-center pt-2 w-full">
            <Button
              type="submit"
              className="bg-green-600 w-40 hover:bg-green-800 text-white transition-all duration-300"
            >
              ثبت فیش واریز
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CashForm;
