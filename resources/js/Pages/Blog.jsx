import { useState, useEffect } from "react";
import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage } from "@inertiajs/react";
import NewBlog from "./Blogs/NewBlog";
import BlogItem from "./Blogs/BlogItem";
import ViewBlog from "./Blogs/ViewBlog";

const Blog = () => {
  const [newArticleClicked, setNewArticleClicked] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const postsPerPage = 4;
     const page = usePage();
      console.log("page.props =", page.props); // 👈 ajoute ce log

    const { props } = usePage();
    const { blogs = [] } = props;

    // Filter blogs based on search term
    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic with filtered blogs
    const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = filteredBlogs.slice(startIndex, startIndex + postsPerPage);

    const handleViewArticle = (blog) => {
        setSelectedBlog(blog);
    };

    const handleBackToList = () => {
        setSelectedBlog(null);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    return (
        <div className="p-6 dark:bg-gray-900">
            {!newArticleClicked && !selectedBlog ? (
                <div className="flex flex-col gap-6 ">
                    <div className="flex gap-4 justify-between">
                        <input
                            className="w-4/5 p-2 border border-gray-300 rounded dark:bg-gray-900"
                            type="text"
                            placeholder="Search by title ..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />

                        <button
                            onClick={() => setNewArticleClicked(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            New Article
                        </button>
                    </div>

                    {/* Loading state */}
                    {filteredBlogs.length === 0 ? (
                        <div className="text-center py-8">
                            <p>{searchTerm ? "No matching posts found" : "No blog posts found"}</p>
                            <button 
                                onClick={() => setNewArticleClicked(true)}
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Create a blog post
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-4">
                                {currentPosts.map((post) => (
                                    <BlogItem 
                                        key={post.id} 
                                        data={post} 
                                        onViewClick={() => handleViewArticle(post)}
                                    />
                                ))}
                            </div>

                            {filteredBlogs.length > postsPerPage && (
                                <div className="mt-8 flex justify-center items-center gap-4">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-md text-white font-medium transition duration-300 ${
                                            currentPage === 1
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                    >
                                        Previous
                                    </button>

                                    <span className="text-gray-700 font-semibold">
                                        Page {currentPage} of {totalPages}
                                    </span>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-md text-white font-medium transition duration-300 ${
                                            currentPage === totalPages
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ) : newArticleClicked ? (
                <NewBlog setNewArticleClicked={setNewArticleClicked} />
            ) : (
                <ViewBlog 
                    blog={selectedBlog}
                    onBackClick={handleBackToList}
                />
            )}
        </div>
    );
};

Blog.layout = page => <DashboardLayout>{page}</DashboardLayout>;
export default Blog;