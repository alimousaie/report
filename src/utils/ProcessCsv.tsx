import { MonthSalesData } from "../recoilState";

export interface Result {
  months: string[];
  products: string[];
  report: MonthSalesData;
}

export const ConvertData = (rows: string[][]): Result => {
  const months: string[] = [];
  let products: string[] = [];
  const report: MonthSalesData = {};

  rows?.forEach((cols) => {
    if (cols.length < 3) {
      return;
    }

    const month = cols[0].trim();
    const rank = Number(cols[1]);
    const product = cols[2].trim();
    const sales = Number(cols[3]);

    if (isNaN(sales)) {
      console.error(`Invalid sales amount: ${sales}`);
      return;
    }

    products.push(product);

    if (!(month in report)) {
      report[month] = [];
      months.push(month);
    }

    report[month].push({
      rank,
      product,
      sales,
    });
  });

  products = [...new Set(products)];
  products = products.sort((a, b) => a.localeCompare(b));

  for (const key of Object.keys(report)) {
    report[key] = report[key].sort((a, b) => (a.sales >= b.sales ? -1 : 1));
  }

  return {
    months,
    products,
    report,
  };
};
