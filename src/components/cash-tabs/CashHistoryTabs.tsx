import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableUI } from "../ui/TableUI";

export function CashHistoryTabs() {
  return (
    <div className="flex w-full m-w-[700px] flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList className="border-green-500">
          <TabsTrigger value="confirmed" className="bg-green-500 text-white font-medium">واریزهای نقدی تایید شده</TabsTrigger>
          <TabsTrigger value="all" className="bg-slate-700 text-white font-medium">همه واریزهای نقدی</TabsTrigger>
          <TabsTrigger value="rejected" className="bg-red-500 text-white font-medium">واریزهای نقدی رد شده</TabsTrigger>
        </TabsList>

        <TabsContent value="confirmed">
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
