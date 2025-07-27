import type { DateObject } from "react-multi-date-picker";

export interface IFileUploaderProps {
  orderNumber: string;
  subFolder: string;
  docType?: string;
}

export interface IPersianDatePickerProps {
  value: string | Date | DateObject | null;
  onChange: (date: string) => void;
}