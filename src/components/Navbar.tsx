import React from "react";
import { useSetRecoilState } from "recoil";
import { isModalOpenState } from "../recoilState";

const Navbar: React.FC = () => {
  const setIsModalOpen = useSetRecoilState(isModalOpenState); // Set modal state using Recoil

  const handleUploadClick = () => {
    setIsModalOpen(true); // Open modal directly via Recoil
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">داشبورد</h1>
        <button
          onClick={handleUploadClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          بارگذاری
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
