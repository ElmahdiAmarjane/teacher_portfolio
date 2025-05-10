import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useAlert } from '@/Components/alerts/AlertContext';
import axios from 'axios';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaSearch, 
  FaPlus,
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaTimes
} from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Formations = () => {
  const { status } = usePage().props;
  const [formations, setFormations] = useState([]);
  const [filteredFormations, setFilteredFormations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const { showSuccess, showError } = useAlert();
  
  // Edit modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentFormation, setCurrentFormation] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    image: null,
    imagePreview: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchFormations = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(route('formations.index'));
        const formattedData = Array.isArray(response.data) 
          ? response.data 
          : response.data?.data || [];
        
        const withSearchProps = formattedData.map(formation => ({
          ...formation,
          searchableTitle: formation.title.toLowerCase(),
          searchableStatus: formation.published ? 'published' : 'draft'
        }));
        
        setFormations(withSearchProps);
        setFilteredFormations(withSearchProps);
      } catch (error) {
        console.error('Error fetching formations:', error);
        showError('Failed to load formations');
        setFormations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormations();
  }, []);

  useEffect(() => {
    let results = formations;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(formation => 
        formation.searchableTitle.includes(term) || 
        formation.searchableStatus.includes(term)
      );
    }
    
    setFilteredFormations(results);
    setCurrentPage(1);
  }, [searchTerm, formations]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFormations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFormations.length / itemsPerPage);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleAddNewFormation = () => {
    router.visit(route('formations.create'));
  };


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this formation?')) {
      try {
        const response = await axios.post('/api/formations', { id });
        setFormations(formations.filter(formation => formation.id !== id));
        showSuccess(response.data.message);
      } catch (error) {
        showError(error.response?.data?.message || 'Failed to delete formation');
        console.error('Delete error:', error);
      }
    }
  };

  // Edit modal functions
  const handleEditClick = (formation) => {
    setCurrentFormation(formation);
    setEditFormData({
      title: formation.title,
      image: null,
      imagePreview: formation.image
    });
    setIsEditModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditFormData(prev => ({
          ...prev,
          image: files[0],
          imagePreview: event.target.result
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setEditFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleUpdateFormation = async () => {
    try {
      const formData = new FormData();
      formData.append('id', currentFormation.id); // ID passé comme paramètre
      formData.append('title', editFormData.title);
      if (editFormData.image) {
        formData.append('image', editFormData.image);
      }
      formData.append('_method', 'POST'); // pour Laravel si tu utilises Route::post comme update
  
      const response = await axios.post('/api/formations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Mise à jour locale des données
      const updatedFormations = formations.map(formation =>
        formation.id === currentFormation.id
          ? {
              ...formation,
              title: editFormData.title,
              image: response.data.data.image || formation.image
            }
          : formation
      );
  
      setFormations(updatedFormations);
      showSuccess(response.data.message);
      setIsEditModalOpen(false);
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to update formation');
      console.error('Update error:', error);
    }
  };
  
  const handleFormationDetaille = () => {
    router.visit(route('formationDetails'));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Edit Formation
              </h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleEditFormChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-100 dark:hover:file:bg-blue-800"
                />
                {editFormData.imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={editFormData.imagePreview} 
                      alt="Current formation" 
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end p-4 border-t dark:border-gray-700">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateFormation}
                disabled={isUpdating}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className='flex flex-col md:flex-row justify-between items-start mb-6 gap-4'>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Formations</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your educational programs</p>
        </div>
        <button 
          onClick={handleAddNewFormation}
          className="btn-primary inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
        >
          <FaPlus className="mr-2" />
          New Formation
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search formations..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Formation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Date Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {currentItems.length > 0 ? (
                currentItems.map((formation) => (
                  <tr onClick={handleFormationDetaille} key={formation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 hover:cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{formation.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(formation.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        formation.published 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'
                      }`}>
                        {formation.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formation.students_count || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleTogglePublish(formation.id)}
                          className={`p-1.5 rounded-md hover:bg-opacity-20 ${
                            formation.published 
                              ? 'text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900' 
                              : 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900'
                          }`}
                          title={formation.published ? 'Unpublish' : 'Publish'}
                        >
                          {formation.published ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <button
                          onClick={() => handleEditClick(formation)}
                          className="text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900 p-1.5 rounded-md"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(formation.id)}
                          className="text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900 p-1.5 rounded-md"
                          title="Delete"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    {formations.length === 0 
                      ? 'No formations found' 
                      : 'No formations match your search criteria'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredFormations.length > itemsPerPage && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastItem, filteredFormations.length)}</span> of{' '}
              <span className="font-medium">{filteredFormations.length}</span> formations
            </div>
            <div className="flex space-x-1">
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
                    onClick={() => goToPage(pageNum)}
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

Formations.layout = page => <DashboardLayout>{page}</DashboardLayout>;
export default Formations;