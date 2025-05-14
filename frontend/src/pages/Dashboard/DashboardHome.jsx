import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Users, Briefcase, Archive, BarChart2 } from "lucide-react";

const stats = [
  {
    id: 1,
    label: "Total Users",
    value: 1280,
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 2,
    label: "Services",
    value: 52,
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: 3,
    label: "Projects",
    value: 18,
    icon: <Archive className="w-6 h-6" />,
  },
  {
    id: 4,
    label: "Revenue",
    value: "$24.3K",
    icon: <BarChart2 className="w-6 h-6" />,
  },
];

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
        <p className="text-gray-600">
          Your application performance at a glance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ id, label, value, icon }) => (
          <div
            key={id}
            className="flex items-center p-4 bg-white rounded-2xl shadow"
          >
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full mr-4">
              {icon}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Services Table */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Recent Services
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className="text-gray-700">UI Design</span>
              <span className="text-sm text-gray-500">Apr 18, 2025</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700">API Integration</span>
              <span className="text-sm text-gray-500">Apr 15, 2025</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700">Database Optimization</span>
              <span className="text-sm text-gray-500">Apr 10, 2025</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700">Security Audit</span>
              <span className="text-sm text-gray-500">Apr 05, 2025</span>
            </li>
          </ul>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Active Projects
          </h3>
          <ul className="space-y-3">
            <li>
              <p className="font-medium text-gray-700">E-commerce Redesign</p>
              <p className="text-sm text-gray-500">Due: May 30, 2025</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </li>
            <li>
              <p className="font-medium text-gray-700">Mobile App Launch</p>
              <p className="text-sm text-gray-500">Due: Jun 15, 2025</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </li>
            <li>
              <p className="font-medium text-gray-700">Marketing Campaign</p>
              <p className="text-sm text-gray-500">Due: Jul 01, 2025</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
