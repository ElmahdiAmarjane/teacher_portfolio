import { ArrowLeft } from "lucide-react";
import React from "react";

const ViewBlog = ({ blog, onBackClick }) => {
    const title = blog.title;
    const content = blog.content;

    return (
        <div className="w-full mx-auto bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBackClick}
                    className="text-blue-600 hover:text-blue-800 transition duration-300 focus:outline-none"
                >
                    <ArrowLeft className="w-8 h-8" />
                </button>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

            <div
                className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

export default ViewBlog;