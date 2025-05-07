import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useAlert } from '@/Components/alerts/AlertContext';

const NewPublications = () => {
  const { showSuccess, showError } = useAlert();

  const [publication, setPublication] = useState({
    title: '',
    type: '',
    formation_id: '',
    context: '',
    status: 'published',
  });

  const [file, setFile] = useState(null);
  const [showNewFormationModal, setShowNewFormationModal] = useState(false);
  const [newFormation, setNewFormation] = useState({
    title: '',
    image: null,
  });

  const { setData, post, processing, reset } = useForm({
    title: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublication(prev => ({ ...prev, [name]: value }));
  };

  const handleNewFormationChange = (e) => {
    const { name, value } = e.target;
    setNewFormation(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormationImageChange = (e) => {
    setNewFormation(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', publication.title);
    formData.append('type', publication.type.toLowerCase()); // Convert to lowercase
    formData.append('formation_id', publication.formation_id);
    formData.append('context', publication.context);
    formData.append('status', publication.status);
    
    if (file) {
      formData.append('file', file);
    }

    router.post('/publications', formData, {
      forceFormData: true,
      onSuccess: () => {
        showSuccess('Publication created successfully!');
        // Reset form
        setPublication({
          title: '',
          type: '',
          formation_id: '',
          context: '',
          status: 'published',
        });
        setFile(null);
      },
      onError: (errors) => {
        showError('Error creating publication!');
        console.error(errors);
      },
    });
  };

  const handleNewFormationSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newFormation.title);
    formData.append('image', newFormation.image);

    router.post('/formations', formData, {
      forceFormData: true,
      onSuccess: () => {
        showSuccess('Formation created successfully!');
        setShowNewFormationModal(false);
        setNewFormation({ title: '', image: null });
        reset();
        router.reload({ only: ['formations'] });
      },
      onError: (errors) => {
        showError('Error creating formation!');
        console.error(errors);
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 dark:text-white">Add Publication</h1>
      <p className="text-gray-500 mb-8 dark:text-gray-400">Add New Publication.</p>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            value={publication.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            required
          />
        </div>

        {/* Type & Formation */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
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
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Formation</label>
              <button
                type="button"
                onClick={() => setShowNewFormationModal(true)}
                className="text-xs text-blue-600 hover:underline dark:text-blue-400"
              >
                + Add New Formation
              </button>
            </div>
            <select
              name="formation_id"
              value={publication.formation_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Select Formation</option>
              <option value="1">Web</option>
              <option value="2">DevOps</option>
              <option value="3">Java</option>
            </select>
          </div>
        </div>

        {/* Description */}
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

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {processing ? 'Saving...' : 'Add Publication'}
          </button>
        </div>
      </form>

      {/* New Formation Modal */}
      {showNewFormationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full dark:bg-gray-800 dark:border dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Create New Formation</h2>
            <form onSubmit={handleNewFormationSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Formation Title</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Formation Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFormationImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowNewFormationModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  {processing ? 'Creating...' : 'Create Formation'}
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