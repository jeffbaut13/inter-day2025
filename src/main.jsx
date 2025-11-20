import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import RouteApp from "./routes/routes.jsx";
import "./index.css";

 


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RouteApp />
    </BrowserRouter>
  </StrictMode>
);
