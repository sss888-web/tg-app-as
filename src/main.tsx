import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WebApp from "@twa-dev/sdk";
import App from "./App";
import "./index.css";

WebApp.ready();
WebApp.expand();
WebApp.setHeaderColor("#0a3232");
WebApp.setBackgroundColor("#071f1f");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
