import type { DateObject } from "react-multi-date-picker";

export interface IFileUploaderProps {
  orderNumber: string | null;
  subFolder: string;
  docType?: string;
}

export interface IPersianDatePickerProps {
  value: string | Date | DateObject | null;
  onChange: (date: string) => void;
}

export interface ICashListItem {
  ID: number;
  Title: string;
  count: string;
  due_date: string;
  reference_number: string;
  status: string;
  customer_GUID: string;
  bank_account: string;
}

export interface ITableUIProps {
  data: ICashListItem[] | undefined;
}

export interface ICashFormProps {
  userGuid: string | null;
  itemGuid: string;
  onSuccessfulSubmit: () => void;
}
