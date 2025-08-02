import CashForm from "../cash-form/CashForm";
import { CashHistoryTabs } from "../cash-tabs/CashHistoryTabs";

const CashPage = () => {
  return (
    <div className="w-full flex justify-between gap-3 items-center">
      <CashForm />
      <CashHistoryTabs />
    </div>
  );
};

export default CashPage;
