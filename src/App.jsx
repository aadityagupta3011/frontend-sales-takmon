import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import BossDashboard from "./pages/BossDashboard";
import SalesDashboard from "./pages/SalesDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import DownloadLogs from "./components/DownloadLogs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/boss-dashboard"
        element={
          <ProtectedRoute allowedRoles={["boss"]}>
            <BossDashboard />
          </ProtectedRoute>
        }
      />



      <Route
        path="/sales-dashboard"
        element={
          <ProtectedRoute allowedRoles={["sales_team"]}>
            <SalesDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
