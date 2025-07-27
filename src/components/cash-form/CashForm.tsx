import FileUploader from "../file-uploader/FileUploader";

const CashForm = () => {
  return (
    <div className="flex justify-center items-center py-6">
      <form className="w-[350px] space-y-4">
        <div className="flex justify-between items-center w-full">
          <label htmlFor="count" className="text-sm font-medium text-gray-800">
            مبلغ واریز (ریال):
          </label>
          <input
            type="text"
            id="count"
            className="border border-gray-300 rounded px-3 py-2 w-[200px] focus:outline-none focus:ring-2 focus:ring-[#0d8957]"
          />
        </div>

        <div className="flex justify-between items-center w-full">
          <label htmlFor="due_date" className="text-sm font-medium text-gray-800">
            تاریخ واریز:
          </label>
          <input
            type="text"
            id="due_date"
            className="border border-gray-300 rounded px-3 py-2 w-[200px] focus:outline-none focus:ring-2 focus:ring-[#0d8957]"
          />
        </div>

        <div className="flex justify-between items-center w-full">
          <label htmlFor="reference_number" className="text-sm font-medium text-gray-800">
            شماره مرجع:
          </label>
          <input
            type="text"
            id="reference_number"
            className="border border-gray-300 rounded px-3 py-2 w-[200px] focus:outline-none focus:ring-2 focus:ring-[#0d8957]"
          />
        </div>

        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-medium text-gray-800">
            آپلود رسید واریز:
          </span>
          <FileUploader orderNumber="52555" subFolder="55555" />
        </div>

        <div className="flex justify-center">
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
