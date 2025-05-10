import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { router } from '@inertiajs/react';
const BlogItem = ({ data, onViewClick, onDelete }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const { delete: destroy } = useForm(); // Properly destructure the delete method

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
    };
    const confirmDelete = () => {
        router.delete(route('admin.blog.destroy', { blog: data.id }), {
            onSuccess: () => setShowDeleteConfirm(false),
            preserveScroll: true,
        });
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    return (
        <>
            <div className="group relative w-full p-4 bg-white rounded-lg border shadow hover:shadow-md transition duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition duration-200">
                            {data.title}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {new Date(data.created_at).toLocaleString("fr-FR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>

                    <div className="mt-4 sm:mt-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={() => onViewClick(data)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded shadow-sm transition duration-150"
                        >
                            Voir
                        </button>
                        <a 
                            href={route('admin.blog.edit', { blog: data.id })}
                            className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded shadow-sm transition duration-150"
                        >
                            Modifier
                        </a>
                        <button 
                            onClick={handleDeleteClick}
                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded shadow-sm transition duration-150"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Confirmer la suppression
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Êtes-vous sûr de vouloir supprimer cet article "{data.title}" ? Cette action est irréversible.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition duration-150"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition duration-150"
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BlogItem;