import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import PublicationRow from '../Components/publications/publicationRow'; 
import { router,usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useAlert } from '@/Components/alerts/AlertContext';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const Publication = () => {
  const { status } = usePage().props;
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(status);
  const [filterType, setFilterType] = useState('all');
  const { showSuccess, showError } = useAlert();


  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get('/api/publications/index');
        const formattedPublications = response.data.map(pub => ({
          ...pub,
          type: pub.type === 'course' ? 'Course' : pub.type.toUpperCase(),
          date: new Date(pub.created_at).toLocaleDateString(),
          status: pub.status.charAt(0).toUpperCase() + pub.status.slice(1),
          // Add lowercase versions for easier searching
          searchableTitle: pub.title.toLowerCase(),
          searchableType: pub.type.toLowerCase(),
          searchableStatus: pub.status.toLowerCase()
        }));
        setPublications(formattedPublications);
        setFilteredPublications(formattedPublications);
      } catch (error) {
        showError('Failed to load publications');
        console.error('Error fetching publications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublications();
  }, []);

  // Apply filters whenever search term or filter type changes
  useEffect(() => {
    let results = publications;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(pub => 
        pub.searchableTitle.includes(term) || 
        pub.searchableType.includes(term) ||
        pub.searchableStatus.includes(term)
      );
    }
    
    // Apply type filter
    if (filterType !== 'all') {
      const typeToFilter = filterType === 'course' ? 'Course' : filterType.toUpperCase();
      results = results.filter(pub => pub.type === typeToFilter);
    }
    
    setFilteredPublications(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filterType, publications]);

  // Pagination logic - now uses filteredPublications
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPublications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleAddNewPublication = () => {
    router.visit(route('newpublication'));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      try {
        const response = await axios.delete('/api/publications/delete', {
          data: { id: id }
        });
        
        if (response.data.success) {
          const updatedPublications = publications.filter(pub => pub.id !== id);
          setPublications(updatedPublications);
          showSuccess(response.data.message);
        } else {
          showError('Failed to delete publication');
        }
      } catch (error) {
        showError(error.response?.data?.message || 'Failed to delete publication');
        console.error('Delete error:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 dark:bg-gray-900">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

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
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <input
              type="text"
              placeholder="Search by title, type or status..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="course">Course</option>
              <option value="td">TD</option>
              <option value="tp">TP</option>
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
              {currentItems.length > 0 ? (
                currentItems.map((pub) => (
                  <PublicationRow 
                    key={pub.id} 
                    pub={pub} 
                    handleDelete={handleDelete} 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    {filteredPublications.length === 0 && publications.length > 0 
                      ? 'No publications match your search/filter criteria'
                      : 'No publications found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredPublications.length > itemsPerPage && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastItem, filteredPublications.length)}</span> of{' '}
              <span className="font-medium">{filteredPublications.length}</span> publications
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-md text-sm font-medium ${
                  currentPage === 1 
                    ? 'text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600 cursor-not-allowed' 
                    : 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                <FaChevronLeft className="inline mr-1" /> Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`px-3 py-1 border rounded-md text-sm font-medium ${
                      currentPage === pageNum
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-700'
                        : 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-md text-sm font-medium ${
                  currentPage === totalPages
                    ? 'text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600 cursor-not-allowed' 
                    : 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                Next <FaChevronRight className="inline ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Publication.layout = page => <DashboardLayout>{page}</DashboardLayout>;
export default Publication;