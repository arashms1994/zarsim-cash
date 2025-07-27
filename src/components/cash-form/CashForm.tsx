import { useState } from "react";
import FileUploader from "../file-uploader/FileUploader";
import PersianDatePicker from "../persian-date-picker/PersianDatePicker";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CashForm = () => {
  const [dueDate, setDueDate] = useState<string>("");

  return (
    <div className="flex justify-center items-center gap-3 py-6">
      <form className="w-[350px] space-y-4">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="count">مبلغ واریز (ریال):</Label>
          <Input type="text" id="count" placeholder="مبلغ" />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="due_date">تاریخ واریز:</Label>
          <PersianDatePicker value={dueDate} onChange={setDueDate} />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="reference_number">شماره مرجع:</Label>
          <span>سلام سلاااااااااااااااااااااااااااااااااااااااااااااااااااااام همپی سلااااااااااااام</span>
          <Input type="text" id="reference_number" placeholder="شماره مرجع" />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label>آپلود رسید واریز:</Label>
          <FileUploader orderNumber="52555" subFolder="55555" />
        </div>

        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="bg-[#0d8957] hover:bg-[#0b734a] text-white font-semibold px-6 py-2 rounded"
          >
            ثبت واریز
          </button>
        </div>
      </form>
    </div>
  );
};

export default CashForm;
