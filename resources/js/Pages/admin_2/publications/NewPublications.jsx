import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useAlert } from '@/Components/alerts/AlertContext';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

const NewPublications = () => {
  const { showSuccess, showError } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [formations, setFormations] = useState([]);
  const [isLoadingFormations, setIsLoadingFormations] = useState(true);
  const [showFormationModal, setShowFormationModal] = useState(false);
  const [newFormation, setNewFormation] = useState({
    title: '',
    image: null
  });

  const [publication, setPublication] = useState({
    title: '',
    type: '',
    formation_id: '',
    context: '',
    status: 'published',
    file: null
  });

  // Fetch formations when component mounts
  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    setIsLoadingFormations(true);
    try {
      const response = await axios.get('/api/fetchFormation');
      const formationsData = Array.isArray(response.data) 
        ? response.data 
        : response.data?.data || response.data?.formations || [];
      setFormations(formationsData);
    } catch (error) {
      console.error('Error fetching formations:', error);
      showError('Failed to load formations');
      setFormations([]);
    } finally {
      setIsLoadingFormations(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublication(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPublication(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleNewFormationChange = (e) => {
    const { name, value } = e.target;
    setNewFormation(prev => ({ ...prev, [name]: value }));
  };

  const handleNewFormationImageChange = (e) => {
    setNewFormation(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleAddFormation = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', newFormation.title);
      if (newFormation.image) {
        formData.append('image', newFormation.image);
      }

      const response = await axios.post('/api/addFormation', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      showSuccess('Formation added successfully!');
      setShowFormationModal(false);
      setNewFormation({ title: '', image: null });
      fetchFormations(); // Refresh the formations list
    } catch (error) {
      console.error('Error adding formation:', error);
      showError(error.response?.data?.message || 'Error adding formation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', publication.title);
      formData.append('type', publication.type);
      formData.append('formation_id', publication.formation_id);
      formData.append('context', publication.context);
      formData.append('status', publication.status);
      if (publication.file) {
        formData.append('file', publication.file);
      }

      await axios.post('/api/publications/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      showSuccess('Publication created successfully!');
      setPublication({
        title: '',
        type: '',
        formation_id: '',
        context: '',
        status: 'published',
        file: null
      });
    } catch (error) {
      console.error('Error creating publication:', error);
      showError(error.response?.data?.message || 'Error creating publication');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 dark:text-white">Add Publication</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            value={publication.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        {/* Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Type</label>
          <select
            name="type"
            value={publication.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Select type</option>
            <option value="course">Course</option>
            <option value="td">TD</option>
            <option value="tp">TP</option>
          </select>
        </div>

        {/* Formation */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Formation</label>
            <button
              type="button"
              onClick={() => setShowFormationModal(true)}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FaPlus className="mr-1" /> Add New Formation
            </button>
          </div>
          
          {isLoadingFormations ? (
            <div className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-700">
            </div>
          ) : (
            <select
              name="formation_id"
              value={publication.formation_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              disabled={formations.length === 0}
            >
              <option value="">Select Formation</option>
              {formations.map(formation => (
                <option key={formation.id} value={formation.id}>
                  {formation.title}
                </option>
              ))}
            </select>
          )}
          {!isLoadingFormations && formations.length === 0 && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              No formations available. Please add one.
            </p>
          )}
        </div>

        {/* Context */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Context</label>
          <textarea
            name="context"
            value={publication.context}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm h-32 resize-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">File (PDF)</label>
          <input
            type="file"
            name="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Status</label>
          <div className="flex items-center space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value="published"
                checked={publication.status === "published"}
                onChange={handleChange}
                className="text-blue-600 dark:text-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Published</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value="draft"
                checked={publication.status === "draft"}
                onChange={handleChange}
                className="text-blue-600 dark:text-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Draft</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || (formations.length === 0 && !isLoadingFormations)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {isLoading ? 'Creating...' : 'Create Publication'}
          </button>
        </div>
      </form>

      {/* Add Formation Modal */}
      {showFormationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Add New Formation</h2>
            <form onSubmit={handleAddFormation}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newFormation.title}
                  onChange={handleNewFormationChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleNewFormationImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowFormationModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  {isLoading ? 'Adding...' : 'Add Formation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

NewPublications.layout = page => <DashboardLayout>{page}</DashboardLayout>;
export default NewPublications;