import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { SalesData } from "../recoilState";
import { selectedProductState } from "../recoilState";
import { ChevronDown } from "../assets/icons/ChevronDown";
import { ChevronUp } from "../assets/icons/ChevronUp";

interface ReportTableProps {
  month: string;
  data: SalesData[];
}

const ReportTable: React.FC<ReportTableProps> = ({ month, data }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to track if the table is collapsed
  const selectedProduct = useRecoilValue(selectedProductState);

  const filteredData = selectedProduct
    ? data.filter((row) => row.product === selectedProduct)
    : data;

  if (filteredData.length === 0) {
    return null;
  }

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const sum = filteredData?.reduce((result, row) => (result += row.sales), 0);

  return (
    <div>
      <h3
        className="flex justify-between	items-center bg-gray-50	rounded p-2 text-lg font-bold text-slate-600 cursor-pointer"
        onClick={toggleCollapse}
      >
        <span>
          {month} ({data.length.toLocaleString()} مورد)
        </span>
        <span>{isCollapsed ? <ChevronUp /> : <ChevronDown />}</span>
      </h3>
      {!isCollapsed && (
        <div className="w-full p-2">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">محصول</th>
                <th className="px-4 py-2">میزان فروش</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{row.product}</td>
                  <td className="border px-4 py-2">
                    {row.sales.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <td></td>
              <td>
                <b className="p-2">{sum.toLocaleString()}</b>
              </td>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportTable;
