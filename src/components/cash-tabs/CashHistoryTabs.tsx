import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableUI } from "../ui/TableUI";
import type { ITableUIProps } from "@/utils/type";
import { useState } from "react";

export function CashHistoryTabs({ data }: ITableUIProps) {
  const [activeTab, setActiveTab] = useState("pending");

  const safeData = data ?? [];
  const pendingItems = safeData.filter(
    (item) => item.status === "0" || item.status === ""
  );
  const confirmedItems = safeData.filter((item) => item.status === "1");
  const rejectedItems = safeData.filter((item) => item.status === "2");
  const allItems = safeData;

  const getBackgroundColor = (tab: string) => {
    switch (tab) {
      case "pending":
        return "bg-yellow-400";
      case "confirmed":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "all":
      default:
        return "bg-slate-200";
    }
  };

  return (
    <div className="flex w-full max-w-[700px] flex-col gap-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
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
            className="bg-slate-500 text-white font-medium"
          >
            همه ی واریزها
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <TableUI
            data={pendingItems}
            backgroundColor={getBackgroundColor("pending")}
          />
        </TabsContent>

        <TabsContent value="confirmed">
          <TableUI
            data={confirmedItems}
            backgroundColor={getBackgroundColor("confirmed")}
          />
        </TabsContent>

        <TabsContent value="rejected">
          <TableUI
            data={rejectedItems}
            backgroundColor={getBackgroundColor("rejected")}
          />
        </TabsContent>

        <TabsContent value="all">
          <TableUI
            data={allItems}
            backgroundColor={getBackgroundColor("all")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
