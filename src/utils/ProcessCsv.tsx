import { MonthSalesData } from "../recoilState";

export interface Result {
  products: string[];
  report: MonthSalesData;
}

export const ConvertData = (rows: string[][]): Result => {
  let products: string[] = [];
  const report: MonthSalesData = {};

  rows?.forEach((cols) => {
    if (cols.length < 2) {
      return;
    }

    if (isNaN(cols[2])) {
      return;
    }

    products.push(cols[1].trim());
    const month = cols[0].trim();

    if (!(month in report)) {
      report[month] = [];
    }

    report[month].push({
      product: cols[1].trim(),
      sales: +cols[2],
    });
  });

  products = [...new Set(products)];
  products = products.sort((a, b) => a.localeCompare(b));

  for (const key of Object.keys(report)) {
    report[key] = report[key].sort((a, b) => (a.sales >= b.sales ? -1 : 1));
  }

  return {
    products,
    report,
  };
};
