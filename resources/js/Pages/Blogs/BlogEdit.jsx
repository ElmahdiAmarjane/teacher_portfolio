import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm, usePage, router } from "@inertiajs/react";

export default function BlogEdit({ blog, onCancel }) {
    const editorRef = useRef(null);
    const [editorContent, setEditorContent] = useState(blog.content);
    const { data, setData, put, processing, errors } = useForm({
        title: blog.title,
        content: blog.content,
    });

    const { flash } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(false);
    const [editorReady, setEditorReady] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleEditorChange = (content) => {
        setEditorContent(content);
        setData('content', content);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.blog.update', { blog: blog.id }));
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            router.visit(route('admin.blog'));
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md dark:bg-gray-900">
            {/* Success Message */}
            {showSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded animate-fade-in">
                    Blog updated successfully!
                </div>
            )}

            {/* Error Messages */}
            {flash?.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {flash.error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <input
                    
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                        required
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                    )}
                </div>

                <div>
                    {!editorReady && (
                        <div className="h-[500px] flex items-center justify-center bg-gray-100 rounded">
                            <p>Loading editor...</p>
                        </div>
                    )}
                    <div style={{ display: editorReady ? 'block' : 'none' }}>
                        <Editor
                            apiKey="iyj19xst9h72hy3nilax4d67isyl620r7cko1yhqioogogju"
                            onInit={(evt, editor) => {
                                editorRef.current = editor;
                                setEditorReady(true);
                            }}
                            value={editorContent}
                            onEditorChange={handleEditorChange}
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount",
                                ],
                                toolbar: "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                            }}
                        />
                    </div>
                    {errors.content && (
                        <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={processing || !editorReady}
                        className="bg-blue-600 text-white p-2 px-6 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Updating...' : 'Update Blog'}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-600 text-white p-2 px-6 rounded hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}