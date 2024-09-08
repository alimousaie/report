import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil"; // Import RecoilRoot
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
