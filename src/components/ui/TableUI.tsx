import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { Trash2 } from "lucide-react";
import type { ITableUIProps } from "@/utils/type";
import { deleteCashReceipt } from "@/api/deleteData";
// import { useToast } from "@/components/ui/use-toast";

export function TableUI({ data }: ITableUIProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteCashReceipt(id);
      // toast({
      //   title: "موفقیت",
      //   description: "آیتم با موفقیت حذف شد.",
      // });
    } catch (error) {
      console.error(error);
      // toast({
      //   title: "خطا",
      //   description: error instanceof Error ? error.message : "خطا در حذف آیتم",
      //   variant: "destructive",
      // });
    }
  };

  return (
    <Dialog>
      <Table className="bg-slate-50" dir="rtl">
        <TableCaption>لیست واریزی‌های شما</TableCaption>
        <TableHeader>
          <TableRow className="font-semibold bg-slate-200 text-xl text-slate-800">
            <TableHead className="text-right">تاریخ</TableHead>
            <TableHead className="text-right">مبلغ</TableHead>
            <TableHead className="text-right">شماره مرجع</TableHead>
            <TableHead className="text-right">شماره حساب</TableHead>
            <TableHead className="text-right">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.Title} className="font-medium text-base">
              <TableCell className="text-right">{item.due_date}</TableCell>
              <TableCell className="text-right">{item.count}</TableCell>
              <TableCell className="text-right">
                {item.reference_number}
              </TableCell>
              <TableCell className="text-right">{item.bank_account}</TableCell>
              <TableCell className="text-right flex gap-2">
                <DialogTrigger asChild onClick={() => setSelectedId(item.ID)}>
                  <button
                    className="hover:text-red-400 border-0 hover:bg-transparent"
                    aria-label={`حذف آیتم ${item.Title}`}
                  >
                    <Trash2 />
                  </button>
                </DialogTrigger>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedId && (
        <DialogContent className="sm:max-w-md rounded-xl p-6 text-right">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-lg font-bold text-right p-3">
              آیا از انجام عملیات حذف اطمینان دارید؟
            </DialogTitle>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="destructive"
                className="min-w-[80px]"
                onClick={async (e) => {
                  e.preventDefault();
                  await handleDelete(selectedId);
                  setSelectedId(null);
                }}
              >
                بله
              </Button>
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  className="min-w-[80px]"
                  onClick={() => setSelectedId(null)}
                >
                  خیر
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
}
