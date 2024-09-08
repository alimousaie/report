import React from "react";
import { useRecoilValue } from "recoil";
import {
  reportState,
  selectedMonthState,
  layoutModeState,
} from "../recoilState";
import NoData from "./NoData";
import ReportTable from "./ReportTable";
import Filter from "./Filter";

const MainLayout: React.FC = () => {
  const report = useRecoilValue(reportState);
  const selectedMonth = useRecoilValue(selectedMonthState);
  const layoutMode = useRecoilValue(layoutModeState);

  const filteredReport = selectedMonth
    ? { [selectedMonth]: report[selectedMonth] }
    : report;

  const isHorizontal = layoutMode === "horizontal";

  return (
    <main className="flex-grow p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <Filter />
        {Object.entries(filteredReport).length > 0 ? (
          <div
            className={`pb-2 grid gap-y-1 ${
              isHorizontal
                ? "grid-flow-col auto-cols-max gap-4 overflow-x-auto"
                : ""
            }`}
          >
            {Object.entries(filteredReport).map(([month, data], index) => (
              <div
                key={`rt-${index}`}
                className={`shadow rounded ${isHorizontal ? "col-span-1" : ""}`}
              >
                <ReportTable month={month} data={data}></ReportTable>
              </div>
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </main>
  );
};

export default MainLayout;
