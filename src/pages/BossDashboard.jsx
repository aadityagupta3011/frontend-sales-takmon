import React from "react";
import Navbar from "../components/Navbar";
import UploadPDF from "../components/UploadPDF";
import CreateSalesTeam from "../components/CreateSalesTeam";
import Employees from "../components/Employees";
import DownloadLogs from "../components/DownloadLogs";
import AllClients from "../components/AllClients";

function BossDashboard() {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Boss Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UploadPDF />
          <CreateSalesTeam />
        </div>
        <Employees />
        <DownloadLogs />
        <AllClients /> {/* Add the AllClients component */}
      </div>
    </div>
  );
}

export default BossDashboard;
