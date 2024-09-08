import React from "react";
import UploadModal from "./components/UploadModal";
import Navbar from "./components/Navbar";
import MainLayout from "./components/MainLayout";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MainLayout />
      <UploadModal />
    </div>
  );
};

export default App;
