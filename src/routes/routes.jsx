import { Route, Routes } from "react-router";

import App from "@/pages/App";
import LayoutMain from "@/layout/Layout";

const RouteApp = () => {
  return (
    <Routes>
      <Route element={<LayoutMain />}>
        <Route path="/" element={<App />} />
      </Route>
    </Routes>
  );
};

export default RouteApp;
