import { atom } from "recoil";

export interface MonthSalesData {
  [key: string]: SalesData[];
}

export interface SalesData {
  rank: number;
  product: string;
  sales: number;
}

export const reportState = atom<MonthSalesData>({
  key: "reportState",
  default: {},
});

export const productsState = atom<string[]>({
  key: "productsState",
  default: [],
});

export const monthsState = atom<string[]>({
  key: "monthsState",
  default: [
    // "فروردین",
    // "اردیبهشت",
    // "خرداد",
    // "تیر",
    // "مرداد",
    // "شهریور",
    // "مهر",
    // "آبان",
    // "آذر",
    // "دی",
    // "بهمن",
    // "اسفند",
  ],
});

export const selectedMonthState = atom<string | null>({
  key: "selectedMonthState",
  default: null,
});

export const selectedProductState = atom<string | null>({
  key: "selectedProductState",
  default: null,
});

export const layoutModeState = atom<"horizontal" | "stacked">({
  key: "layoutModeState",
  default: "horizontal", // Default to stacked mode
});

export const isModalOpenState = atom<boolean>({
  key: "isModalOpenState",
  default: false,
});
