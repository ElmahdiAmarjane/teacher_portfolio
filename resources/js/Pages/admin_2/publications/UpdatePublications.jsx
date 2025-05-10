import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import axios from 'axios';
import { usePage, router } from '@inertiajs/react';
import { useAlert } from '@/Components/alerts/AlertContext';

const UpdatePublication = () => {
    const { id } = usePage().props;
    const { showSuccess, showError } = useAlert();
    const [publication, setPublication] = useState({
        title: '',
        type: '',
        formation_id: '',
        context: '',
        status: 'published',
    });
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch publication data
    useEffect(() => {
        const fetchPublication = async () => {
            try {
                const response = await axios.post('/api/publications/fetchById', { id });
                setPublication(response.data.publication);
            } catch (error) {
                showError('Failed to load publication');
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPublication();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPublication(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('title', publication.title);
            formData.append('type', publication.type);
            formData.append('formation_id', publication.formation_id);
            formData.append('context', publication.context);
            formData.append('status', publication.status);
            if (file) {
                formData.append('file', file);
            }

            const response = await axios.post('/api/publications/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            showSuccess(response.data.message);
            router.visit('/updatePublications');
        } catch (error) {
            showError(error.response?.data?.message || 'Failed to update publication');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 dark:text-white">Update Publication</h1>
            
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
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Formation</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Update File (PDF)</label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {publication.file && (
                        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                            Current file: {publication.file.split('/').pop()}
                        </p>
                    )}
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
                        onClick={() => router.visit('/publications')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Publication'}
                    </button>
                </div>
            </form>
        </div>
    );
};

UpdatePublication.layout = page => <DashboardLayout>{page}</DashboardLayout>;
export default UpdatePublication;