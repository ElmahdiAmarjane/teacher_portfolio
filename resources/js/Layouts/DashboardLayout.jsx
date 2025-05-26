// resources/js/Layouts/DashboardLayout.jsx
import React from 'react';
import SideBar from '@/Components/dashboard/SideBare';
import DarkModeToggle from '@/Components/DarkModeToggle';


const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <SideBar />
      <div className="flex-1 overflow-auto p-6 dark:bg-gray-900">
        <div className="flex justify-end mb-4">
          <DarkModeToggle />
        </div>
        {children}
      </div>
    </div>
  );
};

// Make sure to include this default export
export default DashboardLayout;