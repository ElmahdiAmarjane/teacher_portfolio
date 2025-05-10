import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { FaChevronLeft, FaEye, FaEyeSlash } from 'react-icons/fa';

const FormationDetails = () => {
  // Données statiques pour la démo
  const formation = {
    id: 1,
    title: "Web Development Fundamentals",
    created_at: "2023-09-15T00:00:00.000Z",
    published: true,
    description: "A comprehensive introduction to web development covering HTML, CSS, and JavaScript.",
    students_count: 42,
    duration: 200,
    average_progress: "75%"
  };

  const publications = [
    {
      id: 1,
      title: "Introduction to HTML",
      type: "Series",
      duration: 45,
      created_at: "2023-08-15T00:00:00.000Z"
    },
    {
      id: 2,
      title: "CSS Basics",
      type: "Series",
      duration: 50,
      created_at: "2023-06-18T00:00:00.000Z"
    },
    {
      id: 3,
      title: "HTML & CSS Practice",
      type: "Exercise",
      duration: 60,
      created_at: "2023-06-20T00:00:00.000Z"
    },
    {
      id: 4,
      title: "JavaScript Fundamentals",
      type: "Course",
      duration: 75,
      created_at: "2023-06-26T00:00:00.000Z"
    }
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Bouton de retour */}
      <button className="mb-6 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
        <FaChevronLeft className="mr-2" />
        Back to formations
      </button>

      {/* Carte principale */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden dark:bg-gray-800 dark:border dark:border-gray-700">
        {/* En-tête */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{formation.title}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Created on {new Date(formation.created_at).toLocaleDateString()}
              </p>
            </div>
            <button
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                formation.published
                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-800'
                  : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800'
              }`}
            >
              {formation.published ? (
                <>
                  <FaEyeSlash className="mr-2" />
                  Unpublish
                </>
              ) : (
                <>
                  <FaEye className="mr-2" />
                  Publish
                </>
              )}
            </button>
          </div>


          {/* Contenu de la formation */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Formation Content
            </h2>
            
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <TableHeader>Order</TableHeader>
                    <TableHeader>Title</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Duration</TableHeader>
                    <TableHeader>Date Added</TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {publications.map((pub, index) => (
                    <tr key={pub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <label className="inline-flex items-center">
                          <input 
                            type="checkbox" 
                            className="rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <span className="ml-3 font-medium">{pub.title}</span>
                        </label>
                      </TableCell>
                      <TableCell>{pub.type}</TableCell>
                      <TableCell>{pub.duration} min</TableCell>
                      <TableCell>
                        {new Date(pub.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            ⋮
                          </button>
                        </div>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composants réutilisables
const StatCard = ({ label, value, className = '' }) => (
  <div className={`bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm ${className}`}>
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
    <p className="text-2xl font-semibold mt-1 text-gray-800 dark:text-white">{value}</p>
  </div>
);

const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
    {children}
  </th>
);

const TableCell = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
    {children}
  </td>
);

FormationDetails.layout = page => <DashboardLayout>{page}</DashboardLayout>;
export default FormationDetails;