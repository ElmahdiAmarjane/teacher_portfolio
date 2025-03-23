import {  X } from "lucide-react";

const DeletePubs = ({ item, onClose }) => {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Confirm Deletion
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <X/>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="mb-6">
                        <p className="text-gray-700">
                            Are you sure you want to delete:
                            <span className="font-mono font-bold text-red-600 ml-1">
                                {item.title}
                            </span>
                            ?
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Once you confirm, the item will be permanently deleted from the database and cannot be restored.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-x-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={()=>{
                                
                            }}
                            className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeletePubs;