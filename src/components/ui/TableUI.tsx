import { useCashListItems } from "@/api/getData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useFormContext } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { DialogClose } from "@radix-ui/react-dialog";
import { deleteCashReceipt } from "@/api/addData";
// import { deleteCashReceipt } from "@/api/addData";

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ];

export function TableUI() {
  const form = useFormContext();

  const { data } = useCashListItems();

  console.log("getAllCashListItems", data);
  return (
    <Dialog>
      <Table className="bg-slate-50" dir="rtl">
        <TableCaption>لیست واریزی های شما</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">تاریخ</TableHead>
            <TableHead className="text-right">مبلغ</TableHead>
            <TableHead className="text-right">شماره مرجع</TableHead>
            <TableHead className="text-right">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((invoice) => (
            <TableRow key={invoice.Title}>
              <TableCell className="text-right">{invoice.due_date}</TableCell>
              <TableCell className="text-right">{invoice.count}</TableCell>
              <TableCell className="text-right">
                {invoice.reference_number}
              </TableCell>
              <TableCell className="text-right flex gap-2">
                <button
                  className="hover:text-blue-400 border-0 hover:bg-transparent "
                  onClick={(e) => {
                    e.preventDefault();
                    form.reset();
                    setTimeout(() => {
                      form.setValue("Title", invoice.Title);
                      form.setValue("count", invoice.count);
                      form.setValue(
                        "reference_number",
                        invoice.reference_number
                      );
                      form.setValue("due_date", invoice.due_date);
                      form.setValue("ID", invoice.ID);
                      form.setValue("isUpdating", true);
                    }, 10);
                  }}
                >
                  ویرایش
                </button>

                <DialogTrigger asChild>
                  <button className="hover:text-red-400 border-0 hover:bg-transparent ">
                    حذف
                  </button>
                </DialogTrigger>
              </TableCell>
              <DialogContent className="sm:max-w-md rounded-xl p-6 text-right">
                <DialogHeader className="space-y-4">
                  <DialogTitle className="text-lg font-bold text-right p-3">
                    آیا از انجام عملیات حذف اطمینان دارید؟
                  </DialogTitle>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="destructive"
                      className="min-w-[80px]"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteCashReceipt(invoice.ID);
                      }}
                    >
                      بله
                    </Button>

                    <DialogClose asChild>
                      <Button variant="secondary" className="min-w-[80px]">
                        خیر
                      </Button>
                    </DialogClose>
                  </div>
                </DialogHeader>
              </DialogContent>
            </TableRow>
          ))}
        </TableBody>

        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={2} className="text-right">
            جمع کل
          </TableCell>
          <TableCell colSpan={2} className="text-right">
            $2,500.00
          </TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>{" "}
    </Dialog>
  );
}
