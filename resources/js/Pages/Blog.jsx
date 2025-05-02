import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

const Blog = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Blog</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Blog content goes here</p>
      </div>
    </div>
  );
};zz

Blog.layout = page => <DashboardLayout>{page}</DashboardLayout>;
export default Blog;