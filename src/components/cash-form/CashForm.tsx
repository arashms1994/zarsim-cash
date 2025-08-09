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
import { toast } from "sonner";
import { useUser } from "@/api/getData";
import { addCashReceipt, updateCashReceipt } from "@/api/addData";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const CashForm = () => {
  const { handleSubmit, control, watch, reset } = useFormContext();
  const feild = watch();
  const queryClient = useQueryClient();
  console.log("watch", feild);

  const [animate, setAnimate] = useState(false);

  const onSubmit = async (data: any) => {
    toast("واریز ثبت شد", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-black text-white p-4 text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      ),
    });
    const sendData: {
      Title: string;
      count: string;
      reference_number: string;
      due_date: string;
      status: string;
    } = {
      Title: data.Title,
      count: data.count,
      reference_number: data.reference_number,
      due_date: data.due_date,
      status: "0",
    };
    try {
      if (feild.isUpdating) {
        const res = await updateCashReceipt(sendData, feild.ID);
        console.log("reeee", res);
      } else {
        await addCashReceipt(sendData);
      }

      queryClient.invalidateQueries({ queryKey: ["cashListItems"] });
      reset();
    } catch (error) {
      console.log(error);
    }
    // console.log("send Data", sendData);
  };

  const user = useUser();
  console.log(user);
  useEffect(() => {
    if (feild.isUpdating) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 2000);
    }
  }, [feild.isUpdating]);
  return (
    <div
      className={`flex flex-col justify-center items-center gap-3 ${
        animate ? "animate-[myAnim_1s_ease_0s_1_normal_forwards]" : ""
      } `}
    >
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
    </div>
  );
};

export default CashForm;
