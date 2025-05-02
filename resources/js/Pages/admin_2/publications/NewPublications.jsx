import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';

const NewPublications = () => {
  const [publication, setPublication] = useState({
    title: '',
    type: '',
    classes: '',
    description: '',
    context: '',
    status: 'Published',
  });

  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublication(prev => ({ ...prev, [name]: value }));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDeleteFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Publication:', publication);
    console.log('Files:', files);
    // Submit logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Add Publication</h1>
      <p className="text-gray-500 mb-8">Add New Publication.</p>

      {/* Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={publication.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Type & Classes */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={publication.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select type</option>
            <option value="Course">Course</option>
            <option value="TD">TD</option>
            <option value="TP">TP</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Classes</label>
          <input
            type="text"
            name="classes"
            value={publication.classes}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={publication.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm h-24 resize-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Context */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Context</label>
        <textarea
          name="context"
          value={publication.context}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm h-32 resize-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">You can also upload files below instead of writing content.</p>
      </div>

      {/* File Upload */}
      <div
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mb-6 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition-all"
      >
        <input
          type="file"
          multiple
          className="hidden"
          id="fileUpload"
          onChange={handleFileChange}
        />
        <label htmlFor="fileUpload" className="cursor-pointer text-blue-600 font-semibold">
          Click to upload or drag and drop
        </label>
        <p className="text-sm text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
      </div>

      {/* Display Uploaded Files */}
      {files.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Uploaded Files</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-4 py-2 bg-gray-50 border rounded-lg"
              >
                <span className="text-sm text-gray-800">{file.name}</span>
                <button
                  onClick={() => handleDeleteFile(index)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Status */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <div className="flex items-center space-x-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="Published"
              checked={publication.status === "Published"}
              onChange={handleChange}
              className="text-blue-600"
            />
            <span className="ml-2 text-gray-700">Published</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={publication.status === "Draft"}
              onChange={handleChange}
              className="text-blue-600"
            />
            <span className="ml-2 text-gray-700">Draft</span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Update Publication
        </button>
      </div>
    </div>
  );
};

NewPublications.layout = page => <DashboardLayout>{page}</DashboardLayout>;

export default NewPublications;
