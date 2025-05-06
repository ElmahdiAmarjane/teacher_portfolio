import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import PublicationRow from '../Components/publications/publicationRow'; 
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useAlert } from '@/Components/alerts/AlertContext';

const Publication = () => {
  const [publications, setPublications] = useState([
    {
      id: 1,
      title: "Introduction to Computer Science",
      type: "Course",
      date: "15/04/2023",
      status: "published",
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      type: "Course",
      date: "20/05/2023",
      status: "published",
    },
    {
      id: 3,
      title: "Database Systems Lab",
      type: "TP",
      date: "10/06/2023",
      status: "published",
    },
    {
      id: 4,
      title: "Web Development Exercises",
      type: "TD",
      date: "05/07/2023",
      status: "Draft",
    },
    {
      id: 5,
      title: "Machine Learning Fundamentals",
      type: "Course",
      date: "15/06/2023",
      status: "published",
    }
  ]);
  const { showSuccess } = useAlert();

  const handleAddNewPublication = () => {
    router.visit(route('newpublication'));
  };
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      setPublications(publications.filter(pub => pub.id !== id));
      showSuccess('Publication deleted successfully!');
    }
  };

  return (
    <div className="p-6 dark:bg-gray-900">
      <div className='flex justify-between'>
        <div className="flex flex-col justify-start items-start mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Publications</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your courses, TDs, TPs and other publications</p>
        </div>
        <div>
          <button 
            onClick={handleAddNewPublication}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Publication
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800 dark:border dark:border-gray-700">
        {/* Search and filter section */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by title, type..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
            />
            <select className="pr-30 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500">
              <option>All Types</option>
              <option>Course</option>
              <option>TD</option>
              <option>TP</option>
            </select>
          </div>
        </div>

        {/* Publications table */}
        <div className="overflow-x-auto p-5">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider dark:text-gray-300">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider dark:text-gray-300">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider dark:text-gray-300">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {publications.map((pub) => (
                <PublicationRow 
                  key={pub.id} 
                  pub={pub} 
                  handleDelete={handleDelete} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Publication.layout = page => <DashboardLayout>{page}</DashboardLayout>;
export default Publication;