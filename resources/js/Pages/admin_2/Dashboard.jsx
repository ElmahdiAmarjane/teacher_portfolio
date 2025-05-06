import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Sample Card</h3>
          <p className="text-2xl font-bold mt-2">123</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Sample Card</h3>
          <p className="text-2xl font-bold mt-2">456</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Sample Card</h3>
          <p className="text-2xl font-bold mt-2">789</p>
        </div>
      </div>
    </div>
  );
};

Dashboard.layout = page => <DashboardLayout children={page} />;
export default Dashboard;