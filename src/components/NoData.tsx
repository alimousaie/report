import React from "react";
import { useRecoilValue } from "recoil";
import { reportState } from "../recoilState";

const NoData: React.FC = () => {
  const report = useRecoilValue(reportState);

  if (Object.keys(report).length > 0) {
    return null;
  }

  return <p>هنوز داده‌ای بارگذاری نشده است.</p>;
};

export default NoData;
