import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableUI } from "../ui/TableUI";
import { useCashListItems } from "@/api/getData";

export function CashHistoryTabs() {
  const { data } = useCashListItems();

  return (
    <div className="flex w-full m-w-[700px] flex-col gap-6">
      <Tabs defaultValue="pending">
        <TabsList className="gap-2">
          <TabsTrigger
            value="pending"
            className="bg-yellow-400 text-white font-medium"
          >
            در انتظار تایید
          </TabsTrigger>

          <TabsTrigger
            value="confirmed"
            className="bg-green-500 text-white font-medium"
          >
            تایید شده
          </TabsTrigger>

          <TabsTrigger
            value="rejected"
            className="bg-red-500 text-white font-medium"
          >
            رد شده
          </TabsTrigger>

          <TabsTrigger
            value="all"
            className="bg-slate-700 text-white font-medium"
          >
            همه ی آیتم ها
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <TableUI data={data} />
        </TabsContent>

        <TabsContent value="confirmed">
          <TableUI data={data} />
        </TabsContent>

        <TabsContent value="all">
          <TableUI data={data} />
        </TabsContent>

        <TabsContent value="rejected">
          <TableUI data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
