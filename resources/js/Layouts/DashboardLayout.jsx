// resources/js/Layouts/DashboardLayout.jsx
import React from 'react';
import SideBar from '@/Components/dashboard/SideBare';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
};

// Make sure to include this default export
export default DashboardLayout;