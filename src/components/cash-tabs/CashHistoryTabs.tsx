import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableUI } from "../ui/TableUI";

export function CashHistoryTabs() {
  return (
    <div className="flex w-full m-w-[700px] flex-col gap-6">
      <Tabs defaultValue="confirmed">
        <TabsList className="gap-2">
          <TabsTrigger
            value="confirmed"
            className="bg-green-500 text-white font-medium"
          >
            تایید شده
          </TabsTrigger>

          <TabsTrigger
            value="pending"
            className="bg-yellow-400 text-white font-medium"
          >
            در انتظار تایید
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

        <TabsContent value="confirmed">
          <TableUI />
        </TabsContent>

        <TabsContent value="pending">
          <TableUI />
        </TabsContent>

        <TabsContent value="all">
          <TableUI />
        </TabsContent>

        <TabsContent value="rejected">
          <TableUI />
        </TabsContent>
      </Tabs>
    </div>
  );
}
