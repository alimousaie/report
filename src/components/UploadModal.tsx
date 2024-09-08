import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Papa, { ParseResult } from "papaparse"; // Import ParseResult type
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  reportState,
  productsState,
  isModalOpenState,
  monthsState,
} from "../recoilState";
import { ConvertData } from "../utils/ProcessCsv";

const UploadModal: React.FC = () => {
  const setReport = useSetRecoilState(reportState);
  const setProductsList = useSetRecoilState(productsState);
  const setMonths = useSetRecoilState(monthsState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        Papa.parse(file, {
          complete: (result: ParseResult<string[]>) => {
            const data = ConvertData(result.data);
            setReport(data.report);
            setProductsList(data.products);
            setMonths(data.months);
            handleClose();
          },
          header: false,
        });
      }
    },
    [setReport, setProductsList, setMonths, handleClose]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">بارگذاری فایل CSV</h2>
        <div
          {...getRootProps()}
          className={`border-dashed border-4 p-6 text-center ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>فایل CSV را اینجا رها کنید...</p>
          ) : (
            <p>
              فایل CSV را اینجا بکشید و رها کنید، یا کلیک کنید برای انتخاب فایل
            </p>
          )}
        </div>
        <button
          onClick={handleClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
