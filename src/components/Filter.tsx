import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  monthsState,
  selectedMonthState,
  productsState,
  selectedProductState,
  layoutModeState,
} from "../recoilState";
import Dropdown from "./Dropdown";
import { QueueList } from "../assets/icons/QueueList";
import { Squares2x2 } from "../assets/icons/Squares2x2";

const Filter: React.FC = () => {
  const months = useRecoilValue(monthsState);
  const products = useRecoilValue(productsState);

  const [selectedMonth, setSelectedMonth] = useRecoilState(selectedMonthState);
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(selectedProductState);
  const [layoutMode, setLayoutMode] = useRecoilState(layoutModeState);

  const handleLayoutModeChange = (mode: "horizontal" | "stacked") => {
    setLayoutMode(mode);
  };

  return (
    <div className="flex gap-1 mb-4 w-full">
      <div className="w-1/6">
        <Dropdown
          label="انتخاب ماه"
          options={months}
          selectedValue={selectedMonth}
          onChange={setSelectedMonth}
          placeholder="ماه"
        />
      </div>
      <div className="w-3/6">
        <Dropdown
          label="انتخاب محصول"
          options={products}
          selectedValue={selectedProduct}
          onChange={setSelectedProduct}
          placeholder="محصول"
        />
      </div>

      <div className="w-1/6"></div>
      <div className="w-1/6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          نمایش جداول:
        </label>
        <div className="flex space-x-2">
          <button
            onClick={() => handleLayoutModeChange("horizontal")}
            className={`px-4 py-2 border rounded ${
              layoutMode === "horizontal"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            title="کنار هم"
          >
            <Squares2x2 />
          </button>
          <button
            onClick={() => handleLayoutModeChange("stacked")}
            className={`px-4 py-2 border rounded ${
              layoutMode === "stacked"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            title="روی هم"
          >
            <QueueList />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
