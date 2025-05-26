import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const NewPubs = ({ isOpen, setIsPopupOpen }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("COUR"); // Updated to match Laravel validation
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("type", type);

        files.forEach((file) => {
            formData.append("files[]", file);
        });

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/publications/store",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Publication added:", response.data);
            alert("Publication added successfully!");
            setIsPopupOpen(false);
            setTitle("");
            setDescription("");
            setType("COUR");
            setFiles([]);
            setErrors({});
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Error adding publication:", error);
                alert("Failed to add publication.");
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">Create New Publication</h2>
                    <button onClick={() => setIsPopupOpen(false)} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                    {/* Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="COUR">Course</option>
                            <option value="TD">TD</option>
                            <option value="TP">TP</option>
                            <option value="ANNONCES">Annonces</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-sm">{errors.type[0]}</p>}
                    </div>

                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Publication Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter publication title"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title[0]}</p>}
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                            placeholder="Type a description for your publication"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description[0]}</p>}
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Attach Files</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.files && <p className="text-red-500 text-sm">{errors.files[0]}</p>}
                    </div>

                    {/* Uploaded Files Preview */}
                    {files.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-md">
                                    <span className="text-sm text-gray-600">{file.name}</span>
                                    <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end p-4 border-t">
                    <button
                        onClick={() => setIsPopupOpen(false)}
                        className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPubs;
