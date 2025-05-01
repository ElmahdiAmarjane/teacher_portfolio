import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

const Users = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Users Management</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Users content goes here</p>
      </div>
    </div>
  );
};

Users.layout = page => <DashboardLayout>{page}</DashboardLayout>;
export default Users;