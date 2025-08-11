import { useFormContext } from "react-hook-form";
import FileUploader from "../file-uploader/FileUploader";
import PersianDatePicker from "../persian-date-picker/PersianDatePicker";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addCashReceipt } from "@/api/addData";
import { useQueryClient } from "@tanstack/react-query";
import { BANK_ACCOUNTS } from "@/utils/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { ICashFormProps } from "@/utils/type";
import type { FormSchema } from "@/utils/validation";
import { Bounce, toast } from "react-toastify";
import { useRef } from "react";

const CashForm = ({
  userGuid,
  onSuccessfulSubmit,
  itemGuid,
}: ICashFormProps) => {
  const uploaderRef = useRef<{
    uploadFile: () => Promise<void>;
    getFile: () => File | null;
    clearFile: () => void;
  }>(null);

  const { handleSubmit, control, watch, reset } = useFormContext<FormSchema>();
  const feild = watch();
  const queryClient = useQueryClient();

  const onSubmit = async (data: FormSchema) => {
    const sendData: {
      Title: string;
      count: string;
      reference_number: string;
      due_date: string;
      bank_account: string;
      status: string;
      customer_GUID: string;
    } = {
      Title: data.Title,
      count: data.count,
      reference_number: data.reference_number,
      due_date: data.due_date,
      bank_account: data.bank_account,
      status: "0",
      customer_GUID: userGuid || "",
    };

    try {
      if (uploaderRef.current) {
        await uploaderRef.current.uploadFile();
      }

      await addCashReceipt(sendData);
      queryClient.invalidateQueries({ queryKey: ["cashListItems"] });
      onSuccessfulSubmit();
      toast.success("آیتم با موفقیت ثبت شد.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      if (uploaderRef.current) {
        uploaderRef.current.clearFile();
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در اضافه کردن آیتم یا آپلود فایل!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[450px] space-y-4 rounded-xl inset-shadow-xs p-6 bg-slate-50"
      >
        <div className="flex items-center">
          {feild.isUpdating && (
            <span
              className="text-sm text-start text-black min-w-max hover:text-blue-400 cursor-pointer"
              onClick={() => {
                reset();
              }}
            >
              فرم ثبت
            </span>
          )}
          <span className="text-2xl text-center text-black w-full">
            فرم {feild.isUpdating ? "ویرایش" : "ثبت"} واریز نقدی
          </span>
        </div>

        <FormField
          control={control}
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
          control={control}
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
          control={control}
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

        <FormField
          control={control}
          name="bank_account"
          render={({ field }) => (
            <FormItem
              className="flex justify-between items-center w-full"
              dir="rtl"
            >
              <FormLabel>شماره حساب:</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[230px]">
                    <SelectValue placeholder="انتخاب شماره حساب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>شماره‌های حساب</SelectLabel>
                      {BANK_ACCOUNTS.map(({ value, id }) => (
                        <SelectItem key={id} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center w-full">
          <FormLabel>آپلود رسید واریز:</FormLabel>
          <FileUploader
            ref={uploaderRef}
            orderNumber={userGuid}
            subFolder={itemGuid}
          />
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
    </div>
  );
};

export default CashForm;
