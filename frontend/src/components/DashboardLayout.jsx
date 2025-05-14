import React from "react";
import { Footer } from "./dashboard/Footer";
import { Sidebar } from "./sidebar";
import { Header } from "./dashboard/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
